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
        icon: <Users className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
    },
    {
        title: "Revenue Operations",
        description: "Stripe Checkout, Webhooks, and Portal integration ready to deploy.",
        icon: <CreditCard className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
    },
    {
        title: "Growth Architecture",
        description: "SEO standards, Metadata generation, and OG images built-in.",
        icon: <Search className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
    },
    {
        title: "Data Persistence",
        description: "Type-safe database layer (Prisma/Postgres) for reliable scale.",
        icon: <Database className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
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
        <div className="max-w-7xl mx-auto px-page mb-20">
            <Reveal>
              <h2 className="text-3xl font-bold text-foreground">
                  {sectionTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-muted-foreground mt-4 max-w-2xl font-light">
                  {sectionDescription}
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8">
                <Link href={ctaHref} className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                  {ctaLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
        </div>

        <div className="max-w-7xl mx-auto px-page grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SYSTEMS.map((feature, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <BlueprintCard className="flex flex-col h-full group hover:border-primary/30">
                      <div className="p-6 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                              <div className="w-10 h-10 bg-surface-soft rounded-lg border border-border-subtle flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-300 dark:group-hover:bg-primary/10">
                                  {feature.icon}
                              </div>
                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgb(16_185_129/0.4)] dark:shadow-none" title="Standard" />
                          </div>
                          <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed font-light">
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
