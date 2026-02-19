'use client';
import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { FakeLogos } from '../ui/Visuals';
import Link from 'next/link';

interface HeroProps {
  headline?: string | React.ReactNode;
  subhead?: string;
  primaryCta?: string;
  primaryCtaLink?: string;
  secondaryCta?: string;
  secondaryCtaLink?: string;
  microProof?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  headline = "Build SaaS without guessing.",
  subhead = "ProChat is a system for turning paid client pain into SaaS—start with service, find the friction, then ship the software.",
  primaryCta = "See the system",
  primaryCtaLink = "#system",
  secondaryCta = "Explore kits",
  secondaryCtaLink = "/kits",
  microProof = "Operational Standard: Next.js / TypeScript / Stripe / Postgres",
  onPrimaryCtaClick,
  onSecondaryCtaClick
}) => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20">
      
      {/* Cinematic Spotlight */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-gray-50/60 via-white/20 to-transparent pointer-events-none opacity-60 dark:from-[#1C2140]/50 dark:via-[#0B111B]/30" />

      <div className="relative z-20 max-w-5xl mx-auto px-8 w-full flex flex-col items-center text-center space-y-10 mt-12 md:mt-0">
        
        {/* Headlines */}
        <div className="space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[1] text-slate-900 dark:text-white"
          >
            {headline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl mx-auto space-y-3"
          >
            <p className="text-lg md:text-2xl text-slate-600 font-light leading-relaxed dark:text-slate-300">
              {subhead}
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center space-y-10 w-full"
        >
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center">
            <Link href={primaryCtaLink} className="w-full md:w-auto" onClick={onPrimaryCtaClick}>
              <Button size="lg" className="w-full md:w-auto h-16 px-12 text-lg bg-[#1D4ED8] hover:bg-[#2563EB] shadow-[0_0_40px_-10px_rgba(29,78,216,0.4)] hover:shadow-[0_0_60px_-10px_rgba(29,78,216,0.5)] transition-all duration-300 dark:shadow-[0_0_26px_-12px_rgba(29,78,216,0.35)] dark:hover:shadow-[0_0_36px_-12px_rgba(29,78,216,0.45)]">
                {primaryCta}
              </Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCtaLink} className="w-full md:w-auto" onClick={onSecondaryCtaClick}>
                <Button variant="secondary" size="lg" className="w-full md:w-auto h-16 px-12 text-lg">
                  {secondaryCta}
                </Button>
              </Link>
            )}
          </div>
          
          {/* Proof Strip */}
          <div className="flex flex-col items-center gap-5 pt-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {microProof}
            </p>
            <FakeLogos />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
