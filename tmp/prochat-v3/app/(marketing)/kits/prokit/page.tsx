import React from 'react';
import { Hero } from '../../../../components/sections/Hero';
import { Pricing } from '../../../../components/sections/Pricing';
import { Features } from '../../../../components/sections/Features';
import { Proof } from '../../../../components/sections/Expansions';

export default function ProKitPage() {
  return (
    <>
      <Hero 
        headline="ProKit"
        subhead="The dev-first foundation that powers everything in ProChat."
        primaryCta="Buy ProKit"
        primaryCtaLink="#pricing"
        secondaryCta={undefined}
      />
      <Features />
      <Proof />
      <Pricing />
    </>
  );
}