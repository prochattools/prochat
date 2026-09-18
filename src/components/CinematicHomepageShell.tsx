'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Logo from '@/components/logo'
import { SocialIcon } from '@/components/ui/social-icons'

const NAV_ITEMS = [
  { href: '/evermind', label: 'Evermind' },
  { href: '/nevermind', label: 'Nevermind' },
  { href: '/mastermind', label: 'Mastermind' },
  { href: '/docs', label: 'Documentation' },
  { href: '/contact', label: 'Contact' },
] as const

const PRODUCT_LINKS = [
  { href: '/evermind', label: 'Evermind' },
  { href: '/nevermind', label: 'Nevermind' },
  { href: '/mastermind', label: 'Mastermind' },
] as const

const RESOURCE_LINKS = [
  { href: '/docs', label: 'Documentation' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const

function HomepageNavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname() || '/'

  return (
    <Link href={href} onClick={onClick} aria-current={pathname === href ? 'page' : undefined}>
      {label}
    </Link>
  )
}

export function CinematicHomepageNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="home-cinematic-header">
      <nav className="home-cinematic-nav" aria-label="Primary navigation">
        <Link href="/" className="home-cinematic-nav__brand" aria-label="ProChat home">
          <Logo scale={0.72} />
        </Link>

        <div className="home-cinematic-nav__links">
          {NAV_ITEMS.map(item => <HomepageNavLink key={item.href} {...item} />)}
        </div>

        <Link href="/evermind" className="home-cinematic-nav__cta">
          Explore Evermind
          <span aria-hidden="true">↗</span>
        </Link>

        <button
          type="button"
          className="home-cinematic-nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="home-cinematic-mobile-menu"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>

        <div
          id="home-cinematic-mobile-menu"
          className={`home-cinematic-nav__mobile-menu${menuOpen ? ' is-open' : ''}`}
          hidden={!menuOpen}
        >
          {NAV_ITEMS.map(item => <HomepageNavLink key={item.href} {...item} onClick={closeMenu} />)}
          <Link href="/evermind" className="home-cinematic-nav__mobile-cta" onClick={closeMenu}>
            Explore Evermind <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div className="home-cinematic-footer__column">
      <h3>{title}</h3>
      <ul>
        {links.map(link => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CinematicHomepageFooter() {
  return (
    <footer className="home-cinematic-footer">
      <div className="home-cinematic-footer__inner">
        <div className="home-cinematic-footer__lead">
          <div className="home-cinematic-footer__brand">
            <Link href="/" aria-label="ProChat home">
              <Logo isLarge scale={1.08} />
            </Link>
            <p className="home-cinematic-footer__tagline">Memory, context, and controlled execution for AI work.</p>
            <p className="home-cinematic-footer__family">Evermind remembers. Nevermind brings context. Mastermind directs the work.</p>
          </div>
          <div className="home-cinematic-footer__closing">
            <p className="home-cinematic-footer__eyebrow">A clearer way to direct AI work</p>
            <h2>Keep the lesson. Put it back to work.</h2>
            <Link href="/evermind" className="home-cinematic-footer__button">Start with Evermind <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className="home-cinematic-footer__columns">
          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <div className="home-cinematic-footer__column">
            <h3>Participate</h3>
            <ul>
              <li><a href="https://github.com/prochattools" target="_blank" rel="noopener noreferrer">ProChat on GitHub</a></li>
            </ul>
          </div>
          <div className="home-cinematic-footer__column">
            <h3>Social</h3>
            <ul className="home-cinematic-footer__social">
              <li><a href="https://github.com/prochattools" target="_blank" rel="noopener noreferrer"><SocialIcon icon="github" className="h-4 w-4 fill-current" />GitHub</a></li>
              <li><a href="https://www.linkedin.com/company/prochattools" target="_blank" rel="noopener noreferrer"><SocialIcon icon="linkedin" className="h-4 w-4 fill-current" />LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="home-cinematic-footer__bottom">
          <span>© {new Date().getFullYear()} ProChat</span>
          <a className="home-cinematic-footer__status" href="https://status.prochat.tools/" target="_blank" rel="noopener noreferrer">
            <span className="home-cinematic-footer__status-dot" aria-hidden="true" />
            <span>Service status</span>
            <span aria-hidden="true">↗</span>
          </a>
          <span>Local files · Human-reviewed · Portable memory</span>
        </div>
      </div>
    </footer>
  )
}
