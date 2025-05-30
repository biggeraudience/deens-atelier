import React from 'react';
import HeroSection from './components/sections/HeroSection';
import ProjectShowcase from './components/sections/ProjectShowcase';
import AboutSection from './components/sections/AboutSection';
import CustomCursor from './components/global/CustomCursor';
import Loader from './components/global/Loader'; // You'll manage loader state in App or context
import ProgressBar from './components/global/ProgressBar'; // Or manage via context/effect
import Nav from './components/global/Nav'; // Import the Nav component

function App() {
  // Example: simple state for loader (you'll refine this)
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Hide loader after 2 seconds (adjust as needed)
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* Global components that should always be present */}
      <CustomCursor />
      <ProgressBar />
      <Nav /> {/* The navigation component, applied globally */}

      {/* Main content sections */}
      <HeroSection />
      <ProjectShowcase />
      <AboutSection />
      {/* Other sections will go here */}
    </>
  );
}

export default App;
