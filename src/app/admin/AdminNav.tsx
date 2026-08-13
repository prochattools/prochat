'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const adminLinks = [
  { href: '/admin/waitlist', label: 'Beta interest' },
  { href: '/admin/og', label: 'OG image generator' },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminNav() {
  const pathname = usePathname() || ''

  return (
    <nav aria-label="Admin navigation" className="flex flex-wrap gap-1 border-b border-border pb-3">
      {adminLinks.map(link => {
        const active = isActive(pathname, link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md border px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition ${
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
