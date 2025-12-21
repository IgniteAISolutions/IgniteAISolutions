import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Use the CSS classes defined in index.css
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button 
      className={`${variantClass} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;