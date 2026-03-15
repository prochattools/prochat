import Link from 'next/link'
import { getSEOTags } from '@/libs/seo'
import { getAllBlogPosts } from '@/libs/blog'
import HeroStandard from '@/components/HeroStandard'
import { Panel } from '@/components/ui/surface'
import BlogIndexClient from './BlogIndexClient'
import { BLOG_PILLARS } from '@/lib/blogStructure'

export const metadata = getSEOTags({
  title: 'Blog | ProChat',
  description:
    'Founder-first guides on validating ideas, building with AI/no-code, and making reliable SaaS decisions.',
  keywords: [
    'build SaaS with AI',
    'Next.js SaaS starter',
    'SaaS boilerplate',
    'non-technical founder SaaS',
    'launch SaaS fast',
  ],
  openGraph: {
    title: 'Blog | ProChat',
    description:
      'Founder-first guides on validating ideas, building with AI/no-code, and making reliable SaaS decisions.',
    images: ['/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
  canonicalUrlRelative: '/blog',
})

export const revalidate = 86400

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <main className="pb-24">
      <HeroStandard
        label="RESOURCES"
        title="Start with the SaaS Starting Point"
        subtitle="New founders read this first to clarify what deserves software before exploring the lifecycle resources below."
        showDivider={false}
        fullBleed
        heroClassName="pc-marketing-hero--full pc-marketing-hero--lines-mobile border-b border-border"
        innerClassName="flex min-h-[100svh] items-center"
        rightSlot={
          <Panel
            tone="soft"
            padding="compact"
            className="border-border-strong/70 bg-surface-elevated/95 shadow-elevated"
          >
            <div className="grid gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                  FIRST STEP
                </p>
                <h2 className="font-brand text-2xl font-bold tracking-[-0.05em] text-foreground md:text-[2rem]">
                  SaaS Starting Point
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Clarify what deserves software before diving deeper into the rest of the lifecycle.
                </p>
              </div>
              <Link
                href="/learn/saas-starting-point"
                className="inline-flex items-center gap-2 rounded-xl border border-border-subtle/80 bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Open the framework
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Panel>
        }
      />
      <section className="mx-auto mt-14 w-full max-w-6xl px-page">
        <div className="rounded-3xl border border-border/80 bg-surface-elevated/95 shadow-elevated">
          <div className="px-5 py-5 sm:px-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
              Resource map
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
              Follow the lifecycle layers
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              The hero is your canonical first step. This map shows the structured stages that keep the rest of the page easy to scan.
            </p>
          </div>

          <div className="border-t border-border-subtle/70 px-4 pb-6 pt-6 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BLOG_PILLARS.map((pillar, index) => (
                <Link
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  scroll={false}
                  className="group"
                >
                  <article
                    className="rounded-2xl border border-border-subtle/70 bg-surface p-4 transition-shadow hover:border-border-strong/80 hover:shadow-elevated"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-tertiary">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border-subtle/70 text-[10px]">
                        {index + 1}
                    </span>
                    {pillar.title === 'Start Here' ? 'Start' : pillar.title}
                  </div>
                  <h4 className="mt-3 font-brand text-lg font-bold text-foreground">
                    {pillar.title === 'Start Here' ? 'SaaS Starting Point' : pillar.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {pillar.id === 'start-here'
                      ? 'Clarify what deserves software before you dive deeper.'
                      : pillar.description}
                  </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-16 w-full max-w-6xl space-y-12 px-page">
        <BlogIndexClient posts={posts} />

        <section className="rounded-3xl border border-border/80 bg-surface-elevated/95 px-6 py-10 text-center shadow-elevated sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-tertiary">Next step</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">Build with SaaSKit</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Take the structured platform that matches these guides and ship the production-safe foundation you scoped above.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/kits/saaskit"
              className="inline-flex items-center justify-center rounded-full border border-border-strong px-6 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-soft"
            >
              Explore SaaSKit
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
