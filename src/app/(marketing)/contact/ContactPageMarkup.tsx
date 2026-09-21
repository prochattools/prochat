import { Input } from '@/components/ui/input'

const CONTACT_SUBMIT_IDLE_HTML = 'SEND MESSAGE'

type ContactPageMarkupProps = {
  initialTopic?: 'Evermind' | 'Nevermind' | 'Mastermind'
}

const TOPIC_CONTEXT = {
  Evermind: {
    label: 'Evermind enquiry',
    helper: 'Describe the memory workflow or local-first question you want to explore.',
    signals: ['Memory use case', 'Human ownership', 'Clear next step'],
  },
  Nevermind: {
    label: 'Nevermind enquiry',
    helper: 'Describe the context problem or AI-tool workflow you want to make more continuous.',
    signals: ['Working context', 'Tool choice', 'Clear next step'],
  },
  Mastermind: {
    label: 'Mastermind enquiry',
    helper: 'Describe the intention, project context, or bounded execution workflow you want to clarify.',
    signals: ['Project context', 'Execution boundary', 'Clear next step'],
  },
} as const

export default function ContactPageMarkup({
  initialTopic = 'Evermind',
}: ContactPageMarkupProps) {
  const topicContext = TOPIC_CONTEXT[initialTopic]

  return (
    <div className="cm-contact-page" data-body-family="contact">
      <section className="cm-chapter cm-contact-hero" data-cinematic-chapter="0" aria-labelledby="contact-hero-title">
        <div className="cm-chapter__inner">
          <p className="cm-chapter__eyebrow">Contact / direct signal</p>
          <h1 id="contact-hero-title">Send the context.<br /><span>Get the clearest next step.</span></h1>
          <p className="cm-lede">Tell me what you are working on, where the friction is, and what outcome you need. The goal is one useful reply with the right next step.</p>
          <div className="cm-contact-signals">{topicContext.signals.map((signal, index) => <span key={signal}><b>0{index + 1}</b>{signal}</span>)}</div>
          <a className="cm-actions__primary cm-contact-hero__action" href="#contact-form-card">Send the brief <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="cm-chapter cm-contact-intake" data-cinematic-chapter="1" aria-labelledby="contact-intake-title">
        <div className="cm-chapter__inner contact-intake-grid">
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

          <div className="contact-form-panel cm-glass-panel" id="contact-form-card">
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
