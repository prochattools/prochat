'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import Logo from '@/components/logo'
import { SocialIcon } from '@/components/ui/social-icons'
import { trackEvent } from '@/utils/analytics'
import './cinematic-marketing-shell.css'
import './cinematic/cinematic-reference-final.css'
import './cinematic/cinematic-utility.css'

const NAV_ITEMS = [
  { href: '/evermind', label: 'Evermind' },
  { href: '/nevermind', label: 'Nevermind' },
  { href: '/mastermind', label: 'Mastermind' },
  { href: '/docs', label: 'Documentation' },
] as const

const PRODUCT_LINKS = NAV_ITEMS.slice(0, 3)
const RESOURCE_LINKS = [
  { href: '/docs', label: 'Documentation' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const

const SOCIAL_LINKS = [
  { href: 'https://github.com/prochattools', label: 'GitHub', icon: 'github' },
  { href: 'https://www.linkedin.com/company/prochattools', label: 'LinkedIn', icon: 'linkedin' },
] as const

export type CinematicMarketingCta = {
  label: string
  href: string
  trackingCta: string
}

const DEFAULT_CTA: CinematicMarketingCta = {
  label: 'Explore Evermind',
  href: '/evermind',
  trackingCta: 'explore_evermind',
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h9" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}

export function CinematicMarketingNav({ cta = DEFAULT_CTA }: { cta?: CinematicMarketingCta }) {
  const pathname = usePathname() || ''
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 16)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('mousedown', closeOnOutsideClick)
    }
  }, [isOpen])

  const handleCtaClick = (location: string) => {
    trackEvent('nav_cta_click', {
      location,
      product: 'evermind',
      cta: cta.trackingCta,
      source_page: pathname,
    })
    setIsOpen(false)
  }

  return (
      <header className="cm-nav-shell" data-scrolled={hasScrolled}>
      <nav className="cm-nav" aria-label="Primary navigation">
        <Link href="/" className="cm-nav__brand" aria-label="ProChat home">
          <Logo scale={0.66} />
        </Link>

        <div className="cm-nav__links">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="cm-nav__actions">
          <Link href="/contact" className="cm-nav__contact">Contact</Link>
          <Link href={cta.href} className="cm-nav__cta" onClick={() => handleCtaClick('header')}>
            {cta.label}
            <ArrowIcon />
          </Link>
        </div>

        <div className="cm-nav__mobile" ref={menuRef}>
          <button
            type="button"
            className="cm-nav__menu-button"
            aria-expanded={isOpen}
            aria-controls="cm-mobile-menu"
            onClick={() => setIsOpen(open => !open)}
          >
            <span>{isOpen ? 'Close' : 'Menu'}</span>
          </button>
          <div id="cm-mobile-menu" className="cm-nav__mobile-panel" hidden={!isOpen}>
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href={cta.href} onClick={() => handleCtaClick('mobile_header')}>
              {cta.label}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div className="cm-footer__column">
      <h3>{title}</h3>
      <ul>
        {links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
      </ul>
    </div>
  )
}

export function CinematicMarketingFooter({ cinematicTheme = false }: { cinematicTheme?: boolean }) {
  return (
    <footer className="cm-footer">
      <div className="cm-footer__inner">
        <div className="cm-footer__grid">
          <div className="cm-footer__brand">
            <Link href="/" className="cm-footer__logo" aria-label="ProChat home"><Logo scale={0.9} /></Link>
            <h2>Memory, context, and controlled execution for AI work.</h2>
            <p>Evermind remembers. Nevermind brings context. Mastermind directs the work.</p>
          </div>
          <nav className="cm-footer__links" aria-label="Footer navigation">
            <FooterColumn title="Product" links={PRODUCT_LINKS} />
            <FooterColumn title="Resources" links={RESOURCE_LINKS} />
            <FooterColumn title="Participate" links={[{ href: 'https://github.com/prochattools', label: 'ProChat on GitHub' }]} />
            <div className="cm-footer__column">
              <h3>Social</h3>
              <div className="cm-footer__social">
                {SOCIAL_LINKS.map(action => <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer"><SocialIcon icon={action.icon} className="h-4 w-4 fill-current" /><span>{action.label}</span></a>)}
              </div>
            </div>
          </nav>
        </div>
        <div className="cm-footer__bottom">
          <span>© {new Date().getFullYear()} ProChat</span>
          {cinematicTheme ? (
            <a className="cm-footer__status-link" href="https://status.prochat.tools" target="_blank" rel="noopener noreferrer">
              Service status <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <div className="cm-footer__status"><iframe src="https://status.prochat.tools/badge?theme=dark" title="ProChat service status" width="250" height="30" loading="lazy" scrolling="no" /></div>
          )}
          <span>Local files · Human-reviewed · Portable memory</span>
        </div>
      </div>
    </footer>
  )
}

export function CinematicMarketingShell({
  children,
  cta,
  contentOwnsMain = false,
  cinematicTheme = false,
  utilityTheme = false,
}: {
  children: React.ReactNode
  cta?: CinematicMarketingCta
  contentOwnsMain?: boolean
  cinematicTheme?: boolean
  utilityTheme?: boolean
}) {
  return (
    <div className={`cm-shell ${cinematicTheme ? 'cm-shell--core' : ''} ${utilityTheme ? 'cm-shell--utility' : ''}`.trim()}>
      <div className="cm-shell__backdrop" aria-hidden="true" />
      <CinematicMarketingNav cta={cta} />
      {contentOwnsMain ? children : <main id="main-content" className="cm-shell__main">{children}</main>}
      {!cinematicTheme && !utilityTheme ? <CinematicMarketingFooter /> : null}
    </div>
  )
}
