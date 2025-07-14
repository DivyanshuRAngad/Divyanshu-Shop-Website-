import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Terms & Conditions</h1>
          <ul className="text-gray-700 text-sm list-disc pl-6 space-y-2 mb-4">
             <h2 className="text-3x3 font-bold align text-center text-pink-700 mb-6">Welcome to Divyanshu Shop ❤️</h2> 
            <p className="py-3 text-black-700"> By accessing or using our website, you agree to be bound by the following terms and conditions. All purchases made through our platform are subject to product availability and confirmation of the order price. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities, inaccuracies in product or pricing information, or issues identified by our fraud prevention team. All content on this site, including text, graphics, and images, is the property of Divyanshu Shop and protected by intellectual property laws. By using this website, you agree not to reproduce, duplicate, copy, sell, or exploit any portion of the service without express written permission. We may update our terms from time to time; continued use of the site constitutes acceptance of any changes.</p>
            <li>All sales are final. No returns except for damaged or defective products.</li>
            <li>Orders are processed within 2 business days.</li>
            <li>Personal information is kept confidential and secure.</li>
            <li>By using this site, you agree to our privacy policy and terms.</li>
          </ul>
          <div className="text-xs text-gray-400">Last updated: May 2024</div>
        </div>
      </main>
      <Footer />
    </>
  );
} 