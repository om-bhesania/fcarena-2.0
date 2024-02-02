import express from 'express';
import Razorpay from 'razorpay';

const app = express();
const port = 5000;

const keyId = 'rzp_test_br1PvzrqVM39G7';
const keySecret = 'WnqCg7vWlQZdZnKgzTvVc1Be';

const razorpay = new Razorpay({
    key_id: 'rzp_test_br1PvzrqVM39G7',
    key_secret: 'WnqCg7vWlQZdZnKgzTvVc1Be',
});

app.use(express.json());

app.post('/api/payments', async (req, res) => {
    const { orderData } = req.body;

    const options = {
        amount: 100 * 100,
        currency: 'INR',
        receipt: 'receipt_order_123',
        payment_capture: 1,
        notes: {
            name: orderData.name,
            email: orderData.email,
            contact: orderData.contact,
            description: 'Booking Payment',
        },
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({ orderId: response.id });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/payments/callback', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = razorpay.utils.generateSignature(
        `${razorpay_order_id}|${razorpay_payment_id}`,
        'YOUR_RAZORPAY_KEY_SECRET'
    );

    if (generated_signature === razorpay_signature) {
        res.json({ status: 'success', message: 'Payment successful' });
    } else {
        res.status(400).json({ status: 'error', message: 'Invalid signature' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
