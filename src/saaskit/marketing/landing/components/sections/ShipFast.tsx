import React from 'react';
import { Terminal, Key, Rocket } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 relative bg-white dark:bg-[#010814] border-b border-slate-100 dark:border-[#1E242D]">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-24">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How it works</h2>
            <p className="text-slate-500 dark:text-[#808389] mt-2 font-light">Three steps to production.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative mb-16">
             {/* Connecting Line */}
             <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-px bg-slate-200 dark:bg-[#373C53]" />

             {[
                 { step: "01", title: "Get the foundation", sub: "Clone the repo", icon: <Terminal size={24} /> },
                 { step: "02", title: "Add your keys", sub: "Connect services", icon: <Key size={24} /> },
                 { step: "03", title: "Go live", sub: "Deploy to Vercel", icon: <Rocket size={24} /> },
             ].map((item, i) => (
                 <div key={i} className="relative flex flex-col items-center text-center group z-10">
                     <div className="w-20 h-20 rounded-2xl bg-white dark:bg-[#0B111B] border border-slate-200 dark:border-[#373C53] shadow-sm dark:shadow-none flex items-center justify-center mb-8 text-slate-400 dark:text-[#808389] group-hover:text-[#5b49f5] dark:group-hover:text-[#885efe] group-hover:border-[#5b49f5]/30 dark:group-hover:border-[#885efe]/40 group-hover:shadow-[0_0_30px_-10px_rgba(91,73,245,0.2)] dark:group-hover:shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)] transition-all duration-500">
                         {item.icon}
                     </div>
                     <div className="absolute top-0 right-[calc(50%-40px)] -mt-3 -mr-3 w-8 h-8 rounded-full bg-slate-50 dark:bg-[#1E242D] border border-slate-100 dark:border-[#373C53] flex items-center justify-center text-xs font-bold text-[#5b49f5] dark:text-[#885efe] font-mono shadow-sm dark:shadow-none">
                        {item.step}
                     </div>
                     <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{item.title}</h3>
                     <p className="text-sm text-slate-500 dark:text-[#808389]">{item.sub}</p>
                 </div>
             ))}
        </div>

        <div className="text-center">
            <div className="inline-block px-4 py-2 bg-slate-50 dark:bg-[#0B111B] rounded border border-dashed border-slate-200 dark:border-[#373C53] text-xs font-mono text-slate-500 dark:text-[#808389]">
                If you can edit environment variables, you can ship.
            </div>
        </div>

      </div>
    </section>
  );
};
