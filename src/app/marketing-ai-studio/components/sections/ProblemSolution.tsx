'use client';
import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { BlueprintCard } from '../ui/Scaffolding';
import { Reveal } from '../ui/Reveal';

interface ProblemSolutionProps {
  title?: string;
  bullets?: string[];
  closingLine?: string;
}

const DEFAULT_BULLETS = [
  "You build the product before you have proximity to pain.",
  "You rely on free feedback instead of paid commitments.",
  "You waste energy on infrastructure before validating value."
];

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({
  title = "Most SaaS fails because of sequence.",
  bullets = DEFAULT_BULLETS,
  closingLine
}) => {
  return (
    <section className="py-32 relative bg-white border-y border-slate-100 overflow-hidden dark:bg-[#0B111B] dark:border-[#1E242D]">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* PROBLEM */}
        <div className="mb-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6">
                <Reveal>
                  <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-6 dark:bg-orange-500/10 dark:text-orange-400">
                      <AlertTriangle size={24} />
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <h2 className="text-4xl font-bold text-slate-900 leading-tight dark:text-white">
                      {title}
                  </h2>
                </Reveal>
                <Reveal delay={0.4}>
                  <ul className="space-y-4 mt-6">
                    {bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-slate-500 font-light dark:text-slate-400">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 dark:bg-orange-400/80" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                {closingLine && (
                  <Reveal delay={0.5}>
                    <p className="text-lg text-slate-500 font-light dark:text-slate-400">
                      {closingLine}
                    </p>
                  </Reveal>
                )}
            </div>
            
            {/* The Setup Trap Visual - Comparison Style */}
            <div className="relative h-80 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8 flex items-center justify-center group overflow-hidden dark:bg-[#0F1626] dark:border-[#1E242D]">
                 
                 <div className="w-full max-w-md grid grid-cols-2 gap-8 relative z-10">
                    
                    {/* Left: The Hard Way (Fragmented) */}
                    <div className="flex flex-col gap-3 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 text-center mb-1 dark:text-slate-500">Manual Setup</div>
                        {[
                            { label: "Auth Config", status: "error" },
                            { label: "Stripe API", status: "loading" },
                            { label: "DB Schema", status: "waiting" },
                            { label: "Emails", status: "waiting" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex items-center justify-between transform transition-transform group-hover:translate-x-[-2px] group-hover:rotate-[-1deg] dark:bg-[#0B111B] dark:border-[#1E242D] dark:shadow-none" style={{ transitionDelay: `${i * 50}ms` }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
                                </div>
                                {item.status === 'error' ? <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> : <div className="w-3 h-1 bg-slate-200 rounded-full animate-pulse dark:bg-slate-700" />}
                            </div>
                        ))}
                    </div>

                    {/* Right: The System Way (Unified) */}
                    <div className="flex flex-col gap-3 relative">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#5b49f5] text-center mb-1 dark:text-[#9b8bff]">System Core</div>
                        <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(91,73,245,0.15)] rounded-xl p-4 h-full relative overflow-hidden group-hover:border-[#5b49f5]/30 transition-colors dark:bg-[#0B111B] dark:border-[#2A3445] dark:shadow-none">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5b49f5] to-[#885efe]" />
                            <div className="space-y-3 pt-2">
                                {[
                                    "Identity System",
                                    "Payments & Plans",
                                    "Data Layer",
                                    "Comms Engine"
                                ].map((feature, j) => (
                                    <div key={j} className="flex items-center gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-[#5b49f5]/10 flex items-center justify-center text-[#5b49f5] dark:bg-[#5b49f5]/20">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between dark:border-[#1E242D]">
                                <span className="text-[9px] text-slate-400 font-medium dark:text-slate-500">Status</span>
                                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/20">Ready</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="absolute left-1/2 top-8 bottom-0 w-px border-l border-dashed border-slate-200 -translate-x-1/2 hidden md:block dark:border-[#2A3445]" />

                 </div>
            </div>
        </div>

      </div>
    </section>
  );
};
