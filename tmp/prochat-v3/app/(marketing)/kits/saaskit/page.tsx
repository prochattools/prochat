import React from 'react';
import { Hero } from '../../../../components/sections/Hero';
import { Features } from '../../../../components/sections/Features';
import { FAQ } from '../../../../components/sections/FAQ';
import { Trust } from '../../../../components/sections/Trust';
import { Reveal } from '../../../../components/ui/Reveal';
import { Button } from '../../../../components/ui/Button';

export default function SaaSKitPage() {
  return (
    <>
      <Hero 
        headline="SaaSKit"
        subhead="The complete kit for non-technical founders to launch fast on a serious stack."
        primaryCta="Buy SaaSKit"
        primaryCtaLink="#"
        secondaryCta={undefined}
      />
      <Features />
      <Trust />
      <FAQ />
      <section className="py-24 bg-white text-center">
        <Reveal>
             <h2 className="text-3xl font-bold mb-8">Ready to ship?</h2>
             <Button size="lg" className="bg-[#5b49f5] text-white">Buy SaaSKit</Button>
        </Reveal>
      </section>
    </>
  );
}