import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ConnectInstagram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Connect with us on Instagram</h1>
          <p className="text-gray-700 mb-6 text-center">Follow us on Instagram for the latest updates and offers!</p>
          <button className="bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25 1.25a1 1 0 1 1 0 2a1 1 0 0 1 0-2z"/></svg>
            Connect Instagram
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
} 