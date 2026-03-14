import Link from 'next/link'
import { getSEOTags } from '@/lib/seo/metadata'
import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import ScrollHintWrapper from '@/components/ui/ScrollHintWrapper'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'
import { cn } from '@/helpers/utils'

export const metadata = getSEOTags({
  title: 'Learn SaaS | ProChat',
  description: 'Guides, frameworks, and resources for founders building software businesses.',
  canonicalUrlRelative: '/learn',
})

const resourceCards = [
  {
    title: 'Guides',
    description: 'Foundational guides for understanding how SaaS businesses are built.',
    href: '/guides',
    cta: 'VIEW — GUIDES',
  },
  {
    title: 'SaaS Glossary',
    description: 'Clear definitions of SaaS terms, concepts, and founder language.',
    href: '/saas-glossary',
    cta: 'VIEW — GLOSSARY',
  },
  {
    title: 'Articles',
    description: 'Ideas and insights on building, launching, and growing SaaS products.',
    href: '/blog',
    cta: 'VIEW — ARTICLES',
  },
  {
    title: 'Playbooks',
    description: 'Structured operational systems for moving from idea to execution.',
    href: '/playbooks',
    cta: 'VIEW — PLAYBOOKS',
  },
  {
    title: 'Prompts',
    description: 'Practical AI prompts and workflows for founders building with ProChat.',
    href: '/prompts',
    cta: 'VIEW — PROMPTS',
  },
  {
    title: 'Snippets',
    description: 'Reusable code and automation examples for faster execution.',
    href: '/snippets',
    cta: 'VIEW — SNIPPETS',
  },
]

const panelClassName = 'flex h-full flex-col justify-between rounded-2xl border border-border border-dashed p-6 text-left'

export default function LearnIndexPage() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection
        className="min-h-[100svh] border-b border-border"
        eyebrow={<HeroBadge text="Resources for SaaS builders" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Learn the system behind SaaS</span>
          </>
        }
        subtitle="Guides, playbooks, prompts, and resources for non-technical founders building software businesses with more clarity."
        subtitleClassName="text-center mx-auto"
        primaryCTA={{ href: '#resources', label: 'BROWSE — RESOURCES' }}
      >
        <HeroCheckRow
          items={['Learn SaaS faster', 'Find the right resource', 'Build with clarity']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="resources" tone="transparent" spacing="default" className="pb-36">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="pc-section-title text-foreground">Resource hub</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            One place to find the guides, definitions, playbooks, prompts, and examples that help you build with more clarity.
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
