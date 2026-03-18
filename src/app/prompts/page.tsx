import Link from 'next/link'

import StructuredData from '@/components/StructuredData'
import HeroSection from '@/components/marketing/HeroSection'
import { Button } from '@/components/ui/button'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Panel, Section } from '@/components/ui/surface'
import { getSectionEntries } from '@/lib/content'
import { PRODUCTION_GUIDE_PATH } from '@/lib/learning/production-guide'
import { createSocialImageParams, getSEOTags } from '@/lib/seo/metadata'
import { getCanonicalUrl } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'AI Prompts for Non-Technical Founders',
  description:
    'A six-step prompt sequence for non-technical founders: validate the idea, scope the MVP, write the offer, plan the SaaSKit build, QA the launch, and prepare for production.',
  canonicalUrlRelative: '/prompts',
  robots: { index: true, follow: true },
  keywords: [
    'ai prompts for non technical founders',
    'saaskit prompts',
    'saas founder prompts',
    'launch saas with ai prompts',
    'mvp planning prompts',
  ],
  socialImage: createSocialImageParams({
    line1: 'AI Prompts for',
    line2: 'Non-Technical Founders',
    subtitle: 'Six prompts for validation, MVP scope, SaaSKit planning, launch QA, and production readiness.',
  }),
})

function getFrontmatterText(entry: Awaited<ReturnType<typeof getSectionEntries>>[number], key: string) {
  const value = entry.rawFrontmatter[key]
  return typeof value === 'string' && value.trim() ? value.trim() : ''
}

export default async function PromptsIndexPage() {
  const entries = await getSectionEntries('prompts')

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Prompts for Non-Technical Founders',
    description:
      'A six-step prompt sequence for validating, scoping, messaging, implementing, QAing, and preparing a SaaSKit-based SaaS for launch.',
    url: getCanonicalUrl('/prompts'),
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.title,
        url: getCanonicalUrl(entry.urlPath),
        description: entry.description,
      })),
    },
  }

  return (
    <>
      <StructuredData id="schema-prompts-collection" data={collectionSchema} />

      <div className="bg-background text-foreground">
        <HeroSection
          className="pc-marketing-hero--lines-mobile min-h-[100svh] border-b border-border"
          eyebrow={<HeroBadge text="Execution prompts" />}
          title={
            <>
              <span className="block text-foreground dark:text-white">
                AI prompts for non-technical founders building real SaaS
              </span>
            </>
          }
          subtitle="These prompts are the execution layer between idea clarity and production work. Use them in order to validate the opportunity, define the MVP, sharpen the offer, plan the SaaSKit build, QA the launch, and prepare for production."
          subtitleClassName="mx-auto text-center"
          primaryCTA={{ href: '#prompt-sequence', label: 'SEE — THE 6 PROMPTS' }}
          secondaryCTA={{ href: PRODUCTION_GUIDE_PATH, label: 'OPEN — PRODUCTION GUIDE', variant: 'secondary' }}
          microcopy="Starting Point -> Prompts -> Production Guide -> SaaSKit"
        >
          <HeroCheckRow
            items={[
              'Validate before you build',
              'Scope the MVP properly',
              'Plan the SaaSKit implementation',
              'Launch with fewer mistakes',
            ]}
            className="mx-auto"
          />
        </HeroSection>

        <Section tone="transparent" spacing="default" className="pb-10">
          <div className="mx-auto max-w-6xl px-page">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="pc-section-title text-foreground">A small prompt system, not a filler directory</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Each prompt handles a specific job in the founder path. They are written for people using AI to move faster without losing structure, especially when the goal is to build and launch inside SaaSKit instead of improvising from a blank slate.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Panel tone="soft" padding="default" className="border-border-subtle/80 bg-surface-soft/75">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tertiary">What these prompts are</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Practical AI prompts for the real founder workflow: idea validation, MVP definition, offer writing, build planning, launch QA, and production readiness.
                </p>
              </Panel>
              <Panel tone="soft" padding="default" className="border-border-subtle/80 bg-surface-soft/75">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tertiary">Who they are for</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Non-technical founders who need sharper thinking, better execution prompts, and a clearer path from preparation into implementation and launch.
                </p>
              </Panel>
              <Panel tone="soft" padding="default" className="border-border-subtle/80 bg-surface-soft/75">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tertiary">When to use them</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Use them after <span className="font-semibold text-foreground">Starting Point</span>, alongside the <span className="font-semibold text-foreground">Production Guide</span>, and before or during a <span className="font-semibold text-foreground">SaaSKit</span> build.
                </p>
              </Panel>
            </div>
          </div>
        </Section>

        <Section id="prompt-sequence" tone="transparent" spacing="default" className="pt-2 pb-24">
          <div className="mx-auto max-w-6xl px-page">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="pc-section-title text-foreground">The 6-prompt execution sequence</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Use these prompts in order. The first prompts reduce bad decisions. The middle prompts turn the product into a build plan. The final prompts reduce launch and production risk.
              </p>
            </div>

            <div className="space-y-5">
              {entries.map((entry, index) => {
                const whenToUse = getFrontmatterText(entry, 'whenToUse')
                const whoFor = getFrontmatterText(entry, 'whoFor')

                return (
                  <Panel
                    key={entry.urlPath}
                    tone="default"
                    padding="default"
                    className="border-border-subtle/80 bg-surface/95 shadow-surface"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border-subtle/80 bg-surface-soft/80 px-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-tertiary">
                            {index + 1}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-tertiary">
                            Execution step
                          </span>
                        </div>

                        <h3 className="mt-4 font-brand text-2xl font-bold tracking-[-0.04em] text-foreground">
                          {entry.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-[0.98rem]">
                          {entry.description}
                        </p>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          <div className="rounded-2xl border border-border-subtle/80 bg-surface-soft/65 px-4 py-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">Best for</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{whoFor}</p>
                          </div>
                          <div className="rounded-2xl border border-border-subtle/80 bg-surface-soft/65 px-4 py-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">Use this when</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{whenToUse}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full shrink-0 flex-col gap-3 lg:w-auto lg:min-w-[220px]">
                        <Button asChild variant="secondary" size="sm" className="w-full lg:w-auto">
                          <Link href={entry.urlPath}>OPEN — FULL PROMPT</Link>
                        </Button>
                      </div>
                    </div>
                  </Panel>
                )
              })}
            </div>

            <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-surface/80 px-6 py-5 text-sm leading-relaxed text-muted-foreground shadow-surface">
              Start with <Link href="/starting-point" className="font-semibold text-foreground underline-offset-4 hover:underline">Starting Point</Link> if the idea still needs sharper decision-making. Use the <Link href={PRODUCTION_GUIDE_PATH} className="font-semibold text-foreground underline-offset-4 hover:underline">Production Guide</Link> when you need the full build sequence. Move into <Link href="/kits/saaskit" className="font-semibold text-foreground underline-offset-4 hover:underline">SaaSKit</Link> when you are ready to implement the product on a production-ready foundation.
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
