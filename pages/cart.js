'use client';
import { useCart } from '../context/CartContext';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

export default function CartPage() {
  const { cartItems, dispatch } = useCart();
  const router = useRouter();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleQuantityChange = (id, action) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, action } });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  const proceedToPayment = () => {
    router.push('/payment');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <br/>
      <br/>
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6 max-w-4xl mx-auto">
            {cartItems.map((item, i) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl p-4 shadow border-t-4 ${i%4===0?'border-pink-400':i%4===1?'border-blue-400':i%4===2?'border-green-400':'border-yellow-400'} transition-shadow transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]`}
              >
                {/* Product Image */}
                <div className="w-24 h-24 relative shrink-0 overflow-hidden">
                  <div className="transition-transform transition duration-200 hover:scale-105 hover:brightness-110">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 sm:px-4 w-full">
                  <h2 className="text-lg font-semibold text-pink-700 transition-colors duration-200 hover:text-blue-600 cursor-pointer">
                    {item.name}
                  </h2>
                  <div className="text-sm text-gray-500">
                    ₹{item.discountedPrice.toLocaleString()} × {item.quantity}
                  </div>
                  <div className="text-md font-medium text-green-600">
                    Subtotal: ₹{(item.discountedPrice * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 hover:scale-110 transition-all duration-150"
                  >
                    -
                  </button>
                  <span className="text-lg text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 hover:scale-110 transition-all duration-150"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 text-sm mt-2 sm:mt-0 hover:text-red-700 hover:underline transition-colors duration-150"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total & Payment Options */}
          <div className="mt-10 text-center">
            <p className="text-2xl font-bold text-green-700 mb-6">
              Grand Total: ₹{total.toLocaleString()}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={proceedToPayment}
                className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
                <span>💳</span>
                Pay Online
              </button>
              
              <button
                onClick={() => router.push('/cod-payment')}
                className="px-8 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 hover:scale-105 hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <span>💰</span>
                Cash on Delivery
            </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              Choose your preferred payment method
            </p>
          </div>
        </>
      )}
    </div>
  );
}
