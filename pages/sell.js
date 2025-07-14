import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Sell() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productCondition, setProductCondition] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const categories = [
    'Smart Watches',
    'Headphones & Audio',
    'Speakers & Sound Systems',
    'Computers & Laptops',
    'Mobile Phones',
    'Gaming & Accessories',
    'Cameras & Photography',
    'Other'
  ];

  const conditions = [
    'Brand New',
    'Like New',
    'Excellent',
    'Good',
    'Fair',
    'Used'
  ];

  const paymentMethods = [
    'Cash on Delivery',
    'Online Payment',
    'Bank Transfer',
    'Both'
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 py-12 px-4 mt-20">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-700 mb-2 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Sell on Divyanshu Shop</h1>
            <p className="text-gray-700 text-lg">List your product and reach thousands of customers instantly!</p>
          </div>

          {/* Main Form */}
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
            <form className="space-y-6">
              {/* Basic Information Section */}
              <div className="border-b border-pink-200 pb-6">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
                  <span>📝</span>
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter product name" 
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <input 
                      type="text" 
                      placeholder="Enter brand name" 
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200" 
                    />
                  </div>
                </div>
              </div>

              {/* Category & Condition Section */}
              <div className="border-b border-pink-200 pb-6">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
                  <span>🏷️</span>
                  Category & Condition
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Condition *</label>
                    <select 
                      value={productCondition}
                      onChange={(e) => setProductCondition(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select condition</option>
                      {conditions.map((condition) => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-b border-pink-200 pb-6">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
                  <span>💰</span>
                  Pricing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                    <input 
                      type="number" 
                      placeholder="Enter price" 
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                    <input 
                      type="number" 
                      placeholder="Original price if applicable" 
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200" 
                    />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="border-b border-pink-200 pb-6">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
                  <span>📄</span>
                  Description
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Description *</label>
                  <textarea 
                    placeholder="Describe your product in detail..." 
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 resize-none" 
                    required
                  ></textarea>
                </div>
              </div>

              {/* Images Section */}
              <div className="border-b border-pink-200 pb-6">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
                  <span>📸</span>
                  Product Images
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images *</label>
                  <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors duration-200">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                    <input type="file" multiple accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              {/* Payment & Shipping Section */}
              <div className="border-b border-pink-200 pb-6">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
                  <span>🚚</span>
                  Payment & Shipping
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select payment method</option>
                      {paymentMethods.map((method) => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Cost (₹)</label>
                    <input 
                      type="number" 
                      placeholder="Enter shipping cost" 
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200" 
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-b border-pink-200 pb-6">
                <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center gap-2">
                  <span>📞</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="Enter phone number" 
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter email address" 
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200" 
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button 
                  type="submit" 
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
                >
                  <span>🚀</span>
                  List Product
                </button>
              </div>
          </form>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">Why Sell with Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👥</div>
                <h4 className="font-semibold text-gray-800 mb-2">Large Customer Base</h4>
                <p className="text-sm text-gray-600">Reach thousands of potential buyers</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-semibold text-gray-800 mb-2">No Commission</h4>
                <p className="text-sm text-gray-600">Keep 100% of your earnings</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold text-gray-800 mb-2">Quick Listing</h4>
                <p className="text-sm text-gray-600">List your product in minutes</p>
              </div>
            </div>
          </div>

          {/* Seller Guidelines & Tips */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">Seller Guidelines & Tips</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide clear, high-quality product images from multiple angles.</li>
              <li>Write detailed and honest product descriptions.</li>
              <li>Set a competitive price based on product condition and market value.</li>
              <li>Respond promptly to buyer inquiries for better ratings.</li>
              <li>Ship products quickly and securely to ensure customer satisfaction.</li>
            </ul>
          </div>

          {/* FAQ for Sellers */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">How do I get paid?</h4>
                <p className="text-sm text-gray-600">You can choose your preferred payment method in the form above. Payments are processed securely after a successful sale.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Are there any fees or commissions?</h4>
                <p className="text-sm text-gray-600">No, you keep 100% of your earnings. There are no hidden fees or commissions.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">What products can I sell?</h4>
                <p className="text-sm text-gray-600">You can sell electronics, accessories, gadgets, and more. Please ensure your products comply with our terms and conditions.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">How do I handle returns?</h4>
                <p className="text-sm text-gray-600">We offer a 7-day return policy for buyers. Please ensure your product is as described to avoid returns.</p>
              </div>
            </div>
          </div>

          {/* Seller Support/Contact */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-2">Our seller support team is here to help you with any questions or issues.</p>
              <p className="text-sm text-gray-600">Email: <a href="mailto:support@divyanshushop.com" className="text-blue-600 underline">support@divyanshushop.com</a></p>
              <p className="text-sm text-gray-600">Phone: <a href="tel:+911234567890" className="text-blue-600 underline">+91 12345 67890</a></p>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="text-5xl mb-2">🤝</div>
              <span className="text-gray-600">We're here for you!</span>
            </div>
          </div>

          {/* Success Stories/Testimonials */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">Seller Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-pink-50 rounded-lg p-4 shadow flex flex-col items-center">
                <div className="text-3xl mb-2">🌟</div>
                <p className="text-gray-700 italic mb-2">"I sold my old laptop in just 2 days! The process was smooth and hassle-free."</p>
                <span className="font-semibold text-pink-700">- Priya S.</span>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 shadow flex flex-col items-center">
                <div className="text-3xl mb-2">🌟</div>
                <p className="text-gray-700 italic mb-2">"Great platform for selling gadgets. I got the best price for my headphones."</p>
                <span className="font-semibold text-pink-700">- Amit R.</span>
              </div>
            </div>
          </div>

          {/* Security & Trust Information */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">Security & Trust</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-800 mb-2">Secure Payments</h4>
                <p className="text-sm text-gray-600">All transactions are encrypted and secure.</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✅</div>
                <h4 className="font-semibold text-gray-800 mb-2">Verified Sellers</h4>
                <p className="text-sm text-gray-600">We verify all sellers for a safe marketplace.</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🛡️</div>
                <h4 className="font-semibold text-gray-800 mb-2">Buyer Protection</h4>
                <p className="text-sm text-gray-600">Buyers are protected with our return policy.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 