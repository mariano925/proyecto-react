import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

// PUNTO DE ENTRADA de la app: todo lo que está dentro de createRoot se renderiza en el <div id="root"> de index.html
// Árbol de envoltura (de afuera hacia adentro):
//   BrowserRouter  → habilita <Link> y <Routes> en toda la app
//     CartProvider → crea el carrito global; cualquier hijo puede leerlo con useCart()
//       App        → define el layout y las rutas
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
