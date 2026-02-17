import React from 'react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative z-10 min-h-screen">
      {children}
    </main>
  );
}
