import Button from "./button";
import { useState, useEffect } from "react";

function Counter() {
   const [count, setCount] = useState(0);

   // CAMBIO: Función handleRestar con console.log
   const handleRestar = () => {
      setCount(Math.max(0, count - 1));
   };

   // CAMBIO: useEffect con console.log y array de dependencia [count]
   useEffect(() => {
      console.log("Contador actualizado:", count);
   }, [count]);

    return (
        <div className="flex flex-col gap-4 p-5">
            <h2 className="text-2xl font-bold text-white">Contador: {count}</h2>
            <div className="flex gap-3">
                <Button 
                    label="sumar" 
                    style="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => setCount(count + 1)}
                />
                <Button 
                    label="restar" 
                    style="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleRestar}
                />
                <Button 
                    label="reset"
                    style="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setCount(0)}
                />
            </div>
        </div>
    );
}
export default Counter;