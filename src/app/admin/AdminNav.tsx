'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const adminLinks = [
  { href: '/admin/licenses', label: 'Licenses' },
  { href: '/admin/og', label: 'OG image generator' },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminNav() {
  const pathname = usePathname() || ''

  return (
    <nav aria-label="Admin navigation" className="flex flex-wrap gap-2">
      {adminLinks.map(link => {
        const active = isActive(pathname, link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-surface text-muted-foreground hover:border-foreground/40 hover:text-foreground'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
