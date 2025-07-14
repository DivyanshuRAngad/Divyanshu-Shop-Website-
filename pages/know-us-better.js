import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function KnowUsBetter() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Know Us Better</h1>
          <p className="text-gray-700 mb-6 text-center">We are passionate about delivering the best products and experiences to our customers. Our mission is to make online shopping delightful, easy, and trustworthy for everyone.</p>
          <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
            <div className="flex-1 bg-pink-50 rounded-lg p-4 text-center">
              <div className="font-bold text-pink-600 text-lg mb-2">Our Values</div>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>✔️ Customer First</li>
                <li>✔️ Quality Products</li>
                <li>✔️ Fast Delivery</li>
                <li>✔️ Secure Payments</li>
              </ul>
            </div>
            <div className="flex-1 bg-pink-50 rounded-lg p-4 text-center">
              <div className="font-bold text-pink-600 text-lg mb-2">Contact Us</div>
              <div className="text-gray-600 text-sm">Email: support@divyanshushop.com<br/>Phone: +91 99999 99999</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 