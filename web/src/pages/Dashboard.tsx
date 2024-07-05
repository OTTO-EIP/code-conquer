import React, { useEffect, useRef, useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import CharacterIcon from '@mui/icons-material/PeopleOutline';
import ScriptIcon from '@mui/icons-material/ImportContacts';
import LocalIcon from '@mui/icons-material/LocalGroceryStore';
import * as monaco from 'monaco-editor';
import FileExplorer from '../components/FileExplorer';
import CharacterDisplay from "../components/CharacterDisplay.tsx";
import GameDisplay from '../components/GameDisplay.tsx';

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('code');
  const [editorContent, setEditorContent] = useState('// Start coding...\n');
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const renderContent = () => {
    switch (selectedTab) {
      case 'code':
        return <div id="editor-container" ref={containerRef} className="h-full w-full opacity-100"></div>;
      case 'character':
        return <CharacterDisplay />;
      case 'script':
        return <FileExplorer />;
      case 'local':
        return <GameDisplay />;
      default:
        return <div>Select an option</div>;
    }
  };

  useEffect(() => {
    const loaderUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs/loader.js';

    const initEditor = () => {
      if (containerRef.current && !editorRef.current) {
        const editorInstance = monaco.editor.create(containerRef.current, {
          value: editorContent,
          theme: 'vs',
          minimap: { enabled: false },
          language: 'javascript',
        });

        editorInstance.onDidChangeModelContent(() => {
          setEditorContent(editorInstance.getValue());
        });

        editorRef.current = editorInstance;
      }
    };

    const loaderScript = document.createElement('script');
    loaderScript.src = loaderUrl;
    loaderScript.async = true;
    loaderScript.onload = initEditor;
    document.body.appendChild(loaderScript);

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
      loaderScript.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedTab === 'code' && editorRef.current) {
      editorRef.current.layout();
    }
  }, [selectedTab]);

  return (
      <div className="flex flex-col w-full h-full pt-20 space-y-6">
        <div className="flex items-center justify-between w-full h-[90%]">
          <div className="w-8/12 h-full bg-transparent border-4 border-green opacity-90 rounded-lg">
            <GameDisplay />
          </div>
          <div className="flex flex-col w-4/12 h-full ml-6">
            <div className="w-full h-[10%] rounded-t-lg flex space-x-4">
              <div
                  className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'code' ? 'bg-green opacity-90' : 'bg-green opacity-10'}`}
                  onClick={() => setSelectedTab('code')}
              >
                <CodeIcon style={{ width: '3rem', height: '3rem', color: 'white' }} />
              </div>
              <div
                  className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'character' ? 'bg-green opacity-90' : 'bg-green opacity-10'}`}
                  onClick={() => setSelectedTab('character')}
              >
                <CharacterIcon style={{ width: '3rem', height: '3rem', color: 'white' }} />
              </div>
              <div
                  className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'script' ? 'bg-green opacity-90' : 'bg-green opacity-10'}`}
                  onClick={() => setSelectedTab('script')}
              >
                <ScriptIcon style={{ width: '3rem', height: '3rem', color: 'white' }} />
              </div>
              <div
                  className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'local' ? 'bg-green opacity-90' : 'bg-green opacity-10'}`}
                  onClick={() => setSelectedTab('local')}
              >
                <LocalIcon style={{ width: '3rem', height: '3rem', color: 'white' }} />
              </div>
            </div>
            <div className="w-full h-[90%] bg-white border-green border-4 border-y-2 opacity-90 rounded-b-lg p-4">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
