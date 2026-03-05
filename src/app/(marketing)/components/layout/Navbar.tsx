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
  { label: 'Blog', href: '/blog' },
  { label: 'Glossary', href: '/saas-glossary' },
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
      className={`font-marketing fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-border bg-background/80 py-2 backdrop-blur-md shadow-sm'
          : 'border-border bg-background/70 py-2 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <span className="inline-block origin-left scale-[1.08] transform-gpu leading-none">
            <Image
              src="/logo/prochat_logo_light.png"
              alt="ProChat"
              width={208}
              height={42}
              priority
              className="h-[36.8px] w-auto transition-opacity duration-300 group-hover:opacity-90 dark:hidden"
            />
            <Image
              src="/logo/prochat_logo_dark.png"
              alt="ProChat"
              width={208}
              height={42}
              priority
              className="h-[36.8px] w-auto transition-opacity duration-300 group-hover:opacity-90 hidden dark:block"
            />
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 rounded-full border border-border bg-muted p-1 shadow-sm md:flex">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium tracking-[0.01em] text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/kits">
            <Button variant="primary" size="sm" className="rounded-md px-4 py-2 text-sm shadow-sm">
              Explore kits
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            type="button"
            aria-label="Toggle menu"
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 shadow-sm md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Navigate
            </span>
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/kits" onClick={() => setMobileMenuOpen(false)}>
              <Button className="mt-3 w-full justify-center rounded-md py-2.5 text-sm">Explore kits</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
