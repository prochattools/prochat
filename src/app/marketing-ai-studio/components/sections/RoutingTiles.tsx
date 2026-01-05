'use client';
import React from 'react';
import { BlueprintCard } from '../ui/Scaffolding';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';

export const RoutingTiles: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">System entry points</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              label: "I am a Founder",
              title: "SaaSKit",
              body: "A complete, opinionated starter kit for launching the system's output.",
              cta: "Execute the system",
              href: "/kits/saaskit"
            },
            {
              label: "I am a Builder",
              title: "ProKit",
              body: "The unopinionated architectural foundation for custom implementations.",
              cta: "Inspect the engine",
              href: "/kits/prokit"
            },
            {
              label: "I need support",
              title: "Studio",
              body: "Direct implementation support for operators scaling the system.",
              cta: "Partner with us",
              href: "/studio"
            }
          ].map((tile, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <BlueprintCard className="h-full p-8 flex flex-col bg-white">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{tile.label}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{tile.title}</h3>
                <p className="text-slate-500 mb-8 flex-grow leading-relaxed font-light">{tile.body}</p>
                <Link href={tile.href} className="inline-flex items-center gap-2 text-[#5b49f5] font-bold hover:gap-3 transition-all">
                  {tile.cta} <ArrowRight size={16} />
                </Link>
              </BlueprintCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};