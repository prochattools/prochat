'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsSections } from '@/content/docs.config'

const sortedDocs = docsSections.slice().sort((a, b) => a.order - b.order)

export default function DocsPager() {
  const pathname = usePathname()
  const slug = pathname?.split('/').filter(Boolean).pop()
  const currentIndex = sortedDocs.findIndex(entry => entry.slug === slug)
  const previous = currentIndex > 0 ? sortedDocs[currentIndex - 1] : null
  const next = currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null

  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl border border-border/80 bg-surface-elevated/70 p-6 text-sm text-muted-foreground shadow-surface">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-tertiary">
        <span>Docs navigation</span>
        <span>{currentIndex + 1}/{sortedDocs.length}</span>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {previous ? (
          <Link
            href={`/docs-new/${previous.slug}`}
            className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition hover:bg-surface-soft"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span className="rounded-full border border-border/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-border">Beginning</span>
        )}
        {next ? (
          <Link
            href={`/docs-new/${next.slug}`}
            className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition hover:bg-surface-soft"
          >
            {next.title} →
          </Link>
        ) : (
          <span className="rounded-full border border-border/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-border">End</span>
        )}
      </div>
    </div>
  )
}
