import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const accountOptions = [
  { label: 'Profile', href: '/profile' },
  { label: 'Orders', href: '/orders' },
  { label: 'Bank Details', href: '/bank' },
  { label: 'Gift Cards', href: '/gift-cards' },
];

export default function Account() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-6">Your Account</h1>
          <ul className="w-full flex flex-col gap-4">
            {accountOptions.map((opt) => (
              <li key={opt.label}>
                <a
                  href={opt.href}
                  className="block w-full px-6 py-3 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold text-lg text-center transition"
                >
                  {opt.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
} 