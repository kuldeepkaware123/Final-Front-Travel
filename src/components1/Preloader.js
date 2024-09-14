import React, { useEffect } from 'react';

function Preloader() {
  useEffect(() => {
    const handleWindowLoad = () => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('d-none');
      }
    };

    window.addEventListener('load', handleWindowLoad);

    return () => window.removeEventListener('load', handleWindowLoad);
  }, []);

  return (
    <div id="preloader">
      <div id="status"></div>
    </div>
  );
}

export default Preloader;
