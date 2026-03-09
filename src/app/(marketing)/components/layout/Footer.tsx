import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo';
import BuiltWithBadge from '@/components/ui/built-with-badge';

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

function LinkedinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function FooterActionIcon({ icon }: { icon: (typeof CONTACT_ACTIONS)[number]['icon'] }) {
  if (icon === 'linkedin') {
    return <LinkedinIcon />;
  }

  if (icon === 'discord') {
    return <DiscordIcon />;
  }

  return <GithubIcon />;
}

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
                      <FooterActionIcon icon={action.icon} />
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
