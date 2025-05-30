import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      {/* You can add custom pointer elements here (e.g., a dot, an image, custom shapes) */}
      <div className="custom-cursor__dot"></div>
      {/* Add logic for hover states later */}
    </div>
  );
};

export default CustomCursor;
