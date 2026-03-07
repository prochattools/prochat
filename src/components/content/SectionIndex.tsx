import Link from 'next/link'

import HeroSection from '@/components/marketing/HeroSection'
import { Panel } from '@/components/ui/surface'
import { ContentEntry, ContentSection } from '@/lib/content/types'
import { getContentConfig } from '@/lib/content/config'

export default function SectionIndex({
  section,
  title,
  description,
  entries,
}: {
  section: ContentSection
  title: string
  description: string
  entries: ContentEntry[]
}) {
  const config = getContentConfig(section)

  return (
    <>
      <HeroSection
        density="compact"
        title={title}
        subtitle={description}
        eyebrow={<p className="pc-kicker">{config.label}</p>}
        className="border-b-0 pb-0 pt-[calc(var(--pc-header-height)+1rem)]"
        contentClassName="max-w-3xl"
      />

      <main className="mx-auto max-w-6xl px-page pb-24">
        <section className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                  <h2 className="mt-3 font-brand text-xl font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
                    {entry.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{entry.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.tags.slice(0, 3).map(tag => (
                      <span
                        key={`${entry.urlPath}-${tag}`}
                        className="inline-flex items-center rounded-lg border border-border-subtle/80 bg-surface-soft/65 px-2.5 py-1 text-[11px] font-medium text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Panel>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}
