import React from 'react';

const Home: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>

      <div className="flex flex-col space-y-24 justify-start items-center w-full h-full bg-custom-gradient">

        <div className="flex items-center justify-center h-96 w-96 my-24">
            <div className='h-full w-full bg-red-500 rounded-2xl'>

            </div>
          {/* <img src={banner} alt="flex Black Square" className="w-1/2 h-100 rounded-2xl m-t 100" /> */}
        </div>

        <div className="col-span-2 flex flex-col items-center justify-center">
          {/* Ajoutez la classe Tailwind et la classe personnalisée pour Vollkorn */}
          <h1 className="text-4xl text-white font-bold mb-4 font-serif">Code & Conquer</h1>

          <div className="mb-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 transform hover:scale-110">
              Play now !
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
