import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import { useCart } from '../context/CartContext';
import { getCategories } from '../firebase/db';

function Siderbar({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    getCategories().then((cats) => setCategories(cats));
  }, []);

  return (
    <aside className={`
      fixed md:relative inset-y-0 left-0 z-40
      flex flex-col justify-between
      bg-[#080808] border-r border-blue-900
      w-64 md:w-56 h-full shrink-0
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Botón cerrar solo en mobile */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
        aria-label="Cerrar menú"
      >
        ✕
      </button>

      <header className="px-5 pt-6 pb-4 border-b border-blue-900">
        <h1 className="text-xl font-bold text-[#0066FF] tracking-wide">SetupPro</h1>
        <p className="text-gray-500 text-xs mt-1">premium tech store</p>
      </header>

      <nav className="flex-1 px-4 py-5">
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-2 text-white px-3 py-2 rounded-lg hover:bg-blue-900/30 hover:text-[#0066FF] transition-colors"
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full flex items-center gap-2 text-white px-3 py-2 rounded-lg hover:bg-blue-900/30 hover:text-[#0066FF] transition-colors"
            >
              📂 Categorías
              <span className="ml-auto text-xs text-gray-500">{showCategories ? '▲' : '▼'}</span>
            </button>
          </li>
          <Categories categories={categories} showCategories={showCategories} onClose={onClose} />
          <li>
            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center gap-2 text-white px-3 py-2 rounded-lg hover:bg-blue-900/30 hover:text-[#0066FF] transition-colors"
            >
              🛒 Carrito
              <span className="ml-auto bg-[#0066FF] text-white text-xs rounded-full px-2 py-0.5">
                {getTotalItems()}
              </span>
            </Link>
          </li>
          <li>
            <span className="flex items-center gap-2 text-gray-400 px-3 py-2 cursor-default text-sm">
              ✨ Nuevos ingresos
            </span>
          </li>
          <li>
            <span className="flex items-center gap-2 text-gray-400 px-3 py-2 cursor-default text-sm">
              📦 Mi orden
            </span>
          </li>
          <li>
            <span className="flex items-center gap-2 text-gray-400 px-3 py-2 cursor-default text-sm">
              👤 Mi perfil
            </span>
          </li>
        </ul>
      </nav>

      <div className="px-5 pb-6">
        <button className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          iniciar sesión
        </button>
        <button className="w-full mt-3 bg-[#111] border border-blue-800 hover:border-[#0066FF] text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          registrarse
        </button>
      </div>
    </aside>
  );
}
export default Siderbar;