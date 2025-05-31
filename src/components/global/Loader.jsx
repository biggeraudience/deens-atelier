import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const Loader = ({ progress, onLoaded }) => {
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const loaderContainerRef = useRef(null);

  // Title refs (run only once)
  const deenRef = useRef(null);
  const atelierRef = useRef(null);
  const underlineRef = useRef(null);

  // ─────────────────────────────────────────────────────────────────────────────
  // 1) TITLE INTRO ANIMATION: run only once on mount
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();

    // “DEEN’S” slides in from left
    tl.fromTo(
      deenRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // “ATELIER LTD” slides in from right (overlapping 0.2s)
    tl.fromTo(
      atelierRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '<0.2'
    );

    // Underline sweeps from 0 → full width
    tl.fromTo(
      underlineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out',
        transformOrigin: 'left center',
      },
      '<0.2'
    );
  }, []); // ← empty array so it only runs on initial mount

  // ─────────────────────────────────────────────────────────────────────────────
  // 2) PROGRESS BAR ANIMATION: run whenever `progress` prop changes
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Animate the progress bar width, skew, and percentage text
    const anim = { value: 0 };

    gsap.to(anim, {
      value: progress,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (progressBarRef.current) {
          // Subtle 3D skew between -5° → +5°
          const skewAmount = (anim.value / 100) * 10 - 5;
          progressBarRef.current.style.transform = `skewX(${skewAmount}deg)`;
          progressBarRef.current.style.width = `${anim.value}%`;
        }
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(anim.value)}%`;
        }
      },
      onComplete: () => {
        if (progress >= 100) {
          gsap.to(loaderContainerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              if (loaderContainerRef.current) {
                loaderContainerRef.current.style.display = 'none';
              }
              onLoaded();
            },
          });
        }
      },
    });
  }, [progress, onLoaded]);

  return (
    <div ref={loaderContainerRef} className="loader-container">
      {/* ─── Ultra-Modern Animated Title ─── */}
      <h1 className="loader-title">
        <span ref={deenRef} className="color-purple">
          DEEN&apos;S
        </span>
        <span ref={atelierRef} className="color-grey">
          &nbsp;ATELIER LTD
        </span>
        {/* Underline element */}
        <div ref={underlineRef} className="loader-underline"></div>
      </h1>

      {/* ─── PROGRESS BAR WRAPPER ─── */}
      <div className="loader-bar-wrapper">
        <div ref={progressBarRef} className="loader-bar"></div>
        <div className="loader-bar-glow"></div>
      </div>

      {/* ─── PERCENTAGE TEXT ─── */}
      <div ref={progressTextRef} className="loader-percentage">
        0%
      </div>
    </div>
  );
};

Loader.propTypes = {
  progress: PropTypes.number.isRequired,
  onLoaded: PropTypes.func.isRequired,
};

export default Loader;
