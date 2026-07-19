import razorpayInstance from "../config/razorpay.js";
import { Order } from "../Models/OrderModel.js";
import { Cart } from "../Models/cartModel.js"
import crypto from "crypto"
import { User } from "../Models/Usermodels.js";
import { Product } from "../Models/productModel.js";


export const createOrder = async (req, res) => {
    try {
        const { products, amount, tax, shipping, currency } = req.body;

        const options = {
            amount: Math.round(Number(amount) * 100), //inr convert to paisa
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`
        }

        const razorpayOrder = await razorpayInstance.orders.create(options)

        //save order in DB
        const newOrder = new Order({
            user: req.user._id,
            products,
            amount,
            tax,
            shipping,
            currency,
            status: "Panding",
            razorpayOrderId: razorpayOrder.id
        })

        await newOrder.save()

        res.json({
            success: true,
            order: razorpayOrder,
            dbOrder: newOrder
        })
    } catch (error) {
        console.log("❌ Error in create Order:", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentFailed } = req.body;
        const userId = req.user._id // we gate id from middleware

        if (paymentFailed) {
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                // {new: true}
                { returnDocument: "after" }
            );
            return res.status(400).json({
                success: false,
                message: "Payment Failed"
            })
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex")

        if (expectedSignature === razorpay_signature) {
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: "Paid",
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature
                },
                // {new: true}
                { returnDocument: "after" }
            );
            //if order pay than cart empty

            await Cart.findOneAndUpdate({ userId }, { $set: { items: [], totalPrice: 0 } })

            return res.json({
                success: true,
                message: "Payment Successfully", order
            })
        } else {
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                // {new: true}
                { returnDocument: "after" }
            );
            return res.status(400).json({
                success: false,
                message: "Invalid Signature"
            })
        }
    } catch (error) {
        console.log("❌ Error in verify Payment", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getMyOrder = async (req, res) => {
    try {
        const userId = req.id;
        const orders = await Order.find({ user: userId })
            .populate({ path: "products.productId", select: "productName productPrice productImg" })
            .populate("user", "firstName lastName email")
        // console.log(JSON.stringify(orders, null, 2));
        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        })
    } catch (error) {
        console.error("Error fatching user orders", error);
        res.status(500).json({ message: error.message })
    }
}

//api or controller for Admin only

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params; //userId will come from URL

        const orders = await Order.find({ user: userId })
            .populate({
                path: "products.productId",
                select: "productName productPrice productImg"
            })
            //fatching product details
            .populate("user", "firstName lastName email") // fatch user info

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        })
    } catch (error) {
        console.log("Error fatching user order:", error)
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate("user", "name email") // populate user information
            .populate("products.productId", "productName productPrice") //populate product info

        res.json({
            success: true,
            count: orders.length,
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to fatch all order",
            error: error.message
        })
    }
}

export const getSalesData = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({})
        const totalProducts = await Product.countDocuments({})
        const totalOrders = await Order.countDocuments({ status: "Paid" })

        //Total sales amount 
        const totalSaleAgg = await Order.aggregate([
            { $match: { status: "Paid" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])

        const totalSales = totalSaleAgg[0]?.total || 0;

        //Sales grouped by date {last 30 days}

        const thirtyDayAgo = new Date()
        thirtyDayAgo.setDate(thirtyDayAgo.getDate() - 30)

        const salesByDate = await Order.aggregate([
            { $match: { status: "Paid", createdAt: { $gte: thirtyDayAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    amount: { $sum: "$amount" },
                }
            },
            { $sort: { _id: 1 } }
        ])

        // console.log(salesByDate);

        const formattedSales = salesByDate.map((item)=>({
            date:item._id,
            amount:item.amount

        }))

       // Temporary dummy data for testing chart
        // const formattedSales = [
        //     { date: "2026-07-13", amount: 12000 },
        //     { date: "2026-07-14", amount: 18000 },
        //     { date: "2026-07-15", amount: 25000 },
        //     { date: "2026-07-16", amount: 32000 },
        //     { date: "2026-07-17", amount: 44912.7 }
        // ];
        // console.log(formattedSales);

        res.json({
            success: true,
            totalUsers,
            totalProducts,
            totalOrders,
            totalSales,
            sales: formattedSales
        })
    } catch (error) {
        console.error("Error fetching sales date:", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}