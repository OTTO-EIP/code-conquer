import React, { useEffect, useRef, useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import CharacterIcon from '@mui/icons-material/PeopleOutline';
import ScriptIcon from '@mui/icons-material/ImportContacts';
import LocalIcon from '@mui/icons-material/LocalGroceryStore';
import * as monaco from 'monaco-editor';
import FileExplorer from '../components/FileExplorer'; // Make sure to have the correct path

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('code');
  const [editorContent, setEditorContent] = useState('// Start coding...\n');
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const renderContent = () => {
    switch (selectedTab) {
      case 'code':
        return <div id="editor-container" className="h-full w-full opacity-100"></div>;
      case 'character':
        return <div>Character Content</div>;
      case 'script':
        return <FileExplorer />;
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
      if (!editorRef.current) {
        const editorInstance = monaco.editor.create(document.getElementById('editor-container')!, {
          value: editorContent,
          theme: 'vs',
          minimap: {
            enabled: false,
          },
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
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
      loaderScript.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedTab === 'code') {
      if (!editorRef.current) {
        const editorInstance = monaco.editor.create(document.getElementById('editor-container')!, {
          value: editorContent,
          theme: 'vs',
          minimap: {
            enabled: false,
          },
          language: 'javascript',
        });

        editorInstance.onDidChangeModelContent(() => {
          setEditorContent(editorInstance.getValue());
        });

        editorRef.current = editorInstance;
      }
    } else {
      if (editorRef.current) {
        setEditorContent(editorRef.current.getValue());
        editorRef.current.dispose();
        editorRef.current = null;
      }
    }
  }, [selectedTab]);

  return (
      <div className="flex flex-col w-full h-full pt-20 space-y-6">
        <div className="flex items-center justify-between w-full h-[90%]">
          <div className="w-8/12 h-full bg-white border-4 border-green opacity-90 rounded-lg"></div>
          {/* Container 1 */}
          <div className="flex flex-col w-4/12 h-full ml-6">
            {/* Container 2 */}
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

            {/* Container 3 */}
            <div className="w-full h-[90%] bg-white border-green border-4 border-y-2 opacity-90 rounded-b-lg p-4">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
