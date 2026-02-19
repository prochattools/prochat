'use client';

import React from 'react';
import { Hero } from './components/sections/Hero';
import { ProblemSolution } from './components/sections/ProblemSolution';
import { Principle } from './components/sections/Principle';
import { ShipFast } from './components/sections/ShipFast';
import { Features } from './components/sections/Features';
import { RoutingTiles } from './components/sections/RoutingTiles';
import { Proof } from './components/sections/Expansions';
import { Trust } from './components/sections/Trust';
import { SystemApply } from './components/sections/SystemApply';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { Scaffolding } from './components/ui/Scaffolding';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-[#2563EB]/20 dark:bg-[#0B111B] dark:text-[#E6EAF2] dark:selection:bg-[#1D4ED8]/40 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Scaffolding opacity={0.6} />
      </div>
      <div className="relative z-10 min-h-screen">
        <Hero />
        <ProblemSolution />
        <Principle />
        <ShipFast />
        <Features />
        <RoutingTiles />
        <Proof />
        <Trust />
        <SystemApply />
        <FAQ />
        <FinalCTA />
      </div>
    </main>
  );
};

export default App;
