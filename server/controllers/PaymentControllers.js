import { instance } from '../server.js'
import crypto from 'crypto'

var result = false

export const checkout = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: 'INR',
    }
    const order = await instance.orders.create(options)
    console.log(order);

    res.status(200).json({
        success: true,
        order,
    })
}

export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body

    const body = razorpay_order_id + '|' + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
        result = true;
        res.redirect('http://localhost:5173/bookings?PaymentSuccess=true') 
        
    } else {
        res.redirect('http://localhost:5173/bookings?PaymentSuccess=false')
    }
}
