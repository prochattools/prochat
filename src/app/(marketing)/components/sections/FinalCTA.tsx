import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/surface'

interface FinalCTAProps {
  heading?: string
  subhead?: string
  secondaryCtaLabel?: string
  secondaryCtaLink?: string
  primaryCtaLabel?: string
  primaryCtaLink?: string
  onSecondaryCtaClick?: () => void
  onPrimaryCtaClick?: () => void
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  heading = 'Stop guessing. Start shipping.',
  subhead = 'You understand the system. Choose the path that matches your stage.',
  secondaryCtaLabel = 'Start with Clients (WaaSKit)',
  secondaryCtaLink = '/kits',
  primaryCtaLabel = 'Start with SaaSKit',
  primaryCtaLink = '/kits/saaskit',
  onSecondaryCtaClick,
  onPrimaryCtaClick,
}) => {
  return (
    <Section tone="surface" spacing="loose">
      <div className="mx-auto max-w-3xl px-page text-center">
        <h2 className="pc-section-title mb-8 text-foreground">{heading}</h2>
        {subhead ? <p className="pc-body-copy pc-body-muted mb-10">{subhead}</p> : null}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="secondary" size="lg">
            <Link href={secondaryCtaLink} onClick={onSecondaryCtaClick}>
              {secondaryCtaLabel}
            </Link>
          </Button>
          <Button asChild variant="primary" size="lg">
            <Link href={primaryCtaLink} onClick={onPrimaryCtaClick}>
              {primaryCtaLabel}
            </Link>
          </Button>
        </div>
        <p className="pc-cta-note mt-4">Production foundation included.</p>
      </div>
    </Section>
  )
}

export default FinalCTA
