import { collection, doc, getDocs, getDoc, getFirestore } from "firebase/firestore";
import app from "./config"; // instancia de Firebase creada en config.js

const db = getFirestore(app);

// Obtener todos los documentos de "productos"
export async function obtenerDocumentos() {
  const colRef = collection(db, "Productos"); 
  try {
    const querySnapshot = await getDocs(colRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error obteniendo documentos:", error);
    return [];
  }
}

// Obtener categorías únicas
export async function getCategories() {
  const productos = await obtenerDocumentos();
  const todas = productos.map((p) => p.Category || p.category).filter(Boolean);
  return [...new Set(todas)];
}

// Obtener producto por ID
export async function getProductById(id) {
  const docRef = doc(db, "Productos", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

// ✅ Alias para que ItemListContainer pueda importar getProducts
export async function getProducts() {
  return await obtenerDocumentos();
}
