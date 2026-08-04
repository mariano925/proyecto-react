import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const INITIAL_FORM = { nombre: '', email: '', direccion: '', confirmacion: '' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CheckoutForm({ onClose, total }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [compraExitosa, setCompraExitosa] = useState(false);

  // Limpia el carrito y redirige a home 3.5s después de confirmar
  useEffect(() => {
    if (!compraExitosa) return;
    const timer = setTimeout(() => { clearCart(); navigate('/'); }, 3500);
    return () => clearTimeout(timer);
  }, [compraExitosa, navigate, clearCart]);

  const validate = () => {
    const newErrors = {};
    if (form.nombre.trim().length < 3)
      newErrors.nombre = 'Ingresá tu nombre completo (mínimo 3 caracteres).';
    if (!EMAIL_REGEX.test(form.email.trim()))
      newErrors.email = 'Ingresá un email válido.';
    if (form.direccion.trim().length < 5)
      newErrors.direccion = 'Ingresá una dirección válida.';
    if (form.confirmacion.trim().toUpperCase() !== 'CONFIRMAR')
      newErrors.confirmacion = 'Escribí exactamente CONFIRMAR para continuar.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit input length to prevent oversized payloads
    const maxLengths = { nombre: 80, email: 100, direccion: 150, confirmacion: 10 };
    if (value.length > maxLengths[name]) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setCompraExitosa(true);
  };

  if (compraExitosa) {
    return (
      // Toast fijo en la parte superior central, slide-down animado
      <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center">
        <div className="animate-slide-down pointer-events-auto mt-6 mx-4 w-full max-w-sm bg-[#0A0A0A] border border-[#0066FF] rounded-2xl shadow-2xl shadow-blue-900/50 overflow-hidden">
          {/* Barra de progreso que se encoge en 3.5s */}
          <div className="h-1 bg-[#0066FF] animate-shrink-bar" />

          <div className="flex items-start gap-4 p-5">
            {/* Ícono con ring pulsante */}
            <div className="shrink-0 w-11 h-11 rounded-full bg-blue-900/40 border border-[#0066FF] flex items-center justify-center text-xl animate-pulse">
              ✅
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base leading-tight">¡Compra completada!</p>
              <p className="text-gray-400 text-sm mt-1 truncate">
                Gracias, <span className="text-white font-medium">{form.nombre.trim()}</span>
              </p>
              <p className="text-[#0066FF] font-bold text-sm mt-0.5">Total pagado: ${total}</p>
              <p className="text-gray-500 text-xs mt-1">Redirigiendo a la tienda…</p>
            </div>

            <button
              onClick={() => navigate('/')}
              className="shrink-0 text-gray-500 hover:text-white transition-colors text-lg leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] border border-blue-900 rounded-2xl w-full max-w-md text-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900">
          <h2 className="text-lg font-bold">Confirmar compra</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Resumen del total */}
        <div className="px-6 py-3 bg-blue-950/30 border-b border-blue-900">
          <p className="text-sm text-gray-400">Total a pagar</p>
          <p className="text-2xl font-bold text-[#0066FF]">${total}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="px-6 py-5 flex flex-col gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label htmlFor="nombre" className="text-sm text-gray-300">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className={`bg-[#111] border rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 outline-none focus:border-[#0066FF] transition-colors ${
                errors.nombre ? 'border-red-500' : 'border-blue-900'
              }`}
            />
            {errors.nombre && <p className="text-red-400 text-xs">{errors.nombre}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="juan@email.com"
              className={`bg-[#111] border rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 outline-none focus:border-[#0066FF] transition-colors ${
                errors.email ? 'border-red-500' : 'border-blue-900'
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>

          {/* Dirección */}
          <div className="flex flex-col gap-1">
            <label htmlFor="direccion" className="text-sm text-gray-300">
              Dirección de envío <span className="text-red-500">*</span>
            </label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              autoComplete="street-address"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Av. Corrientes 1234, CABA"
              className={`bg-[#111] border rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 outline-none focus:border-[#0066FF] transition-colors ${
                errors.direccion ? 'border-red-500' : 'border-blue-900'
              }`}
            />
            {errors.direccion && <p className="text-red-400 text-xs">{errors.direccion}</p>}
          </div>

          {/* Confirmación de texto */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmacion" className="text-sm text-gray-300">
              Escribí <span className="text-[#0066FF] font-bold">CONFIRMAR</span> para continuar{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmacion"
              name="confirmacion"
              type="text"
              value={form.confirmacion}
              onChange={handleChange}
              placeholder="CONFIRMAR"
              className={`bg-[#111] border rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 outline-none focus:border-[#0066FF] transition-colors tracking-widest ${
                errors.confirmacion ? 'border-red-500' : 'border-blue-900'
              }`}
            />
            {errors.confirmacion && <p className="text-red-400 text-xs">{errors.confirmacion}</p>}
          </div>

          <button
            type="submit"
            className="mt-1 bg-[#0066FF] hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Finalizar compra
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
