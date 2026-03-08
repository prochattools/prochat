import Link from 'next/link'
import { getSEOTags } from '@/libs/seo'
import { getAllBlogPosts } from '@/libs/blog'
import ContextualLinkCta from '@/components/ContextualLinkCta'
import UnifiedToolStrip from '@/components/blog/UnifiedToolStrip'
import HeroStandard from '@/components/HeroStandard'
import { Panel } from '@/components/ui/surface'
import BlogIndexClient from './BlogIndexClient'

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

const canonicalStartHereSlug = 'how-to-build-saas-with-ai-non-developer'

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  const startHerePost =
    posts.find(post => post.slug === canonicalStartHereSlug) ||
    posts.find(post => post.pillarCategory === 'start-here' && post.pillar) ||
    posts.find(post => post.pillarCategory === 'start-here') ||
    null

  return (
    <main className="pb-24">
      <HeroStandard
        label="BLOG"
        title="Resources for building SaaS with AI"
        subtitle="Practical guides for non-technical founders shipping with structure."
        showDivider={false}
        fullBleed
        rightSlot={
          startHerePost ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                START HERE
              </p>
              <div className="mt-3">
                <Panel
                  tone="soft"
                  padding="compact"
                  className="border-border-strong/70 bg-surface-elevated/95 shadow-elevated"
                >
                  <div className="grid gap-5">
                    <div>
                      <h2 className="font-brand text-2xl font-bold tracking-[-0.05em] text-foreground md:text-[2rem]">
                        {startHerePost.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {startHerePost.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-4 text-sm text-tertiary">
                      <div className="flex items-center gap-3">
                        <span>{formatDate(startHerePost.date)}</span>
                        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                        <span>{startHerePost.readingTimeMinutes} min read</span>
                      </div>
                      <Link
                        href={`/blog/${startHerePost.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-border-subtle/80 bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Read the guide
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          ) : null
        }
      />
      <UnifiedToolStrip />

      <div className="mx-auto mt-16 w-full max-w-7xl px-page">
        <BlogIndexClient posts={posts} />

        <ContextualLinkCta
          className="mt-16 border-border/80 bg-surface-elevated/95 shadow-elevated"
          title="Turn Reading Into Shipping"
          description="Use the same production-ready foundation discussed in these guides."
          analytics={{ eventName: 'blog_cta_click', location: 'blog_index_footer' }}
          links={[
            { href: '/kits/saaskit', label: 'Explore SaaSKit' },
            { href: '/kits/uxkit-waitlist', label: 'Join UXKit Waitlist' },
          ]}
        />
      </div>
    </main>
  )
}
