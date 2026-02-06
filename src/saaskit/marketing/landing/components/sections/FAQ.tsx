import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        q: "What do I get?",
        a: `A complete, production-ready codebase. 
        
        This isn't just a template. It's a functioning Node.js app with Auth, Database, Payments, and Emails already connected. You clone the repo, add your keys, and you have a running SaaS.
        
        You save ~40-60 hours of "boring" setup time.`
    },
    { 
        q: "What is the tech stack?", 
        a: "The industry standard: Next.js 14, TailwindCSS, Prisma (Database), Stripe (Payments), Clerk (Auth), and Resend (Emails). It's modern, easy to hire for, and easy to maintain." 
    },
    { 
        q: "Is it just a website template?", 
        a: "No. A template is just HTML/CSS. This is a framework. It has backend logic, database connections, API routes, and protected user dashboards. It is a real application foundation." 
    },
    { 
        q: "Why SaaSKit vs other boilerplates?", 
        a: "We prioritize code quality and design. Most boilerplates look generic. SaaSKit is designed to look like a $50k agency build out of the box. We also include a real documentation site, not just a README." 
    },
    { 
        q: "Are there any hidden costs?", 
        a: "No. You pay once for the code. The 3rd party tools we use (Stripe, Resend, Clerk) all have generous free tiers that will last you until you are profitable." 
    },
    { 
        q: "Can I get a refund?", 
        a: "Because this is downloadable code, I cannot offer automated refunds. However, if you are truly stuck or unhappy, email me personally. I treat people fairly and want you to win." 
    },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-[#010814] relative">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
                {FAQS.map((faq, i) => (
                    <div 
                        key={i} 
                        className={`
                            relative bg-white dark:bg-[#0B111B] border rounded-2xl overflow-hidden transition-all duration-300 transform-gpu
                            ${openIndex === i 
                                ? 'border-[#5b49f5]/30 dark:border-[#885efe]/40 shadow-[0_4px_20px_-10px_rgba(91,73,245,0.15)] dark:shadow-[0_12px_30px_-20px_rgba(0,0,0,0.7)] ring-1 ring-[#5b49f5]/10 dark:ring-[#885efe]/20' 
                                : 'border-slate-200 dark:border-[#373C53] shadow-sm dark:shadow-none hover:border-slate-300 dark:hover:border-[#5b6285]'
                            }
                        `}
                    >
                        <button 
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <span className={`font-bold transition-colors duration-200 ${openIndex === i ? 'text-[#5b49f5] dark:text-[#885efe]' : 'text-slate-900 dark:text-white'}`}>
                                {faq.q}
                            </span>
                            <div className={`
                                flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200
                                ${openIndex === i ? 'bg-[#5b49f5]/10 text-[#5b49f5] dark:bg-[#5b49f5]/20 dark:text-[#885efe]' : 'bg-slate-100 text-slate-400 dark:bg-[#1E242D] dark:text-[#808389] group-hover:bg-slate-200 dark:group-hover:bg-[#2A3442]'}
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
                            <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-[#B2B5BA] text-sm leading-relaxed whitespace-pre-line border-t border-dashed border-slate-100 dark:border-[#1E242D] mt-2 pt-4">
                                {faq.a}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
