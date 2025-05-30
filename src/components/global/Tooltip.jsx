import React, { useRef, useEffect } from 'react';

const Tooltip = ({ children, content, visible, x, y }) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef.current && visible) {
      tooltipRef.current.style.left = `${x}px`;
      tooltipRef.current.style.top = `${y}px`;
    }
  }, [visible, x, y]);

  return (
    <div
      className={`custom-tooltip ${visible ? 'custom-tooltip--visible' : ''}`}
      ref={tooltipRef}
    >
      {content}
    </div>
  );
};

export default Tooltip;
