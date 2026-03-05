export default function ContactPageMarkup() {
  return (
    <>
<section className="max-w-7xl mx-auto px-page pt-28 pb-12 md:pt-32 md:pb-14">
  <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 xl:gap-12 items-stretch">
        <div className="flex h-full flex-col justify-between gap-8 lg:gap-10">
      <div className="space-y-4 md:space-y-5 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-primary/10 border border-primary/20 w-fit">
          <span className="size-1.5 rounded-full bg-primary"></span>
          <span className="mono-text text-[10px] font-bold tracking-widest text-primary uppercase">Contact</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-[1.08]">
          Talk to ProChat.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
          Questions about SaaSKit, ProKit, UXKit or Studio work? Send one message and I'll point you to the right next step.
        </p>
      </div>
      <div className="pt-3 md:pt-4">
        <p className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-500">
          <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
          Clear answers. No jargon. No spam.
        </p>
      </div>
    </div>

        <div id="contact-form-card" className="w-full lg:max-w-[640px] lg:ml-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl">
      <form data-contact-form="" className="space-y-4 md:space-y-5" noValidate method="post" action="/api/contact">
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-honeypot">Leave this empty</label>
          <input id="contact-honeypot" name="honeypot" autoComplete="off" type="text" tabIndex={-1} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
          <div className="space-y-2">
            <label htmlFor="contact-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
            <input id="contact-name" name="name" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="John Doe" type="text" autoComplete="name" required />
            <p className="contact-field-error hidden" data-error-for="name"></p>
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
            <input id="contact-email" name="email" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="john@company.com" type="email" autoComplete="email" required />
            <p className="contact-field-error hidden" data-error-for="email"></p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-topic" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Topic</label>
          <select id="contact-topic" name="topic" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white" required>
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
          <label htmlFor="contact-company-url" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company / Project URL (Optional)</label>
          <input id="contact-company-url" name="companyOrProjectUrl" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="https://example.com" type="url" inputMode="url" />
          <p className="contact-field-error hidden" data-error-for="companyOrProjectUrl"></p>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
          <textarea id="contact-message" name="message" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="Tell us how we can help..." rows={3} required></textarea>
          <p className="contact-field-error hidden" data-error-for="message"></p>
        </div>

        <p data-contact-status="" className="contact-status hidden" aria-live="polite" aria-atomic="true" tabIndex={-1}></p>

        <button data-contact-submit="" className="w-full bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 py-3.5 text-base shadow-primary/35 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100" type="submit">
          <span data-contact-submit-label="">Send Message</span>
          <span className="material-symbols-outlined text-lg">send</span>
        </button>
      </form>
    </div>
  </div>
</section>

<section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-page">
    <div className="grid lg:grid-cols-12 gap-10 md:gap-12">
            <div className="lg:col-span-8 space-y-8 md:space-y-10">
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-400">Quick answers to common questions about our platform and services.</p>
        </div>
        <div className="space-y-4 md:space-y-6" data-faq-accordion="">
          <div className="contact-faq-item bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-all group" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-0"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-0"
              >
                <span className="font-bold text-slate-900 dark:text-white">What is the average response time?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-slate-400 group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-0"
              className="mt-4 text-slate-600 dark:text-slate-400"
              role="region"
              aria-labelledby="contact-faq-trigger-0"
              data-faq-panel=""
              hidden
            >
              <p>Most messages get a reply within 1 business day. For deeper technical issues, expect 1–3 business days so we can reproduce the issue properly.</p>
            </div>
          </div>

          <div className="contact-faq-item bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-all group" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-1"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-1"
              >
                <span className="font-bold text-slate-900 dark:text-white">Do you offer custom implementation or studio work?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-slate-400 group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-1"
              className="mt-4 text-slate-600 dark:text-slate-400"
              role="region"
              aria-labelledby="contact-faq-trigger-1"
              data-faq-panel=""
              hidden
            >
              <p>Yes. ProChat Studio can handle setup, integrations, migrations, and custom features. Send a short brief and timeline and we’ll reply with clear next steps.</p>
            </div>
          </div>

          <div className="contact-faq-item bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-all group" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-2"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-2"
              >
                <span className="font-bold text-slate-900 dark:text-white">Is technical support included with SaaSKit?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-slate-400 group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-2"
              className="mt-4 text-slate-600 dark:text-slate-400"
              role="region"
              aria-labelledby="contact-faq-trigger-2"
              data-faq-panel=""
              hidden
            >
              <p>Yes—core setup and standard workflow support is included (install, env vars, deploy, common errors). Custom feature development is handled via Studio work.</p>
            </div>
          </div>

          <div className="contact-faq-item bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-all group" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-3"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-3"
              >
                <span className="font-bold text-slate-900 dark:text-white">Can I upgrade my license later?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-slate-400 group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-3"
              className="mt-4 text-slate-600 dark:text-slate-400"
              role="region"
              aria-labelledby="contact-faq-trigger-3"
              data-faq-panel=""
              hidden
            >
              <p>Yes. You can upgrade anytime. You keep your progress, and we’ll point you to the clean upgrade path.</p>
            </div>
          </div>

          <div className="contact-faq-item bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-all group" data-faq-item="" data-open="false">
            <h3>
              <button
                id="contact-faq-trigger-4"
                type="button"
                className="flex w-full items-center justify-between gap-4 text-left"
                data-faq-trigger=""
                aria-expanded="false"
                aria-controls="contact-faq-panel-4"
              >
                <span className="font-bold text-slate-900 dark:text-white">Where can I find documentation?</span>
                <span className="material-symbols-outlined contact-faq-chevron text-slate-400 group-hover:text-primary transition-colors duration-200">expand_more</span>
              </button>
            </h3>
            <div
              id="contact-faq-panel-4"
              className="mt-4 text-slate-600 dark:text-slate-400"
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
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Fast Links</h3>
          <ul className="space-y-4">
            <li>
              <a className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group" href="/starting-point">
                <span className="material-symbols-outlined text-lg">description</span>
                <span className="font-medium">Documentation</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group" href="/kits/saaskit#pricing">
                <span className="material-symbols-outlined text-lg">payments</span>
                <span className="font-medium">Pricing</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group" href="/terms">
                <span className="material-symbols-outlined text-lg">gavel</span>
                <span className="font-medium">Legal Terms</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors group" href="/privacy">
                <span className="material-symbols-outlined text-lg">shield</span>
                <span className="font-medium">Privacy Policy</span>
              </a>
            </li>
          </ul>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Support Email</p>
            <a className="text-lg font-bold text-primary hover:underline underline-offset-4 decoration-2" href="mailto:support@prochat.tools">support@prochat.tools</a>
          </div>
        </div>

        <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden group">
          <div className="relative z-10 space-y-2">
            <h4 className="font-bold text-xl">Join the community</h4>
            <p className="text-white/80 text-sm">Get the latest updates on new ProKit releases.</p>
            <a className="inline-flex mt-4 bg-white text-primary px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors" href="https://discord.com/channels/1433752576779878583/1479029148654764106" target="_blank" rel="nofollow noopener noreferrer">Join Now</a>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-9xl rotate-12 group-hover:scale-110 transition-transform duration-500">campaign</span>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}
