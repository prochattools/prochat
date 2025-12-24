import React from 'react';
import { Button } from '../ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 relative bg-white dark:bg-[#010814] flex items-center justify-center border-t border-slate-100 dark:border-[#1E242D]">
       <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
             You already have the idea. <br/>
             <span className="text-[#5b49f5]">ProKit removes the excuses.</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-[#B2B5BA] font-light">
             Stop wiring tools together. Start shipping.
          </p>
          <div className="pt-8">
             <Button size="lg" className="h-16 px-12 text-xl bg-[#5b49f5] hover:bg-[#4a3bd1] text-white shadow-xl shadow-[#5b49f5]/20 hover:shadow-[#5b49f5]/40 dark:shadow-[0_16px_40px_-22px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_0_40px_-20px_rgba(91,73,245,0.35)] transition-all">
                Get ProKit
             </Button>
          </div>
       </div>
    </section>
  );
};
