import React from 'react';

const SecondaryButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  icon = null, 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClass = 'secondary-button';
  const variantClass = `secondary-button--${variant}`;
  const disabledClass = disabled ? 'secondary-button--disabled' : '';
  
  const buttonClasses = `${baseClass} ${variantClass} ${disabledClass} ${className}`.trim();

  return (
    <button 
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="secondary-btn__icon">{icon}</span>}
      <span className="secondary-btn__text">{children}</span>
    </button>
  );
};

export default SecondaryButton;