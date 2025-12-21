
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
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-md focus:outline-none transition-all duration-300";
  
  const variants = {
    primary: "bg-ignite-orange text-white hover:bg-orange-500 hover:-translate-y-0.5 shadow-[0_10px_20px_-10px_rgba(237,137,54,0.5)] border-none",
    secondary: "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10",
    outline: "border border-white/20 text-white bg-transparent hover:bg-white/5",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
