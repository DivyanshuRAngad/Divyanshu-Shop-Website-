'use client';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/legacy/image';

export default function PaymentPage() {
  const { cartItems, dispatch } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 500 ? 0 : 100;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'address', 'city', 'pincode'];
    for (let field of required) {
      if (!customerInfo[field].trim()) {
        alert(`Please fill in your ${field}`);
        return false;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(customerInfo.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!/^\d{6}$/.test(customerInfo.pincode)) {
      alert('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error('Payment gateway failed to load');
      }

      // Generate order ID
      const newOrderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
      setOrderId(newOrderId);

              const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_RrOgYIfMNJYDv0',
          amount: Math.round(total * 100), // Amount in paise
          currency: 'INR',
          name: 'Divyanshu Shop',
          description: `Order ${newOrderId}`,
          image: '/logo.png',
          order_id: newOrderId,
          handler: function (response) {
            // Payment successful
            handlePaymentSuccess(response);
          },
          prefill: {
            name: customerInfo.name,
            email: customerInfo.email,
            contact: customerInfo.phone,
          },
          notes: {
            address: customerInfo.address,
            city: customerInfo.city,
            pincode: customerInfo.pincode,
          },
          theme: {
            color: '#ec4899', 
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            }
          }
        };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (response) => {
    // Here you would typically send the payment details to your backend
    console.log('Payment successful:', response);
    
    // Generate order ID for online payment
    const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Clear cart and redirect to order confirmation page
    dispatch({ type: 'CLEAR_CART' });
    router.push(`/order-confirmation?orderId=${orderId}&type=online`);
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{(item.discountedPrice * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Information & Payment */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <input
                      type="text"
                      value={customerInfo.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter pincode"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your complete address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <input
                      type="radio"
                      id="razorpay"
                      name="payment"
                      value="razorpay"
                      defaultChecked
                      className="w-4 h-4 text-pink-600 focus:ring-pink-500"
                    />
                    <label htmlFor="razorpay" className="ml-3 flex items-center">
                      <img src="/razorpay-logo.png" alt="Razorpay" className="w-16 h-8 object-contain" />
                      <span className="ml-2 text-gray-700">Credit/Debit Cards, UPI, Net Banking</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        value="cod"
                        className="w-4 h-4 text-pink-600 focus:ring-pink-500"
                      />
                      <label htmlFor="cod" className="ml-3 flex items-center">
                        <span className="text-gray-700">Cash on Delivery (COD)</span>
                      </label>
                    </div>
                    <button 
                      onClick={() => router.push('/cod-payment')}
                      className="text-pink-600 hover:text-pink-700 font-medium underline"
                    >
                      Choose COD
                    </button>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${total.toLocaleString()}`
                )}
              </button>

              {/* Security Notice */}
              <div className="text-center text-sm text-gray-600">
                <p>🔒 Your payment information is secure and encrypted</p>
                <p>Powered by Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
