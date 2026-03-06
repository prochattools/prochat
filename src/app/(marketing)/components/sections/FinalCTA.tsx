'use client';
import React from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';

interface FinalCTAProps {
  heading?: string;
  subhead?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  primaryCtaLabel?: string;
  primaryCtaLink?: string;
  onSecondaryCtaClick?: () => void;
  onPrimaryCtaClick?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  heading = "Stop guessing. Start shipping.",
  subhead = "You understand the system. Choose the path that matches your stage.",
  secondaryCtaLabel = "Start with Clients (WaaSKit)",
  secondaryCtaLink = "/kits",
  primaryCtaLabel = "Start with SaaSkit",
  primaryCtaLink = "/kits/saaskit",
  onSecondaryCtaClick,
  onPrimaryCtaClick
}) => {
  return (
    <section className="py-32 relative bg-background flex items-center justify-center border-t border-border-subtle">
       <div className="max-w-3xl mx-auto px-page text-center space-y-8">
          <Reveal width="100%">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                 {heading}
              </h2>
          </Reveal>
          {subhead && (
            <Reveal delay={0.3} width="100%">
                <p className="text-xl text-muted-foreground font-light">
                   {subhead}
                </p>
            </Reveal>
          )}
          <Reveal delay={0.4} width="100%">
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                 <Link href={secondaryCtaLink} onClick={onSecondaryCtaClick}>
                    <Button variant="secondary" size="lg" className="h-16 px-12 text-lg">
                        {secondaryCtaLabel}
                    </Button>
                 </Link>
                 <Link href={primaryCtaLink} onClick={onPrimaryCtaClick}>
                    <Button size="lg" className="h-16 px-12 text-lg bg-primary hover:bg-secondary text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all dark:shadow-[0_0_24px_-12px_rgb(var(--pc-blue-600-rgb)/0.35)] dark:hover:shadow-[0_0_34px_-12px_rgb(var(--pc-blue-600-rgb)/0.45)]">
                        {primaryCtaLabel}
                    </Button>
                 </Link>
              </div>
          </Reveal>
       </div>
    </section>
  );
};
