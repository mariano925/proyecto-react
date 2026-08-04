import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Siderbar from "./components/siderbar";
import Main from "./components/Main";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import ItemListContainer from "./components/ItemListcontainer";
import { useCart } from "./context/CartContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Overlay oscuro en mobile cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Siderbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Barra superior solo en mobile */}
        <div className="md:hidden flex items-center justify-between bg-black border-b border-blue-800 px-4 py-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-1"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-white font-bold text-lg tracking-wide">SetupPro</span>
          <Link to="/cart" className="text-white text-xl relative">
            🛒
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#0066FF] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
