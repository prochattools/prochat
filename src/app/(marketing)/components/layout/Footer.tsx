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
    <div className="space-y-4">
      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/85">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-border/60 bg-background/55 text-foreground backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="max-w-md space-y-6">
            <Link href="/" className="inline-flex" aria-label="ProChat home">
              <Logo scale={1.02} />
            </Link>
            <div className="space-y-3">
              <p className="text-base leading-7 text-muted-foreground">
                Private, persistent memory for AI-assisted work.
              </p>
              <p className="text-base font-medium leading-7 text-foreground">
                Your files. Your memory. Under your control.
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Product" links={PRODUCT_LINKS} />
            <FooterColumn title="Use cases" links={USE_LINKS} />
            <FooterColumn title="Resources" links={RESOURCE_LINKS} />
            <div className="space-y-4">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/85">
                Contact
              </h4>
              <div className="space-y-3">
                {CONTACT_ACTIONS.map(action => (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={action.label}
                    className="inline-flex items-center gap-2 text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SocialIcon icon={action.icon} className="h-4 w-4 fill-current" />
                    <span>{action.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ProChat</span>
          <span>Local files · Human-reviewed · Portable memory</span>
        </div>
      </div>
    </footer>
  )
}
