import Link from 'next/link'
import { getSEOTags } from '@/libs/seo'
import { BlogPost, getAllBlogPosts } from '@/libs/blog'
import ContextualLinkCta from '@/components/ContextualLinkCta'

export const metadata = getSEOTags({
  title: 'ProChat Blog | Build SaaS with AI and Stable Next.js Infrastructure',
  description:
    'Practical guides for non-technical founders: build SaaS with AI, ship on stable infrastructure, and execute from idea to paid users.',
  keywords: [
    'build SaaS with AI',
    'Next.js SaaS starter',
    'SaaS boilerplate',
    'non-technical founder SaaS',
    'launch SaaS fast',
  ],
  openGraph: {
    title: 'ProChat Blog | Build SaaS with AI and Stable Next.js Infrastructure',
    description:
      'Practical guides for non-technical founders: build SaaS with AI, ship on stable infrastructure, and execute from idea to paid users.',
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

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pt-32">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-brand text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
          Build SaaS with AI. Keep the system stable.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Long-tail guides for non-technical founders shipping with Next.js,
          Stripe, Supabase, and production-safe execution patterns.
        </p>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: BlogPost) => (
          <article
            key={post.slug}
            className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {post.cluster}
            </p>
            <h2 className="mt-3 font-brand text-xl font-bold text-foreground">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
            <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(post.date)}</span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </article>
        ))}
      </section>

      <ContextualLinkCta
        className="mt-12"
        title="Turn Reading Into Shipping"
        description="Use the same production-ready foundation discussed in these guides."
        links={[
          { href: '/kits/saaskit', label: 'Explore SaaSKit' },
          { href: '/kits/uxkit-waitlist', label: 'Join UXKit Waitlist' },
        ]}
      />
    </main>
  )
}
