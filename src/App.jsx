import React from 'react';
import HeroSection from './components/sections/HeroSection';
import ProjectShowcase from './components/sections/ProjectShowcase';
import AboutSection from './components/sections/AboutSection';
import CustomCursor from './components/global/CustomCursor';
import Loader from './components/global/Loader';  
import ProgressBar from './components/global/ProgressBar'; 
import Nav from './components/global/Nav'; 

function App() {
  
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    
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

      
      <HeroSection />
      <ProjectShowcase />
      <AboutSection />
     
    </>
  );
}

export default App;
