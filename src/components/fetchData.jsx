import { useState, useEffect } from 'react';

// ❌ ERROR QUE HABÍA: function fetchData() con minúscula
// ✅ CORRECCIÓN: Los componentes React deben estar en PascalCase
// Este componente es un "render props" que proporciona datos a sus children
function FetchData({children}) {
    const [items, setItems] = useState([]);

   useEffect(() => {
       fetch('https://dummyjson.com/products/search?q=phone')
           .then(res => res.json())
           .then(data => setItems(data.products));
   }, []);

    return (
        <>
            {children(items)}
        </>
    );
}

export default FetchData;
