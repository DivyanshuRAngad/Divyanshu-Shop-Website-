import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/legacy/image';

export default function OrderConfirmation() {
  const router = useRouter();
  const { cartItems } = useCart();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    orderType: 'online', // 'online' or 'cod'
    orderDate: new Date().toLocaleDateString('en-IN'),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    customerInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      pincode: '400001',
      landmark: 'Near Central Park'
    },
    items: [],
    paymentMethod: 'Online Payment',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    subtotal: 6297,
    shipping: 0,
    tax: 1133.46,
    total: 7430.46,
    trackingNumber: 'TRK' + Date.now().toString().slice(-9)
  });

  useEffect(() => {
    // Get order details from URL params
    const { orderId, type } = router.query;
    if (orderId) {
      // Use cart items if available, otherwise use default items
      const items = cartItems.length > 0 ? cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.discountedPrice,
        quantity: item.quantity || 1,
        image: item.image
      })) : orderDetails.items;

      // Calculate totals
      const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const shipping = subtotal > 500 ? 0 : 100;
      const tax = subtotal * 0.18;
      const total = subtotal + shipping + tax;

      setOrderDetails(prev => ({
        ...prev,
        orderId,
        orderType: type || 'online',
        paymentMethod: type === 'cod' ? 'Cash on Delivery' : 'Online Payment',
        paymentStatus: type === 'cod' ? 'Pending (Pay on Delivery)' : 'Paid',
        orderId: type === 'cod' ? orderId : 'ORD' + orderId,
        items,
        subtotal,
        shipping,
        tax,
        total
      }));
    }
  }, [router.query, cartItems]);

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

  const getPaymentIcon = (method) => {
    return method === 'Cash on Delivery' ? '💰' : '💳';
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your order. We're preparing it for shipment.
            </p>
            <div className="mt-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(orderDetails.orderStatus)}`}>
                {getStatusIcon(orderDetails.orderStatus)} {orderDetails.orderStatus}
              </span>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order #{orderDetails.orderId}</h2>
                <p className="text-gray-600">
                  Placed on {orderDetails.orderDate} • {orderDetails.items.length} item{orderDetails.items.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{orderDetails.total.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">{getPaymentIcon(orderDetails.paymentMethod)}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item) => (
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
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{orderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{orderDetails.shipping === 0 ? 'Free' : `₹${orderDetails.shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{orderDetails.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                  <span>Total</span>
                  <span>₹{orderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{orderDetails.customerInfo.name}</p>
                  <p className="text-gray-600">{orderDetails.customerInfo.address}</p>
                  <p className="text-gray-600">{orderDetails.customerInfo.city}, {orderDetails.customerInfo.pincode}</p>
                  {orderDetails.customerInfo.landmark && (
                    <p className="text-gray-600">Landmark: {orderDetails.customerInfo.landmark}</p>
                  )}
                  <p className="text-gray-600 mt-2">📞 {orderDetails.customerInfo.phone}</p>
                  <p className="text-gray-600">📧 {orderDetails.customerInfo.email}</p>
                </div>
              </div>

              {/* Order Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold text-gray-900">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold text-gray-900">{orderDetails.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold text-gray-900">{orderDetails.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-semibold ${
                      orderDetails.paymentStatus.includes('Paid') ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {orderDetails.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-semibold text-gray-900">{orderDetails.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-semibold text-gray-900">{orderDetails.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">We're preparing your order for shipment</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping</h3>
                <p className="text-sm text-gray-600">Your order will be shipped within 24-48 hours</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Tracking</h3>
                <p className="text-sm text-gray-600">You'll receive tracking updates via SMS & email</p>
              </div>
            </div>

            {/* COD Specific Information */}
            {orderDetails.orderType === 'cod' && (
              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">Cash on Delivery Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-yellow-700">• Keep exact change ready: ₹{orderDetails.total.toLocaleString()}</p>
                    <p className="text-sm text-yellow-700">• Verify your order before payment</p>
                    <p className="text-sm text-yellow-700">• Delivery person will call 30 minutes before arrival</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-yellow-700">• Have a valid ID proof ready</p>
                    <p className="text-sm text-yellow-700">• You can refuse delivery if not satisfied</p>
                    <p className="text-sm text-yellow-700">• Payment is due only upon delivery</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 hover:scale-105 transition-all duration-200 text-center"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/track-order"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-200 text-center"
            >
              Track Order
            </Link>
            <button 
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            >
              Print Order
            </button>
          </div>

          {/* Customer Support */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h2>
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