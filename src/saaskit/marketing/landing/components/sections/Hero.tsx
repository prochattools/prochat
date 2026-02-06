import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { FakeLogos } from '../ui/Visuals';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Cinematic Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[800px] bg-gradient-to-b from-indigo-50/50 via-white/20 to-transparent dark:from-[#1E242D]/60 dark:via-[#0B111B]/40 dark:to-transparent pointer-events-none opacity-60" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center space-y-10 mt-12 md:mt-0">
        
        {/* Headlines */}
        <div className="space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[1] text-slate-900 dark:text-white"
          >
            Launch your SaaS in <br className="hidden md:block" />
            <span className="text-slate-400 dark:text-[#808389]">days, not months.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl mx-auto space-y-3"
          >
            <p className="text-xl md:text-2xl text-slate-600 dark:text-[#B2B5BA] font-light leading-relaxed">
              A production-ready SaaS foundation with authentication, payments, emails, SEO, and UI—already wired together.
            </p>
            <p className="text-sm md:text-base text-slate-400 dark:text-[#808389] font-medium">
              Start with a working product, not a blank folder.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center space-y-10"
        >
          <Button href="/waiting-list" size="lg" className="h-16 px-12 text-lg bg-[#5b49f5] hover:bg-[#4a3bd1] shadow-[0_0_40px_-10px_rgba(91,73,245,0.4)] hover:shadow-[0_0_60px_-10px_rgba(91,73,245,0.5)] dark:shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_0_40px_-18px_rgba(91,73,245,0.35)] transition-all duration-300">
            Get SaaSKit
          </Button>
          
          {/* Proof Strip */}
          <div className="flex flex-col items-center gap-5 pt-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-[#808389]">
              Built from the same foundation used to ship real products
            </p>
            <FakeLogos />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
