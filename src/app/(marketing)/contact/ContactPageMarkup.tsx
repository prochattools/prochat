import { Input } from '@/components/ui/input'

const CONTACT_SUBMIT_IDLE_HTML = 'SEND MESSAGE'

type ContactPageMarkupProps = {
  initialTopic?: 'Evermind' | 'Nevermind' | 'Mastermind'
}

const TOPIC_CONTEXT = {
  Evermind: {
    label: 'Evermind enquiry',
    helper: 'Describe the memory workflow or local-first question you want to explore.',
  },
  Nevermind: {
    label: 'Nevermind enquiry',
    helper: 'Describe the context problem or AI-tool workflow you want to make more continuous.',
  },
  Mastermind: {
    label: 'Mastermind enquiry',
    helper: 'Describe the intention, project context, or bounded execution workflow you want to clarify.',
  },
} as const

export default function ContactPageMarkup({
  initialTopic = 'Evermind',
}: ContactPageMarkupProps) {
  const topicContext = TOPIC_CONTEXT[initialTopic]

  return (
    <div className="cm-utility-contact" data-body-family="contact">
      <section className="cm-utility-contact__intro" aria-labelledby="contact-hero-title">
        <div className="pc-body-kicker"><span aria-hidden="true" />Contact ProChat</div>
        <h1 id="contact-hero-title">Start a conversation.</h1>
        <p>Tell us what you are working on and what would help. Choose Evermind, Nevermind, or Mastermind if you have a product-specific question, and we will reply with a useful next step.</p>
        <div className="cm-utility-contact__topic" role="group" aria-label="Selected contact topic">
          <span>ABOUT</span>
          <strong>{topicContext.label}</strong>
          <small>{topicContext.helper}</small>
        </div>
      </section>

      <section className="cm-utility-contact__form contact-form-panel" aria-labelledby="contact-form-title">
          <div className="contact-form-panel__header">
              <div>
                <span>MESSAGE / 01</span>
                <h2 id="contact-form-title">Send a message</h2>
              </div>
              <span className="contact-form-status-dot">OPEN</span>
          </div>
          <p>Required fields are marked. A few clear sentences are enough.</p>

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
                    placeholder="Your name"
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
                    placeholder="you@example.com"
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
      </section>
    </div>
  )
}
