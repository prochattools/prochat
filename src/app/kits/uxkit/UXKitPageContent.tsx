import Link from 'next/link'
import { Archive, CheckCircle2 } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

export default function UXKitPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="Legacy concept" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">UXKit is preserved as</span>
            <span className="hero-accent block">a legacy UX concept.</span>
          </>
        }
        subtitle="UXKit is no longer a standalone strategic priority. Its useful interface and product workflow ideas may later become ProChat OS modules or supporting workflow patterns."
        primaryCTA={{ href: '/systems/prochat-os', label: 'Explore ProChat OS' }}
        secondaryCTA={{ href: '/kits', label: 'View legacy products', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow items={['Legacy concept', 'Not abandoned', 'Subordinate to ProChat OS']} className="mx-auto" />
      </HeroSection>

      <Section tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-6xl gap-8 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Archive className="h-5 w-5" />
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">How to interpret UXKit now</h2>
            <p className="pc-body-copy pc-body-muted">
              UXKit remains useful as historical product thinking, but ProChat OS is the flagship. Any future UXKit ideas should support agentic workflows, approvals, dashboards, and customer-facing modules inside ProChat OS.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="grid gap-4">
              {[
                'Not the flagship product',
                'Not the main website strategy',
                'Not a standalone launch track right now',
                'Useful as future ProChat OS module inspiration',
              ].map(item => (
                <div key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="cta" tone="muted" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">The strategy now leads with ProChat OS</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            UX and interface work should now be evaluated by how it helps ProChat OS turn messy inputs into structured workflows and actions.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/systems/prochat-os">EXPLORE — PROCHAT OS</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
