import React from 'react';
import { Hero } from '../../../components/sections/Hero';
import { Proof } from '../../../components/sections/Expansions';

export default function ProofPage() {
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "#";
  return (
    <>
      <Hero 
        headline="Proof"
        subhead="Build logs, real UI, shipping in public."
        primaryCta="Watch the build series"
        primaryCtaLink={youtubeUrl}
        secondaryCta={undefined}
      />
      <Proof />
    </>
  );
}