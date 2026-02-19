'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const FAQS = [
    {
        q: "What is the difference between the kits?",
        a: "WaaSKit starts with clients (no idea required). SaaSKit starts with your idea (skip the service). All paths use the same underlying system. The difference is where you start."
    },
    {
        q: "Do I need to be technical?",
        a: "For WaaSKit, no—you can start with no-code service. For SaaSKit and ProKit, basic familiarity with React/Next.js is recommended, though we provide detailed guides."
    },
    {
        q: "Is ProChat a course?",
        a: "It’s a hybrid. You get the strategy (Playbook) and the code (Kits). We don't just teach you 'how'—we give you the standardized asset to do it."
    },
    {
        q: "Do you sell services?",
        a: "We selectively help operators implement the system via Studio, but our core focus is giving you the kits to build it yourself."
    },
    {
        q: "Where should I start?",
        a: "If you don't have paid clients or an idea yet, start with WaaSKit. If you have an idea ready to code, start with SaaSKit."
    }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative dark:bg-[#0B111B]">
        <div className="max-w-3xl mx-auto px-6">
            <Reveal width="100%">
                <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center dark:text-white">Frequently Asked Questions</h2>
            </Reveal>

            <div className="space-y-4">
                {FAQS.map((faq, i) => (
                    <Reveal key={i} delay={i * 0.1} width="100%">
                        <div
                            className={`
                                relative bg-white border rounded-2xl overflow-hidden transition-all duration-300 transform-gpu dark:bg-[#0F1424]
                                ${openIndex === i
                                    ? 'border-[#1D4ED8]/30 shadow-[0_4px_20px_-10px_rgba(29,78,216,0.15)] ring-1 ring-[#1D4ED8]/10 dark:border-[#1D4ED8]/40 dark:ring-[#1D4ED8]/20 dark:shadow-none'
                                    : 'border-slate-200 shadow-sm hover:border-slate-300 dark:border-[#1E242D] dark:hover:border-[#2A3445] dark:shadow-none'
                                }
                            `}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-bold transition-colors duration-200 ${openIndex === i ? 'text-[#1D4ED8] dark:text-[#2563EB]' : 'text-slate-900 dark:text-slate-100'}`}>
                                    {faq.q}
                                </span>
                                <div className={`
                                    flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200
                                    ${openIndex === i ? 'bg-[#1D4ED8]/10 text-[#1D4ED8] dark:bg-[#1D4ED8]/20 dark:text-[#2563EB]' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 dark:bg-[#1A2233] dark:text-slate-500 dark:group-hover:bg-[#22304A]'}
                                `}>
                                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                                </div>
                            </button>

                            <div
                                className={`
                                    transition-all duration-300 ease-in-out
                                    ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                `}
                            >
                                <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed whitespace-pre-line border-t border-dashed border-slate-100 mt-2 pt-4 dark:text-slate-400 dark:border-[#1E242D]">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
};
