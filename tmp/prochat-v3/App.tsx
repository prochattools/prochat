import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ProblemSolution } from './components/sections/ProblemSolution';
import { Proof } from './components/sections/Expansions';
import { ShipFast } from './components/sections/ShipFast';
import { Features } from './components/sections/Features';
import { License } from './components/sections/License';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { Scaffolding } from './components/ui/Scaffolding';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#885efe] selection:text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <Scaffolding opacity={0.6} />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProblemSolution />
        <Proof />
        <ShipFast />
        <Features />
        <License />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
};

export default App;