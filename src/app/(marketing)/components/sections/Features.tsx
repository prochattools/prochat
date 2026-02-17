'use client';
import React from 'react';
import { BlueprintCard } from '../ui/Scaffolding';
import { Users, CreditCard, Search, Database, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import Link from 'next/link';

const SYSTEMS = [
    {
        title: "Identity & Access",
        description: "Standardized auth flows (Clerk) with protected routes pre-configured.",
        icon: <Users className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Revenue Operations",
        description: "Stripe Checkout, Webhooks, and Portal integration ready to deploy.",
        icon: <CreditCard className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Growth Architecture",
        description: "SEO standards, Metadata generation, and OG images built-in.",
        icon: <Search className="text-slate-700 dark:text-slate-200" />
    },
    {
        title: "Data Persistence",
        description: "Type-safe database layer (Prisma/Postgres) for reliable scale.",
        icon: <Database className="text-slate-700 dark:text-slate-200" />
    },
];

interface FeaturesProps {
  sectionTitle?: string;
  sectionDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const Features: React.FC<FeaturesProps> = ({
  sectionTitle = "Standardized infrastructure.",
  sectionDescription = "The system demands speed. To achieve it, we eliminated architectural decisions by standardizing the engine (ProKit) that powers every kit.",
  ctaLabel = "View the engine",
  ctaHref = "/kits/prokit",
}) => {
  return (
    <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 mb-20">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {sectionTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-slate-500 mt-4 max-w-2xl font-light dark:text-slate-400">
                  {sectionDescription}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8">
                <Link href={ctaHref} className="text-[#5b49f5] font-bold hover:underline inline-flex items-center gap-2 dark:text-[#9b8bff]">
                  {ctaLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SYSTEMS.map((feature, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <BlueprintCard className="flex flex-col h-full group hover:border-[#5b49f5]/30">
                      <div className="p-6 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center group-hover:bg-[#5b49f5]/5 group-hover:text-[#5b49f5] transition-colors duration-300 dark:bg-[#0F1626] dark:border-[#2A3445] dark:group-hover:bg-[#5b49f5]/10">
                                  {feature.icon}
                              </div>
                              <div className="w-2 h-2 rounded-full bg-[#61ce70] shadow-[0_0_8px_rgba(97,206,112,0.4)] dark:shadow-none" title="Standard" />
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mb-2 dark:text-white">{feature.title}</h3>
                          <p className="text-sm text-slate-500 leading-relaxed font-light dark:text-slate-400">
                              {feature.description}
                          </p>
                      </div>
                  </BlueprintCard>
                </Reveal>
            ))}
        </div>
    </section>
  );
};
