import React from 'react';
import { Hero } from '../../../components/sections/Hero';

export default function ContactPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "mailto:hello@prochat.tools";
  return (
    <>
      <Hero 
        headline="Contact"
        subhead="Reach out."
        primaryCta="Email us"
        primaryCtaLink={contactEmail}
        secondaryCta={undefined}
      />
    </>
  );
}