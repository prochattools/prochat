import React from 'react';
import { Hero } from '../../../components/sections/Hero';
import { Trust } from '../../../components/sections/Trust';

export default function CompanyPage() {
  return (
    <>
      <Hero 
        headline="Company"
        subhead="Who we are, where we operate, and how we work."
        primaryCta="Contact us"
        primaryCtaLink="/contact"
        secondaryCta={undefined}
      />
      <Trust />
    </>
  );
}