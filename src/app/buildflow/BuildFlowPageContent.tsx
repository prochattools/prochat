import Link from 'next/link'
import { Archive, FileSearch, GitBranch, ShieldCheck } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const features = [
  {
    title: 'Project context',
    description: 'Connect AI work to repos, notes, docs, and plans so execution can use real project context.',
    icon: FileSearch,
  },
  {
    title: 'Safe operations',
    description: 'Use policies, preflight checks, confirmation gates, and verified results for safer file workflows.',
    icon: ShieldCheck,
  },
  {
    title: 'Handoffs',
    description: 'Prepare execution packets and handoff prompts for coding agents and implementation tools.',
    icon: GitBranch,
  },
] as const

export default function BuildFlowPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="Secondary / legacy ProChat product" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">BuildFlow is useful.</span>
            <span className="hero-accent block">ProChat OS is the flagship.</span>
          </>
        }
        subtitle="BuildFlow is a project-context and safe-execution tool for AI-assisted work. It remains a supporting product, but the canonical ProChat strategy is now ProChat OS: the Agentic Workflow OS."
        primaryCTA={{ href: '/systems/prochat-os', label: 'Explore ProChat OS' }}
        secondaryCTA={{ href: '#buildflow', label: 'View BuildFlow context', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Project context', 'Safe writes', 'Secondary to ProChat OS']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="buildflow" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Archive className="h-5 w-5" />
            </div>
            <h2 className="pc-section-title mb-4 text-foreground">What BuildFlow is now</h2>
            <p className="pc-body-copy pc-body-muted">
              BuildFlow can still support AI-native builders and internal execution workflows. It should not be presented as the flagship product or as the company strategy.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(card => {
              const Icon = card.icon
              return (
                <Panel key={card.title} tone="default" padding="default" className="h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="pc-card-title mb-3 text-foreground">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </Panel>
              )
            })}
          </div>
        </div>
      </Section>

      <Section tone="muted" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Relationship to ProChat OS</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            BuildFlow may later contribute ideas or modules to ProChat OS, but ProChat OS remains the business, product, website, roadmap, and implementation priority.
          </p>
          <div className="mt-8">
            <Button asChild variant="primary" size="lg">
              <Link href="/systems/prochat-os">EXPLORE — PROCHAT OS</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
