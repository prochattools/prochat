'use client';
import React from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';

export const SystemApply: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-border-subtle bg-background py-32 text-foreground">
       {/* Background aesthetics preserved from Pricing section for visual continuity */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--pc-border-subtle-rgb)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--pc-border-subtle-rgb)/0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
       <div className="pc-hero-backdrop pointer-events-none absolute inset-0 opacity-90" />

       <div className="relative z-10 max-w-4xl mx-auto px-page text-center">
          <Reveal width="100%">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                 How to apply the system.
              </h2>
          </Reveal>
          <Reveal width="100%" delay={0.3}>
              <p className="text-muted-foreground text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
                 ProChat is the methodology. The kits are the accelerators. <br className="hidden md:block"/>
                 Choose the entry point that matches your technical confidence.
              </p>
          </Reveal>
          <Reveal width="100%" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                 <Link href="/kits/saaskit">
                    <Button className="bg-primary hover:bg-secondary text-primary-foreground h-14 px-8 text-lg border-none shadow-elevated">
                        Explore SaaSKit
                    </Button>
                 </Link>
                 <Link href="/kits/prokit">
                    <Button variant="secondary" className="h-14 px-8 text-lg">
                        Explore ProKit
                    </Button>
                 </Link>
              </div>
              <p className="text-muted-foreground text-sm mt-8 font-mono tracking-wide">
                No lock-in. Full ownership. Built for solo operators.
              </p>
          </Reveal>
       </div>
    </section>
  );
};
