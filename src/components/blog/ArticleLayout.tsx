import Link from 'next/link'
import { ReactNode } from 'react'

import { BlogPost } from '@/libs/blog'
import ContextualLinkCta from '@/components/ContextualLinkCta'
import { Panel } from '@/components/ui/surface'

import Callout from './Callout'

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

export default function ArticleLayout({
  post,
  relatedPosts,
  children,
}: {
  post: BlogPost
  relatedPosts: BlogPost[]
  children: ReactNode
}) {
  return (
    <main className="mx-auto max-w-5xl px-page pb-24 pt-28 md:pt-32">
      <article className="pc-article-shell">
        <header className="border-b border-border-subtle/80 pb-10">
          {post.cluster ? (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle/80 bg-surface-soft/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-tertiary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              {post.cluster}
            </div>
          ) : null}
          <h1 className="mt-4 font-brand text-4xl font-bold tracking-[-0.025em] text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-[1.02rem] leading-7 text-muted-foreground md:text-[1.06rem]">
            {post.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-tertiary">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
            <span>{post.readingTimeMinutes} min read</span>
            {post.updated && post.updated !== post.date ? (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                <span>Updated {formatDate(post.updated)}</span>
              </>
            ) : null}
          </div>
        </header>

        <Callout items={post.takeaways} className="mt-8" />

        <div className="prose-premium mt-10 font-body">{children}</div>
      </article>

      <ContextualLinkCta
        className="mx-auto mt-14 max-w-4xl border-border/80 bg-surface-elevated/95 shadow-elevated"
        title="Build on Stable Ground"
        description="Use a production-ready Next.js SaaS baseline while you execute on distribution and customer value."
        analytics={{ eventName: 'blog_cta_click', location: 'blog_post_footer' }}
        links={[
          { href: '/kits/saaskit', label: 'Explore SaaSKit' },
          { href: '/kits/uxkit-waitlist', label: 'Join UXKit Waitlist' },
        ]}
      />

      {relatedPosts.length > 0 ? (
        <section className="mx-auto mt-12 max-w-5xl">
          <h2 className="font-brand text-2xl font-bold text-foreground">
            Related Reads
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedPosts.map(related => (
              <article key={related.slug} className="h-full">
                <Link
                  href={`/blog/${related.slug}`}
                  className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Panel
                    tone="default"
                    padding="compact"
                    className="flex h-full flex-col border-border-subtle/80 bg-surface/95 shadow-surface transition-all duration-200 ease-out group-hover:border-border-strong/80 group-hover:bg-surface-soft/55 group-hover:shadow-elevated"
                  >
                    {related.cluster ? (
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle/80 bg-surface-soft/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-tertiary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                        {related.cluster}
                      </div>
                    ) : null}
                    <h3 className="mt-3 font-brand text-lg font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                      {related.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {related.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-border-subtle/70 pt-4">
                      <span className="text-xs text-tertiary">
                        {formatDate(related.date)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground underline decoration-border-strong/80 underline-offset-4 transition-all duration-200 group-hover:gap-1.5 group-hover:decoration-foreground/70">
                        Read
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Panel>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
