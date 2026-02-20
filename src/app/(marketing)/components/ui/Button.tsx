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
  const baseStyles = "font-brand relative inline-flex items-center justify-center font-semibold tracking-[-0.01em] transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-secondary hover:-translate-y-0.5 border border-transparent shadow-sm",
    secondary: "bg-background text-foreground border border-border hover:border-primary hover:bg-muted hover:-translate-y-0.5 shadow-sm",
    ghost: "bg-transparent text-muted-foreground hover:text-primary hover:bg-muted",
    glass: "bg-background/70 backdrop-blur-md text-foreground border border-border hover:bg-muted shadow-sm"
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  );
};
