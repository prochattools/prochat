'use client'

import Link from 'next/link'
import { Panel } from '@/components/ui/surface'
import { trackEvent } from '@/utils/analytics'

type CtaLink = {
  href: string
  label: string
}

type AnalyticsContext = {
  eventName: string
  location: string
}

function getCtaType(href: string) {
  if (href === '/contact') return 'contact'
  if (href.startsWith('/blog/')) return 'related_article'
  if (href === '/blog') return 'blog'
  if (href.startsWith('/kits')) return 'explore_kits'
  return 'link'
}

export default function ContextualLinkCta({
  title,
  description,
  links,
  className = '',
  analytics,
}: {
  title: string
  description: string
  links: CtaLink[]
  className?: string
  analytics?: AnalyticsContext
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
            onClick={() => {
              if (!analytics) return

              trackEvent(analytics.eventName, {
                cta_type: getCtaType(link.href),
                location: analytics.location,
                href: link.href,
              })
            }}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Panel>
  )
}
