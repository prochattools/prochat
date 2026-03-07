import Link from 'next/link'

import { Panel } from '@/components/ui/surface'
import { ContentEntry } from '@/lib/content/types'

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

export default function RelatedContent({
  entries,
  title = 'Related Content',
}: {
  entries: ContentEntry[]
  title?: string
}) {
  if (!entries.length) return null

  return (
    <section className="mx-auto mt-12 max-w-5xl">
      <h2 className="font-brand text-2xl font-bold text-foreground">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {entries.map(entry => (
          <article key={entry.urlPath} className="h-full">
            <Link
              href={entry.urlPath}
              className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Panel
                tone="default"
                padding="compact"
                className="flex h-full flex-col border-border-subtle/80 bg-surface/95 shadow-surface transition-all duration-200 ease-out group-hover:border-border-strong/80 group-hover:bg-surface-soft/55 group-hover:shadow-elevated"
              >
                {entry.category ? (
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle/80 bg-surface-soft/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-tertiary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                    {entry.category}
                  </div>
                ) : null}
                <h3 className="mt-3 font-brand text-lg font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                  {entry.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {entry.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border-subtle/70 pt-4">
                  <span className="text-xs text-tertiary">{formatDate(entry.date)}</span>
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
  )
}
