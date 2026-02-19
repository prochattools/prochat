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
  const baseStyles = "relative inline-flex items-center justify-center font-heading font-semibold tracking-[-0.01em] transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden dark:focus:ring-offset-[#0B111B]";
  
  const variants = {
    primary: "bg-[#1D4ED8] text-white hover:bg-[#2563EB] hover:shadow-[0_0_20px_rgba(29,78,216,0.4)] hover:-translate-y-0.5 border border-transparent dark:bg-[#1D4ED8] dark:hover:bg-[#2563EB] dark:shadow-[0_0_18px_rgba(29,78,216,0.35)]",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-[#1D4ED8] hover:text-[#1D4ED8] hover:shadow-lg hover:-translate-y-0.5 dark:bg-white/10 dark:text-slate-100 dark:border-white/15 dark:hover:bg-white/15 dark:hover:border-white/30 dark:hover:text-white dark:shadow-none",
    ghost: "bg-transparent text-slate-600 hover:text-[#1D4ED8] hover:bg-[#1D4ED8]/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5",
    glass: "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 shadow-lg dark:bg-white/10 dark:border-white/15 dark:hover:bg-white/15"
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  );
};
