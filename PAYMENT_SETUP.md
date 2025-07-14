# Payment Gateway Integration Setup Guide

## 🚀 Razorpay Integration for Divyanshu Shop

This guide will help you set up the complete payment gateway integration with Razorpay.

## 📋 Prerequisites

1. **Razorpay Account**: Sign up at [razorpay.com](https://razorpay.com)
2. **Node.js**: Version 14 or higher
3. **Next.js**: Already configured in your project

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install razorpay
```

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_test_key_id_here
RAZORPAY_KEY_SECRET=your_test_key_secret_here

# For production, use live keys
# RAZORPAY_KEY_ID=rzp_live_your_live_key_id_here
# RAZORPAY_KEY_SECRET=your_live_key_secret_here
```

### 3. Get Your Razorpay Keys

1. **Login to Razorpay Dashboard**
2. **Go to Settings → API Keys**
3. **Generate a new key pair**
4. **Copy the Key ID and Key Secret**

### 4. Test Mode vs Live Mode

- **Test Mode**: Use test keys for development
- **Live Mode**: Use live keys for production

## 🛠️ Features Implemented

### ✅ Payment Page Features
- **Professional checkout interface**
- **Order summary with breakdown**
- **Customer information form**
- **Payment method selection**
- **Form validation**
- **Loading states**
- **Error handling**

### ✅ Payment Processing
- **Razorpay integration**
- **Order creation**
- **Payment verification**
- **Success/failure handling**
- **Cart clearing after payment**

### ✅ Thank You Page
- **Order confirmation details**
- **Estimated delivery date**
- **Next steps information**
- **Customer support options**
- **Print receipt functionality**

## 🔒 Security Features

1. **Payment Signature Verification**
2. **Server-side order creation**
3. **Environment variable protection**
4. **Input validation**
5. **Error handling**

## 📱 Payment Methods Supported

- **Credit/Debit Cards**
- **UPI (Unified Payments Interface)**
- **Net Banking**
- **Digital Wallets**
- **Cash on Delivery (COD)**

## 🧪 Testing

### Test Card Details
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
Name: Any name
```

### Test UPI
```
UPI ID: success@razorpay
```

## 🚀 Production Deployment

1. **Switch to Live Keys**
2. **Update environment variables**
3. **Configure webhook URLs**
4. **Test with small amounts**
5. **Monitor payment logs**

## 📞 Support

- **Razorpay Support**: [support.razorpay.com](https://support.razorpay.com)
- **Documentation**: [razorpay.com/docs](https://razorpay.com/docs)
- **API Reference**: [razorpay.com/docs/api](https://razorpay.com/docs/api)

## 🔄 Webhook Setup (Optional)

For production, set up webhooks to handle payment events:

```javascript
// Webhook endpoint
app.post('/api/webhook', (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');
    
  if (signature === expectedSignature) {
    // Handle payment events
    const event = req.body;
    switch (event.event) {
      case 'payment.captured':
        // Payment successful
        break;
      case 'payment.failed':
        // Payment failed
        break;
    }
  }
  
  res.status(200).json({ received: true });
});
```

## 📊 Analytics & Monitoring

- **Payment Success Rate**
- **Failed Payment Analysis**
- **Customer Payment Preferences**
- **Revenue Tracking**

## 🎯 Best Practices

1. **Always verify payment signatures**
2. **Use HTTPS in production**
3. **Implement proper error handling**
4. **Store order details securely**
5. **Send confirmation emails**
6. **Monitor payment logs**
7. **Test thoroughly before going live**

## 🔧 Customization

You can customize the payment flow by modifying:

- **Payment page styling** (`pages/payment.js`)
- **Thank you page** (`pages/thankyou.js`)
- **API endpoints** (`pages/api/`)
- **Error messages**
- **Success handling**

## 📝 License

This integration is part of the Divyanshu Shop project and follows Razorpay's terms of service. 