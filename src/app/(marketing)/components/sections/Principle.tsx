'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const Principle: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-slate-100 dark:bg-[#0B111B] dark:border-[#1E242D]">
      <div className="max-w-4xl mx-auto px-page text-center">
        <Reveal>
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-gray-50 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider dark:bg-[#1D4ED8]/10 dark:text-[#2563EB]">
            The Principle
          </div>
        </Reveal>
        
        <Reveal delay={0.3}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 dark:text-white">Reverse the order.</h2>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xl md:text-2xl font-medium text-slate-600 mb-12 dark:text-slate-300">
            <span className="text-slate-900 dark:text-white">Cash</span>
            <ArrowRight size={20} className="text-slate-300 dark:text-slate-600" />
            <span className="text-slate-900 dark:text-white">Clients</span>
            <ArrowRight size={20} className="text-slate-300 dark:text-slate-600" />
            <span className="text-slate-900 dark:text-white">Pain</span>
            <ArrowRight size={20} className="text-slate-300 dark:text-slate-600" />
            <span className="text-[#1D4ED8] font-bold bg-[#1D4ED8]/10 px-3 py-1 rounded-lg dark:text-[#2563EB] dark:bg-[#1D4ED8]/20">SaaS</span>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl mx-auto dark:text-slate-400">
            We use a service wedge (WaaS) to get real users fast, then build SaaS only when a pain repeats and people already pay to remove it.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
