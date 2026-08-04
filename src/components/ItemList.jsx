import Item from './Items';

function ItemList({ productos }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-6 gap-4'>
          {productos.map((Producto) => (
              <Item key={Producto.id} Producto={Producto} />
          ))}
        </div>
    );
}
export default ItemList;