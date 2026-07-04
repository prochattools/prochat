import React from 'react'
import Link from 'next/link'
import Logo from '@/components/logo'
import { SocialIcon } from '@/components/ui/social-icons'

const PRODUCT_LINKS = [
  { href: '/prochat-memory', label: 'ProChat Memory' },
  { href: '/qa-memory', label: 'ProChat Memory for QA' },
  { href: '/contact?topic=workbench', label: 'ProChat Workbench' },
] as const

const USE_LINKS = [
  { href: '/prochat-memory', label: 'Reusable memory' },
  { href: '/qa-memory', label: 'QA memory' },
  { href: '/contact', label: 'Contact ProChat' },
] as const

const RESOURCE_LINKS = [
  { href: '/docs', label: 'Documentation' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const

const CONTACT_ACTIONS = [
  { href: 'https://github.com/prochattools', label: 'GitHub', icon: 'github' },
  { href: 'https://www.linkedin.com/company/prochattools', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://x.com/stevewesthoek', label: 'X', icon: 'x' },
] as const

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div className="pm-footer-column">
      <h4>{title}</h4>
      <ul>
        {links.map(link => (
          <li key={`${link.href}-${link.label}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Footer: React.FC = () => {
  return (
    <footer className="pm-site-footer">
      <div className="pm-footer-inner">
        <div className="pm-footer-brand">
          <Link href="/" className="pm-footer-logo" aria-label="ProChat home">
            <Logo scale={1.02} />
          </Link>
          <p>
            Private, persistent memory for AI-assisted work.
          </p>
          <p className="pm-footer-proof">
            Your files. Your memory. Under your control.
          </p>
        </div>

        <div className="pm-footer-links">
          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Use cases" links={USE_LINKS} />
          <FooterColumn title="Resources" links={RESOURCE_LINKS} />
          <div className="pm-footer-column">
            <h4>Contact</h4>
            <div className="pm-footer-socials">
              {CONTACT_ACTIONS.map(action => (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={action.label}
                >
                  <SocialIcon icon={action.icon} className="h-4 w-4 fill-current" />
                  <span>{action.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pm-footer-bottom">
          <span>© {new Date().getFullYear()} ProChat</span>
          <span>Local files · Human-reviewed · Portable memory</span>
        </div>
      </div>
    </footer>
  )
}
