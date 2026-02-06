import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

export const License: React.FC = () => {
  return (
    <section id="license" className="py-16 bg-white dark:bg-[#010814] border-t border-slate-100 dark:border-[#1E242D]">
        <div className="max-w-4xl mx-auto px-6">
            <div className="bg-slate-50 dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-[#1E242D] border-2 border-slate-200 dark:border-[#373C53] flex items-center justify-center flex-shrink-0 text-slate-400 dark:text-[#808389]">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Code Ownership</h2>
                        <p className="text-sm text-slate-500 dark:text-[#808389] font-light max-w-sm">
                            You get full source code access. Build unlimited projects. No recurring fees or royalties.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                    {["MIT Licensed", "No royalties", "Unlimited projects"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] rounded text-xs font-bold text-slate-600 dark:text-[#B2B5BA] uppercase tracking-wide">
                            <Check size={12} className="text-[#61ce70]" />
                            {item}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
};
