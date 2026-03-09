import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpRight,
  ChevronDown,
  CreditCard,
  FileText,
  Mail,
  MessageSquare,
  Scale,
  Send,
  Shield,
  ShieldCheck,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Panel, Section } from '@/components/ui/surface'

const FAQ_ITEMS = [
  {
    question: 'What is the average response time?',
    answer:
      'Most messages get a reply within 1 business day. For deeper technical issues, expect 1–3 business days so we can reproduce the issue properly.',
  },
  {
    question: 'Do you offer custom implementation or studio work?',
    answer:
      'Yes. ProChat Studio can handle setup, integrations, migrations, and custom features. Send a short brief and timeline and we’ll reply with clear next steps.',
  },
  {
    question: 'Is technical support included with SaaSKit?',
    answer:
      'Yes—core setup and standard workflow support is included for install, env vars, deploy, and common errors. Custom feature development is handled via Studio work.',
  },
  {
    question: 'Can I upgrade my license later?',
    answer:
      'Yes. You can upgrade anytime. You keep your progress, and we’ll point you to the clean upgrade path.',
  },
  {
    question: 'Where can I find documentation?',
    answer:
      'The documentation area includes step-by-step setup, deployment guides, and troubleshooting pages.',
  },
]

const FAST_LINKS: Array<{
  href: string
  label: string
  description: string
  icon: LucideIcon
}> = [
  {
    href: '/starting-point',
    label: 'Documentation',
    description: 'Setup, deployment, and troubleshooting.',
    icon: FileText,
  },
  {
    href: '/kits/saaskit#pricing',
    label: 'Pricing',
    description: 'Plans, licensing, and upgrade paths.',
    icon: CreditCard,
  },
  {
    href: '/terms',
    label: 'Legal Terms',
    description: 'License terms and usage rules.',
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
    <span class="text-current md:hidden">SEND MY BRIEF</span>
    <span class="hidden text-current md:inline">SEND MY BRIEF</span>
    <span aria-hidden="true" class="hidden opacity-50 md:inline"> - </span>
    <span class="hidden opacity-50 md:inline">USUALLY REPLIES WITHIN 1 BUSINESS DAY</span>
  </span>
`

export default function ContactPageMarkup() {
  return (
    <>
      <section className="pc-marketing-hero pc-marketing-hero--compact pc-marketing-hero--left">
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden" />
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__wash hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__glow hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__vignette hidden dark:block" />

        <div className="pc-marketing-hero__inner pb-6 md:pb-12">
        <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="order-1 lg:col-span-5 lg:pt-2">
            <div className="max-w-[46rem] space-y-3.5 md:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Contact
              </div>

              <div className="space-y-2.5 md:space-y-4">
                <h1 className="max-w-[15ch] font-brand text-[1.95rem] font-bold leading-[1.02] tracking-[-0.05em] text-foreground md:text-[2.8rem]">
                  Talk to ProChat.
                </h1>
                <p className="max-w-[42rem] text-[0.92rem] leading-7 text-muted-foreground md:text-[0.98rem]">
                  Questions about SaaSKit, ProKit, UXKit, or Studio work? Send one message and
                  we’ll point you to the right next step without wasting time.
                </p>
              </div>

              <div className="inline-flex items-center gap-2.5 text-[13px] font-medium text-tertiary">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Clear answers. No jargon. No spam.</span>
              </div>
            </div>
          </div>

          <div className="order-2 lg:col-span-7 lg:row-span-2">
            <Panel
              id="contact-form-card"
              tone="elevated"
              padding="compact"
              className="w-full border-border/85 bg-surface-elevated/95 shadow-elevated"
            >
              <div className="mb-3 border-b border-border-subtle/80 pb-3 md:mb-5 md:pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                  Contact form
                </p>
                <h2 className="mt-2 font-brand text-[1.45rem] font-semibold tracking-[-0.02em] text-foreground">
                  Send a direct message
                </h2>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  Share the blocker or next step you need. Most replies land within 1 business day.
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
                    placeholder="Describe the goal, timeline, and blocker."
                    rows={5}
                    aria-required="true"
                    required
                  ></textarea>
                  <p className="contact-helper-text">
                    The more specific the brief, the faster the reply.
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
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Panel>
          </div>

          <div className="order-3 lg:col-span-5">
            <Panel
              tone="soft"
              padding="compact"
              className="contact-community-panel border-border-subtle/85 bg-surface/92"
            >
              <div className="space-y-2 md:space-y-2.5">
                <div className="contact-community-icon" aria-hidden="true">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="font-brand text-base font-semibold tracking-[-0.02em] text-foreground">
                    Join the community
                  </h2>
                  <p className="text-[13px] leading-5 text-muted-foreground">
                    Follow product updates and release notes in Discord if you prefer a quieter,
                    low-commitment channel.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="contact-community-button h-9 rounded-lg px-3.5 text-[13px] font-medium"
                >
                  <a
                    href="https://discord.com/channels/1433752576779878583/1479029148654764106"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Join Discord
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </Panel>
          </div>
        </div>
        </div>
      </section>

      <Section tone="muted" spacing="compact" className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-page">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-6 lg:col-span-8">
              <div className="max-w-2xl space-y-3">
                <h2 className="font-brand text-2xl font-bold tracking-[-0.02em] text-foreground md:text-[1.75rem]">
                  Frequently Asked Questions
                </h2>
                <p className="text-[0.96rem] leading-7 text-muted-foreground">
                  Quick answers about support, studio work, licensing, and response times.
                </p>
              </div>

              <div className="space-y-3" data-faq-accordion="">
                {FAQ_ITEMS.map((item, index) => (
                  <div
                    key={item.question}
                    className="contact-faq-item rounded-2xl border border-border-subtle bg-surface p-4 shadow-surface transition-all md:p-5"
                    data-faq-item=""
                    data-open="false"
                  >
                    <h3>
                      <button
                        id={`contact-faq-trigger-${index}`}
                        type="button"
                        className="contact-faq-trigger group flex w-full items-center justify-between gap-4 rounded-xl text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        data-faq-trigger=""
                        aria-expanded="false"
                        aria-controls={`contact-faq-panel-${index}`}
                      >
                        <span className="pr-3 text-[0.98rem] font-semibold leading-6 text-foreground">
                          {item.question}
                        </span>
                        <ChevronDown
                          className="contact-faq-chevron h-4 w-4 shrink-0 text-tertiary transition-colors duration-200 group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <div
                      id={`contact-faq-panel-${index}`}
                      className="mt-3 text-[0.95rem] leading-7 text-muted-foreground"
                      role="region"
                      aria-labelledby={`contact-faq-trigger-${index}`}
                      data-faq-panel=""
                      hidden
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 lg:col-span-4">
              <Panel tone="soft" padding="compact" className="border-border-subtle/80 bg-surface/92">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-brand text-lg font-semibold tracking-[-0.02em] text-foreground">
                      Fast Links
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      The quickest routes for setup, pricing, and policy questions.
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                    Support email
                  </p>
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
          </div>
        </div>
      </Section>
    </>
  )
}
