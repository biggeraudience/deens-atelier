import React, { useState, useEffect } from 'react';
import gsap from 'gsap'; // Import gsap
import CustomCursor from './components/global/CustomCursor';
import Loader from './components/global/Loader';
import ProgressBar from './components/global/ProgressBar';
import Nav from './components/global/Nav';
import Home from './pages/Home'; // New Home component

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    gsap.to({ progress: 0 }, {
      progress: 100,
      duration: 3, // Total duration of the loading animation
      ease: 'power2.inOut',
      onUpdate: function() {
        setLoadingProgress(this.targets()[0].progress);
      },
      onComplete: () => {
        // Once the loading animation is complete, set app as ready
        setIsAppReady(true);
      },
    });
  }, []);

  // Render the Loader component while the app is not ready
  if (!isAppReady) {
    return <Loader progress={loadingProgress} onLoaded={() => {}} />; // onLoaded is called by loader itself
  }

  // Render the main application components once loading is complete
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
