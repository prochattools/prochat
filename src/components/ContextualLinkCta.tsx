'use client'

import Link from 'next/link'

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
    <aside
      className={`rounded-2xl border border-border bg-card p-6 md:p-8 ${className}`.trim()}
      aria-label={title}
    >
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
    </aside>
  )
}
