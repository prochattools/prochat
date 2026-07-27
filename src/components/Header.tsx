'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/components/logo'
import { isChromelessPath } from '@/helpers/chrome-routes'
import { trackEvent } from '@/utils/analytics'

const NAV_ITEMS = [
  { label: 'Memory', href: '/memory' },
  { label: 'Memory for QA', href: '/memory-qa' },
  { label: 'Workbench', href: '/workbench' },
  { label: 'Documentation', href: '/docs' },
] as const

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 9h10" />
      <path d="m10 5 4 4-4 4" />
    </svg>
  )
}

export default function Header({ forceVisible = false }: { forceVisible?: boolean }) {
  const pathname = usePathname() || ''

  if (!forceVisible && isChromelessPath(pathname)) return null

  const trackPrimary = (location: string) => {
    trackEvent('nav_cta_click', {
      location,
      product: 'prochat_memory',
      cta: 'explore_memory',
      source_page: pathname,
    })
  }

  return (
    <header className="pc-public-header">
      <nav className="pc-public-navbar" aria-label="Primary navigation">
        <Link href="/" className="pc-public-navbar__brand" aria-label="ProChat home">
          <Logo scale={0.72} />
        </Link>

        <div className="pc-public-navbar__links">
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

        <div className="pc-public-navbar__actions">
          <Link href="/contact" className="pc-public-navbar__contact">
            Contact
          </Link>
          <Link
            href="/memory"
            className="pc-public-navbar__primary"
            onClick={() => trackPrimary('header')}
          >
            <span>Explore Memory</span>
            <ArrowIcon />
          </Link>
        </div>

        <details className="pc-public-navbar__mobile">
          <summary>Menu</summary>
          <div className="pc-public-navbar__mobile-panel">
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Contact</Link>
            <Link href="/memory" onClick={() => trackPrimary('mobile_header')}>
              Explore Memory
            </Link>
          </div>
        </details>
      </nav>
    </header>
  )
}
