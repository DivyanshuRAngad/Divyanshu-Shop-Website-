import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const steps = [
  'Personal Info',
  'Business Details',
  'Verification',
  'Agreement',
];

export default function BecomeASeller() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    store: '',
    businessType: '',
    gst: '',
    logo: null,
    idProof: null,
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const nextStep = () => {
    setError('');
    // Simple validation for demo
    if (step === 0 && (!form.name || !form.email || !form.phone)) {
      setError('Please fill all personal details.');
      return;
    }
    if (step === 1 && (!form.store || !form.businessType)) {
      setError('Please fill all business details.');
      return;
    }
    if (step === 2 && (!form.logo || !form.idProof)) {
      setError('Please upload required documents.');
      return;
    }
    if (step === 3 && !form.agree) {
      setError('You must agree to the terms.');
      return;
    }
    setStep((s) => s + 1);
  };
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setStep(0), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center py-12 px-4 mt-10">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-lg w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-2">Become a Seller</h1>
          <p className="text-gray-700 mb-6 text-center">Join our platform and start selling to thousands of customers. Complete the steps below to get started!</p>

          {/* Progress Bar */}
          <div className="w-full flex items-center mb-8">
            {steps.map((label, i) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white mb-1 transition-all duration-300 ${step >= i ? 'bg-pink-500' : 'bg-pink-200'}`}>{i + 1}</div>
                <span className={`text-xs text-center ${step >= i ? 'text-pink-700' : 'text-gray-400'}`}>{label}</span>
              </div>
            ))}
          </div>

          {/* Multi-step Form */}
          {!submitted ? (
            <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
              {step === 0 && (
                <div className="space-y-4 animate-fade-in">
                  <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Name*" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address*" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone Number*" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                </div>
              )}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <input name="store" value={form.store} onChange={handleChange} type="text" placeholder="Store Name*" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  <input name="businessType" value={form.businessType} onChange={handleChange} type="text" placeholder="Business Type (e.g. Individual, Pvt Ltd)*" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  <input name="gst" value={form.gst} onChange={handleChange} type="text" placeholder="GST Number (optional)" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Business Logo *</label>
                    <input name="logo" onChange={handleChange} type="file" accept="image/*" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID Proof *</label>
                    <input name="idProof" onChange={handleChange} type="file" accept="image/*,application/pdf" className="w-full px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white" />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-start gap-2">
                    <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="mt-1" />
                    <span className="text-sm text-gray-700">I agree to the <a href="/terms-and-conditions" className="text-pink-600 underline">terms and conditions</a> and confirm all information is correct.</span>
                  </div>
                </div>
              )}
              {error && <div className="text-red-500 text-sm text-center animate-shake">{error}</div>}
              <div className="flex gap-4 justify-between mt-2">
                {step > 0 && <button type="button" onClick={prevStep} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Back</button>}
                {step < steps.length - 1 && <button type="button" onClick={nextStep} className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">Next</button>}
                {step === steps.length - 1 && <button type="submit" className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">Submit</button>}
              </div>
            </form>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-pink-700 mb-2">Application Submitted!</h2>
              <p className="text-gray-700 mb-4">Thank you for applying to become a seller. Our team will review your application and contact you soon.</p>
              <a href="/sell" className="text-blue-600 underline">Go to Seller Dashboard</a>
            </div>
          )}

          {/* Seller Benefits */}
          <div className="mt-8 bg-pink-50 rounded-xl shadow p-6 w-full">
            <h3 className="text-lg font-semibold text-pink-700 mb-3 text-center">Why Join as a Seller?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <div className="font-semibold text-gray-800 mb-1">Grow Your Business</div>
                <div className="text-sm text-gray-600">Access a large customer base and boost your sales.</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💸</div>
                <div className="font-semibold text-gray-800 mb-1">No Hidden Fees</div>
                <div className="text-sm text-gray-600">Enjoy 0% commission and transparent policies.</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📦</div>
                <div className="font-semibold text-gray-800 mb-1">Easy Logistics</div>
                <div className="text-sm text-gray-600">We help you with shipping and returns.</div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-xl shadow p-6 w-full">
            <h3 className="text-lg font-semibold text-pink-700 mb-3 text-center">What Our Sellers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-pink-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-2xl mb-2">🌟</div>
                <div className="italic text-gray-700 mb-2">"The onboarding was so easy and the support team is great!"</div>
                <div className="font-semibold text-pink-700">- Rakesh</div>
              </div>
              <div className="bg-pink-100 rounded-lg p-4 flex flex-col items-center">
                <div className="text-2xl mb-2">🌟</div>
                <div className="italic text-gray-700 mb-2">"I started selling in just one day. Highly recommended!"</div>
                <div className="font-semibold text-pink-700">- Priya</div>
              </div>
            </div>
          </div>

          {/* FAQ & Support */}
          <div className="mt-8 bg-white bg-opacity-90 rounded-xl shadow p-6 w-full">
            <h3 className="text-lg font-semibold text-pink-700 mb-3 text-center">Need Help?</h3>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-gray-800">How long does approval take?</span>
                <span className="text-gray-600 block text-sm">Usually within 24-48 hours after submission.</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Can I update my details later?</span>
                <span className="text-gray-600 block text-sm">Yes, you can edit your profile from your seller dashboard.</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Still have questions?</span>
                <span className="text-gray-600 block text-sm">Contact our support: <a href="mailto:support@divyanshushop.com" className="text-blue-600 underline">support@divyanshushop.com</a></span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 