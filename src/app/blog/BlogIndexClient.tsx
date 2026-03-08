'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { BLOG_PILLARS, getBlogPillar } from '@/lib/blogStructure'
import type { BlogPost } from '@/libs/blog'
import { Panel } from '@/components/ui/surface'

type BlogIndexClientProps = {
  posts: BlogPost[]
}

const canonicalStartHereSlug = 'how-to-build-saas-with-ai-non-developer'
const visibleCardLimit = 6

function sortPillarPosts(left: BlogPost, right: BlogPost) {
  const leftOrder = Number.isFinite(left.pillarOrder)
    ? (left.pillarOrder as number)
    : Number.POSITIVE_INFINITY
  const rightOrder = Number.isFinite(right.pillarOrder)
    ? (right.pillarOrder as number)
    : Number.POSITIVE_INFINITY

  if (leftOrder !== rightOrder) return leftOrder - rightOrder
  return new Date(right.date).getTime() - new Date(left.date).getTime()
}

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

function LifecycleSection({
  id,
  title,
  description,
  posts,
  expanded,
  onToggle,
}: {
  id: string
  title: string
  description: string
  posts: BlogPost[]
  expanded: boolean
  onToggle: () => void
}) {
  const visiblePosts = expanded ? posts : posts.slice(0, visibleCardLimit)
  const hasOverflow = posts.length > visibleCardLimit

  return (
    <section id={id} className="scroll-mt-[calc(var(--pc-header-height)+2rem)] py-16 first:pt-0">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
          Lifecycle
        </p>
        <h2 className="mt-2 font-brand text-2xl font-bold tracking-[-0.04em] text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map(post => (
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
                <div className="inline-flex w-fit items-center gap-2 rounded-md border border-border-subtle/80 bg-surface-soft/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-tertiary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                  {getBlogPillar(post.pillarCategory)?.title || post.cluster || 'Guide'}
                </div>
                <h3 className="mt-3 font-brand text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle/80 bg-surface-soft/65 px-2 py-0.5 text-[10px] font-medium text-tertiary transition-colors duration-200 group-hover:border-border/80"
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary/70" />
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
      </div>

      {hasOverflow ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-border-strong/80 underline-offset-4 transition-colors hover:decoration-foreground/70"
          >
            {expanded ? 'Show fewer' : 'View all'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </section>
  )
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null)

  const lifecycleSections = useMemo(() => {
    return BLOG_PILLARS.map(pillar => {
      const pillarPosts = posts
        .filter(post => post.pillarCategory === pillar.id)
        .filter(post => !(pillar.id === 'start-here' && post.slug === canonicalStartHereSlug))
        .sort(sortPillarPosts)

      return {
        id: pillar.id,
        title: pillar.id === 'start-here' ? 'Start' : pillar.title,
        description:
          pillar.id === 'start-here'
            ? 'Build your first production-ready SaaS.'
            : pillar.description,
        posts: pillarPosts,
      }
    }).filter(section => section.posts.length > 0)
  }, [posts])

  return (
    <div>
      {lifecycleSections.map(section => (
        <LifecycleSection
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
          posts={section.posts}
          expanded={expandedPillar === section.id}
          onToggle={() =>
            setExpandedPillar(current => (current === section.id ? null : section.id))
          }
        />
      ))}
    </div>
  )
}
