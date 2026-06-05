import React from 'react'
import Link from 'next/link'
import Logo from '@/components/logo'
import { SocialIcon } from '@/components/ui/social-icons'

const OFFER_LINKS = [
  { href: '/systems/prochat-os', label: 'ProChat OS' },
  { href: '/ai-workflows', label: 'Time-Saving Test' },
  { href: '/book', label: 'Book a Call' },
] as const

const RESOURCE_LINKS = [
  { href: '/docs', label: 'Documentation' },
  { href: '/contact', label: 'Contact' },
] as const

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
] as const

const CONTACT_ACTIONS = [
  { href: 'https://x.com/stevewesthoek', label: 'X', icon: 'x', external: true },
  { href: 'https://github.com/prochattools', label: 'GitHub', icon: 'github', external: true },
  {
    href: 'https://www.linkedin.com/company/prochattools',
    label: 'LinkedIn',
    icon: 'linkedin',
    external: true,
  },
] as const

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-[1] isolate bg-transparent pt-20 pb-10 font-mono [&_*]:font-mono">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-10 lg:px-page">
        <div className="mb-14 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,0.9fr)] lg:gap-x-10 lg:gap-y-12">
          <div className="flex flex-col items-center space-y-6 pt-16 pb-16 text-center md:pt-12 md:pb-8 md:space-y-4 lg:block lg:space-y-5 lg:pt-0 lg:pb-0 lg:text-left">
            <Link href="/" className="inline-flex items-center">
              <Logo scale={1.1} />
            </Link>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground lg:mx-0">
              <span className="block">ProChat helps teams stop rewriting</span>
              <span className="block">and re-explaining the same work.</span>
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 md:mt-10 md:gap-x-12 lg:mt-0 lg:grid-cols-none lg:gap-0 lg:contents">
            <div className="min-w-0">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/92 lg:mb-5 lg:text-sm lg:tracking-[0.14em]">Offer</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {OFFER_LINKS.map(link => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="break-words leading-relaxed transition-colors hover:text-primary md:break-normal">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/92 lg:mb-5 lg:text-sm lg:tracking-[0.14em]">Resources</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {RESOURCE_LINKS.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="break-words leading-relaxed transition-colors hover:text-primary md:break-normal">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/92 lg:mb-5 lg:text-sm lg:tracking-[0.14em]">Contact</h4>
              <div className="space-y-4 text-sm text-muted-foreground">
                {CONTACT_ACTIONS.map(action => (
                  <div key={action.label}>
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 break-words leading-relaxed transition-colors hover:text-primary md:break-normal"
                    >
                      <SocialIcon icon={action.icon} className="h-5 w-5 shrink-0 fill-current" />
                      <span>{action.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col items-center justify-between gap-3 text-center lg:flex-row lg:text-left">
          <a
            href="https://aws.amazon.com/activate/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground/65 transition-colors hover:text-primary"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/65">An</span>
            <img
              src="/logo/aws-activate-logo-light.svg"
              alt="AWS Activate"
              className="h-[1.2em] w-auto dark:hidden ml-[3px] mr-[3px]"
              style={{ transform: 'translateY(-1.6px)' }}
            />
            <img
              src="/logo/aws-activate-logo-dark.svg"
              alt="AWS Activate"
              className="hidden h-[1.2em] w-auto dark:block ml-[3px] mr-[3px]"
              style={{ transform: 'translateY(-1.6px)' }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/65">Startup</span>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground/65 lg:justify-end">
            {LEGAL_LINKS.map(link => (
              <Link
                key={`legal-row-${link.label}`}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="mt-10 flex w-full justify-center text-center lg:mt-0 lg:w-auto lg:justify-start">
              <div className="flex min-h-[32px] w-full justify-center md:block md:min-h-0">
                <div className="relative z-[2] mx-auto h-[30px] w-[250px] translate-x-3 sm:translate-x-4 md:mx-0 md:translate-x-0">
                  <a
                    href="https://status.prochat.tools/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label="Open ProChat service status"
                    className="absolute inset-0 z-10"
                  >
                    <span className="sr-only">Open ProChat service status</span>
                  </a>
                  <div className="mx-auto block md:mx-0 dark:hidden">
                    <iframe
                      src="https://status.prochat.tools/badge?theme=light"
                      title="ProChat service status badge"
                      aria-label="ProChat service status badge"
                      loading="lazy"
                      width="250"
                      height="30"
                      frameBorder="0"
                      scrolling="no"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin"
                      className="block h-[30px] w-full border-0 pointer-events-none"
                      style={{ colorScheme: 'normal' }}
                    />
                  </div>
                  <div className="mx-auto hidden md:mx-0 dark:block">
                    <iframe
                      src="https://status.prochat.tools/badge?theme=dark"
                      title="ProChat service status badge"
                      aria-label="ProChat service status badge"
                      loading="lazy"
                      width="250"
                      height="30"
                      frameBorder="0"
                      scrolling="no"
                      referrerPolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin"
                      className="block h-[30px] w-full border-0 pointer-events-none"
                      style={{ colorScheme: 'normal' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground lg:text-right">
              © 2026 ProChat — All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
