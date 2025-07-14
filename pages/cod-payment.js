'use client';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/legacy/image';

export default function CODPaymentPage() {
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
    pincode: '',
    landmark: ''
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

  const handleCODPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Generate order ID
      const newOrderId = 'COD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
      setOrderId(newOrderId);

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to order confirmation page
      dispatch({ type: 'CLEAR_CART' });
      router.push(`/order-confirmation?orderId=${newOrderId}&type=cod`);
    } catch (error) {
      console.error('COD order error:', error);
      alert('Order placement failed. Please try again.');
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cash on Delivery Checkout</h1>
          
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
                  <span>Total (Pay on Delivery)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Information & COD Details */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Information</h2>
                
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
                    <input
                      type="text"
                      value={customerInfo.landmark}
                      onChange={(e) => handleInputChange('landmark', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Near hospital, school, etc."
                    />
                  </div>
                </div>
              </div>

              {/* COD Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cash on Delivery Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-lg">💰</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Pay When You Receive</h4>
                      <p className="text-sm text-green-700">Pay ₹{total.toLocaleString()} in cash when your order is delivered</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-lg">📦</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-1">Free Delivery</h4>
                      <p className="text-sm text-blue-700">Standard delivery within 3-5 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-yellow-600 text-lg">⚠️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Important Notes</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Keep exact change ready for payment</li>
                        <li>• Verify your order before making payment</li>
                        <li>• You can refuse delivery if not satisfied</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleCODPayment}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Placing Order...
                  </div>
                ) : (
                  `Place Order - Pay ₹${total.toLocaleString()} on Delivery`
                )}
              </button>

              {/* COD Notice */}
              <div className="text-center text-sm text-gray-600">
                <p>💳 You can also choose online payment for faster delivery</p>
                <button 
                  onClick={() => router.push('/payment')}
                  className="text-pink-600 hover:text-pink-700 font-medium underline mt-2"
                >
                  Switch to Online Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 