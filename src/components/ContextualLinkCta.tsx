'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
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
          <Button
            key={link.href}
            asChild
            className="rounded-lg"
          >
            <Link
              href={link.href}
              onClick={() => {
                if (!analytics) return

                trackEvent(analytics.eventName, {
                  cta_type: getCtaType(link.href),
                  location: analytics.location,
                  href: link.href,
                })
              }}
            >
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </Panel>
  )
}
