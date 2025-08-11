import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box
} from '@mui/material';
import axios from 'axios';

const Payments = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const orderResponse = await axios.post('http://localhost:8080/api/createOrder', formData);
      const order = orderResponse.data;

      const options = {
        key: 'rzp_test_u2ZdKyUjNGIIw0', // Replace with your actual Razorpay key
        amount: order.amount * 100,
        currency: 'INR',
        name: 'Course Portal',
        description: 'Course Payment',
        order_id: order.razorpayOrderId,
        handler: async function (response) {
          await axios.post('http://localhost:8080/api/paymentCallback', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
          alert('Payment successful!');
        },
        prefill: {
          name: formData.name,
          email: formData.email
        },
        theme: {
          color: '#1976d2'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h5" gutterBottom>
          Make a Payment
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Amount (INR)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handlePayment}>
            Pay Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Payments;
