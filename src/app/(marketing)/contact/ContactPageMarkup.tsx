import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, CreditCard, FileText, Mail, Scale, Send, Shield, ShieldCheck } from 'lucide-react'
import { HeroSection } from '@/components/marketing/HeroSection'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Panel, Section } from '@/components/ui/surface'

const FAST_LINKS: Array<{
  href: string
  label: string
  description: string
  icon: LucideIcon
}> = [
    {
      href: '/docs',
      label: 'Documentation',
      description: 'SaaSKit and ProKit implementation docs, setup, and troubleshooting.',
      icon: FileText,
    },
    {
      href: '/kits/saaskit#pricing',
      label: 'SaaSKit',
      description: 'See the default production-ready kit, pricing, and what it includes.',
      icon: CreditCard,
    },
    {
      href: '/terms',
      label: 'License Terms',
      description: 'Usage rules and licensing details.',
      icon: Scale,
    },
    {
      href: '/privacy',
      label: 'Privacy Policy',
      description: 'Data handling and privacy details.',
      icon: Shield,
    },
  ]

const CONTACT_SUBMIT_IDLE_HTML = `
  <span class="pc-action-label">
    <span class="text-current">SEND MESSAGE</span>
  </span>
`

export default function ContactPageMarkup() {
  return (
    <>
      <HeroSection density="compact" align="left" className="pc-marketing-hero--lines-mobile min-h-[100svh]">
        <div className="mx-auto grid w-full max-w-[1120px] items-center gap-6 md:gap-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12">
            <div className="order-1 lg:col-start-2 lg:col-span-5 lg:pt-2">
              <div className="max-w-[32rem] space-y-3.5 md:space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Contact
                </div>

                <div className="space-y-2.5 md:space-y-4">
                  <h1 className="max-w-[20ch] font-brand text-[1.95rem] font-bold leading-[1.02] tracking-[-0.05em] text-foreground md:text-[2.8rem]">
                    Contact ProChat
                  </h1>
                <p className="max-w-[42rem] text-[0.92rem] leading-7 text-muted-foreground md:text-[0.98rem]">
                  Use this form if you need help choosing between SaaSKit and ProKit, hit a real implementation blocker, or have a setup or licensing question. For everything else, start with the docs first so replies can stay focused and fast.
                </p>
                </div>

                <div className="inline-flex items-center gap-2.5 text-[13px] font-medium text-tertiary">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Clear answers. No jargon. No spam.</span>
                </div>
              </div>
            </div>

            <div className="order-2 lg:col-start-7 lg:col-span-5 lg:row-span-2 lg:justify-self-end xl:col-span-5">
              <Panel
                id="contact-form-card"
                tone="elevated"
                padding="compact"
                className="mx-auto w-full max-w-[32rem] border-border/85 bg-surface-elevated/95 shadow-elevated lg:ml-auto"
              >
                <div className="mb-3 border-b border-border-subtle/80 pb-3 md:mb-5 md:pb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                    Contact form
                  </p>
                  <h2 className="mt-2 font-brand text-[1.45rem] font-semibold tracking-[-0.02em] text-foreground">
                    Send a direct message
                  </h2>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    Share the product question, implementation blocker, or licensing issue. Most replies land within 1 business day.
                  </p>
                </div>

                <form
                  data-contact-form=""
                  className="space-y-3.5 md:space-y-4"
                  noValidate
                  method="post"
                  action="/api/contact"
                >
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="contact-honeypot">Leave this empty</label>
                    <input
                      id="contact-honeypot"
                      name="honeypot"
                      autoComplete="off"
                      type="text"
                      tabIndex={-1}
                    />
                  </div>

                  <input type="hidden" name="topic" value="General Question" />
                  <input type="hidden" name="companyOrProjectUrl" value="" />

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="contact-field-label">
                        Name <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        name="name"
                        className="contact-field"
                        placeholder="John Doe"
                        autoComplete="name"
                        aria-required="true"
                        required
                      />
                      <p className="contact-field-error hidden" data-error-for="name"></p>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="contact-field-label">
                        Email <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        className="contact-field"
                        placeholder="john@company.com"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        required
                      />
                      <p className="contact-field-error hidden" data-error-for="email"></p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="contact-field-label">
                      Message <span aria-hidden="true" className="text-primary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact-textarea"
                      placeholder="Describe the product, current blocker, and the decision or implementation help you need."
                      rows={5}
                      aria-required="true"
                      required
                    ></textarea>
                    <p className="contact-helper-text">
                      Include the kit, the step you are on, and what is blocking progress.
                    </p>
                    <p className="contact-field-error hidden" data-error-for="message"></p>
                  </div>

                  <p className="text-[12px] leading-5 text-muted-foreground">
                    <span className="text-primary">*</span> Required fields
                  </p>

                  <p
                    data-contact-status=""
                    className="contact-status hidden"
                    aria-live="polite"
                    aria-atomic="true"
                    tabIndex={-1}
                  ></p>

                  <Button
                    data-contact-submit=""
                    type="submit"
                    className="contact-submit-button h-11 w-full justify-center gap-2 rounded-lg text-[13px] shadow-surface hover:bg-primary/92 active:scale-[0.98] md:text-[13px]"
                  >
                    <span
                      data-contact-submit-label=""
                      dangerouslySetInnerHTML={{ __html: CONTACT_SUBMIT_IDLE_HTML }}
                    />
                    <span className="hidden" aria-hidden="true"></span>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </Panel>
            </div>

        </div>
      </HeroSection>

      <Section tone="muted" spacing="compact" className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-5xl px-page">
          <Panel tone="soft" padding="compact" className="border-border-subtle/80 bg-surface/92">
            <div className="space-y-4">
              <div>
                <h3 className="font-brand text-lg font-semibold tracking-[-0.02em] text-foreground">
                  Fast Links
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Go straight to the most useful implementation, product, and policy answers before sending a message.
                </p>
              </div>

              <ul className="space-y-2.5">
                {FAST_LINKS.map(link => {
                  const Icon = link.icon

                  return (
                    <li key={link.href}>
                      <Link href={link.href} className="contact-sidebar-link">
                        <span className="contact-sidebar-icon" aria-hidden="true">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">
                            {link.label}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-5 text-muted-foreground">
                            {link.description}
                          </span>
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-tertiary transition-colors duration-200 group-hover:text-foreground" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-5 border-t border-border-subtle/80 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">Support email</p>
              <a
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-border-strong/80 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                href="mailto:support@prochat.tools"
              >
                <Mail className="h-4 w-4 text-primary/80" />
                support@prochat.tools
              </a>
            </div>
          </Panel>
        </div>
      </Section>
    </>
  )
}
