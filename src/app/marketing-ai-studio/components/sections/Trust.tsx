'use client';
import React from 'react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import Link from 'next/link';

export const Trust: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200 dark:bg-[#0F1626] dark:border-[#1E242D]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 dark:text-white">Methodology over magic.</h2>
        </Reveal>
        
        <Reveal delay={0.3}>
            <ul className="space-y-4 mb-10 text-left max-w-lg mx-auto">
                {[
                    "We prioritize repeatable workflows over custom one-offs.",
                    "Constraint-based building: Limits create clarity.",
                    "Radical transparency: We show the work, always."
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-light text-lg dark:text-slate-300">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5b49f5]" />
                        {item}
                    </li>
                ))}
            </ul>
        </Reveal>

        <Reveal delay={0.4}>
            <Link href="/company">
                <Button variant="secondary">Company details</Button>
            </Link>
        </Reveal>
      </div>
    </section>
  );
};
