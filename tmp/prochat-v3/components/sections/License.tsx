import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

export const License: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-8">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-400">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">Portable foundation</h2>
                        <p className="text-sm text-slate-500 font-light max-w-sm">
                            The system is designed to be portable: clear standards, predictable architecture, and reusable patterns—so you don’t rebuild the basics every time.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                    {["Clear license", "Simple terms", "Reusable patterns"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 uppercase tracking-wide">
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