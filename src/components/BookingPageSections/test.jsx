import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const PaymentForm = () => {
    const handlePayment = async () => {
        try {
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Provide necessary order data here
                    name: 'John Doe',
                    email: 'john@example.com',
                    contact: '1234567890',
                }),
            });

            const data = await response.json();

            // Redirect to the Razorpay checkout page using the received order ID
            if (data.orderId) {
                const options = {
                    key: 'YOUR_RAZORPAY_KEY_ID',
                    amount: 100 * 100, // 100 INR
                    currency: 'INR',
                    name: 'FcArenaVadodara',
                    description: 'Booking Payment',
                    prefill: {
                        name: 'John Doe',
                        email: 'john@example.com',
                        contact: '1234567890',
                    },
                    order_id: data.orderId,
                    handler: function (response) {
                        console.log('Payment Successful');
                        console.log('Payment Response:', response);
                        // You can handle success callback here
                    },
                    prefill: {
                        name: 'John Doe',
                        email: 'john@example.com',
                        contact: '1234567890',
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <Box>
            <Button mt="4" colorScheme="teal" onClick={handlePayment}>
                Pay Now
            </Button>
        </Box>
    );
};

export default PaymentForm;
