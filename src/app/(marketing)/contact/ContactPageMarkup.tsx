import { Input } from '@/components/ui/input'

const CONTACT_SUBMIT_IDLE_HTML = 'SEND MESSAGE'

type ContactPageMarkupProps = {
  initialTopic?: 'ProChat Memory' | 'ProChat Memory for QA beta' | 'ProChat Workbench'
}

export default function ContactPageMarkup({
  initialTopic = 'ProChat Memory',
}: ContactPageMarkupProps) {
  const isMemoryQaBeta = initialTopic === 'ProChat Memory for QA beta'
  const isWorkbench = initialTopic === 'ProChat Workbench'
  const kicker = isMemoryQaBeta
    ? 'CONTACT · MEMORY FOR QA BETA'
    : isWorkbench
      ? 'CONTACT · WORKBENCH'
      : 'CONTACT · MEMORY'
  const heading = isMemoryQaBeta ? (
    <>
      Apply for the selected <em>QA beta.</em>
    </>
  ) : isWorkbench ? (
    <>
      Start with one <em>guarded project flow.</em>
    </>
  ) : (
    <>
      Start with one <em>memory problem.</em>
    </>
  )
  const intro = isMemoryQaBeta
    ? 'Tell us about the repeated QA work you want to test with ProChat Memory for QA. We will use this note as selected beta application context.'
    : isWorkbench
      ? 'Tell us where guarded local project work would help. We will use this note to understand the smallest useful Workbench flow.'
      : 'Tell us where your team keeps rebuilding context. We will help turn one repeated task into a focused ProChat Memory tester flow.'
  const formIntro = isMemoryQaBeta
    ? 'Share the QA workflow, evidence types, and evaluation context for the selected Memory for QA beta.'
    : isWorkbench
      ? 'Share the local project workflow, guardrails, or implementation blocker so we can understand the next useful step.'
      : 'Share the product question, context problem, or implementation blocker so we can understand the next useful step.'

  return (
    <>
      <section className="pm-hero-section contact-memory-hero">
        <div className="pm-container pm-hero-grid">
          <div className="pm-hero-copy">
            <p className="pm-kicker">{kicker}</p>
            <h1>{heading}</h1>
            <p>{intro}</p>
            <div className="pm-trust-line">Clear context · Human-reviewed · Focused reply</div>
          </div>

          <div className="pm-review-card contact-form-panel" id="contact-form-card">
            <div className="pm-record-meta">
              <span>Contact form</span>
              <span>PRIVATE</span>
            </div>
            <h2>Send a direct message</h2>
            <p>{formIntro}</p>

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

              <input type="hidden" name="topic" value={initialTopic} />
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

              <button
                data-contact-submit=""
                type="submit"
                className="pm-pill-button pm-pill-button--light w-full justify-center"
              >
                <span
                  data-contact-submit-label=""
                  dangerouslySetInnerHTML={{ __html: CONTACT_SUBMIT_IDLE_HTML }}
                />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
