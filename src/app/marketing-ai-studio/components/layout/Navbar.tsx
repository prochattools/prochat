import React, { useState, useEffect } from 'react';
import { NavItem } from '../../types';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

const NAV_ITEMS: NavItem[] = [
  { label: 'Demo', href: '#' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-slate-200/60 py-3 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.05)] dark:bg-[#0B111B]/80 dark:border-[#373C53] dark:shadow-[0_2px_20px_-12px_rgba(0,0,0,0.6)]' 
          : 'bg-transparent border-transparent py-6 dark:bg-transparent dark:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <Image
            src="/logo/prochat_logo_light.png"
            alt="ProChat"
            width={208}
            height={42}
            className="h-[2.6rem] w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo/prochat_logo_dark.png"
            alt="ProChat"
            width={208}
            height={42}
            className="hidden h-[2.6rem] w-auto dark:block"
            priority
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-md shadow-sm dark:bg-[#0B111B]/60 dark:border-[#373C53]">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="px-6 py-2 text-sm font-medium text-slate-600 dark:text-[#B2B5BA] hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-[#1E242D] hover:shadow-sm dark:hover:shadow-none transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
           <ThemeToggle />
           <Button variant="primary" size="sm" className="shadow-[#885efe]/20 shadow-lg">
             Get started
           </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="text-slate-600 dark:text-[#B2B5BA] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#0B111B] border-b border-slate-100 dark:border-[#373C53] p-6 md:hidden shadow-xl dark:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)] flex flex-col gap-4 animate-in slide-in-from-top-4">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-slate-600 dark:text-[#B2B5BA] font-medium py-3 border-b border-slate-50 dark:border-[#1E242D] last:border-0"
            >
              {item.label}
            </a>
          ))}
          <Button className="w-full justify-center">Get started</Button>
        </div>
      )}
    </nav>
  );
};
