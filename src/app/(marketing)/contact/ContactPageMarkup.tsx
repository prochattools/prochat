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

  const heading = isMemoryQaBeta ? (
    <>
      Let&rsquo;s <em>talk.</em>
    </>
  ) : isWorkbench ? (
    <>
      Let&rsquo;s <em>talk.</em>
    </>
  ) : (
    <>
      Let&rsquo;s <em>talk.</em>
    </>
  )

  const intro = isMemoryQaBeta
    ? "Tell me about the role, project, or question you have in mind. I'll reply with the clearest next step."
    : isWorkbench
      ? "Tell me about the role, project, or question you have in mind. I'll reply with the clearest next step."
      : "Tell me about the role, project, or question you have in mind. I'll reply with the clearest next step."

  const formHelper = isMemoryQaBeta
    ? 'Share enough context for a useful reply.'
    : isWorkbench
      ? 'Share enough context for a useful reply.'
      : 'Share enough context for a useful reply.'

  return (
    <>
      <section className="pm-hero-section contact-memory-hero">
        <div className="pm-container pm-hero-grid">
          <div className="pm-hero-copy">
            <p className="pm-kicker">Contact</p>
            <h1>{heading}</h1>
            <p>{intro}</p>
          </div>

          <div className="pm-review-card contact-form-panel" id="contact-form-card">
            <h2>Send a message</h2>
            <p>{formHelper}</p>

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
                  placeholder="Describe what you have in mind — the role, project, or question."
                  rows={6}
                  aria-required="true"
                  required
                ></textarea>
                <p className="contact-helper-text">
                  A few sentences is enough. I read every message.
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
