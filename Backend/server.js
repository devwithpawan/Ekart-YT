import express from 'express'
import 'dotenv/config'
import connectDB from './Database/db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/orders', orderRoute)

//http://localhost:8000/api/v1/user/register

app.listen(PORT, () => {
    connectDB()
    console.log(`server is listing at port ${PORT}`);
})