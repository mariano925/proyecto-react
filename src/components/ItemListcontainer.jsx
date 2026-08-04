import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';          // hijo: recibe el array productos como prop
import { getProducts } from '../firebase/db'; // funcion que consulta Firestore


// ItemListContainer es el PADRE de ItemList
// Responsabilidad: buscar los datos y filtrarlos; NO dibuja productos, se los delega a ItemList
// Recibe categoryId de la URL via useParams (App.jsx define la ruta "/category/:categoryId")
function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((productos) => {
        console.log('Productos recibidos de Firebase:', productos);
        const filtrados = categoryId
          ? productos.filter((p) => p.Category === categoryId)
          : productos;
        setItems(filtrados);
      })
      .catch((err) => {
        console.error('Error al cargar productos:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p className="text-gray-400 p-6">Cargando productos...</p>;
  if (error)   return <p className="text-red-400 p-6">Error: {error}</p>;
  if (items.length === 0) return <p className="text-gray-400 p-6">No se encontraron productos.</p>;

  return <ItemList productos={items} />;
}

export default ItemListContainer;