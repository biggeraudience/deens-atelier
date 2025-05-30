import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.classList.add('image-modal--open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
      } else {
        modalRef.current.classList.remove('image-modal--open');
        document.body.style.overflow = '';
      }
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      className="image-modal"
      ref={modalRef}
      onClick={handleOverlayClick}
      style={{ zIndex: isOpen ? 'var(--z-index-modal)' : '-1' }} // Use var for Z-index
    >
      <div className="image-modal__content">
        {children}
      </div>
      <button className="image-modal__close-btn" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Modal;
