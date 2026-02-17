import React from 'react';
import { Hero } from '../../../components/sections/Hero';
import { RoutingTiles } from '../../../components/sections/RoutingTiles';

export default function KitsPage() {
  return (
    <>
      <Hero 
        headline="Kits, not guesses." 
        subhead="Pick the kit that matches where you are."
        primaryCta="Explore SaaSKit"
        primaryCtaLink="/kits/saaskit"
        secondaryCta="Explore ProKit"
        secondaryCtaLink="/kits/prokit"
        microProof="Proven foundations for every stage"
      />
      <div className="-mt-32">
        <RoutingTiles />
      </div>
    </>
  );
}