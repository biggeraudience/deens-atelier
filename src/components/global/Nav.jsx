import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const [currentPageNumber, setCurrentPageNumber] = useState('01');

  useEffect(() => {
    if (navRef.current) {
      if (isOpen) {
        // When opening: set display flex BEFORE animating, then add class and animate.
        // This ensures the element is rendered and ready for animation.
        gsap.set(navRef.current, { display: 'flex' }); // Make it display flex immediately
        navRef.current.classList.add('is-open'); // Add class for CSS changes (like background color)
        gsap.to(navRef.current, {
          y: '0%', // Animate to visible position
          opacity: 1, // Animate opacity
          duration: 0.5,
          ease: 'power3.out',
        });
      } else {
        // When closing: animate first, then set display none on complete.
        gsap.to(navRef.current, {
          y: '100%', // Animate downwards to hide
          opacity: 0, // Animate opacity
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => {
            navRef.current.classList.remove('is-open'); // Remove class after animation
            gsap.set(navRef.current, { display: 'none' }); // Finally hide completely
          },
        });
      }
    }
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close nav when a link is clicked
  };

  return (
    <>
      {/* Hamburger Icon (always present, CSS handles display based on breakpoint) */}
      <button className="main-nav__toggle" onClick={toggleNav}>
        {/* Placeholder SVG for Hamburger */}
        <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="30" height="3" fill="white"/>
          <rect y="8" width="30" height="3" fill="white"/>
          <rect y="16" width="30" height="3" fill="white"/>
        </svg>
      </button>

      {/* Unified Navigation Container */}
      <nav className="main-nav" ref={navRef}>

        {/* Mobile Navigation Content (visible on mobile, hidden on desktop by CSS) */}
        <div className="nav-mobile-content">
          <div className="nav__section nav__section--logo">
            <img src="https://placehold.co/100x50/000000/FFFFFF?text=DEENS" alt="Deen's Atelier Logo" className="main-nav__logo" />
          </div>

          <div className="nav__section nav__section--buttons">
            <ul className="main-nav__links">
              <li><a href="#home" className="btn btn--default" onClick={handleLinkClick}>HOME</a></li>
              <li><a href="#portfolio" className="btn btn--default" onClick={handleLinkClick}>PORTFOLIO</a></li>
              <li><a href="#services" className="btn btn--default" onClick={handleLinkClick}>SERVICES</a></li>
              <li><a href="#journal" className="btn btn--default" onClick={handleLinkClick}>JOURNAL</a></li>
              <li><a href="#contact" className="btn btn--default" onClick={handleLinkClick}>CONTACT</a></li>
            </ul>
          </div>

          {/* Close Button for Mobile Nav */}
          <button className="main-nav__close" onClick={toggleNav}>
            {/* Placeholder SVG for Close */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Content (visible on desktop, hidden on mobile by CSS) */}
        <div className="nav-desktop-content">
          {/* Section 1: Company Logo */}
          <div className="nav__section nav__section--logo">
            <img src="https://placehold.co/100x50/000000/FFFFFF?text=DEENS" alt="Deen's Atelier Logo" className="main-nav__logo" />
          </div>

          {/* Section 2: Navigation Buttons */}
          <div className="nav__section nav__section--buttons">
            <ul className="main-nav__links">
              <li><a href="#home" className="btn btn--default">HOME</a></li>
              <li><a href="#portfolio" className="btn btn--default">PORTFOLIO</a></li>
              <li><a href="#services" className="btn btn--default">SERVICES</a></li>
              <li><a href="#journal" className="btn btn--default">JOURNAL</a></li>
              <li><a href="#contact" className="btn btn--default">CONTACT</a></li>
            </ul>
          </div>

          {/* Section 3: Empty Section */}
          <div className="nav__section nav__section--empty"></div>

          {/* Section 4: Another Logo */}
          <div className="nav__section nav__section--second-logo">
            <img src="https://placehold.co/80x40/000000/FFFFFF?text=ATELIER" alt="Atelier Icon" className="main-nav__secondary-logo" />
          </div>

          {/* Section 5: Page Number */}
          <div className="nav__section nav__section--page-number">
            <span className="page-text">page no.</span>
            <span className="page-num">{currentPageNumber.padStart(2, '0')}</span>
          </div>
        </div>
      </nav>
    </>
  );
};

Nav.propTypes = {
  // If you ever pass props to Nav, define them here.
};

export default Nav;