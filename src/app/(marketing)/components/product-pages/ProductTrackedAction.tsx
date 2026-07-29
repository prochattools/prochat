'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

import { trackEvent, type AnalyticsEventName } from '@/lib/analytics/umami'

type ProductTrackedActionProps = {
  href: string
  className: string
  children: ReactNode
  eventName: Extract<AnalyticsEventName, 'product_cta_click' | 'outbound_funnel_click'>
  location: 'hero' | 'closing'
  product: 'memory' | 'memory-qa' | 'workbench'
  cta: string
  sourcePage: '/memory' | '/memory-qa' | '/workbench'
  external?: boolean
}

export default function ProductTrackedAction({
  href,
  className,
  children,
  eventName,
  location,
  product,
  cta,
  sourcePage,
  external = false,
}: ProductTrackedActionProps) {
  const handleClick = () => {
    trackEvent(eventName, {
      location,
      product,
      cta,
      source_page: sourcePage,
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
