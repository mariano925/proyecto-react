import ItemListContainer from "./ItemListcontainer";

function Main() {
    return (
      <main className='bg-black w-full min-h-screen'>
        <div className='px-4 md:px-6 py-5 border-b border-blue-900'>
          <h1 className='text-white text-2xl font-bold'>Bienvenido a <span className='text-[#0066FF]'>SetupPro</span></h1>
          <p className='text-gray-500 text-sm mt-1'>Los mejores productos tech, al mejor precio</p>
        </div>
        <ItemListContainer />
      </main>
    );
}
export default Main;
