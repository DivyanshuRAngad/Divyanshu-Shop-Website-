import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function TrackOrder() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock tracking data - in a real app, this would come from an API
  const mockTrackingData = {
    'TRK123456789': {
      orderId: 'ORD123456789',
      status: 'In Transit',
      estimatedDelivery: '2024-01-20',
      trackingSteps: [
        {
          step: 'Order Placed',
          status: 'completed',
          date: '2024-01-15',
          time: '10:30 AM',
          description: 'Your order has been successfully placed'
        },
        {
          step: 'Order Confirmed',
          status: 'completed',
          date: '2024-01-15',
          time: '11:45 AM',
          description: 'Order has been confirmed and is being processed'
        },
        {
          step: 'Processing',
          status: 'completed',
          date: '2024-01-16',
          time: '09:15 AM',
          description: 'Your order is being prepared for shipment'
        },
        {
          step: 'Shipped',
          status: 'completed',
          date: '2024-01-17',
          time: '02:30 PM',
          description: 'Order has been shipped from our warehouse'
        },
        {
          step: 'In Transit',
          status: 'active',
          date: '2024-01-18',
          time: '08:20 AM',
          description: 'Package is on its way to your location'
        },
        {
          step: 'Out for Delivery',
          status: 'pending',
          date: '',
          time: '',
          description: 'Package will be delivered to your address'
        },
        {
          step: 'Delivered',
          status: 'pending',
          date: '',
          time: '',
          description: 'Package has been delivered successfully'
        }
      ],
      currentLocation: 'Mumbai Hub',
      courier: 'Express Delivery',
      courierTracking: 'EXP123456789'
    }
  };

  const handleTrackOrder = async () => {
    if (!trackingNumber.trim()) {
      alert('Please enter a tracking number');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber];
      if (data) {
        setOrderDetails(data);
      } else {
        alert('Tracking number not found. Please check and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'active': return '🚚';
      case 'pending': return '⏳';
      default: return '📦';
    }
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-400 bg-gray-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>

          {/* Tracking Input */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Tracking Number</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter your tracking number (e.g., TRK123456789)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                onClick={handleTrackOrder}
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-pink-600 text-white hover:bg-pink-700 hover:scale-105'
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Tracking...
                  </div>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-3">
              You can find your tracking number in your order confirmation email or in your order details.
            </p>
          </div>

          {/* Order Details */}
          {orderDetails && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order #{orderDetails.orderId}</h2>
                    <p className="text-gray-600">Tracking Number: {trackingNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="text-lg font-semibold text-gray-900">{orderDetails.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">📦</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Current Status</h3>
                    <p className="text-blue-600 font-medium">{orderDetails.status}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">📍</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Current Location</h3>
                    <p className="text-green-600 font-medium">{orderDetails.currentLocation}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl">🚚</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Courier</h3>
                    <p className="text-purple-600 font-medium">{orderDetails.courier}</p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Tracking Timeline</h2>
                
                <div className="space-y-6">
                  {orderDetails.trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === 'completed' ? 'bg-green-100' :
                        step.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <span className="text-lg">{getStepIcon(step.status)}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`font-semibold ${
                            step.status === 'completed' ? 'text-green-600' :
                            step.status === 'active' ? 'text-blue-600' : 'text-gray-400'
                          }`}>
                            {step.step}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStepColor(step.status)}`}>
                            {step.status === 'completed' ? 'Completed' :
                             step.status === 'active' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                        
                        {step.date && (
                          <p className="text-sm text-gray-600 mb-1">
                            {step.date} at {step.time}
                          </p>
                        )}
                        
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courier Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Courier Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Courier Details</h3>
                    <p className="text-gray-600">Courier: {orderDetails.courier}</p>
                    <p className="text-gray-600">Tracking ID: {orderDetails.courierTracking}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <p className="text-gray-600">Customer Support: +91 99999 99999</p>
                    <p className="text-gray-600">Email: support@divyanshushop.com</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/"
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-200 text-center"
                >
                  Continue Shopping
                </Link>
                <Link 
                  href="/profile"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-200 text-center"
                >
                  View All Orders
                </Link>
                <button 
                  onClick={() => window.print()}
                  className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:scale-105 transition-all duration-200"
                >
                  Print Tracking
                </button>
              </div>
            </div>
          )}

          {/* Help Section */}
          {!orderDetails && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📞</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                  <p className="text-sm text-gray-600">+91 99999 99999</p>
                  <p className="text-xs text-gray-500">Mon-Sat, 9AM-6PM</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">💬</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                  <p className="text-xs text-gray-500">Instant support</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📧</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                  <p className="text-sm text-gray-600">support@divyanshushop.com</p>
                  <p className="text-xs text-gray-500">Response within 24h</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 