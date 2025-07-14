import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ThankYou() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState({
    orderId: 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

  useEffect(() => {
    // You can fetch order details from URL params or localStorage here
    const { orderId } = router.query;
    if (orderId) {
      setOrderDetails(prev => ({ ...prev, orderId }));
    }
  }, [router.query]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
            <p className="text-xl text-gray-600">Your payment has been processed successfully.</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold text-gray-900">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold text-gray-900">{new Date().toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="font-semibold text-green-600">Paid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status:</span>
                    <span className="font-semibold text-blue-600">Processing</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-semibold text-gray-900">{orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Method:</span>
                    <span className="font-semibold text-gray-900">Standard Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking:</span>
                    <span className="font-semibold text-blue-600">Will be available soon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📧</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Confirmation</h4>
                  <p className="text-sm text-gray-600">You'll receive an email confirmation shortly</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
                  <p className="text-sm text-gray-600">We'll start processing your order immediately</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Updates</h4>
                  <p className="text-sm text-gray-600">Track your order with the tracking number</p>
                </div>
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
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:scale-105 transition-all duration-200 text-center"
            >
              View Orders
            </Link>
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-200"
            >
              Print Receipt
            </button>
          </div>

          {/* Customer Support */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Need Help?</h3>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
