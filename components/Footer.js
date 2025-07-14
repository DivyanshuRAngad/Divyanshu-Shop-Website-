import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white py-8 mt-6 border-t border-pink-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <Link href="/know-us-better" className="font-semibold text-pink-700 hover:text-blue-600">Know us better</Link>
          </div>
          <div>
            <span className="font-semibold text-pink-700">Connect with us</span>
            <div className="flex flex-row items-center justify-center md:justify-start mt-2 space-x-4">
              <a href="mailto:info@divyanshushop.com" aria-label="Email" className="hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.876 1.797l-7.5 5.625a2.25 2.25 0 01-2.748 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75" />
                </svg>
              </a>
              <Link href="/connect-facebook" aria-label="Facebook" className="hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692V11.01h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </Link>
              <Link href="/connect-instagram" aria-label="Instagram" className="hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-pink-500">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.388 3.678 1.37c-.98.98-1.24 2.092-1.298 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.613.058 1.281.318 2.393 1.298 3.373.98.98 2.092 1.24 3.373 1.298C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.318 3.373-1.298.98-.98 1.24-2.092 1.298-3.373.058-1.281.07-1.69.07-7.613 0-5.923-.012-6.332-.07-7.613-.058-1.281-.318-2.393-1.298-3.373-.98-.98-2.092-1.24-3.373-1.298C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <Link href="/become-a-seller" className="font-semibold text-pink-700 hover:text-blue-600">Become a seller</Link>
          </div>
          <div>
            <Link href="/terms-and-conditions" className="font-semibold text-pink-700 hover:text-blue-600">Terms & Conditions</Link>
          </div>
        </div>
        <div className="border-t border-pink-200 mt-8 pt-4 text-center">
          <Link href="/" className="text-lg font-bold text-pink-700 hover:text-blue-600">Divyanshu Shop</Link>
          <p className="text-sm text-gray-500 mt-1">&copy; 2025 Divyanshu Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}