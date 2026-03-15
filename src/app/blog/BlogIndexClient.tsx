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

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activeStage, setActiveStage] = useState<string>('start-here')
  const [showAll, setShowAll] = useState(false)

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

  const activeSection = lifecycleSections.find(section => section.id === activeStage) || lifecycleSections[0]

  if (!activeSection) return null

  const visiblePosts = showAll ? activeSection.posts : activeSection.posts.slice(0, visibleCardLimit)
  const hasOverflow = activeSection.posts.length > visibleCardLimit

  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-3xl border border-border/80 bg-surface-elevated/95 px-4 py-3 shadow-surface">
        {lifecycleSections.map(section => {
          const isActive = section.id === activeStage
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                setActiveStage(section.id)
                setShowAll(false)
              }}
              className={`inline-flex min-w-[110px] flex-1 items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-border-strong bg-surface text-foreground shadow-inner'
                  : 'border-transparent bg-surface-soft text-tertiary hover:bg-surface hover:text-foreground'
              }`}
            >
              {section.title}
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-6 max-w-6xl rounded-3xl border border-border/80 bg-surface-elevated/95 p-4 shadow-elevated">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  className="flex h-full flex-col gap-3 border-border-subtle/80 bg-surface/95 p-3 shadow-surface transition-all duration-200 ease-out group-hover:border-border-strong/80 group-hover:bg-surface-soft/55 group-hover:shadow-elevated"
                >
                  {post.pillarCategory !== 'start-here' ? (
                    <div className="inline-flex w-fit items-center gap-2 rounded-md border border-border-subtle/80 bg-surface-soft/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-tertiary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                      {getBlogPillar(post.pillarCategory)?.title || post.cluster || 'Guide'}
                    </div>
                  ) : null}
                  <h3 className="font-brand text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="flex-1 text-sm leading-6 text-muted-foreground">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-[10px]">
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
                  <div className="flex items-center justify-between border-t border-border-subtle/70 pt-3">
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

        {hasOverflow && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(current => !current)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-border-strong/80 underline-offset-4 transition-colors hover:decoration-foreground/70"
            >
              {showAll ? 'Show fewer' : 'View all'}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
