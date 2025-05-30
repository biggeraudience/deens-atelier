import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProgressBar = () => {
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          scrub: true,
          start: 'top top',
          end: 'bottom bottom',
        },
      });
    }
  }, []);

  return <div className="scroll-progress-bar" ref={progressBarRef}></div>;
};

export default ProgressBar;
