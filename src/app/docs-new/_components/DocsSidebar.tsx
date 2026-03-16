'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsSections } from '@/content/docs.config'

const groupedByArea = docsSections.reduce<Record<string, typeof docsSections>>((acc, entry) => {
  // eslint-disable-next-line no-param-reassign
  (acc[entry.group] ??= []).push(entry)
  return acc
}, {})

export default function DocsSidebar() {
  const pathname = usePathname()
  const slug = pathname?.split('/').filter(Boolean).pop()

  return (
    <aside className="hidden w-44 shrink-0 rounded-2xl border border-border/60 bg-surface/80 p-4 text-sm text-muted-foreground lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tertiary">Docs map</p>
      <div className="mt-4 space-y-6">
        {Object.entries(groupedByArea).map(([group, entries]) => (
          <div key={group} className="space-y-2">
            <p className="text-[0.55rem] uppercase tracking-[0.4em] text-slate-400">{group}</p>
            <ul className="space-y-1">
              {entries
                .slice()
                .sort((a, b) => a.order - b.order)
                .map(entry => {
                  const isActive = entry.slug === slug
                  return (
                    <li key={entry.slug}>
                      <Link
                        href={`/docs-new/${entry.slug}`}
                        className={`block rounded-md px-2 py-1 transition ${
                          isActive
                            ? 'bg-blue-500/10 font-semibold text-white'
                            : 'hover:bg-surface-soft hover:text-foreground'
                        }`}
                      >
                        {entry.title}
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
