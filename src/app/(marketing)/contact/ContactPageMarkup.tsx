import { Panel, Section } from '@/components/ui/surface'

export default function ContactPageMarkup() {
  return (
    <>
<section className="max-w-7xl mx-auto px-page pt-28 pb-12 md:pt-32 md:pb-14">
  <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 xl:gap-12 items-stretch">
        <div className="flex h-full flex-col justify-between gap-8 lg:gap-10">
      <div className="space-y-4 md:space-y-5 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
          <span className="size-1.5 rounded-full bg-primary"></span>
          <span className="mono-text text-[10px] font-bold tracking-widest text-primary uppercase">Contact</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.08]">
          Talk to ProChat.
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
          Questions about SaaSKit, ProKit, UXKit or Studio work? Send one message and I'll point you to the right next step.
        </p>
      </div>
      <div className="pt-3 md:pt-4">
        <p className="flex items-center gap-3 text-sm font-medium text-tertiary">
          <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
          Clear answers. No jargon. No spam.
        </p>
      </div>
    </div>

        <Panel id="contact-form-card" tone="elevated" padding="compact" className="w-full rounded-3xl lg:max-w-[640px] lg:ml-auto">
      <form data-contact-form="" className="space-y-4 md:space-y-5" noValidate method="post" action="/api/contact">
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-honeypot">Leave this empty</label>
          <input id="contact-honeypot" name="honeypot" autoComplete="off" type="text" tabIndex={-1} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-semibold text-foreground/85">Name</label>
            <input id="contact-name" name="name" className="w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-2.5 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John Doe" type="text" autoComplete="name" required />
            <p className="contact-field-error hidden" data-error-for="name"></p>
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-semibold text-foreground/85">Email</label>
            <input id="contact-email" name="email" className="w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-2.5 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="john@company.com" type="email" autoComplete="email" required />
            <p className="contact-field-error hidden" data-error-for="email"></p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-topic" className="text-sm font-semibold text-foreground/85">Topic</label>
          <select id="contact-topic" name="topic" className="w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-2.5 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" required>
            <option value="SaaSKit Technical Support">SaaSKit Technical Support</option>
            <option value="Billing / License">Billing / License</option>
            <option value="Studio Work / Custom Project">Studio Work / Custom Project</option>
            <option value="Partnership / Media">Partnership / Media</option>
            <option value="Privacy / Terms">Privacy / Terms</option>
            <option value="General Question">General Question</option>
          </select>
          <p className="contact-field-error hidden" data-error-for="topic"></p>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-company-url" className="text-sm font-semibold text-foreground/85">Company / Project URL (Optional)</label>
          <input id="contact-company-url" name="companyOrProjectUrl" className="w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-2.5 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://example.com" type="url" inputMode="url" />
          <p className="contact-field-error hidden" data-error-for="companyOrProjectUrl"></p>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message" className="text-sm font-semibold text-foreground/85">Message</label>
          <textarea id="contact-message" name="message" className="w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-2.5 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Tell us how we can help..." rows={3} required></textarea>
          <p className="contact-field-error hidden" data-error-for="message"></p>
        </div>

        <p data-contact-status="" className="contact-status hidden" aria-live="polite" aria-atomic="true" tabIndex={-1}></p>

        <button data-contact-submit="" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-white shadow-surface transition-all hover:scale-[1.01] hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100" type="submit">
          <span data-contact-submit-label="">Send Message</span>
          <span className="material-symbols-outlined text-lg">send</span>
        </button>
      </form>
    </Panel>
  </div>
</section>

<Section tone="muted" spacing="compact">
  <div className="max-w-7xl mx-auto px-page">
    <div className="grid lg:grid-cols-12 gap-10 md:gap-12">
            <div className="lg:col-span-8 space-y-8 md:space-y-10">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Quick answers to common questions about our platform and services.</p>
        </div>
        <div className="space-y-4 md:space-y-6" data-faq-accordion="">
          <div className="contact-faq-item rounded-2xl border border-border-subtle bg-surface p-6 shadow-surface transition-all group hover:border-border-strong hover:shadow-elevated" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-0"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-0"
              >
                <span className="font-bold text-foreground">What is the average response time?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-tertiary group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-0"
              className="mt-4 text-muted-foreground"
              role="region"
              aria-labelledby="contact-faq-trigger-0"
              data-faq-panel=""
              hidden
            >
              <p>Most messages get a reply within 1 business day. For deeper technical issues, expect 1–3 business days so we can reproduce the issue properly.</p>
            </div>
          </div>

          <div className="contact-faq-item rounded-2xl border border-border-subtle bg-surface p-6 shadow-surface transition-all group hover:border-border-strong hover:shadow-elevated" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-1"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-1"
              >
                <span className="font-bold text-foreground">Do you offer custom implementation or studio work?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-tertiary group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-1"
              className="mt-4 text-muted-foreground"
              role="region"
              aria-labelledby="contact-faq-trigger-1"
              data-faq-panel=""
              hidden
            >
              <p>Yes. ProChat Studio can handle setup, integrations, migrations, and custom features. Send a short brief and timeline and we’ll reply with clear next steps.</p>
            </div>
          </div>

          <div className="contact-faq-item rounded-2xl border border-border-subtle bg-surface p-6 shadow-surface transition-all group hover:border-border-strong hover:shadow-elevated" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-2"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-2"
              >
                <span className="font-bold text-foreground">Is technical support included with SaaSKit?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-tertiary group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-2"
              className="mt-4 text-muted-foreground"
              role="region"
              aria-labelledby="contact-faq-trigger-2"
              data-faq-panel=""
              hidden
            >
              <p>Yes—core setup and standard workflow support is included (install, env vars, deploy, common errors). Custom feature development is handled via Studio work.</p>
            </div>
          </div>

          <div className="contact-faq-item rounded-2xl border border-border-subtle bg-surface p-6 shadow-surface transition-all group hover:border-border-strong hover:shadow-elevated" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-3"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-3"
              >
                <span className="font-bold text-foreground">Can I upgrade my license later?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-tertiary group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-3"
              className="mt-4 text-muted-foreground"
              role="region"
              aria-labelledby="contact-faq-trigger-3"
              data-faq-panel=""
              hidden
            >
              <p>Yes. You can upgrade anytime. You keep your progress, and we’ll point you to the clean upgrade path.</p>
            </div>
          </div>

          <div className="contact-faq-item rounded-2xl border border-border-subtle bg-surface p-6 shadow-surface transition-all group hover:border-border-strong hover:shadow-elevated" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-4"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-4"
              >
                <span className="font-bold text-foreground">Where can I find documentation?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-tertiary group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-4"
              className="mt-4 text-muted-foreground"
              role="region"
              aria-labelledby="contact-faq-trigger-4"
              data-faq-panel=""
              hidden
            >
              <p>In the Documentation section on ProChat. It includes step-by-step setup, deployment guides, and troubleshooting pages.</p>
            </div>
          </div>
        </div>
      </div>

            <div className="lg:col-span-4 space-y-8">
        <div className="rounded-3xl border border-border-subtle bg-surface p-8 shadow-surface">
          <h3 className="text-xl font-bold text-foreground mb-6">Fast Links</h3>
          <ul className="space-y-4">
            <li>
              <a className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group" href="/starting-point">
                <span className="material-symbols-outlined text-lg">description</span>
                <span className="font-medium">Documentation</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group" href="/kits/saaskit#pricing">
                <span className="material-symbols-outlined text-lg">payments</span>
                <span className="font-medium">Pricing</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group" href="/terms">
                <span className="material-symbols-outlined text-lg">gavel</span>
                <span className="font-medium">Legal Terms</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group" href="/privacy">
                <span className="material-symbols-outlined text-lg">shield</span>
                <span className="font-medium">Privacy Policy</span>
              </a>
            </li>
          </ul>

          <div className="mt-10 border-t border-border-subtle pt-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-tertiary">Support Email</p>
            <a className="text-lg font-bold text-primary hover:underline underline-offset-4 decoration-2" href="mailto:support@prochat.tools">support@prochat.tools</a>
          </div>
        </div>

        <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="relative z-10 space-y-2">
            <h4 className="font-bold text-xl">Join the community</h4>
            <p className="text-white/80 text-sm">Get the latest updates on new ProKit releases.</p>
            <a className="inline-flex mt-4 bg-surface-elevated text-primary px-6 py-2 rounded-lg text-sm font-bold shadow-surface transition-all hover:bg-surface-soft hover:shadow-elevated" href="https://discord.com/channels/1433752576779878583/1479029148654764106" target="_blank" rel="nofollow noopener noreferrer">Join Now</a>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-9xl rotate-12 group-hover:scale-110 transition-transform duration-500">campaign</span>
        </div>
      </div>
    </div>
  </div>
</Section>

    </>
  )
}
