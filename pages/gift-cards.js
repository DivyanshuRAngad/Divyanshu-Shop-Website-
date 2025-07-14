import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartPopup from '../components/CartPopup';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function GiftCards() {
  const { dispatch } = useCart();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const giftCardOptions = [
    {
      id: 'gc-500',
      amount: 500,
      title: '₹500 Gift Card',
      description: 'Perfect for small treats and accessories',
      validity: '1 year',
      color: 'pink',
      popular: false
    },
    {
      id: 'gc-1000',
      amount: 1000,
      title: '₹1,000 Gift Card',
      description: 'Great for gadgets and electronics',
      validity: '1 year',
      color: 'blue',
      popular: true
    },
    {
      id: 'gc-2000',
      amount: 2000,
      title: '₹2,000 Gift Card',
      description: 'Ideal for premium products',
      validity: '1 year',
      color: 'green',
      popular: false
    },
    {
      id: 'gc-5000',
      amount: 5000,
      title: '₹5,000 Gift Card',
      description: 'Perfect for high-end electronics',
      validity: '1 year',
      color: 'purple',
      popular: false
    },
    {
      id: 'gc-10000',
      amount: 10000,
      title: '₹10,000 Gift Card',
      description: 'Ultimate shopping experience',
      validity: '1 year',
      color: 'orange',
      popular: false
    },
    {
      id: 'gc-custom',
      amount: 'custom',
      title: 'Custom Amount',
      description: 'Choose your own amount (₹500 - ₹50,000)',
      validity: '1 year',
      color: 'yellow',
      popular: false
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      pink: 'bg-pink-100 border-pink-300 text-pink-700',
      blue: 'bg-blue-100 border-blue-300 text-blue-700',
      green: 'bg-green-100 border-green-300 text-green-700',
      purple: 'bg-purple-100 border-purple-300 text-purple-700',
      orange: 'bg-orange-100 border-orange-300 text-orange-700',
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-700'
    };
    return colorMap[color] || colorMap.pink;
  };

  const handleAddToCart = (giftCard) => {
    const cartItem = {
      id: giftCard.id,
      name: giftCard.title,
      price: giftCard.amount,
      discountedPrice: giftCard.amount,
      image: '/giftcardpreview.png',
      type: 'gift-card',
      validity: giftCard.validity
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    
    // Show popup
    setAddedProduct(cartItem);
    setShowPopup(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-700 mb-2 transition-colors duration-300 hover:text-blue-700 cursor-pointer">Gift Cards</h1>
            <p className="text-gray-700 text-lg">Give the perfect gift of choice to your loved ones!</p>
          </div>

          {/* Gift Card Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {giftCardOptions.map((giftCard) => (
              <div 
                key={giftCard.id} 
                className={`bg-white bg-opacity-90 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${getColorClasses(giftCard.color)} relative group cursor-pointer`}
                onClick={() => setSelectedAmount(giftCard.id)}
              >
                {giftCard.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6 text-center">
                  <div className="text-3xl mb-2">🎁</div>
                  <h3 className="text-xl font-bold mb-2">{giftCard.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{giftCard.description}</p>
                  <div className="text-xs text-gray-500 mb-4">Valid for {giftCard.validity} from purchase</div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(giftCard);
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Amount Section */}
          {selectedAmount === 'gc-custom' && (
            <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold text-pink-700 mb-4 text-center">Custom Gift Card Amount</h3>
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter Amount (₹)</label>
                  <input 
                    type="number" 
                    min="500" 
                    max="50000" 
                    placeholder="Enter amount between ₹500 - ₹50,000"
                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg w-full">
                  Add Custom Gift Card to Cart
                </button>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-pink-700 mb-6 text-center">Why Choose Our Gift Cards?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-2">Flexible Choice</h4>
                <p className="text-sm text-gray-600">Recipients can choose from thousands of products</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">⏰</div>
                <h4 className="font-semibold text-gray-800 mb-2">1 Year Validity</h4>
                <p className="text-sm text-gray-600">Plenty of time to find the perfect item</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🚚</div>
                <h4 className="font-semibold text-gray-800 mb-2">Instant Delivery</h4>
                <p className="text-sm text-gray-600">Digital gift cards delivered instantly via email</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-pink-700 mb-6 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">1️⃣</div>
                <h4 className="font-semibold text-gray-800 mb-2">Choose Amount</h4>
                <p className="text-sm text-gray-600">Select from our range or create custom amount</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">2️⃣</div>
                <h4 className="font-semibold text-gray-800 mb-2">Add to Cart</h4>
                <p className="text-sm text-gray-600">Add gift card to your shopping cart</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">3️⃣</div>
                <h4 className="font-semibold text-gray-800 mb-2">Complete Purchase</h4>
                <p className="text-sm text-gray-600">Checkout and receive digital gift card</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">4️⃣</div>
                <h4 className="font-semibold text-gray-800 mb-2">Share & Enjoy</h4>
                <p className="text-sm text-gray-600">Share with loved ones to use on any product</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
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