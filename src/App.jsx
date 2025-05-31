// src/App.js
import React, { useState, useEffect } from 'react';
import CustomCursor from './components/global/CustomCursor';
import Loader from './components/global/Loader';  
import ProgressBar from './components/global/ProgressBar'; 
import Nav from './components/global/Nav'; 
import Home from './pages/Home'; // New Home component

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <Nav /> 
      <Home /> {/* Render the Home component */}
    </>
  );
}

export default App;