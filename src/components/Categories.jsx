import { Link } from 'react-router-dom';

// Categories es HIJO de Siderbar
// Recibe dos props del padre:
//   categories     = array de strings con los nombres de las categorias (ej: ["teclado"])
//   showCategories = boolean que decide si esta lista se muestra o se oculta
// NO maneja estado propio ni llama a Firebase; solo dibuja lo que le manda el padre
function Categories({ categories, showCategories, onClose }) {
  return (
    <>
      {showCategories && categories.length > 0 && (
        categories.map((category, index) => (
          <li key={index}>
            <Link
              to={`/category/${category}`}
              onClick={onClose}
              className='block text-gray-300 text-sm py-1.5 pl-6 pr-3 rounded-lg hover:bg-blue-900/30 hover:text-[#0066FF] transition-colors capitalize'
            >
              {category}
            </Link>
          </li>
        ))
      )}
    </>
  );
}

export default Categories;