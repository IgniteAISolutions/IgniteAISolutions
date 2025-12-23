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
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full";
  
  const variants = {
    // FORCE ORANGE BACKGROUND FOR PRIMARY
    primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 border border-transparent",
    
    // SECONDARY IS NOW ALSO ORANGE (but slightly different style if you prefer, or same)
    secondary: "bg-orange-500 hover:bg-orange-600 text-white border border-transparent",
    
    // OUTLINE (White border, orange hover)
    outline: "bg-transparent border-2 border-white/20 text-white hover:border-orange-500 hover:text-orange-500"
  };

  const sizes = "px-8 py-4 text-lg"; // Increased default padding and text size

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
