import PublicEditorialHero from '@/components/public/PublicEditorialHero'
import { Input } from '@/components/ui/input'

const CONTACT_SUBMIT_IDLE_HTML = 'SEND MESSAGE'

type ContactPageMarkupProps = {
  initialTopic?: 'ProChat Memory' | 'ProChat Memory for QA beta' | 'ProChat Workbench'
}

const TOPIC_CONTEXT = {
  'ProChat Memory': {
    label: 'Memory enquiry',
    helper: 'Describe the workflow, memory problem, or question you want to explore.',
    signals: ['Memory use case', 'Current context', 'Clear next step'],
  },
  'ProChat Memory for QA beta': {
    label: 'Memory for QA beta',
    helper: 'Describe the repeated QA failure pattern, current investigation workflow, and team context.',
    signals: ['QA workflow', 'Beta fit', 'Review context'],
  },
  'ProChat Workbench': {
    label: 'Workbench enquiry',
    helper: 'Describe the repository workflow, guarded change, or local project problem you want to discuss.',
    signals: ['Project scope', 'Guarded workflow', 'Clear next step'],
  },
} as const

export default function ContactPageMarkup({
  initialTopic = 'ProChat Memory',
}: ContactPageMarkupProps) {
  const topicContext = TOPIC_CONTEXT[initialTopic]

  return (
    <div className="pc-body-page contact-body-page" data-body-family="contact">
      <PublicEditorialHero
        variant="contact"
        eyebrow="Contact / direct signal"
        title={
          <>
            Send the context.<br />
            <strong>Get the clearest next step.</strong>
          </>
        }
        description="Tell me what you are working on, where the friction is, and what outcome you need. The goal is not a generic sales sequence—it is one useful reply with the right next step."
        primaryAction={{ href: '#contact-form-card', label: 'Send the brief' }}
        signals={topicContext.signals}
        visualTitle="CONTACT / SIGNAL"
        visualCaption="TOPIC → CONTEXT → REVIEW → REPLY"
      />

      <section className="contact-intake-section" aria-labelledby="contact-intake-title">
        <div className="contact-intake-grid">
          <aside className="contact-intake-context">
            <div className="pc-body-kicker"><span aria-hidden="true" />Request context</div>
            <h2 id="contact-intake-title">One brief is enough to start.</h2>
            <p>{topicContext.helper}</p>

            <div className="contact-topic-console" role="group" aria-label="Selected contact topic">
              <span>SELECTED ROUTE</span>
              <strong>{topicContext.label}</strong>
              <small>Replies are reviewed manually.</small>
            </div>

            <ol className="contact-response-rail" aria-label="What happens next">
              <li><span>01</span><strong>You send context</strong><p>Enough detail to understand the real problem.</p></li>
              <li><span>02</span><strong>I review the fit</strong><p>No automated qualification funnel.</p></li>
              <li><span>03</span><strong>You get a next step</strong><p>A direct answer, question, or recommended path.</p></li>
            </ol>
          </aside>

          <div className="contact-form-panel" id="contact-form-card">
            <div className="contact-form-panel__header">
              <div>
                <span>INTAKE / 01</span>
                <h2>Send a message</h2>
              </div>
              <span className="contact-form-status-dot">OPEN</span>
            </div>
            <p>{topicContext.helper}</p>

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
                <p className="contact-helper-text">A few sentences is enough. I read every message.</p>
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
                className="pc-body-button pc-body-button--primary w-full justify-center"
              >
                <span
                  data-contact-submit-label=""
                  dangerouslySetInnerHTML={{ __html: CONTACT_SUBMIT_IDLE_HTML }}
                />
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
