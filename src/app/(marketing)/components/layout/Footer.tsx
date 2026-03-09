import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo';
import BuiltWithBadge from '@/components/ui/built-with-badge';
import { SocialIcon } from '@/components/ui/social-icons';

const PRODUCT_LINKS = [
  { href: '/kits/prokit', label: 'ProKit' },
  { href: '/kits/saaskit', label: 'SaaSKit' },
] as const

const PRODUCT_CORE_LINK = {
  href: 'https://github.com/stevewesthoek/',
  label: 'ProKit Core',
  external: true,
} as const

const ROADMAP_LINKS = [
  { href: '/kits/uxkit-waitlist', label: 'UXKit' },
  { href: '/kits#comparison', label: 'WaaSKit' },
  { href: '/kits#comparison', label: 'ProChat OS' },
] as const

const RESOURCE_LINKS = [
  { href: '/saas-glossary', label: 'SaaS Glossary' },
  { href: '/starting-point', label: 'Starting Point' },
  { href: '/blog/how-to-build-saas-with-ai-non-developer', label: 'Production Guide' },
] as const

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of services' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: 'https://prochat.tools/terms#digital-product-license', label: 'Licences', external: true },
] as const

const CONTACT_ACTIONS = [
  { href: 'https://www.linkedin.com/', label: 'Connect on LinkedIn', icon: 'linkedin', external: true },
  { href: 'https://github.com/prochattools', label: 'Follow me on GitHub', icon: 'github', external: true },
  { href: 'https://discord.gg/U75p2BQuAH', label: 'Join My Community', icon: 'discord', external: true },
] as const

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-[1] isolate border-t border-border bg-background pt-20 pb-10 font-mono [&_*]:font-mono">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-10 lg:px-page">
        <div className="mb-14 lg:grid lg:gap-x-10 lg:gap-y-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.85fr)]">
          <div className="space-y-5 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center">
              <Logo scale={1.1} />
            </Link>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground lg:mx-0">
              <span className="block">The Operating System</span>
              <span className="block">for SaaS Builders.</span>
            </p>
            <BuiltWithBadge href="/kits/saaskit" className="mx-auto w-fit lg:mx-0" />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 md:gap-x-12 lg:mt-0 lg:grid-cols-none lg:gap-0 lg:contents">
            <div className="min-w-0">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/92 lg:mb-5 lg:text-sm lg:tracking-[0.14em]">Products</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {PRODUCT_LINKS.map(link => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="break-words leading-relaxed transition-colors hover:text-primary md:break-normal">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-0">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] mb-[13px] block h-px w-[11ch] bg-gradient-to-r from-border/40 to-transparent"
                  />
                  <a
                    href={PRODUCT_CORE_LINK.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="break-words leading-relaxed text-muted-foreground/72 transition-colors hover:text-muted-foreground md:break-normal"
                  >
                    {PRODUCT_CORE_LINK.label}
                  </a>
                </li>
              </ul>
            </div>

            <div className="min-w-0">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/92 lg:mb-5 lg:text-sm lg:tracking-[0.14em]">Roadmap</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {ROADMAP_LINKS.map(link => (
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
                      className="inline-flex items-start gap-2 break-words leading-relaxed transition-colors hover:text-primary md:break-normal"
                    >
                      <SocialIcon icon={action.icon} />
                      <span>{action.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex justify-center text-center sm:justify-end">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground/65 sm:justify-end">
            {LEGAL_LINKS.map(link =>
              'external' in link ? (
                <a
                  key={`legal-row-${link.label}`}
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={`legal-row-${link.label}`}
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex w-full items-center justify-center text-center sm:w-auto sm:justify-start">
              <div className="w-full max-w-[250px]">
                <div className="relative z-[2] h-[30px] w-full">
                  <a
                    href="https://status.prochat.tools/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    aria-label="Open ProChat service status"
                    className="absolute inset-0 z-10"
                  >
                    <span className="sr-only">Open ProChat service status</span>
                  </a>
                  <div className="block dark:hidden">
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
                      style={{ colorScheme: "normal" }}
                    />
                  </div>
                  <div className="hidden dark:block">
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
                      style={{ colorScheme: "normal" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground sm:text-right">
              © 2026 ProChat — All rights reserved
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
