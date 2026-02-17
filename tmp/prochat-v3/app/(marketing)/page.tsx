import React from 'react';
import { Hero } from '../../components/sections/Hero';
import { ProblemSolution } from '../../components/sections/ProblemSolution';
import { Principle } from '../../components/sections/Principle';
import { ShipFast } from '../../components/sections/ShipFast';
import { Features } from '../../components/sections/Features';
import { RoutingTiles } from '../../components/sections/RoutingTiles';
import { Proof } from '../../components/sections/Expansions';
import { Trust } from '../../components/sections/Trust';
import { SystemApply } from '../../components/sections/SystemApply';
import { FAQ } from '../../components/sections/FAQ';
import { FinalCTA } from '../../components/sections/FinalCTA';

export default function Home() {
  return (
    <>
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
    </>
  );
}