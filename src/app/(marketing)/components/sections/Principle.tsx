'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const Principle: React.FC = () => {
  return (
    <section className="py-24 bg-background border-b border-border-subtle">
      <div className="max-w-4xl mx-auto px-page text-center">
        <Reveal>
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-surface-soft text-primary text-xs font-bold uppercase tracking-wider dark:bg-primary/10">
            The Principle
          </div>
        </Reveal>
        
        <Reveal delay={0.3}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Reverse the order.</h2>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xl md:text-2xl font-medium text-muted-foreground mb-12">
            <span className="text-foreground">Cash</span>
            <ArrowRight size={20} className="text-border-strong" />
            <span className="text-foreground">Clients</span>
            <ArrowRight size={20} className="text-border-strong" />
            <span className="text-foreground">Pain</span>
            <ArrowRight size={20} className="text-border-strong" />
            <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg dark:bg-primary/20">SaaS</span>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            We use a service wedge (WaaS) to get real users fast, then build SaaS only when a pain repeats and people already pay to remove it.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
