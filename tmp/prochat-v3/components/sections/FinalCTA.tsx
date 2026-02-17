'use client';
import React from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { Reveal } from '../ui/Reveal';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 relative bg-white flex items-center justify-center border-t border-slate-100">
       <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <Reveal width="100%">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                 Stop guessing. Start shipping.
              </h2>
          </Reveal>
          <Reveal delay={0.3} width="100%">
              <p className="text-xl text-slate-500 font-light">
                 You understand the system. Choose the path that matches your stage.
              </p>
          </Reveal>
          <Reveal delay={0.4} width="100%">
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                 <Link href="/kits">
                    <Button variant="secondary" size="lg" className="h-16 px-12 text-lg">
                        Start with Clients (WaaSKit)
                    </Button>
                 </Link>
                 <Link href="/kits/saaskit">
                    <Button size="lg" className="h-16 px-12 text-lg bg-[#5b49f5] hover:bg-[#4a3bd1] text-white shadow-xl shadow-[#5b49f5]/20 hover:shadow-[#5b49f5]/40 transition-all">
                        Start with SaaS (SaaSKit)
                    </Button>
                 </Link>
              </div>
          </Reveal>
       </div>
    </section>
  );
};