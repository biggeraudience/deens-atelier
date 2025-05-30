import React from 'react';
// Assuming your main SCSS file imports _button.scss
// import '../../assets/styles/main.scss'; // Or wherever your main SCSS is imported

/**
 * Reusable Button Component for Deen's Atelier.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 * @param {'default' | 'primary'} [props.variant='default'] - The visual style of the button.
 * 'default': Black background with white text, transforms to purple on hover with a right-to-left animation.
 * 'primary': Purple background with white text, lightens on hover.
 * @param {function} [props.onClick] - The click event handler for the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {string} [props.type='button'] - The type attribute for the button (e.g., 'submit', 'button', 'reset').
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 */
const Button = ({ children, variant = 'default', onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
