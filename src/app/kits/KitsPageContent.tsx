import Link from 'next/link'
import { Archive, Bot, Rocket, ShieldCheck } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const PRODUCT_CARDS = [
  {
    name: 'ProChat OS',
    description:
      'The flagship Agentic Workflow OS. It is the company direction and the system that future modules should support.',
    status: 'Flagship',
    href: '/systems/prochat-os',
    cta: 'EXPLORE — PROCHAT OS',
    icon: Bot,
    primary: true,
  },
  {
    name: 'SaaSKit',
    description:
      'A legacy/supporting SaaS foundation that remains available as a useful product, but no longer defines the company strategy.',
    status: 'Legacy product',
    href: '/kits/saaskit',
    cta: 'VIEW — SAASKIT',
    icon: Rocket,
    primary: false,
  },
  {
    name: 'ProKit',
    description:
      'A legacy/supporting lean SaaS engine for builders who want more control over brand, funnel, and product surface.',
    status: 'Legacy product',
    href: '/kits/prokit',
    cta: 'VIEW — PROKIT',
    icon: ShieldCheck,
    primary: false,
  },
  {
    name: 'BuildFlow',
    description:
      'A secondary project-context and AI workflow product. Useful, but subordinate to the ProChat OS strategy.',
    status: 'Secondary',
    href: '/buildflow',
    cta: 'VIEW — BUILDFLOW',
    icon: Archive,
    primary: false,
  },
] as const

export default function KitsPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="Legacy products and supporting modules" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">ProChat OS is the flagship.</span>
            <span className="hero-accent block">The kits are supporting products.</span>
          </>
        }
        subtitle="SaaSKit, ProKit, BuildFlow, UXKit, and WaaSKit remain useful context and legacy products, but the canonical company direction is ProChat OS: the Agentic Workflow OS."
        primaryCTA={{ href: '/systems/prochat-os', label: 'Explore ProChat OS' }}
        secondaryCTA={{ href: '#products', label: 'View supporting products', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['One flagship', 'Legacy products preserved', 'Future modules align to ProChat OS']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="products" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Product hierarchy</h2>
            <p className="pc-body-copy pc-body-muted">
              Mind is canonical. ProChat OS leads. Every product page and roadmap item should be interpreted through that strategy.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PRODUCT_CARDS.map(product => {
              const Icon = product.icon
              return (
                <Panel
                  key={product.name}
                  tone={product.primary ? 'elevated' : 'default'}
                  padding="default"
                  className={product.primary ? 'border-primary/30' : ''}
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-border-subtle bg-surface-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {product.status}
                    </span>
                  </div>
                  <h3 className="pc-card-title mb-3 text-foreground">{product.name}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <Button asChild variant={product.primary ? 'primary' : 'secondary'} size="sm">
                    <Link href={product.href}>{product.cta}</Link>
                  </Button>
                </Panel>
              )
            })}
          </div>
        </div>
      </Section>

      <Section id="legacy" tone="muted" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Legacy does not mean abandoned</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Legacy products remain real and may later become ProChat OS modules or supporting workflows. They should not be presented as the main strategy, homepage focus, or flagship product.
          </p>
        </div>
      </Section>
    </div>
  )
}
