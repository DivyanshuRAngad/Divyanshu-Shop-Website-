import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ConnectFacebook() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Connect with us on Facebook</h1>
          <p className="text-gray-700 mb-6 text-center">Stay updated and connect with our Facebook community!</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            Connect Facebook
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
} 