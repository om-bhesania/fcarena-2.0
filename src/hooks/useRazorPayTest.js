import { useState } from 'react';

const useRazorPayTest = () => {
  const [paymentData, setPaymentData] = useState(null);

  const initiatePayment = async (paymentDetails) => {
    try {
      // Make API call to initiate payment with RazorPay
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data.success) {
        // Payment successful, redirect to /home
        window.location.href = '/home';
        setPaymentData(data); // Store payment data
      } else {
        // Payment failed, show error alert
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  return { initiatePayment, paymentData };
};

export default useRazorPayTest;
