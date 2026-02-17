import React from 'react';
import { Hero } from '../../../components/sections/Hero';
import { RoutingTiles } from '../../../components/sections/RoutingTiles';
import { Trust } from '../../../components/sections/Trust';

export default function StudioPage() {
  return (
    <>
      <Hero 
        headline="Studio"
        subhead="Implementation help when you want it shipped without thrash."
        primaryCta="Talk to Studio"
        primaryCtaLink="#"
        secondaryCta="See kits"
        secondaryCtaLink="/kits"
      />
      <Trust />
      <RoutingTiles />
    </>
  );
}