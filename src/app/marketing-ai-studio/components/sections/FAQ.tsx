'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const FAQS = [
    {
        q: "What is ProChat?",
        a: "ProChat is a practical system for building SaaS from paid client pain—so you don’t guess what to build."
    },
    { 
        q: "Who is this for?", 
        a: "Non-technical founders and operators who want a repeatable way to validate demand before building." 
    },
    { 
        q: "Is ProChat a product or a methodology?", 
        a: "It’s a methodology first. The kits are optional tools that help you apply it faster." 
    },
    { 
        q: "Do you sell services?", 
        a: "Yes, selectively. Studio exists for implementation help, but the core focus is selling repeatable kits—not custom work." 
    },
    {
        q: "Where do the kits fit?",
        a: "Kits are how you apply the system at different stages: SaaSKit for founders, ProKit for builders."
    }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-6">
            <Reveal width="100%">
                <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
            </Reveal>
            
            <div className="space-y-4">
                {FAQS.map((faq, i) => (
                    <Reveal key={i} delay={i * 0.1} width="100%">
                        <div 
                            className={`
                                relative bg-white border rounded-2xl overflow-hidden transition-all duration-300 transform-gpu
                                ${openIndex === i 
                                    ? 'border-[#5b49f5]/30 shadow-[0_4px_20px_-10px_rgba(91,73,245,0.15)] ring-1 ring-[#5b49f5]/10' 
                                    : 'border-slate-200 shadow-sm hover:border-slate-300'
                                }
                            `}
                        >
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-bold transition-colors duration-200 ${openIndex === i ? 'text-[#5b49f5]' : 'text-slate-900'}`}>
                                    {faq.q}
                                </span>
                                <div className={`
                                    flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200
                                    ${openIndex === i ? 'bg-[#5b49f5]/10 text-[#5b49f5]' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
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
                                <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed whitespace-pre-line border-t border-dashed border-slate-100 mt-2 pt-4">
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