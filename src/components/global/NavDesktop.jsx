import React from 'react';
import PropTypes from 'prop-types'; 



const NavDesktop = ({ currentPageNumber }) => {
  return (
    <nav className="main-nav main-nav--desktop">
      {/* Section 1: Company Logo */}
      <div className="main-nav__section main-nav__section--logo">
      
        <img src="https://placehold.co/100x50/000000/FFFFFF?text=DEENS" alt="Deen's Atelier Logo" className="main-nav__logo" />
      </div>

      {/* Section 2: Navigation Buttons */}
      <div className="main-nav__section main-nav__section--buttons">
        <ul className="main-nav__links">
          <li><a href="#home" className="main-nav__link btn btn--default">HOME</a></li>
          <li><a href="#portfolio" className="main-nav__link btn btn--default">PORTFOLIO</a></li>
          <li><a href="#services" className="main-nav__link btn btn--default">SERVICES</a></li>
          <li><a href="#journal" className="main-nav__link btn btn--default">JOURNAL</a></li>
          <li><a href="#contact" className="main-nav__link btn btn--default">CONTACT</a></li>
        </ul>
      </div>

      {/* Section 3: Empty Section */}
      <div className="main-nav__section main-nav__section--empty"></div>

      {/* Section 4: arcon Logo */}
      <div className="main-nav__section main-nav__section--secondary-logo">
        {/* Replace with your actual secondary logo PNG */}
        <img src="https://placehold.co/80x40/000000/FFFFFF?text=ATELIER" alt="Atelier Icon" className="main-nav__secondary-logo" />
      </div>

      {/* Section 5: Page Number */}
      <div className="main-nav__section main-nav__section--page-number">
        <span className="main-nav__page-label">page no.</span>
        <span className="main-nav__page-num">{currentPageNumber.padStart(2, '0')}</span>
      </div>
    </nav>
  );
};

NavDesktop.propTypes = {
  currentPageNumber: PropTypes.string.isRequired,
};

export default NavDesktop;
