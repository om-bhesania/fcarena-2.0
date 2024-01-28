import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const useRazorpay = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(null); // Initialize with null
    const toast = useToast();
    const testKeyId = 'rzp_test_br1PvzrqVM39G7';

    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const makePayment = async (orderData) => {
        try {
            await new Promise((resolve) => {
                const checkLoaded = setInterval(() => {
                    if (window.Razorpay) {
                        clearInterval(checkLoaded);
                        resolve();
                    }
                }, 100);
            });

            const amountInPaise = 100;

            const razorpayOptions = {
                key: testKeyId,
                amount: amountInPaise,
                currency: 'INR',
                name: 'FcArenaVadodara',
                description: 'Booking Payment',
                prefill: {
                    name: orderData.name,
                    email: orderData.email,
                    contact: orderData.contact,
                },
                theme: {
                    color: '#004F2D',
                },
            };

            const rzpInstance = new window.Razorpay(razorpayOptions);

            rzpInstance.on('payment.success', (response) => {
                console.log('Payment Successful');
                console.log('Payment Response:', response);
                console.log('Order Data:', orderData); // Log the orderData object
                setPaymentSuccess(true); // Update payment success status
            });

            rzpInstance.on('payment.error', (error) => {
                console.error('Razorpay payment failed:', error);
                setPaymentSuccess(false); // Update payment failure status
            });

            rzpInstance.open();

        } catch (error) {
            console.error('Razorpay payment failed:', error);
            setPaymentSuccess(false); // Update payment failure status
        }
    };

    useEffect(() => {
        if (paymentSuccess !== null) { // Handle null case
            const status = paymentSuccess ? 'success' : 'error';
            const title = paymentSuccess ? 'Booking Successful' : 'Booking Failed';
            const description = paymentSuccess ? 'Your booking has been confirmed.' : 'Sorry, your booking could not be processed.';

            toast({
                title: title,
                description: description,
                status: status,
                duration: 7000,
                position: 'top',
                isClosable: true,
            });
        }
    }, [paymentSuccess, toast]);

    return { makePayment };
};

export default useRazorpay;
