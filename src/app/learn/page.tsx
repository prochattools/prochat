import Link from 'next/link'
import { getSEOTags } from '@/lib/seo/metadata'
import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

export const metadata = getSEOTags({
  title: 'Learn | ProChat',
  description: 'Starting Point, AI prompts, and the docs that power ProChat kits and systems.',
  canonicalUrlRelative: '/learn',
})

const resourceCards = [
  {
    title: 'Starting Point',
    description: 'The Preparation Framework that clarifies your buyer, outcome, and proof before building.',
    href: '/learn/saas-starting-point',
    cta: 'OPEN — STARTING POINT',
  },
  {
    title: 'AI Prompts',
    description: 'Practical prompts for founders taking validated ideas into action.',
    href: '/prompts',
    cta: 'VIEW — PROMPTS',
  },
  {
    title: 'Documentation',
    description: 'Structured docs for the operating system, kits, and system practices.',
    href: '/docs',
    cta: 'OPEN — DOCS',
  },
]

const panelClassName = 'flex h-full flex-col justify-between rounded-2xl border border-border border-dashed p-6 text-left'

export default function LearnIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection
        className="pc-marketing-hero--lines-mobile min-h-[100svh] border-b border-border"
        eyebrow={<HeroBadge text="Resources for SaaS builders" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Learn the system behind SaaS</span>
          </>
        }
        subtitle="Starting Point, curated prompts, and structured docs for non-technical founders building software businesses with more clarity."
        subtitleClassName="text-center mx-auto"
        primaryCTA={{ href: '#resources', label: 'BROWSE — RESOURCES' }}
      >
        <HeroCheckRow
          items={['Start with the framework', 'Use proven prompts', 'Reference the docs']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="resources" tone="transparent" spacing="default" className="pb-36">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title text-foreground">Lean resource hub</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Only the foundational preparation, AI prompts, and documentation you need to move from clarity to launch.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {resourceCards.map(card => (
              <Panel key={card.title} tone="soft" padding="default" className={panelClassName}>
                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Resource
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
        </div>
      </Section>
    </div>
  )
}
