import { useState, useEffect } from "react";
import { obtenerProductos } from "../firebase/db"; // lógica de Firebase, sin JSX

// Componente con JSX: pide los datos a firebase/db.js y los renderiza
export default function Productos() {
  // listaProductos: array donde guardamos los productos que trae Firebase
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    // [] = solo se ejecuta una vez al montar, no en cada render
    obtenerProductos()
      .then((data) => {
        console.log("Documentos traídos de Firestore:", data); // para revisar en consola qué llegó
        setListaProductos(data);
      })
      .catch((error) => console.error("Error al obtener los productos: ", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Catálogo de Productos</h2>
      {listaProductos.length === 0 ? <p>Cargando productos...</p> : null}
      <ul>
        {listaProductos.map((producto) => (
          <li key={Productos.id}>
            <span style={{ color: "gray" }}>ID: {producto.id}</span>
            {/* Mostramos todos los campos tal cual vienen, así vemos los nombres reales
                (nombre/precio salían vacíos porque en Firestore no se llaman así) */}
            <ul>
              {Object.entries(producto)
                .filter(([campo]) => campo !== "id")
                .map(([campo, valor]) => (
                  <li key={campo}>
                    {campo}: {String(valor)}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
