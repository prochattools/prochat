'use client'

import Link from 'next/link'
import { Panel } from '@/components/ui/surface'

type CtaLink = {
  href: string
  label: string
}

export default function ContextualLinkCta({
  title,
  description,
  links,
  className = '',
}: {
  title: string
  description: string
  links: CtaLink[]
  className?: string
}) {
  return (
    <Panel tone="elevated" padding="compact" className={className} aria-label={title}>
      <h2 className="font-brand text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Panel>
  )
}
