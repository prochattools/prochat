import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  withArrow = false,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";
  
  const variants = {
    primary: "bg-[#5b49f5] text-white hover:bg-[#4a3bd1] hover:shadow-[0_0_20px_rgba(91,73,245,0.4)] hover:-translate-y-0.5 border border-transparent",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-[#5b49f5] hover:text-[#5b49f5] hover:shadow-lg hover:-translate-y-0.5",
    ghost: "bg-transparent text-slate-600 hover:text-[#5b49f5] hover:bg-purple-50",
    glass: "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 shadow-lg"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#885efe] to-[#5b49f5] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  );
};