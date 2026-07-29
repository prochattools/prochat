'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/components/logo'
import { trackEvent } from '@/utils/analytics'

const NAV_ITEMS = [
  { href: '/memory', label: 'Memory' },
  { href: '/memory-qa', label: 'Memory for QA' },
  { href: '/workbench', label: 'Workbench' },
  { href: '/docs', label: 'Documentation' },
] as const

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}

export type MarketingNavCta =
  | { label: string; href: string; trackingCta: string }
  | null

export function MarketingNav({ cta }: { cta?: MarketingNavCta }) {
  const pathname = usePathname() || ''

  const primaryCta = cta ?? {
    label: 'Explore Memory',
    href: '/memory',
    trackingCta: 'explore_memory',
  }

  const handleCtaClick = (location: string) => {
    trackEvent('nav_cta_click', {
      location,
      product: 'prochat_memory',
      cta: primaryCta.trackingCta,
      source_page: pathname,
    })
  }

  return (
    <header className="pm-site-header">
      <nav className="pm-navbar" aria-label="Primary navigation">
        <Link href="/" className="pm-wordmark" aria-label="ProChat home">
          <Logo scale={0.62} />
        </Link>

        <div className="pm-nav-links">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="pm-nav-actions">
          <Link href="/contact" className="pm-nav-text-action">
            Contact
          </Link>
          <Link
            href={primaryCta.href}
            className="pm-pill-button pm-pill-button--dark"
            onClick={() => handleCtaClick('header')}
          >
            {primaryCta.label}
            <ArrowIcon />
          </Link>
        </div>

        <details className="pm-mobile-nav">
          <summary>Menu</summary>
          <div className="pm-mobile-nav-panel">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Contact</Link>
            <Link
              href={primaryCta.href}
              onClick={() => handleCtaClick('mobile_header')}
            >
              {primaryCta.label}
            </Link>
          </div>
        </details>
      </nav>
    </header>
  )
}
