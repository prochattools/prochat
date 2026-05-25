'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const FAQS = [
    {
        q: "What is ProChat OS?",
        a: "ProChat OS is an installable Agentic Workflow OS: a private workflow runtime that connects messy inputs to business tools through memory, connectors, model routing, workflow agents, approvals, logs, and a control console."
    },
    {
        q: "Is ProChat OS a chatbot or dashboard?",
        a: "No. The dashboard is only the command center. The product is the workflow runtime that turns messy inputs like emails, files, forms, folders, notes, and APIs into structured outputs and actions."
    },
    {
        q: "What happened to BuildFlow and the kits?",
        a: "BuildFlow, SaaSKit, ProKit, UXKit, and WaaSKit remain useful legacy or supporting products, but they are not the flagship strategy. ProChat OS is the company direction."
    },
    {
        q: "Do you sell managed setup?",
        a: "Yes. The intended commercial path is managed ProChat OS: ProChat installs, configures, hosts or supports the system, and starts with one clear workflow and human approval first."
    },
    {
        q: "Is the website only for law firms?",
        a: "No. The public ProChat website is business-agnostic. Law firms are the first direct outreach wedge, using a legal document demo, but ProChat OS is broader than that niche."
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
