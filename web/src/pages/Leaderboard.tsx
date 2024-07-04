import React from 'react';
import top from '../assets/fox2.png';
import cupGold from '../assets/gold-cup.png';
import cupBronze from '../assets/bronze-cup.png';
import cupSilver from '../assets/silver-cup.png';

import pp1 from '../assets/pp1.jpeg';
import pp2 from '../assets/pp2.jpeg';
import pp3 from '../assets/pp3.jpeg';
import pp4 from '../assets/pp4.jpg';
import pp5 from '../assets/pp5.jpeg';
import pp6 from '../assets/pp6.jpg';
import pp7 from '../assets/pp7.jpg';
import pp8 from '../assets/pp8.jpeg';
import pp9 from '../assets/pp9.jpg';
import pp10 from '../assets/pp10.png';
import pp11 from '../assets/pp11.jpeg';
import pp12 from '../assets/pp12.jpg';

interface Player {
    id: number;
    name: string;
    image: string;
}

const players: Player[] = [
    { id: 1, name: 'Johny', image: pp9 },
    { id: 2, name: 'Pablo', image: pp2 },
    { id: 3, name: 'ZIbriskaII', image: pp3 },

    { id: 4, name: 'BySLide_', image: pp4 },
    { id: 5, name: 'schnider', image: pp5 },
    { id: 6, name: 'Aypierre', image: pp6 },
    { id: 7, name: '__QIhight_', image: pp7 },
    { id: 8, name: 'UltronX', image: pp8 },
    { id: 9, name: 'PoPA_', image: pp1 },
    { id: 10, name: 'snowdenEZ', image: pp10 },
    { id: 11, name: 'flyArt', image: pp11 },
    { id: 12, name: 'Ziblacking', image: pp12 },
    { id: 13, name: 'Feldorn', image: top },
    { id: 14, name: 'ZAMPA', image: top },
    { id: 15, name: 'BinOOse', image: top },
    { id: 16, name: 'LeronardDAvinci', image: top },
    { id: 17, name: 'Vincent', image: top },
    { id: 18, name: 'Slaacker85', image: top },
    { id: 19, name: 'Dearthslash', image: top },
    { id: 20, name: 'kozZZ', image: top },
];

const Leaderboard: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full h-full pt-20 pb-14 space-y-6">
            {/* Podium */}
            <div className="flex justify-center space-x-6">
                {/* Second place */}
                <div className="flex flex-col items-center shadow-xl mt-5 shadow-right-md shadow-white-100 bg-transparent rounded-2xl p-5">
                    <img src={cupSilver} alt="Silver Cup" className="w-12 h-12 mb-2" />
                    <div className="bg-customSilver p-4 rounded-md border-1 border-green opacity-90">
                        <img src={players[1].image} className="w-24 h-24 rounded-full" />
                    </div>
                    <div className="w-24 h-12 flex items-center justify-center rounded-b-md text-white">
                        {players[1].name}
                    </div>
                </div>
                {/* First place */}
                <div className="flex flex-col items-center shadow-xl shadow-right-md shadow-white-100 bg-transparent rounded-2xl p-5">
                    <img src={cupGold} alt="Gold Cup" className="w-12 h-12 mb-2" />
                    <div className="bg-customGold p-4 rounded-md border-1 border-green opacity-90">
                        <img src={players[0].image} className="w-32 h-32 rounded-full " />
                    </div>
                    <div className="w-32 h-12 flex items-center justify-center rounded-b-md text-white">
                        {players[0].name}
                    </div>
                </div>
                {/* Third place */}
                <div className="flex flex-col items-center mt-10 shadow-xl shadow-right-md shadow-white-100 bg-transparent rounded-2xl p-5">
                    <img src={cupBronze} alt="Bronze Cup" className="w-12 h-12 mb-2" />
                    <div className="bg-customBronze p-4 rounded-md border-1 border-green opacity-90">
                        <img src={players[2].image} className="w-24 h-24 rounded-full" />
                    </div>
                    <div className="w-24 h-12 flex items-center justify-center rounded-b-md text-white">
                        {players[2].name}
                    </div>
                </div>
            </div>
            {/* Rest of the leaderboard */}
            <div className="w-3/4">
                {players.slice(3).map((player) => (
                    <div key={player.id} className="flex items-center space-x-4 py-2 border-b border-green">
                        <div className="w-8 text-white">{player.id}</div>
                        <img src={player.image} alt={player.name} className="w-16 h-16 rounded-full" />
                        <div className="flex-grow text-white">{player.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
