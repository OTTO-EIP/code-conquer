import React, { useState } from 'react';

interface DocumentationPart {
  id: string;
  title: string;
  content?: string;
  subParts?: DocumentationPart[];
}

const documentation: DocumentationPart[] = [
  {
    id: '1',
    title: 'Introduction',
    content: 'Documentation Code & Conquer. Vous retrouverez ici, tout se dont vous avez besoin pour démarrer l\' aventure et devenire le meilleur !',
    subParts: [
      { id: '1-1', title: 'Objectifs', content: 'Votre village est votre base d\'opérations. Vous devez le développer en construisant des bâtiments, en formant des unités et en collectant des ressources.' },
    ],
  },
  {
    id: '2',
    title: 'Démarrage',
    content: 'Guide de démarrage',
    subParts: [
      { id: '2-1', title: 'Village', content: 'Guide de démarrage' },
      { id: '2-2', title: 'Ressources', content: '[Bois] \n [Pierre] \n [Nourriture] \n[Or]' },
      { id: '2-3', title: 'Unités', content: 'Fonctionnement des IA' },
      { id: '2-3', title: 'Batiments', content: 'Comment gerer les batiment' },

    ],
  },
  {
    id: '3',
    title: 'CCScript',
    content: 'Documentation du language des IA',
    subParts: [
      { id: '3-1', title: 'Synthaxe de Base', content: 'Start.action' },
      { id: '3-2', title: 'Structure de Controle', content: 'Code exemple' },
      { id: '3-3', title: 'Fonctions et Bibliothèques', content: 'Fonction de base' },

    ],
  },
  {
    id: '4',
    title: 'Coder votre première IA',
    content: 'Tutorielle des villageois',
    subParts: [
      { id: '4-1', title: 'Gestion des Ressources', content: 'Comment gerer ses ressource avec ses villageois.' },
      { id: '4-2', title: 'Construction et Expansion', content: 'Se dévlopper tout seul' },
      { id: '4-3', title: 'Défense et Attaque', content: 'Comment organiser la défense de sa base, et l\' attaque des enemies.' },


    ],
  },
];

const About: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<DocumentationPart | null>(null);

  const filteredDocs = documentation.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDocs = (docs: DocumentationPart[]) => (
    <ul>
      {docs.map((doc) => (
        <li key={doc.id}>
          <div
            onClick={() => setSelectedPart(doc)}
            className={`cursor-pointer p-2 rounded font-bold ${selectedPart?.id === doc.id ? 'bg-green text-white' : ''}`}
          >
            {doc.title}
          </div>
          {doc.subParts && (
            <ul className="pl-4">
              {doc.subParts.map((subPart) => (
                <li key={subPart.id} onClick={() => setSelectedPart(subPart)}>
                  <div className={`cursor-pointer p-2 rounded${selectedPart?.id === subPart.id ? 'bg-green text-green' : ''}`}>
                    {subPart.title}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex w-full h-full pt-20 pb-14 space-x-6">
      <div className="w-2/12 h-full bg-white rounded-lg p-4 flex flex-col">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded border-green"
        />
        {renderDocs(filteredDocs)}
      </div>
      <div className="w-5/12 h-full bg-white rounded-lg p-4">
        {selectedPart ? (
          <div>
            <h1 className="text-2xl mb-4">{selectedPart.title}</h1>
            <p>{selectedPart.content}</p>
            {selectedPart.content === 'Code exemple' && (
              <div className="bg-gray-200 rounded-lg p-4 mt-4">
                <pre>
                  <code className="language-typescript">
                    {`async function getVillageInfo() {\n`}
                    {'  try {\n'}
                    {'    const response = await village.get(info)`, {\n'}
                    {'      headers: {\n'}
                    {'        Authorization: `Bearer ${PLAYER_TOKEN}`,\n'}
                    {'      },\n'}
                    {'    });\n'}
                    {'  } catch (error) {\n'}
                    {'    console.error(\'Erreur lors de la récupération des informations sur le village :\', error);\n'}
                    {'    return null;\n'}
                    {'  }'}
                    {'}'}


                  </code>
                </pre>
              </div>
            )}
          </div>
        ) : (
          <p>Select a part from the list</p>
        )}
      </div>
      <div className="w-4/12 h-full bg-white rounded-lg"></div>
    </div>
  );
};

export default About;
