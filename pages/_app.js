import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import { SearchProvider } from '../context/SearchContext';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <SearchProvider>
        <Navbar />
        <Component {...pageProps} />
      </SearchProvider>
    </CartProvider>
  );
}