'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { BLOG_PILLARS, BLOG_TAGS, getBlogPillar } from '@/lib/blogStructure'
import type { BlogPost } from '@/libs/blog'
import { Panel } from '@/components/ui/surface'

type BlogIndexClientProps = {
  posts: BlogPost[]
}

const allTagsLabel = 'all'
const learningPathPillars = BLOG_PILLARS.filter(pillar => pillar.id !== 'start-here')

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activeTag, setActiveTag] = useState(allTagsLabel)

  const tagOptions = useMemo(() => {
    const availableTags = new Set(
      posts.flatMap(post => post.tags || []).map(tag => tag.trim()).filter(Boolean),
    )

    const tags = BLOG_TAGS.filter(tag => availableTags.has(tag))

    return [allTagsLabel, ...tags]
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (activeTag === allTagsLabel) return posts
    return posts.filter(post => post.tags?.includes(activeTag as (typeof BLOG_TAGS)[number]))
  }, [activeTag, posts])

  const startHerePosts = useMemo(
    () =>
      filteredPosts
        .filter(post => post.pillarCategory === 'start-here')
        .sort((left, right) => {
          const leftOrder = Number.isFinite(left.pillarOrder)
            ? (left.pillarOrder as number)
            : Number.POSITIVE_INFINITY
          const rightOrder = Number.isFinite(right.pillarOrder)
            ? (right.pillarOrder as number)
            : Number.POSITIVE_INFINITY

          if (leftOrder !== rightOrder) return leftOrder - rightOrder
          return new Date(right.date).getTime() - new Date(left.date).getTime()
        }),
    [filteredPosts],
  )

  const featuredPost = startHerePosts.find(post => post.pillar) || startHerePosts[0] || null
  const startHereSupportPosts = startHerePosts
    .filter(post => post.slug !== featuredPost?.slug)
    .slice(0, 2)
  const groupedPosts = useMemo(() => {
    const nonFeatured = filteredPosts.filter(post => post.slug !== featuredPost?.slug)

    return learningPathPillars.map(pillar => ({
      pillar,
      posts: nonFeatured
        .filter(post => post.pillarCategory === pillar.id)
        .sort((left, right) => {
          const leftOrder = Number.isFinite(left.pillarOrder)
            ? (left.pillarOrder as number)
            : Number.POSITIVE_INFINITY
          const rightOrder = Number.isFinite(right.pillarOrder)
            ? (right.pillarOrder as number)
            : Number.POSITIVE_INFINITY

          if (leftOrder !== rightOrder) return leftOrder - rightOrder
          return new Date(right.date).getTime() - new Date(left.date).getTime()
        })
        .slice(0, 3),
    })).filter(group => group.posts.length > 0)
  }, [featuredPost?.slug, filteredPosts])

  return (
    <div className="mt-14">
      {featuredPost && (
        <section>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
              {getBlogPillar('start-here')?.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {getBlogPillar('start-here')?.description}
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Panel
              tone="soft"
              padding="compact"
              className="border-border-strong/70 bg-surface-elevated/95 shadow-elevated"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:items-end">
                <div className="max-w-3xl">
                  <div className="inline-flex w-fit items-center gap-2 rounded-md border border-border-subtle/80 bg-surface-soft/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-tertiary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                    Flagship Guide
                  </div>
                  <h2 className="mt-4 font-brand text-3xl font-bold tracking-[-0.05em] text-foreground md:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                    {featuredPost.description}
                  </p>
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featuredPost.tags.map(tag => (
                        <span
                          key={`${featuredPost.slug}-${tag}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle/80 bg-surface-soft/65 px-2 py-0.5 text-[10px] font-medium text-tertiary"
                        >
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start gap-4 text-sm text-tertiary lg:items-end">
                  <div className="flex items-center gap-3">
                    <span>{formatDate(featuredPost.date)}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                    <span>{featuredPost.readingTimeMinutes} min read</span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-border-subtle/80 bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Read the guide
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </Panel>

            {startHereSupportPosts.length > 0 && (
              <div className="grid gap-6">
                {startHereSupportPosts.map(post => (
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
                          {getBlogPillar(post.pillarCategory)?.title || 'Guide'}
                        </div>
                        <h3 className="mt-3 font-brand text-2xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                          {post.description}
                        </p>
                        <div className="mt-5 flex items-center justify-between border-t border-border-subtle/70 pt-4 text-xs text-tertiary">
                          <span>{formatDate(post.date)}</span>
                          <span className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border-strong/80 underline-offset-4 transition-all duration-200 group-hover:gap-1.5 group-hover:decoration-foreground/70">
                            Read
                            <span aria-hidden="true">→</span>
                          </span>
                        </div>
                      </Panel>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
            Learning Path
          </p>
          <h2 className="mt-2 font-brand text-3xl font-bold tracking-[-0.05em] text-foreground">
            Follow the structured build sequence.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            If you&apos;re new, start with the flagship guide. Then follow the structured path below.
          </p>
        </div>

        <section aria-label="Blog tag filters" className="mt-5 flex flex-wrap gap-2.5">
          {tagOptions.map(tag => {
            const isActive = activeTag === tag

            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={[
                  'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-medium transition-colors',
                  isActive
                    ? 'border-border-strong bg-surface text-foreground shadow-surface'
                    : 'border-border-subtle/80 bg-surface-soft/65 text-tertiary hover:border-border-strong/85 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                ].join(' ')}
              >
                {tag !== allTagsLabel && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                )}
                {tag === allTagsLabel ? 'All topics' : tag}
              </button>
            )
          })}
        </section>
      </section>

      <div className="mt-12 space-y-14">
        {groupedPosts.map(({ pillar, posts: pillarPosts }) => (
          <section key={pillar.id}>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                Pillar
              </p>
              <h3 className="mt-2 font-brand text-2xl font-bold tracking-[-0.04em] text-foreground md:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {pillar.description}
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pillarPosts.map(post => (
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
                      <h4 className="mt-3 font-brand text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                        {post.title}
                      </h4>
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
          </section>
        ))}
      </div>
    </div>
  )
}
