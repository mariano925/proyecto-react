# Proyecto React Gamer Shop 🎮

Este proyecto es una aplicación web desarrollada con **React + Vite**, conectada a **Firebase Firestore** para la gestión de productos.  
Forma parte del curso de **Coderhouse** y está orientado a crear una tienda gamer con categorías dinámicas y filtrado.

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) con Vite (entorno rápido de desarrollo)
- [Firebase Firestore](https://firebase.google.com/) para base de datos en la nube
- [React Router](https://reactrouter.com/) para navegación por categorías
- [TailwindCSS](https://tailwindcss.com/) (opcional) para estilos modernos

## 📦 Funcionalidades
- Listado de productos gamer (CPU, monitores, auriculares, mouse RGB, etc.)
- Filtrado por categorías desde la URL (`/category/:categoryId`)
- Integración con Firebase para cargar productos en tiempo real
- Componente `ItemListContainer` que consulta la base y delega el renderizado a `ItemList`