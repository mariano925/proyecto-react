import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';         // hijo: recibe el producto como prop
import { getProductById } from '../firebase/db'; // busca un documento por id en Firestore

// ItemDetailContainer es PADRE de ItemDetail
// Responsabilidad: leer el id de la URL y buscar ese producto en Firebase
// El id llega por la URL "/item/:id" que define App.jsx
function ItemDetailContainer() {
  // useParams lee el segmento ":id" de la URL (ej: "/item/abc123" -> id = "abc123")
  const { id } = useParams();
  // producto arranca en null; mientras es null se muestra "Cargando..."
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Cada vez que cambia el id en la URL, vuelve a buscar en Firebase
    getProductById(id).then((data) => setProducto(data));
  }, [id]);

  if (!producto) {
    return <p className="text-white p-5">Cargando producto...</p>;
  }

  // Una vez que llego el producto, se lo pasa a ItemDetail como prop
  return <ItemDetail Producto={producto} />;
}

export default ItemDetailContainer;
