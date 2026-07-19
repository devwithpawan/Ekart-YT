import Razorpay from "razorpay"

const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID, //pass razorpay keyid from .env file
    key_secret:process.env.RAZORPAY_SECRET  //pass razorpay secret key of .env file
})

export default razorpayInstance