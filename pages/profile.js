import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');
  
  // Mock order data - in a real app, this would come from an API
  const orders = [
    {
      id: 'ORD123456789',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2499,
      items: ['Smart Watch Pro', 'Wireless Headphones'],
      paymentMethod: 'Online Payment',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'COD987654321',
      date: '2024-01-10',
      status: 'In Transit',
      total: 1899,
      items: ['Bluetooth Speaker'],
      paymentMethod: 'Cash on Delivery',
      trackingNumber: 'TRK987654321'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return '✅';
      case 'In Transit': return '🚚';
      case 'Processing': return '⏳';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Account</h1>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'orders'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                📦 My Orders
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                👤 Profile
              </button>
            </div>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                  <Link 
                    href="/"
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)} {order.status}
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            ₹{order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Items Ordered</h4>
                            <ul className="space-y-1">
                              {order.items.map((item, index) => (
                                <li key={index} className="text-sm text-gray-600">• {item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Order Details</h4>
                            <div className="space-y-1 text-sm">
                              <p className="text-gray-600">
                                <span className="font-medium">Payment:</span> {order.paymentMethod}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Tracking:</span> {order.trackingNumber}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Track Order
                          </button>
                          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                            View Details
                          </button>
                          {order.status === 'Delivered' && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      rows={3}
                      defaultValue="123 Main Street, City, State 123456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold">
                    Update Profile
                  </button>
                </div>
              </div>

              {/* Account Actions */}
              <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    🔐 Change Password
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    📧 Email Preferences
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    🗑️ Delete Account
                  </button>
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