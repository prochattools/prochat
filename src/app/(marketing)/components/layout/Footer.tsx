import React from 'react'
import Link from 'next/link'
import Logo from '@/components/logo'
import { SocialIcon } from '@/components/ui/social-icons'

const PRODUCT_LINKS = [
  { href: '/memory', label: 'ProChat Memory' },
  { href: '/memory-qa', label: 'ProChat Memory for QA' },
  { href: '/workbench', label: 'ProChat Workbench' },
] as const

const RESOURCE_LINKS = [
  { href: '/docs', label: 'Documentation' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const

const PARTICIPATION_LINKS = [
  { href: 'https://github.com/prochattools/memory-qa', label: 'Memory for QA repository', external: true },
  { href: 'https://github.com/prochattools/workbench', label: 'Workbench repository', external: true },
  { href: 'https://github.com/prochattools', label: 'ProChat on GitHub', external: true },
] as const

const SOCIAL_LINKS = [
  { href: 'https://github.com/prochattools', label: 'GitHub', icon: 'github' },
  { href: 'https://www.linkedin.com/company/prochattools', label: 'LinkedIn', icon: 'linkedin' },
] as const

type FooterLink = {
  href: string
  label: string
  external?: boolean
}

function FooterColumn({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div className="pc-footer-column">
      <h4 className="pc-footer-column__title">
        {title}
      </h4>
      <ul className="pc-footer-column__list">
        {links.map(link => (
          <li key={`${link.href}-${link.label}`}>
            {link.external ? (
              <a
                href={link.href}
                className="pc-footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="pc-footer-link"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Footer: React.FC = () => {
  return (
    <footer className="pc-footer">
      <div className="pc-footer__inner">
        <div className="pc-footer__grid">
          <div className="pc-footer__brand">
            <Link href="/" className="pc-footer__logo" aria-label="ProChat home">
              <Logo scale={1.02} />
            </Link>
            <h2 id="pc-footer-title">Local, durable memory for AI-assisted work.</h2>
            <p>
              Memory, Memory for QA, and Workbench keep reviewed project context inspectable and local.
            </p>
          </div>

          <nav className="pc-footer__links" aria-label="Footer navigation">
            <FooterColumn title="Product" links={PRODUCT_LINKS} />
            <FooterColumn title="Resources" links={RESOURCE_LINKS} />
            <FooterColumn title="Participate" links={PARTICIPATION_LINKS} />
            <div className="pc-footer-column">
              <h4 className="pc-footer-column__title">Social</h4>
              <div className="pc-footer-social">
                {SOCIAL_LINKS.map(action => (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={action.label}
                    className="pc-footer-social__link"
                  >
                    <SocialIcon icon={action.icon} className="h-4 w-4 fill-current" />
                    <span>{action.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="pc-footer__bottom">
          <span>© {new Date().getFullYear()} ProChat</span>
          <div className="pc-footer__status">
            <iframe
              src="https://status.prochat.tools/badge?theme=dark"
              title="ProChat service status"
              width="250"
              height="30"
              loading="lazy"
              scrolling="no"
            />
          </div>
          <span className="pc-footer__principles">Local files · Human-reviewed · Portable memory</span>
        </div>
      </div>
    </footer>
  )
}
