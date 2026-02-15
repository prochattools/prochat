import React from 'react';
import { Navbar } from '@/app/marketing-ai-studio/components/layout/Navbar';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen">
          {children}
      </main>
    </>
  );
}
