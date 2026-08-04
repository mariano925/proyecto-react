import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // accede al carrito global sin recibir props

// ItemDetail es HIJO de ItemDetailContainer
// Recibe "producto" como prop (un objeto con los campos de Firebase)
// Tiene su propio estado local (cantidad, agregado) que no comparte con nadie
function ItemDetail({ Producto }) {
  // cantidad: estado local para el selector +/-; no necesita subir al padre
  const [cantidad, setCantidad] = useState(1);
  // agregado: cambia el boton por un link a "/cart" luego de hacer click
  const [agregado, setAgregado] = useState(false);
  // addToCart viene del contexto global; guarda el producto en el carrito compartido
  const { addToCart } = useCart();

  const restar = () => setCantidad((prev) => Math.max(1, prev - 1));
  const sumar = () => setCantidad((prev) => prev + 1);

  const handleAgregar = () => {
    // Le manda el objeto producto completo + cantidad al CartContext
    addToCart(Producto, cantidad);
    setAgregado(true);
  };

  return (
    <div className="w-full bg-black min-h-screen overflow-y-auto p-5 md:p-8 text-white flex flex-col gap-4 max-w-xl mx-auto">
      <Link to="/" className="text-[#0066FF] hover:text-blue-400 transition-colors text-sm">← Volver a productos</Link>

      <img src={Producto.img} alt={Producto.name} className="w-full max-w-xs h-56 object-cover rounded-xl border border-blue-900" />
      <h2 className="text-2xl font-bold">{Producto.name}</h2>
      <p className="text-gray-300 text-sm">{Producto.description}</p>
      <p className="text-[#0066FF] font-bold text-2xl">${Producto.price}</p>
      <p className="text-gray-500 text-xs uppercase tracking-wide">{Producto.Category}</p>

      {agregado ? (
        <Link to="/cart" className="bg-[#0066FF] hover:bg-blue-700 px-4 py-2 rounded-lg text-center font-semibold transition-colors">
          Ver carrito
        </Link>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <button onClick={restar} className="bg-[#111] border border-blue-800 hover:border-[#0066FF] text-white w-9 h-9 rounded-lg text-lg transition-colors">-</button>
            <span className="text-white font-bold text-lg w-6 text-center">{cantidad}</span>
            <button onClick={sumar} className="bg-[#111] border border-blue-800 hover:border-[#0066FF] text-white w-9 h-9 rounded-lg text-lg transition-colors">+</button>
          </div>
          <button onClick={handleAgregar} className="bg-[#0066FF] hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold w-fit transition-colors">
            Agregar al carrito
          </button>
        </>
      )}
    </div>
  );
}

export default ItemDetail;
