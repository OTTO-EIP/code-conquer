import React, { useState, useEffect } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import CharacterIcon from '@mui/icons-material/PeopleOutline';
import ScriptIcon from '@mui/icons-material/ImportContacts';
import LocalIcon from '@mui/icons-material/LocalGroceryStore';
import * as monaco from 'monaco-editor';

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('code');
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const renderContent = () => {
    switch (selectedTab) {
      case 'code':
        return <div id="editor-container" className="h-full w-full"></div>;
      case 'character':
        return <div>Character Content</div>;
      case 'script':
        return <div>Script Content</div>;
      case 'local':
        return <div>Local Content</div>;
      default:
        return <div>Select an option</div>;
    }
  };

  useEffect(() => {
    // Load Monaco Editor
    const loaderUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs/loader.js';
    const editorUrl = 'https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs/editor/editor.main.nls.js';

    const initEditor = () => {
      if (!editor) {
        const editorInstance = monaco.editor.create(document.getElementById('editor-container')!, {
          value: '// Start coding...',
          language: 'javascript',
        });
        setEditor(editorInstance);
      }
    };

    const loaderScript = document.createElement('script');
    loaderScript.src = loaderUrl;
    loaderScript.async = true;
    loaderScript.onload = () => {
      const editorScript = document.createElement('script');
      editorScript.src = editorUrl;
      editorScript.async = true;
      editorScript.onload = initEditor;
      document.body.appendChild(editorScript);
    };
    document.body.appendChild(loaderScript);

    return () => {
      // Cleanup Monaco Editor
      if (editor) {
        editor.dispose();
        setEditor(null);
      }
      loaderScript.remove();
    };
  }, [editor]);

  return (
    <div className="flex flex-col w-full h-full pt-20 space-y-6">
      <div className="flex items-center justify-between w-full h-[90%]">
        <div className="w-8/12 h-full bg-white opacity-30 rounded-lg"></div>
        {/* Container 1 */}
        <div className="flex flex-col w-4/12 h-full ml-6">
          {/* Container 2 */}
          <div className="w-full h-[10%] rounded-t-lg flex space-x-4">
            <div
              className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'code' ? 'bg-white opacity-30' : 'bg-white opacity-10'}`}
              onClick={() => setSelectedTab('code')}
            >
              <CodeIcon style={{ width: '3rem', height: '3rem', color: '' }} />
            </div>
            <div
              className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'character' ? 'bg-white opacity-30' : 'bg-white opacity-10'}`}
              onClick={() => setSelectedTab('character')}
            >
              <CharacterIcon style={{ width: '3rem', height: '3rem', color: 'black' }} />
            </div>
            <div
              className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'script' ? 'bg-white opacity-30' : 'bg-white opacity-10'}`}
              onClick={() => setSelectedTab('script')}
            >
              <ScriptIcon style={{ width: '3rem', height: '3rem', color: 'black' }} />
            </div>
            <div
              className={`w-1/4 h-full rounded-t-lg flex items-center justify-center cursor-pointer ${selectedTab === 'local' ? 'bg-white opacity-30' : 'bg-white opacity-10'}`}
              onClick={() => setSelectedTab('local')}
            >
              <LocalIcon style={{ width: '3rem', height: '3rem', color: 'black' }} />
            </div>
          </div>

          {/* Container 3 */}
          <div className="w-full h-[90%] bg-white opacity-30 rounded-b-lg p-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
