import Link from 'next/link'
import { getSEOTags } from '@/libs/seo'
import { BlogPost, getAllBlogPosts } from '@/libs/blog'
import ContextualLinkCta from '@/components/ContextualLinkCta'
import { Panel } from '@/components/ui/surface'

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
    images: ['/og/prochat-home.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/prochat-home.png'],
  },
  canonicalUrlRelative: '/blog',
})

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

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

  return (
    <main className="mx-auto max-w-6xl px-page pb-24 pt-28 md:pt-32">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-brand text-4xl font-bold tracking-[-0.05em] text-foreground md:text-5xl">
          Build SaaS with AI. Keep the system stable.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Long-tail guides for non-technical founders shipping with Next.js,
          Stripe, Supabase, and production-safe execution patterns.
        </p>
      </section>

      <section className="mt-9">
        <Panel
          tone="soft"
          padding="compact"
          className="border-border-subtle/70 bg-surface-soft/80 shadow-surface md:p-4"
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
              Resources
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

      <section className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: BlogPost) => (
          <article key={post.slug} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              aria-label={`Read article: ${post.title}`}
              className="group block h-full cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Panel
                tone="default"
                padding="compact"
                className="flex h-full flex-col border-border-subtle/80 bg-surface/95 shadow-surface transition-all duration-200 ease-out group-hover:border-border-strong/80 group-hover:bg-surface-soft/55 group-hover:shadow-elevated"
              >
                {post.cluster && (
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle/80 bg-surface-soft/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-tertiary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                    {post.cluster}
                  </div>
                )}
                <h2 className="mt-3 font-brand text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className={`${blogTagClassName} ${blogTagSurfaceClassName}/65 transition-colors duration-200 group-hover:border-border/80`}
                      >
                        <span aria-hidden="true" className={blogTagDotClassName} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex items-center justify-between border-t border-border-subtle/70 pt-4">
                  <div className="flex items-center gap-3 text-xs text-tertiary">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                    <span>{post.readingTimeMinutes} min read</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground underline decoration-border-strong/80 underline-offset-4 transition-all duration-200 group-hover:gap-1.5 group-hover:decoration-foreground/70">
                    Read
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Panel>
            </Link>
          </article>
        ))}
      </section>

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
    </main>
  )
}
