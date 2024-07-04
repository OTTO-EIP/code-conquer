import React, { useState } from 'react';

interface DocumentationPart {
  id: string;
  title: string;
  content: string;
}

const documentation: DocumentationPart[] = [
  { id: '1', title: 'Introduction', content: 'This is the introduction.' },
  { id: '2', title: 'Getting Started', content: 'This is the getting started guide.' },
  { id: '3', title: 'Advanced Topics', content: 'These are advanced topics.' },
];

const About: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<DocumentationPart | null>(null);

  const filteredDocs = documentation.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full h-full pt-20 pb-14 space-x-6">
      <div className="w-2/12 h-full bg-white opacity-40 rounded-lg p-4 flex flex-col">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <ul>
          {filteredDocs.map((doc) => (
            <li
              key={doc.id}
              onClick={() => setSelectedPart(doc)}
              className={`cursor-pointer p-2 rounded ${selectedPart?.id === doc.id ? 'bg-gray-200' : ''}`}
            >
              {doc.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-5/12 h-full bg-white opacity-40 rounded-lg p-4">
        {selectedPart ? (
          <div>
            <h1 className="text-2xl mb-4">{selectedPart.title}</h1>
            <p>{selectedPart.content}</p>
          </div>
        ) : (
          <p>Select a part from the list</p>
        )}
      </div>
      <div className="w-4/12 h-full bg-white opacity-40 rounded-lg"></div>
    </div>
  );
};

export default About;
