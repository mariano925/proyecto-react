import { Link } from 'react-router-dom';

function Item({ Producto }) {
    return (
        <Link to={`/item/${Producto.id}`} className="group block">
            <div className="bg-[#0A0A0A] border border-blue-900 hover:border-[#0066FF] rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/40">
                <div className="overflow-hidden h-44">
                    <img
                        src={Producto.img}
                        alt={Producto.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.src = 'https://placehold.co/300x176?text=Sin+foto'; }}
                    />
                </div>
                <div className="p-3">
                    <p className="text-white font-semibold text-sm truncate">{Producto.name}</p>
                    <p className="text-[#0066FF] font-bold mt-1">${Producto.price}</p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{Producto.description}</p>
                </div>
            </div>
        </Link>
    );
}
export default Item;