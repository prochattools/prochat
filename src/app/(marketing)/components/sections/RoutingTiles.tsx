'use client'

import React from 'react'
import Link from 'next/link'

import { Reveal } from '../ui/Reveal'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const ROUTING_TILES = [
  {
    label: 'Just the code',
    title: 'ProKit',
    body: 'The Developer Core Boilerplate. Pure execution layer for builders. No strategy, no monetization guides—just the raw Next.js engine.',
    cta: 'Inspect the engine',
    href: '/kits/prokit',
    anchorId: 'prokit',
  },
  {
    label: 'Have an idea?',
    title: 'SaaSKit',
    body: 'The SaaS Launch Kit. For people who already have an audience or idea. Skip the setup and launch your product using our proven infrastructure.',
    cta: 'Start with SaaSKit',
    href: '/kits/saaskit',
    anchorId: 'saaskit',
  },
  {
    label: 'No idea yet?',
    title: 'WaaSKit',
    body: 'The Client-First SaaS System. For people who do not know what to build yet. Sell websites to get paid immediately, then discover SaaS ideas from real client needs.',
    cta: 'Coming soon',
    href: null,
    anchorId: 'waaskit',
  },
] as const

export const RoutingTiles: React.FC = () => {
  return (
    <Section tone="muted" spacing="default">
      <div className="mx-auto max-w-7xl px-page">
        <Reveal>
          <h2 className="pc-section-title mb-12 text-center text-foreground">Choose your entry point</h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {ROUTING_TILES.map((tile, index) => (
            <Reveal key={tile.title} delay={index * 0.1}>
              <div id={tile.anchorId} className="h-full">
                <Panel tone="default" padding="default" className="flex h-full flex-col">
                  <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                    {tile.label}
                  </div>
                  <h3 className="pc-card-title mb-4 text-foreground">{tile.title}</h3>
                  <p className="mb-8 flex-grow text-sm leading-relaxed text-muted-foreground">{tile.body}</p>
                  {tile.href ? (
                    <Button asChild variant="tertiary" size="sm">
                      <Link href={tile.href}>{tile.cta}</Link>
                    </Button>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">{tile.cta}</span>
                  )}
                </Panel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default RoutingTiles
