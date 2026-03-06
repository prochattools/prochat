'use client';
import React from 'react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import Link from 'next/link';

interface TrustProps {
  heading?: string;
  bullets?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  disclaimer?: string;
}

const DEFAULT_BULLETS = [
  "We prioritize repeatable workflows over custom one-offs.",
  "Constraint-based building: Limits create clarity.",
  "Radical transparency: We show the work, always."
];

export const Trust: React.FC<TrustProps> = ({
  heading = "Methodology over magic.",
  bullets = DEFAULT_BULLETS,
  ctaLabel = "Company details",
  ctaHref = "/company",
  disclaimer
}) => {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200 dark:bg-surface-soft dark:border-border-subtle">
      <div className="max-w-4xl mx-auto px-page text-center">
        <Reveal>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 dark:text-white">{heading}</h2>
        </Reveal>
        
        <Reveal delay={0.3}>
            <div className="text-left max-w-lg mx-auto">
              <ul className="space-y-4 mb-10">
                  {bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 font-light text-lg dark:text-slate-300">
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                      </li>
                  ))}
              </ul>
              {disclaimer && (
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {disclaimer}
                </p>
              )}
            </div>
        </Reveal>

        {ctaLabel && ctaHref && (
          <Reveal delay={0.4}>
              <Link href={ctaHref}>
                  <Button variant="secondary">{ctaLabel}</Button>
              </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
};
