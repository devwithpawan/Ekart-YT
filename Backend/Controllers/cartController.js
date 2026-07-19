import { Cart } from "../Models/cartModel.js"
import { Product } from "../Models/productModel.js";

export const getCart = async (req, res) => {
    try {
        const userId = req.id;

        const cart = await Cart.findOne({ userId }).populate("items.productId")
        if (!cart) {
            return res.json({ success: true, cart: [] });
        }
        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addToCart = async (req, res) => {
    try {
        const userId = req.id;
        const { productId } = req.body;

        //check if product is exist
        // console.log("req.id:", req.id);
        // console.log("productId:", productId);
        // console.log("product:", product);
        const product = await Product.findById(productId);
        // console.log(product);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not Found"
            })
        }

        //find the user's cart(if exists)
        let cart = await Cart.findOne({ userId })

        //if cart's dosen't exists, create a new cart
        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1, price: product.productPrice }],
                totalPrice: product.productPrice
            })
        }
        else {
            //find if product is already exist in cart
            // console.log("Cart Items:");
            // console.log(cart.items);
            const itemIndex = cart.items.findIndex(
                (item) =>item.productId && item.productId.toString() === productId
            )
            if (itemIndex > -1) {
                //if product exists -> just increase quantity
                cart.items[itemIndex].quantity += 1
            } else {
                //if new product -> push to cart
                cart.items.push({
                    productId,
                    quantity: 1,
                    price: product.productPrice,
                })
            }

            //Recalculate total price
            cart.totalPrice = cart.items.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            )
        }

        // save updatd cart
        await cart.save()

        const populatedCart = await Cart.findById(cart._id).populate("items.productId")

        res.status(200).json({
            success: true,
            message: "Product add to cart successfully",
            cart: populatedCart
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const updateQuantity = async (req, res) => {
    try {
        const userId = req.id;
        const { productId, type } = req.body;

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" })
        if (type === "increase") item.quantity += 1;
        if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

        await cart.save()
        cart = await cart.populate("items.productId")

        res.status(200).json({ success: true, cart })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.id;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId })
        if (!cart) return res.status(404).json({ success: false, message: "cart not found" })

        cart.items = cart.items.filter(item => item.productId.toString() !== productId)
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

        cart = await cart.populate("items.productId")

        await cart.save()
        res.status(200).json({ success: true, cart })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}