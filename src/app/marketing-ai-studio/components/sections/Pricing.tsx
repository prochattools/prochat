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
    <section id="pricing" className="py-32 bg-[#0a0a0a] dark:bg-[#0B111B] relative overflow-hidden text-white">
      {/* Dark Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,73,245,0.08),transparent_70%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
                Simple, transparent pricing.
            </h2>
            <div className="flex items-center justify-center gap-6 text-slate-400 dark:text-slate-300 font-light text-sm md:text-base">
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#61ce70] rounded-full"/> One payment</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#61ce70] rounded-full"/> Code ownership</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#61ce70] rounded-full"/> No lock-in</span>
            </div>
        </div>

        <div className="max-w-md mx-auto">
            <div className="bg-[#111] rounded-2xl border border-white/10 dark:border-[#373C53] p-8 shadow-2xl relative overflow-hidden group hover:border-[#5b49f5]/50 transition-colors duration-500 transform-gpu">
                
                {/* Gradient Top Line - perfectly contained */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5b49f5] to-[#885efe]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#5b49f5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="mb-8 text-center relative z-10">
                    <div className="text-xs font-bold text-[#5b49f5] uppercase tracking-widest mb-4 bg-[#5b49f5]/10 inline-block px-3 py-1 rounded-full border border-[#5b49f5]/20">Lifetime Access</div>
                    <div className="flex items-baseline justify-center gap-3">
                        <span className="text-6xl font-bold text-white tracking-tighter">{priceText}</span>
                        <span className="text-slate-500 dark:text-slate-400 line-through text-xl"></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-light">{priceCaption}</p>
                </div>

                <div className="space-y-4 mb-8 border-t border-white/5 pt-8 relative z-10">
                    {features.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300 dark:text-slate-200">
                            <div className="w-5 h-5 rounded-full bg-[#61ce70]/10 flex items-center justify-center shrink-0">
                                <Check size={12} className="text-[#61ce70]" />
                            </div>
                            <span className="text-sm font-medium">{item}</span>
                        </div>
                    ))}
                </div>

                <Button
                    className="w-full bg-[#5b49f5] hover:bg-[#4a3bd1] border-0 h-14 text-lg font-bold shadow-lg shadow-[#5b49f5]/20 hover:shadow-[#5b49f5]/40 transition-all relative z-10"
                    onClick={onCtaClick}
                    type="button"
                >
                    {ctaLabel}
                </Button>
                
                <p className="text-center text-xs text-slate-600 dark:text-slate-500 mt-6 flex items-center justify-center gap-2 relative z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    Secure payment via Stripe
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};
