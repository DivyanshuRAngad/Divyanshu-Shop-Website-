'use client';
import { useRouter } from 'next/router';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import CartPopup from '../../components/CartPopup';
import Image from 'next/legacy/image';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { cartItems, dispatch } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));
  const pairItems = products.filter((p) => p.id !== Number(id)).slice(0, 4);

  if (!product) return <p className="p-8">Loading...</p>;

  const isInCart = cartItems.some((item) => item.id === product.id);
  
  const handleAdd = () => {
    const productWithQuantity = { ...product, quantity };
    dispatch({ type: 'ADD_TO_CART', payload: productWithQuantity });
    setAddedProduct({ ...product, type: 'electronics' });
    setShowPopup(true);
  };

  const handleBuyNow = () => {
    handleAdd();
    router.push('/cart');
  };

  // Mock product images for gallery
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  // Dynamic specifications based on product type
  const getSpecifications = (product) => {
    const baseSpecs = {
      "Brand": "Divyanshu Tech",
      "Model": product.name,
      "Warranty": "1 Year Manufacturer Warranty",
      "Country of Origin": "India",
      "Package Contents": `${product.name}, User Manual, Warranty Card`
    };

    // Product-specific specifications
    const productSpecs = {
      "Wireless Headphones": {
        "Color": "Black",
        "Connectivity": "Bluetooth 5.0",
        "Battery Life": "Up to 30 hours",
        "Charging Time": "2 hours",
        "Item Weight": "250 grams",
        "Noise Cancellation": "Active Noise Cancellation",
        "Package Contents": `${product.name}, Charging Cable, User Manual, Warranty Card, Carrying Case`
      },
      "Smart Watch": {
        "Color": "Black/Silver",
        "Connectivity": "Bluetooth 5.0, WiFi",
        "Battery Life": "Up to 7 days",
        "Charging Time": "2 hours",
        "Item Weight": "45 grams",
        "Water Resistance": "IP68",
        "Display": "1.4 inch AMOLED",
        "Package Contents": `${product.name}, Charging Cable, User Manual, Warranty Card`
      },
      "Bluetooth Speaker": {
        "Color": "Black",
        "Connectivity": "Bluetooth 5.0",
        "Battery Life": "Up to 12 hours",
        "Charging Time": "3 hours",
        "Item Weight": "500 grams",
        "Water Resistance": "IPX4",
        "Package Contents": `${product.name}, Charging Cable, User Manual, Warranty Card`
      },
      "Wireless Earphones": {
        "Color": "White",
        "Connectivity": "Bluetooth 5.0",
        "Battery Life": "Up to 6 hours (24 hours with case)",
        "Charging Time": "1.5 hours",
        "Item Weight": "5 grams each",
        "Water Resistance": "IPX4",
        "Package Contents": `${product.name}, Charging Case, USB-C Cable, User Manual, Warranty Card`
      },
      "Gaming Mouse": {
        "Color": "Black",
        "Connectivity": "USB 2.0",
        "Battery Life": "N/A (Wired)",
        "Charging Time": "N/A",
        "Item Weight": "95 grams",
        "DPI": "Up to 16,000",
        "RGB Lighting": "Yes",
        "Package Contents": `${product.name}, USB Cable, User Manual, Warranty Card`
      },
      "Wired Earphones": {
        "Color": "Black",
        "Connectivity": "3.5mm Jack",
        "Battery Life": "N/A (Wired)",
        "Charging Time": "N/A",
        "Item Weight": "15 grams",
        "Driver Size": "10mm",
        "Package Contents": `${product.name}, User Manual, Warranty Card`
      },
      "Mechanical Keyboard": {
        "Color": "Black",
        "Connectivity": "USB-C",
        "Battery Life": "N/A (Wired)",
        "Charging Time": "N/A",
        "Item Weight": "850 grams",
        "Switch Type": "Blue Mechanical",
        "RGB Lighting": "Yes",
        "Package Contents": `${product.name}, USB-C Cable, Keycap Puller, User Manual, Warranty Card`
      },
      "Laptop": {
        "Color": "Silver",
        "Connectivity": "WiFi 6, Bluetooth 5.0",
        "Battery Life": "Up to 8 hours",
        "Charging Time": "2 hours",
        "Item Weight": "1.8 kg",
        "Processor": "Intel Core i7",
        "RAM": "16GB DDR4",
        "Storage": "512GB SSD",
        "Package Contents": `${product.name}, Charger, User Manual, Warranty Card`
      },
      "Desktop": {
        "Color": "Black",
        "Connectivity": "WiFi 6, Bluetooth 5.0",
        "Battery Life": "N/A (Desktop)",
        "Charging Time": "N/A",
        "Item Weight": "8 kg",
        "Processor": "Intel Core i9",
        "RAM": "32GB DDR4",
        "Storage": "1TB SSD + 2TB HDD",
        "Graphics": "RTX 3070",
        "Package Contents": `${product.name}, Power Cable, User Manual, Warranty Card`
      },
      "Tech Accessories": {
        "Color": "Various",
        "Connectivity": "Various",
        "Battery Life": "N/A",
        "Charging Time": "N/A",
        "Item Weight": "100 grams",
        "Package Contents": `${product.name}, User Manual, Warranty Card`
      }
    };

    return { ...baseSpecs, ...productSpecs[product.name] };
  };

  const specifications = getSpecifications(product);

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: "Amit Kumar",
      rating: 5,
      title: "Excellent product!",
      comment: "Great quality and amazing sound. Highly recommended!",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      user: "Priya Sharma",
      rating: 4,
      title: "Good value for money",
      comment: "Good product but delivery took longer than expected.",
      date: "2024-01-10",
      verified: true
    },
    {
      id: 3,
      user: "Rahul Singh",
      rating: 5,
      title: "Perfect for daily use",
      comment: "Exactly what I was looking for. Great battery life!",
      date: "2024-01-08",
      verified: false
    }
  ];

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Pick 4 unique recommendations, excluding the current product
  function getRecommendations(currentId, count = 4) {
    const filtered = products.filter((p) => p.id !== Number(currentId));
    // Shuffle
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, count);
  }
  const recommendations = getRecommendations(id, 4);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-pink-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/fresh-deals" className="hover:text-pink-600">Electronics</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Main Product Section */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative w-full h-96 bg-white border rounded-lg overflow-hidden">
                  <Image 
                    src={productImages[selectedImage]} 
                    alt={product.name} 
                    layout="fill" 
                    objectFit="contain" 
                    className="p-4"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-full h-20 border-2 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                      }`}
                    >
                      <Image src={img} alt={`${product.name} ${index + 1}`} layout="fill" objectFit="contain" className="p-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">✓ Verified Purchase</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-gray-900">₹{product.discountedPrice.toLocaleString()}</span>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                      {Math.round((product.originalPrice - product.discountedPrice) / product.originalPrice * 100)}% OFF
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                  <p className="text-sm text-green-600 font-medium">Free delivery by Tomorrow</p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAdd}
                    disabled={isInCart}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      isInCart 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg'
                    }`}
                  >
                    {isInCart ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Delivery & Returns */}
                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Free Delivery</p>
                      <p className="text-sm text-gray-600">Get it by Tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">7-Day Replacement</p>
                      <p className="text-sm text-gray-600">Easy returns & exchanges</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">1 Year Warranty</p>
                      <p className="text-sm text-gray-600">Manufacturer warranty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description & Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Description */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>Premium build quality with durable materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>Advanced technology for superior performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>User-friendly design for easy operation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>Compatible with all major devices and platforms</span>
                </li>
              </ul>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
              <button className="text-pink-600 hover:text-pink-700 font-medium">Write a Review</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Based on {reviews.length} reviews</p>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">by {review.user}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified Purchase</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((item, i) => {
                const inCart = cartItems.some(ci => ci.id === item.id);
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <Link href={`/product/${item.id}`} className="block">
                      <div className="relative w-full h-32 mb-3 bg-gray-50 rounded overflow-hidden">
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="contain" className="p-2" />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">₹{item.discountedPrice.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        dispatch({ type: 'ADD_TO_CART', payload: item });
                        setAddedProduct({ ...item, type: 'electronics' });
                        setShowPopup(true);
                      }}
                      disabled={inCart}
                      className={`w-full py-2 px-4 rounded text-sm font-medium transition-all duration-200 ${
                        inCart 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                    >
                      {inCart ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cart Popup */}
      <CartPopup 
        isVisible={showPopup}
        product={addedProduct}
        onClose={() => setShowPopup(false)}
      />
      <Footer />
    </>
  );
}
