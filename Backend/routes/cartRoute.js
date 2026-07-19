import express from 'express'
import {isAuthenticated} from '../middleware/isAuthenticated.js'
import { addToCart, getCart, removeFromCart, updateQuantity } from '../Controllers/cartController.js'


const router = express.Router()

router.get('/', isAuthenticated, getCart)
router.post('/add', isAuthenticated, addToCart)
router.delete('/remove', isAuthenticated, removeFromCart)
router.put('/update', isAuthenticated, updateQuantity)

export default router 