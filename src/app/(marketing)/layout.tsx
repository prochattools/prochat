import React from 'react';
import './prochat-memory-theme.css'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 min-h-screen">
      {children}
    </div>
  );
}
