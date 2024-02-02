import { instance } from '../server.js'
import crypto from 'crypto'


export const checkout = async (req, res) => {
    try{
        const options = {
            amount: Number(req.body.amount * 100),
            currency: 'INR',
        }
        const order = await instance.orders.create(options)
        res.status(200).json({
            success: true,
            order,
        })
    } catch(err){
        res.status(404).json({
            success:false,
            error:err.message
        })
    }
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
        res.json({
            success: true,
        })
    } else {
        res.json({
            success: false,
        })
    }
}
