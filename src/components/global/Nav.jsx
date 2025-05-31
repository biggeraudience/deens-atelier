// src/components/Nav.jsx

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

// Import both logos once. Adjust the relative path as needed.
import deensLogo from '../../assets/icons/deens-atelier-logo.png';
import arconLogo from '../../assets/icons/arcon-logo.png';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState('01');
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;
    if (isOpen) {
      gsap.set(navRef.current, { display: 'flex' });
      navRef.current.classList.add('is-open');
      gsap.to(navRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to(navRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          navRef.current.classList.remove('is-open');
          gsap.set(navRef.current, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger toggle */}
      <button
        className="main-nav__toggle"
        onClick={toggleNav}
        style={{ display: isOpen ? 'none' : 'block' }}
      >
        <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="30" height="3" fill="black" />
          <rect y="8" width="30" height="3" fill="#A33693" />
          <rect y="16" width="30" height="3" fill="black" />
        </svg>
      </button>

      <nav className="main-nav" ref={navRef}>
        {/* ---------------------------------- */}
        {/* -- MOBILE CONTENT -- (shown < md) */}
        {/* ---------------------------------- */}
        <div className="nav-mobile-content">
          <div className="nav__section nav__section--logo">
            {/* Use the imported deensLogo */}
            <img src={deensLogo} alt="Deen's Atelier Logo" className="main-nav__logo" />
          </div>

          <div className="nav__section nav__section--buttons">
            <ul className="main-nav__links">
              <li>
                <a href="#home" className="btn btn--default" onClick={handleLinkClick}>
                  HOME
                </a>
              </li>
              <li>
                <a href="#portfolio" className="btn btn--default" onClick={handleLinkClick}>
                  PORTFOLIO
                </a>
              </li>
              <li>
                <a href="#services" className="btn btn--default" onClick={handleLinkClick}>
                  SERVICES
                </a>
              </li>
              <li>
                <a href="#journal" className="btn btn--default" onClick={handleLinkClick}>
                  JOURNAL
                </a>
              </li>
              <li>
                <a href="#contact" className="btn btn--default" onClick={handleLinkClick}>
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          <button className="main-nav__close" onClick={toggleNav}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* This path will be purple when nav is open */}
              <path d="M18 6L6 18" stroke={isOpen ? "#A33693" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {/* This path remains white */}
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ---------------------------------- */}
        {/* -- DESKTOP CONTENT -- (shown ≥ md) */}
        {/* ---------------------------------- */}
        <div className="nav-desktop-content">
          {/* Section 1: Deen's Atelier Logo */}
          <div className="nav__section nav__section--logo">
            <img src={deensLogo} alt="Deen's Atelier Logo" className="main-nav__logo" />
          </div>

          {/* Section 2: Navigation Links */}
          <div className="nav__section nav__section--buttons">
            <ul className="main-nav__links">
              <li>
                <a href="#home" className="btn btn--default">
                  HOME
                </a>
              </li>
              <li>
                <a href="#portfolio" className="btn btn--default">
                  PORTFOLIO
                </a>
              </li>
              <li>
                <a href="#services" className="btn btn--default">
                  SERVICES
                </a>
              </li>
              <li>
                <a href="#journal" className="btn btn--default">
                  JOURNAL
                </a>
              </li>
              <li>
                <a href="#contact" className="btn btn--default">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: (Empty placeholder) */}
          <div className="nav__section nav__section--empty"></div>

          {/* Section 4: Arcon Logo */}
          <div className="nav__section nav__section--second-logo">
            <img src={arconLogo} alt="Arcon Logo" className="main-nav__secondary-logo" />
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
  // no props here for now
};

export default Nav;