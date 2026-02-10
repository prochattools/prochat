'use client';
import React from 'react';
import { BlueprintCard } from '../ui/Scaffolding';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';

export const RoutingTiles: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-200 dark:bg-[#0F1626] dark:border-[#1E242D]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center dark:text-white">Choose your entry point</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              label: "No Idea Yet?",
              title: "WaaSKit",
              body: "The Client-First SaaS System. For people who don't know what to build yet. Sell websites to get paid immediately, then discover SaaS ideas from real client needs.",
              cta: "Start with clients",
              href: "/kits#waaskit",
              anchorId: "waaskit"
            },
            {
              label: "Have an Idea?",
              title: "SaaSKit",
              body: "The SaaS Launch Kit. For people who already have an audience or idea. Skip the setup and launch your product using our proven infrastructure.",
              cta: "Start with SaaSkit",
              href: "/kits/saaskit",
              anchorId: "saaskit"
            },
            {
              label: "Just the Code",
              title: "ProKit",
              body: "The Developer Core Boilerplate. Pure execution layer for builders. No strategy, no monetization guides—just the raw Next.js engine.",
              cta: "Inspect the engine",
              href: "/kits/prokit",
              anchorId: "prokit"
            }
          ].map((tile, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div id={tile.anchorId} className="h-full">
                <BlueprintCard className="h-full p-8 flex flex-col bg-white dark:bg-[#0F1424]">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 dark:text-slate-500">{tile.label}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 dark:text-white">{tile.title}</h3>
                  <p className="text-slate-500 mb-8 flex-grow leading-relaxed font-light dark:text-slate-400">{tile.body}</p>
                  <Link href={tile.href} className="inline-flex items-center gap-2 text-[#5b49f5] font-bold hover:gap-3 transition-all dark:text-[#9b8bff]">
                    {tile.cta} <ArrowRight size={16} />
                  </Link>
                </BlueprintCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
