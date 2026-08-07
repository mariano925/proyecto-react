# 🛒 proyecto-react

Aplicación de e‑commerce desarrollada en **React + Vite**, con integración a **Firebase** para persistencia de datos.  
El objetivo es simular un flujo completo de tienda online: catálogo → detalle → carrito → checkout.

---

## 📂 Estructura del proyecto

src/
├── components/
│    ├── Appheader.jsx / Appfooter.jsx → Layout y navegación principal
│    ├── Categories.jsx → Filtra productos por categoría
│    ├── ItemListContainer.jsx / ItemList.jsx / Items.jsx → Renderizan catálogo
│    ├── ItemDetailContainer.jsx / ItemDetail.jsx → Muestran detalle de producto
│    ├── Cart.jsx → Vista del carrito
│    ├── CheckoutForm.jsx → Formulario de compra
│    ├── Productos.jsx → Listado general de productos
│    ├── Button.jsx / Counter.jsx → Componentes reutilizables
│    ├── Sidebar.jsx → Barra lateral
│    ├── Loader.jsx / SearchBar.jsx → (si se agregan) interacción y feedback
│    └── hoc/withLog.jsx → Ejemplo de Higher Order Component
├── context/
│    └── CartContext.jsx → Estado global del carrito
├── firebase/
│    ├── config.js → Configuración inicial de Firebase
│    └── db.js → Inicialización de Firestore
├── App.jsx → Punto de entrada principal
├── index.css → Estilos globales
└── main.jsx → Renderiza <App /> en #root


---

## 🧩 Conexión de componentes

- **App.jsx**  
  - Orquesta toda la aplicación.  
  - Importa `CartContext` para compartir estado global.  
  - Renderiza `Appheader`, `Categories`, `ItemListContainer`, `Cart`, `CheckoutForm`, etc.

- **ItemListContainer.jsx**  
  - Obtiene productos desde Firebase (`db.js`).  
  - Pasa datos a `ItemList` → `Items`.

- **ItemDetailContainer.jsx**  
  - Consulta un producto específico en Firebase.  
  - Renderiza `ItemDetail` con botón para agregar al carrito.

- **Cart.jsx**  
  - Consume `CartContext`.  
  - Muestra productos seleccionados y subtotal.  
  - Permite pasar al `CheckoutForm`.

- **CheckoutForm.jsx**  
  - Recoge datos del cliente.  
  - Guarda la orden en Firebase (`orders` collection).

---

## 🚀 Flujo de la aplicación

1. El usuario entra y ve el **Header** con navegación.  
2. Selecciona una **categoría** → `ItemListContainer` carga productos desde Firebase.  
3. Hace clic en un producto → `ItemDetailContainer` muestra detalle.  
4. Agrega productos al **Cart** usando `Counter` y `Button`.  
5. En el **Cart** puede modificar cantidades o pasar al **CheckoutForm**.  
6. El **CheckoutForm** guarda la orden en Firebase.  
7. El **Footer** muestra información adicional.  

📂 Carpeta context/
CartContext.jsx

Implementa Context API para manejar el estado global del carrito.

Funciones principales:

addItem(producto, cantidad) → agrega productos al carrito.

removeItem(id) → elimina un producto específico.

clearCart() → vacía el carrito.

getTotal() → calcula el total de la compra.

Permite que cualquier componente (ItemDetail, Cart, CheckoutForm) acceda al estado sin necesidad de pasar props en cadena.

👉 Esto asegura que la aplicación sea escalable y fácil de mantener.

📂 Carpeta firebase/
config.js

Contiene la configuración inicial de Firebase (apiKey, authDomain, projectId, etc.).

Se importa en db.js para inicializar la app.

⚠️ Importante: nunca subir credenciales reales a repositorios públicos.

db.js

Inicializa Firestore con la configuración de config.js.

Exporta la instancia db para usar en los componentes.

Ejemplos de uso:

ItemListContainer → consulta la colección productos.

ItemDetailContainer → obtiene un documento específico.

CheckoutForm → guarda la orden en la colección orders.

🚀 Flujo con Context y Firebase
El usuario agrega productos desde ItemDetail.

CartContext actualiza el estado global del carrito.

En Cart.jsx se renderizan los productos seleccionados.

Al confirmar la compra en CheckoutForm, se guarda la orden en Firestore usando db.js.

El estado del carrito se limpia con clearCart().

flowchart TD
    A[ItemListContainer] --> B[ItemDetailContainer]
    B --> C[CartContext]
    C --> D[Cart]
    D --> E[CheckoutForm]
    E --> F[Firebase Firestore]
