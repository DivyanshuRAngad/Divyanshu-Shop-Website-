import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Bank() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Bank Details</h1>
          <div className="w-full flex flex-col gap-2 mb-6">
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Account Holder:</span>
              <span>Divyanshu Rangad</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Account No.:</span>
              <span>XXXX-XXXX-1234</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">IFSC:</span>
              <span>SBIN0001234</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-semibold">Bank Name:</span>
              <span>State Bank of India</span>
            </div>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition">Edit Bank Info</button>
        </div>
      </main>
      <Footer />
    </>
  );
} 