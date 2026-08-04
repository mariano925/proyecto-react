import { useEffect } from 'react';

// ✅ HOC (Higher Order Component) de ejemplo
// Un HOC es una función que recibe un componente y devuelve un nuevo componente envuelto
// con funcionalidad adicional (en este caso, logging cuando el componente se monta y desmonta)

export function withLog(Component) {
  // El HOC devuelve un nuevo componente funcional
  function LoggedComponent(props) {
    useEffect(() => {
      // Se ejecuta cuando el componente se monta
      console.log(`✅ ${Component.name} se montó`);
      
      // Limpieza: se ejecuta cuando el componente se desmonta
      return () => {
        console.log(`❌ ${Component.name} se desmontó`);
      };
    }, []);

    // Renderiza el componente original con todas sus props
    return <Component {...props} />;
  }

  // Buena práctica: establece un nombre descriptivo para el componente envuelto
  LoggedComponent.displayName = `withLog(${Component.name || 'Component'})`;

  return LoggedComponent;
}

export default withLog;
