import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = "font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";

  const variantClasses = variant === 'primary'
    ? "bg-gradient-to-br from-[#FF5200] to-[#DC2626] text-white hover:shadow-orange-500/30"
    : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:shadow-white/20";

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${widthClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
