'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

import { trackEvent, type AnalyticsEventName } from '@/lib/analytics/umami'

type HomepageTrackedLinkProps = {
  href: string
  className?: string
  children: ReactNode
  eventName: Extract<AnalyticsEventName, 'product_cta_click' | 'outbound_funnel_click'>
  location: string
  product: 'memory' | 'memory-qa' | 'workbench'
  cta: string
  external?: boolean
}

export default function HomepageTrackedLink({
  href,
  className,
  children,
  eventName,
  location,
  product,
  cta,
  external = false,
}: HomepageTrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, {
      location,
      product,
      cta,
      source_page: 'homepage',
    })
  }

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
