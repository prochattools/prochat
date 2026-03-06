'use client';
import React from 'react';
import { Button } from '../ui/Button';
import { Check } from 'lucide-react';

interface PricingProps {
  ctaLabel?: string;
  onCtaClick?: () => void;
  priceText?: string;
  priceCaption?: string;
  features?: string[];
}

const DEFAULT_FEATURES = [
  "Unlimited Projects",
  "Full Source Code",
  "Lifetime Updates",
  "Discord Community",
  "Documentation",
  "Commercial License",
];

export const Pricing: React.FC<PricingProps> = ({
  ctaLabel = 'Get ProKit',
  onCtaClick,
  priceText = '€97',
  priceCaption = 'Pay once. Build forever.',
  features = DEFAULT_FEATURES,
}) => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-border-subtle bg-surface-elevated py-32 text-foreground"
    >
      {/* Dark Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--pc-border-rgb)/0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--pc-border-rgb)/0.22)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--pc-blue-600-rgb)/0.11),transparent_70%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-page">
        
        <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Simple, transparent pricing.
            </h2>
            <div className="flex items-center justify-center gap-6 text-sm font-light text-muted-foreground md:text-base">
                <span className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-emerald-500"/> One payment</span>
                <span className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-emerald-500"/> Code ownership</span>
                <span className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-emerald-500"/> No lock-in</span>
            </div>
        </div>

        <div className="max-w-md mx-auto">
            <div className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-8 shadow-elevated transition-colors duration-500 hover:border-primary/40">
                
                {/* Gradient Top Line - perfectly contained */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-8 text-center relative z-10">
                    <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">Lifetime Access</div>
                    <div className="flex items-baseline justify-center gap-3">
                        <span className="text-6xl font-bold tracking-tighter text-foreground">{priceText}</span>
                        <span className="text-xl line-through text-muted-foreground"></span>
                    </div>
                    <p className="mt-4 text-sm font-light text-muted-foreground">{priceCaption}</p>
                </div>

                <div className="relative z-10 mb-8 space-y-4 border-t border-border-subtle pt-8">
                    {features.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-foreground">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                                <Check size={12} className="text-emerald-500" />
                            </div>
                            <span className="text-sm font-medium">{item}</span>
                        </div>
                    ))}
                </div>

                <Button
                    className="relative z-10 h-14 w-full border-0 bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
                    onClick={onCtaClick}
                    type="button"
                >
                    {ctaLabel}
                </Button>
                
                <p className="relative z-10 mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Secure payment via Stripe
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};
