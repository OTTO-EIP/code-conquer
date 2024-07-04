import React from 'react';
import game from '../assets/game.png';

const Home: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-full w-full'>

      <div className="flex flex-col justify-start items-center w-full h-full">

        <div className="flex items-center justify-center h-96 w-96 mt-20">
            <img src={game} alt="flex Black Square" className="scale-150 rounded-lg border border-white" />
        </div>

        <div className="col-span-2 flex flex-col items-center justify-center">
          {/* Ajoutez la classe Tailwind et la classe personnalisée pour Vollkorn */}
          <h1 className="text-4xl text-black font-bold mt-4 font-serif">Code & Conquer</h1>

          <div className="mt-8">
            <button className="bg-green text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 transform hover:scale-110">
              Play now !
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
