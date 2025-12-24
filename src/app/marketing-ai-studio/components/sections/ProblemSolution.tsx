import React from 'react';
import { AlertTriangle, Database, CreditCard, Lock, Layout, Check, X } from 'lucide-react';
import { BlueprintCard } from '../ui/Scaffolding';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-32 relative bg-white dark:bg-[#010814] border-y border-slate-100 dark:border-[#1E242D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* PROBLEM */}
        <div className="mb-32 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400 flex items-center justify-center mb-6">
                    <AlertTriangle size={24} />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                    Most founders waste weeks wiring the same basics.
                </h2>
                <p className="text-lg text-slate-500 dark:text-[#B2B5BA] font-light leading-relaxed">
                    Authentication, database connections, Stripe webhooks, email delivery... it's the same 200 hours of boring code for every project.
                </p>
            </div>
            
            {/* The Setup Trap Visual - Comparison Style */}
            <div className="relative h-80 bg-slate-50/50 dark:bg-[#0B111B] rounded-2xl border border-dashed border-slate-200 dark:border-[#373C53] p-8 flex items-center justify-center group overflow-hidden">
                 
                 <div className="w-full max-w-md grid grid-cols-2 gap-8 relative z-10">
                    
                    {/* Left: The Hard Way (Fragmented) */}
                    <div className="flex flex-col gap-3 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-[#808389] text-center mb-1">Manual Setup</div>
                        {[
                            { label: "Auth Config", status: "error" },
                            { label: "Stripe API", status: "loading" },
                            { label: "DB Schema", status: "waiting" },
                            { label: "Emails", status: "waiting" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] rounded-lg p-3 shadow-sm dark:shadow-none flex items-center justify-between transform transition-transform group-hover:translate-x-[-2px] group-hover:rotate-[-1deg]" style={{ transitionDelay: `${i * 50}ms` }}>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-[#5A5E66]" />
                                    <span className="text-[10px] font-medium text-slate-500 dark:text-[#808389]">{item.label}</span>
                                </div>
                                {item.status === 'error' ? <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> : <div className="w-3 h-1 bg-slate-200 dark:bg-[#1E242D] rounded-full animate-pulse" />}
                            </div>
                        ))}
                    </div>

                    {/* Right: The ProKit Way (Unified) */}
                    <div className="flex flex-col gap-3 relative">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#5b49f5] dark:text-[#885efe] text-center mb-1">ProKit Core</div>
                        <div className="bg-white dark:bg-[#0B111B] border border-slate-200/80 dark:border-[#373C53] shadow-[0_8px_30px_-6px_rgba(91,73,245,0.15)] dark:shadow-[0_12px_40px_-24px_rgba(0,0,0,0.7)] rounded-xl p-4 h-full relative overflow-hidden group-hover:border-[#5b49f5]/30 dark:group-hover:border-[#885efe]/40 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5b49f5] to-[#885efe]" />
                            <div className="space-y-3 pt-2">
                                {[
                                    "Identity System",
                                    "Payments & Plans",
                                    "Data Layer",
                                    "Comms Engine"
                                ].map((feature, j) => (
                                    <div key={j} className="flex items-center gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-[#5b49f5]/10 dark:bg-[#5b49f5]/20 flex items-center justify-center text-[#5b49f5] dark:text-[#885efe]">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-700 dark:text-[#B2B5BA]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E242D] flex items-center justify-between">
                                <span className="text-[9px] text-slate-400 dark:text-[#808389] font-medium">Status</span>
                                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">Ready</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="absolute left-1/2 top-8 bottom-0 w-px border-l border-dashed border-slate-200 dark:border-[#373C53] -translate-x-1/2 hidden md:block" />

                 </div>
            </div>
        </div>

        {/* SOLUTION */}
        <div className="relative">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">This is the foundation.</h2>
                <p className="text-slate-500 dark:text-[#808389] mt-4 font-light">A coherent system, not a collection of snippets.</p>
            </div>

            {/* Connected System Diagram */}
            <div className="relative max-w-6xl mx-auto">
                {/* Horizontal Connector Line */}
                <div className="absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-[#373C53] to-transparent -translate-y-1/2 hidden md:block" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                    {[
                        { icon: <Lock size={20} />, label: "Identity", sub: "Clerk Auth" },
                        { icon: <Database size={20} />, label: "Data", sub: "Prisma + Postgres" },
                        { icon: <CreditCard size={20} />, label: "Revenue", sub: "Stripe Connect" },
                        { icon: <Layout size={20} />, label: "Interface", sub: "Shadcn UI" },
                    ].map((item, i) => (
                        <BlueprintCard key={i} className="p-8 flex flex-col items-center text-center h-48 justify-center bg-white dark:bg-[#0B111B] shadow-xl shadow-slate-100/50 dark:shadow-none" label="SYSTEM">
                            <div className="w-12 h-12 rounded-full bg-[#5b49f5]/5 dark:bg-[#5b49f5]/15 text-[#5b49f5] dark:text-[#885efe] flex items-center justify-center mb-4 ring-4 ring-white dark:ring-[#0B111B]">
                                {item.icon}
                            </div>
                            <div className="font-bold text-slate-900 dark:text-white text-lg">{item.label}</div>
                            <div className="text-xs text-slate-400 dark:text-[#808389] font-mono mt-1 uppercase tracking-wide">{item.sub}</div>
                        </BlueprintCard>
                    ))}
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};
