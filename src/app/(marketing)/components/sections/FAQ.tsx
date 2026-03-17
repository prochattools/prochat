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
        a: "For WaaSKit, no. You can start with no-code service. For SaaSKit and ProKit, basic familiarity with React/Next.js is recommended, though we provide structured docs and walkthroughs."
    },
    {
        q: "Is ProChat a course?",
        a: "It’s a hybrid. You get the system and the code. We do not just explain the workflow - we give you the standardized asset to do it."
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
    <section className="py-24 bg-background relative">
        <div className="max-w-3xl mx-auto px-page">
            <Reveal width="100%">
                <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
            </Reveal>

            <div className="space-y-4">
                {FAQS.map((faq, i) => (
                    <Reveal key={i} delay={i * 0.1} width="100%">
                        <div
                            className={`
                                group relative bg-surface border rounded-2xl overflow-hidden transition-all duration-300 transform-gpu
                                ${openIndex === i
                                    ? 'border-primary/30 shadow-surface ring-1 ring-primary/10'
                                    : 'border-border-subtle shadow-sm hover:border-border'
                                }
                            `}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-bold transition-colors duration-200 ${openIndex === i ? 'text-primary' : 'text-foreground'}`}>
                                    {faq.q}
                                </span>
                                <div className={`
                                    flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200
                                    ${openIndex === i ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'bg-muted text-muted-foreground group-hover:bg-muted/80'}
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
                                <div className="px-6 pb-6 pt-0 text-muted-foreground text-sm leading-relaxed whitespace-pre-line border-t border-dashed border-border-subtle mt-2 pt-4">
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
