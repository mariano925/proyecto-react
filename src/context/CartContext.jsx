import { createContext, useContext, useState } from 'react';

// CartContext es el ESTADO GLOBAL del carrito
// Patron: createContext crea el "canal"; CartProvider guarda el estado y lo distribuye;
// useCart() es el atajo para que cualquier componente se conecte al canal
const CartContext = createContext();

// CartProvider envuelve toda la app en main.jsx
// "children" representa todos los componentes hijo (App y todo lo que esta adentro)
export function CartProvider({ children }) {
  // cart: array de productos agregados; cada item es { ...producto, cantidad }
  const [cart, setCart] = useState([]);

  // addToCart: lo llama ItemDetail.jsx al hacer click en "Agregar al carrito"
  // Si el producto ya existe suma cantidad; si no, lo agrega al array
  const addToCart = (producto, cantidad) => {
    setCart((prevCart) => {
      const yaExiste = prevCart.find((item) => item.id === producto.id);

      if (yaExiste) {
        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...prevCart, { ...producto, cantidad }];
    });
  };

  // removeFromCart: lo llama Cart.jsx al hacer click en "Quitar"
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // clearCart: lo llama Cart.jsx al hacer click en "Vaciar carrito"
  const clearCart = () => setCart([]);

  // getTotalItems: lo usa Siderbar.jsx para mostrar el numero en el icono del carrito
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.cantidad, 0);

  // getTotalPrice: lo usa Cart.jsx para mostrar el total a pagar
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + (item.price || item.price) * item.cantidad, 0);

  // value: todo lo que los hijos pueden usar con useCart()
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// useCart: hook que usan ItemDetail, Cart y Siderbar para conectarse al contexto
export function useCart() {
  return useContext(CartContext);
}
