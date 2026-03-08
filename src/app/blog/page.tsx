import Link from 'next/link'
import { getSEOTags } from '@/libs/seo'
import { getAllBlogPosts } from '@/libs/blog'
import ContextualLinkCta from '@/components/ContextualLinkCta'
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

type ResourceLink = {
  title: string
  href?: string
  disabled?: boolean
  comingSoon?: boolean
  current?: boolean
}

const resourceLinks: ResourceLink[] = [
  {
    href: '/saas-glossary',
    title: 'SaaS Founder Glossary',
    current: false,
  },
  {
    href: '/blog/how-to-validate-a-saas-idea-without-coding',
    title: 'SaaS Validation Guide',
    current: false,
  },
  {
    title: 'SaaS Starting Point',
    disabled: true,
    comingSoon: true,
  },
  {
    title: 'Playbooks',
    disabled: true,
    comingSoon: true,
  },
  {
    title: 'AI Prompt Generator',
    disabled: true,
    comingSoon: true,
  },
]

const blogTagBaseClassName =
  'inline-flex items-center border border-border-subtle/80 px-2.5 py-1 text-[11px] font-medium text-tertiary'

const blogTagClassName = `${blogTagBaseClassName} gap-1.5 rounded-lg`

const blogTagSurfaceClassName = 'bg-surface-soft/65'

const blogTagDotClassName = 'h-1.5 w-1.5 rounded-full bg-primary/70'

const resourceBadgeClassName = `${blogTagClassName} border-[color-mix(in_srgb,rgb(var(--pc-blue-500-rgb))_20%,white)] bg-[color-mix(in_srgb,rgb(var(--pc-blue-500-rgb))_14%,white)] text-primary/85`
const canonicalStartHereSlug = 'how-to-build-saas-with-ai-non-developer'

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

function ResourcePaneItem({ item }: { item: ResourceLink }) {
  const content = (
    <span
      className="block pr-1 text-[13px] font-medium leading-5 tracking-[-0.01em]"
    >
      {item.title}
    </span>
  )

  const controlClassName = [
    'relative flex h-full min-h-[3.35rem] w-full items-center rounded-xl border px-3.5 py-2.5 text-left text-sm underline-offset-4 transition-all duration-200',
    item.disabled
      ? 'pointer-events-none cursor-default border-border-subtle/80 bg-surface-soft/55 text-muted-foreground/90'
      : item.current
        ? 'border-border-strong bg-surface text-foreground shadow-surface'
        : 'border-border-subtle/80 bg-surface-soft/72 text-foreground/92 hover:border-border-strong/85 hover:bg-surface hover:text-foreground hover:shadow-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  ].join(' ')

  const badge = item.comingSoon ? (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -right-1.5 -top-1.5 z-10 ${resourceBadgeClassName}`}
    >
      Coming Soon
    </span>
  ) : null

  if (item.disabled) {
    return (
      <div className="relative min-w-0">
        <div aria-disabled="true" role="link" tabIndex={-1} className={controlClassName}>
          {content}
        </div>
        {badge}
      </div>
    )
  }

  return (
    <div className="relative min-w-0">
      <Link
        href={item.href ?? '#'}
        aria-current={item.current ? 'page' : undefined}
        className={controlClassName}
      >
        {content}
      </Link>
      {badge}
    </div>
  )
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

      <div className="mx-auto w-full max-w-6xl">
        <section className="mt-6">
          <Panel
            tone="soft"
            padding="compact"
            className="border-border-subtle/70 bg-surface-soft/80 shadow-surface md:p-4"
          >
            <div className="flex flex-col gap-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                Core Resources
              </p>
              <nav
                aria-label="Blog resources"
                className="grid grid-cols-1 items-stretch gap-3 overflow-visible sm:grid-cols-2 lg:grid-cols-5"
              >
                {resourceLinks.map(item => (
                  <ResourcePaneItem key={item.href ?? item.title} item={item} />
                ))}
              </nav>
            </div>
          </Panel>
        </section>

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
