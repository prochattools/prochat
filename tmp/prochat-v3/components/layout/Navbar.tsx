'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-slate-200/60 py-3 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.05)]' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#885efe] to-[#5b49f5] flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
             <div className="w-3 h-3 bg-white rounded-full opacity-90" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#5b49f5] transition-colors">prochat</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-md shadow-sm">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
           <Link href="/kits">
             <Button variant="primary" size="sm" className="shadow-[#885efe]/20 shadow-lg">
               Explore kits
             </Button>
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-600 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-4">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 font-medium py-3 border-b border-slate-50 last:border-0"
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