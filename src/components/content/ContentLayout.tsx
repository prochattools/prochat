import Link from 'next/link'
import { ReactNode } from 'react'

import CTASection from '@/components/content/CTASection'
import RelatedContent from '@/components/content/RelatedContent'
import { ContentEntry } from '@/lib/content/types'
import { getContentConfig } from '@/lib/content/config'

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

export default function ContentLayout({
  entry,
  related = [],
  children,
}: {
  entry: ContentEntry
  related?: ContentEntry[]
  children: ReactNode
}) {
  const config = getContentConfig(entry.section)

  return (
    <main className="mx-auto max-w-5xl px-page pb-24 pt-24 md:pt-28">
      <article className="pc-article-shell">
        <header className="border-b border-border-subtle/80 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href={config.indexPath}
              className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Back to {config.label}
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-tertiary">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle/80 bg-surface-soft/70 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                {config.label}
              </span>
              {entry.category ? (
                <span className="inline-flex items-center rounded-full border border-border-subtle/70 bg-surface/75 px-2.5 py-1 text-[11px] text-muted-foreground">
                  {entry.category}
                </span>
              ) : null}
            </div>
          </div>
          <h1 className="mt-5 font-brand text-4xl font-bold tracking-[-0.05em] text-foreground md:text-[3.4rem]">
            {entry.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[1rem] leading-7 text-muted-foreground md:text-[1.02rem]">
            {entry.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-tertiary">
            <span>{formatDate(entry.date)}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
            <span>{entry.readingTimeMinutes} min read</span>
            {entry.updated && entry.updated !== entry.date ? (
              <>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                <span>Updated {formatDate(entry.updated)}</span>
              </>
            ) : null}
          </div>
          {entry.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              {entry.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-border-subtle/80 bg-surface-soft/70 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="prose-premium mt-12 font-body">{children}</div>
      </article>

      <CTASection section={entry.section} />
      <RelatedContent entries={related} />
    </main>
  )
}
