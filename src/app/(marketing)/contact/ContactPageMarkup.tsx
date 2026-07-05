import Link from 'next/link'
import { ArrowUpRight, Send, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CONTACT_SUBMIT_IDLE_HTML = `
  <span class="pc-action-label">
    <span class="text-current">SEND MESSAGE</span>
  </span>
`

const contactReasons = [
  'Become a ProChat Memory tester',
  'Discuss a repeated workflow',
  'Ask about local Markdown memory',
  'Plan a ProChat Memory for QA use case',
] as const

const nextSteps = [
  'Share one repeated task or context problem.',
  'Describe what useful memory should preserve.',
  'We identify the smallest useful tester flow.',
] as const

export default function ContactPageMarkup() {
  return (
    <>
      <section className="pm-hero-section contact-memory-hero">
        <div className="pm-container pm-hero-grid">
          <div className="pm-hero-copy">
            <p className="pm-kicker">CONTACT · MEMORY</p>
            <h1>
              Start with one <em>memory problem.</em>
            </h1>
            <p>
              Tell us where your team keeps rebuilding context. We will help turn one repeated task into a focused ProChat Memory tester flow.
            </p>
            <div className="pm-trust-line">Clear context · Human-reviewed · Focused reply</div>
          </div>

          <div className="pm-review-card contact-form-panel" id="contact-form-card">
            <div className="pm-record-meta">
              <span>Contact form</span>
              <span>PRIVATE</span>
            </div>
            <h2>Send a direct message</h2>
            <p>
              Share the product question, context problem, or implementation blocker so we can understand the next useful step.
            </p>

            <form
              data-contact-form=""
              className="contact-memory-form"
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

              <input type="hidden" name="topic" value="ProChat Memory" />
              <input type="hidden" name="companyOrProjectUrl" value="" />

              <div className="contact-memory-grid">
                <div className="contact-memory-field">
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

                <div className="contact-memory-field">
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

              <div className="contact-memory-field">
                <label htmlFor="contact-message" className="contact-field-label">
                  Message <span aria-hidden="true" className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact-textarea"
                  placeholder="Describe the repeated task, the context you keep rebuilding, and what useful memory should preserve."
                  rows={6}
                  aria-required="true"
                  required
                ></textarea>
                <p className="contact-helper-text">
                  Include the task, examples of good output, and what currently gets lost between sessions.
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
          </div>
        </div>
      </section>

      <section className="pm-editorial-section pm-section-rule contact-memory-section">
        <div className="pm-container pm-visual-split">
          <div>
            <p className="pm-kicker">WHAT TO SEND</p>
            <h2>Useful context starts messy.</h2>
            <p>
              A short note is enough. Describe the work your team repeats, the context that keeps disappearing, and what a good answer should respect.
            </p>
          </div>
          <div className="pm-record-grid contact-reason-grid">
            {contactReasons.map(reason => (
              <article key={reason} className="pm-record-card">
                <div className="pm-record-meta">
                  <span>Reason</span>
                  <span>DRAFT</span>
                </div>
                <h3>{reason}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-editorial-section contact-memory-section">
        <div className="pm-container pm-method-grid">
          <div>
            <p className="pm-kicker">NEXT STEP</p>
            <h2>We turn one repeated task into a tester flow.</h2>
            <p>
              The goal is not a broad rollout. It is one concrete place where persistent memory can reduce repeated explanation.
            </p>
          </div>
          <div className="pm-step-list">
            {nextSteps.map((step, index) => (
              <article key={step} className="pm-step-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-final-cta contact-memory-footer-cta">
        <div className="pm-container pm-final-panel">
          <p className="pm-kicker">CONTACT FORM</p>
          <h2>Send one focused note.</h2>
          <p>
            Use the form above and include any links or examples that help explain the repeated context problem.
          </p>
          <div className="pm-actions pm-actions-center">
            <Button asChild variant="primary" size="lg">
              <a href="#contact-form-card">
                Use the form
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/prochat-memory">
                See ProChat Memory
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>We use your message to understand and respond to your request.</span>
          </div>
        </div>
      </section>
    </>
  )
}
