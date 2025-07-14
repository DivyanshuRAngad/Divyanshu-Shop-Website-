import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const orders = [
  { id: 'ORD1234', date: '2024-05-10', status: 'Delivered', total: 2999 },
  { id: 'ORD1235', date: '2024-05-12', status: 'Shipped', total: 1499 },
];

export default function Orders() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-200 to-pink-400 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Recent Orders</h1>
          <table className="w-full text-left mb-4">
            <thead>
              <tr className="text-pink-700">
                <th className="py-2">Order ID</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="py-2 font-semibold">{order.id}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>{order.status}</span>
                  </td>
                  <td className="py-2">₹{order.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
} 