import Link from 'next/link'
import { getSEOTags } from '@/lib/seo/metadata'
import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'
import { PRODUCTION_GUIDE_PATH } from '@/lib/learning/production-guide'

export const metadata = getSEOTags({
  title: 'Learn | ProChat',
  description:
    'A curated four-step learning layer: Starting Point, Production Guide, AI Prompts, and Documentation.',
  canonicalUrlRelative: '/learn',
  robots: { index: true, follow: true },
})

const learningSteps = [
  {
    step: 'Step 1',
    title: 'Starting Point',
    description:
      'Clarify the buyer, outcome, and proof before you commit to a build.',
    href: '/learn/saas-starting-point',
    cta: 'OPEN — STARTING POINT',
  },
  {
    step: 'Step 2',
    title: 'Production Guide',
    description:
      'Follow the production-first sequence for turning a validated idea into a stable SaaS build.',
    href: PRODUCTION_GUIDE_PATH,
    cta: 'OPEN — PRODUCTION GUIDE',
  },
  {
    step: 'Step 3',
    title: 'AI Prompts',
    description:
      'Use practical prompts when you need execution help without losing structure.',
    href: '/prompts',
    cta: 'VIEW — PROMPTS',
  },
  {
    step: 'Step 4',
    title: 'Documentation',
    description:
      'Use the docs when implementation details, setup rules, and deployment specifics matter.',
    href: '/docs',
    cta: 'OPEN — DOCS',
  },
]

const panelClassName = 'flex h-full flex-col justify-between rounded-2xl border border-border border-dashed p-6 text-left'

export default function LearnIndexPage() {
  return (
    <div className="bg-transparent text-foreground">
      <HeroSection
        className="pc-marketing-hero--lines-mobile min-h-[100svh] border-b border-border"
        eyebrow={<HeroBadge text="How to use ProChat" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Use ProChat in the right order</span>
          </>
        }
        subtitle="This page is the onboarding layer: start with Starting Point, move into the Production Guide, use AI Prompts to execute, and use Documentation when you need implementation detail."
        subtitleClassName="text-center mx-auto"
        primaryCTA={{ href: '#sequence', label: 'SEE — THE SEQUENCE' }}
      >
        <HeroCheckRow
          items={[
            'Clarify the decision',
            'Follow the build sequence',
            'Execute with prompts',
            'Reference the docs',
          ]}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="sequence" tone="transparent" spacing="default" className="pb-36">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title text-foreground">Four steps. One learning path.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Learn is not a content warehouse. It is the small, curated layer that shows what to use first, what to use next, and where to go when the work becomes implementation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {learningSteps.map(card => (
              <Panel key={card.title} tone="soft" padding="default" className={panelClassName}>
                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {card.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                <div className="mt-4">
                  <Button asChild variant="secondary" size="sm">
                    <Link href={card.href}>{card.cta}</Link>
                  </Button>
                </div>
              </Panel>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border bg-surface/80 px-6 py-5 text-sm leading-relaxed text-muted-foreground shadow-surface">
            Start with <span className="font-semibold text-foreground">Starting Point</span> to narrow the buyer and outcome. Move into the <span className="font-semibold text-foreground">Production Guide</span> once the idea deserves a build. Use <span className="font-semibold text-foreground">AI Prompts</span> when you need execution support. Reach for <span className="font-semibold text-foreground">Documentation</span> when the work turns into implementation, setup, and deployment.
          </div>
        </div>
      </Section>
    </div>
  )
}
