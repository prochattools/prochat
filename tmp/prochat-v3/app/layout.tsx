import React from 'react';
import './globals.css';
import { Scaffolding } from '../components/ui/Scaffolding';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const metadata = {
  title: 'ProChat - Build SaaS without guessing',
  description: 'ProChat is a practical system: start with paid clients, extract repeating pain, then ship SaaS on a proven stack.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
            tailwind.config = {
                theme: {
                extend: {
                    fontFamily: {
                    sans: ['"Golos Text"', 'sans-serif'],
                    },
                    colors: {
                    primary: '#885efe',
                    secondary: '#5b49f5',
                    success: '#61ce70',
                    surface: {
                        50: '#f9fafb',
                        100: '#f3f4f6',
                        200: '#e5e7eb',
                        900: '#111827',
                    }
                    },
                    backgroundImage: {
                    'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
                    'grid-pattern': "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
                    },
                    animation: {
                    'float': 'float 6s ease-in-out infinite',
                    'float-delayed': 'float 6s ease-in-out 3s infinite',
                    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    },
                    keyframes: {
                    float: {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' },
                    }
                    }
                }
                }
            }
        `}} />
        <style dangerouslySetInnerHTML={{__html: `
          body {
            font-family: 'Golos Text', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
          }
          ::selection {
            background: #885efe;
            color: white;
          }
        `}} />
      </head>
      <body className="bg-gray-50 text-slate-900 selection:bg-purple-200">
        <div className="fixed inset-0 pointer-events-none z-0">
            <Scaffolding opacity={0.6} />
        </div>
        <Navbar />
        <main className="relative z-10 min-h-screen">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}