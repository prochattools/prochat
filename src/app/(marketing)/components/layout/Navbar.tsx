'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

const NAV_ITEMS = [
  { label: 'System', href: '/' },
  { label: 'Kits', href: '/kits' },
  { label: 'Studio', href: '/studio' },
  { label: 'Proof', href: '/proof' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border-slate-200/60 py-3 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.05)] dark:bg-[#0B111B]/70 dark:border-[#1E242D] dark:shadow-none' 
          : 'bg-transparent border-transparent py-6 dark:bg-transparent dark:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <Image
            src="/logo/prochat_logo_light.png"
            alt="ProChat"
            width={150}
            height={48}
            priority
            className="h-[52px] w-auto transition-opacity duration-300 group-hover:opacity-90 dark:hidden"
          />
          <Image
            src="/logo/prochat_logo_dark.png"
            alt="ProChat"
            width={150}
            height={48}
            priority
            className="h-[52px] w-auto transition-opacity duration-300 group-hover:opacity-90 hidden dark:block"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-md shadow-sm dark:bg-[#0F1626]/70 dark:border-[#1E242D] dark:shadow-none">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-[#131B2D] dark:hover:shadow-none"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
           <Link href="/kits">
             <Button variant="primary" size="sm" className="shadow-[#2563EB]/20 shadow-lg">
               Explore kits
             </Button>
           </Link>
           <ThemeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="text-slate-600 dark:text-slate-300 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-4 dark:bg-[#0B111B] dark:border-[#1E242D]">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 font-medium py-3 border-b border-slate-50 last:border-0 dark:text-slate-300 dark:border-[#1E242D]"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/kits" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full justify-center">Explore kits</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
