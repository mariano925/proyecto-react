import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

function Cart() {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  // Guardamos el total al abrir el checkout para que persista cuando el carrito se vacíe
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const handleOpenCheckout = () => {
    setCheckoutTotal(getTotalPrice());
    setShowCheckout(true);
  };

  return (
    <>
      {/* Siempre montado cuando está abierto, independiente del estado del carrito */}
      {showCheckout && (
        <CheckoutForm onClose={() => setShowCheckout(false)} total={checkoutTotal} />
      )}

      {cart.length === 0 ? (
        <div className="w-full bg-black min-h-screen p-6 md:p-10 text-white flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Mi carrito</h2>
          <p className="text-gray-400">Tu carrito está vacío</p>
          <Link to="/" className="text-[#0066FF] hover:text-blue-400 transition-colors">→ Ir a comprar</Link>
        </div>
      ) : (
        <div className="w-full bg-black min-h-screen overflow-y-auto p-5 md:p-8 text-white flex flex-col gap-4">
          <h2 className="text-2xl font-bold border-b border-blue-900 pb-3">Mi carrito</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-[#0A0A0A] border border-blue-900 rounded-xl p-3">
              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{item.name}</p>
                <p className="text-gray-400 text-sm">Cantidad: {item.cantidad}</p>
              </div>
              <p className="text-[#0066FF] font-bold shrink-0">${(item.price || item.price) * item.cantidad}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-700 hover:bg-red-600 px-2 py-1 rounded-lg text-sm transition-colors shrink-0"
              >
                Quitar
              </button>
            </div>
          ))}

          <p className="text-xl font-bold border-t border-blue-900 pt-3">
            Total: <span className="text-[#0066FF]">${getTotalPrice()}</span>
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={clearCart}
              className="bg-[#111] border border-blue-800 hover:border-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Vaciar carrito
            </button>
            <Link
              to="/"
              className="bg-[#111] border border-blue-800 hover:border-[#0066FF] text-white px-4 py-2 rounded-lg font-semibold flex items-center transition-colors"
            >
              Seguir comprando
            </Link>
            <button
              onClick={handleOpenCheckout}
              className="bg-[#0066FF] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
