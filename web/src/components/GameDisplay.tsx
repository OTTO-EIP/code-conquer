import React, { useEffect, useState } from 'react';

const GameDisplay: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    fetch('/custom_template.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => {
        setHtmlContent(text);
      })
      .catch((error) => console.error('Error fetching HTML:', error));
  }, []);

  useEffect(() => {
    if (htmlContent) {
      // Insert the HTML content into a div
      const container = document.getElementById('emscripten-container');
      if (container) {
        container.innerHTML = htmlContent;
      }

      // Execute any script tags within the fetched HTML
      const scripts = container?.getElementsByTagName('script');
      if (scripts) {
        for (let i = 0; i < scripts.length; i++) {
          const script = document.createElement('script');
          script.src = scripts[i].src;
          script.async = true;
          document.body.appendChild(script);
        }
      }
    }
  }, [htmlContent]);

  return (
    <div className="w-full h-full bg-transparent border-5 border-green rounded-lg">
      {htmlContent ? (
        <div id="emscripten-container" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GameDisplay;
