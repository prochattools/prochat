import React from 'react'

import HeroSection from '@/components/marketing/HeroSection'
import { FakeLogos } from '../ui/Visuals'

interface HeroProps {
  headline?: string | React.ReactNode
  subhead?: string
  primaryCta?: string
  primaryCtaLink?: string
  secondaryCta?: string
  secondaryCtaLink?: string
  microProof?: string
  primaryNote?: string
  onPrimaryCtaClick?: () => void
  onSecondaryCtaClick?: () => void
}

export const Hero: React.FC<HeroProps> = ({
  headline = 'The Operating System for SaaS Builders.',
  subhead = 'ProChat is a system for turning paid client pain into SaaS—start with service, find the friction, then ship the software.',
  primaryCta = 'See the system',
  primaryCtaLink = '#system',
  secondaryCta = 'Explore kits',
  secondaryCtaLink = '/kits',
  microProof = 'Operational Standard: Next.js / TypeScript / Stripe / Postgres',
  primaryNote,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}) => {
  return (
    <HeroSection
      title={headline}
      subtitle={subhead}
      primaryCTA={{
        href: primaryCtaLink,
        label: primaryCta,
        onClick: onPrimaryCtaClick,
        note: primaryNote,
      }}
      secondaryCTA={
        secondaryCta
          ? {
              href: secondaryCtaLink,
              label: secondaryCta,
              onClick: onSecondaryCtaClick,
              variant: 'secondary',
            }
          : undefined
      }
      microcopy={microProof}
      footer={<FakeLogos />}
    />
  )
}

export default Hero
