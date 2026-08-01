import { BellRing, Check, Rocket, TimerReset } from 'lucide-react'
import RotatingText from '@/components/RotatingText'
import { WAITLIST_PRODUCT_OPTIONS } from '@/lib/waitlist/products'
import { HeroSection } from '@/components/marketing/HeroSection'

export default function WaitlistPageMarkup() {
  return (
    <>
<HeroSection density="compact" align="center" className="min-h-[100svh] border-b border-border">
  <div className="pc-marketing-hero__inner pb-12 lg:pb-24">
  <div className="mx-auto max-w-4xl">
  <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
      <span className="size-2 rounded-full bg-primary"></span>
      <span className="text-[10px] font-bold tracking-widest uppercase text-primary mono-text">Waitlist</span>
    </div>
        <h1 className="mb-8 text-3xl font-black leading-[1.1] tracking-[-0.05em] text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
      <span className="block">Join the</span>
      <span className="block whitespace-nowrap">
        <RotatingText
          words={['UXKit', 'WaaSKit', 'ProChat OS']}
          className="hero-accent"
          wrapperClassName="align-baseline"
        />
        <span className="text-slate-900 dark:text-white"> Waitlist</span>
      </span>
    </h1>
        <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
      ProChat products evolve in public. Join the waitlist for roadmap updates, early previews, and access notices for the products you want to follow.
    </p>
        <div className="w-full max-w-lg mb-4">
      <p
        data-waitlist-status=""
        className="waitlist-status hidden mb-3"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
      ></p>
      <form
        data-waitlist-form=""
        className="space-y-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none"
        noValidate
        method="post"
        action="/api/waitlist"
      >
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="waitlist-company-website">Leave this empty</label>
          <input
            id="waitlist-company-website"
            name="company_website"
            autoComplete="off"
            type="text"
            tabIndex={-1}
          />
        </div>
        <fieldset className="px-1 pt-1 pb-0">
          <legend className="mb-3 text-left text-[13px] font-medium text-slate-600 dark:text-slate-300">
            Select products you&apos;re interested in:
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {WAITLIST_PRODUCT_OPTIONS.map(option => (
              <label
                key={option.value}
                className="group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-3 transition-colors hover:border-primary/35 hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-primary/45 dark:hover:bg-primary/10"
              >
                <input
                  type="checkbox"
                  name="products"
                  value={option.value}
                  className="peer sr-only"
                  aria-describedby="waitlist-products-error"
                />
                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white dark:border-slate-700 dark:bg-slate-950">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-slate-800 transition-colors group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="waitlist-email"
            name="email"
            className="flex-1 bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:ring-0 outline-none text-slate-900 dark:text-white"
            placeholder="you@company.com"
            required
            type="email"
            autoComplete="email"
            inputMode="email"
          />
          <button
            data-waitlist-submit=""
            className="bg-primary text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap text-sm font-semibold"
            type="submit"
          >
            <span data-waitlist-submit-label="">Join waitlist</span>
          </button>
        </div>
      </form>
      <p
        id="waitlist-products-error"
        className="waitlist-field-error hidden mt-2 text-left"
        data-error-for="products"
      ></p>
      <p
        id="waitlist-email-error"
        className="waitlist-field-error hidden mt-2 text-left"
        data-error-for="email"
      ></p>
    </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500 mb-6">
      <span className="material-symbols-outlined text-base">verified</span>
      <span>Early access. No spam. Unsubscribe anytime.</span>
    </div>
        <a className="text-sm font-semibold text-slate-400 hover:text-primary transition-colors flex items-center gap-1 group" href="/">
      Explore ProChat Systems
      <span className="material-symbols-outlined text-xs transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </a>
  </div>
  </div>
  </div>
</HeroSection>
<section className="max-w-7xl mx-auto px-page py-24 bg-slate-50/50 dark:bg-slate-900/20 rounded-t-[3rem]">
  <div className="max-w-7xl mx-auto">
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white text-center">Why join the ProChat waitlist?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-colors">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Rocket className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-lg mb-2">Early access</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Be first to try upcoming ProChat products before public release and help shape their direction.</p>
        </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-colors">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
            <TimerReset className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-lg mb-2">Roadmap visibility</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Receive development updates, milestone announcements, and behind-the-scenes build notes.</p>
        </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-colors">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
            <BellRing className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-lg mb-2">Access notice</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Know when invite windows open, previews ship, and access becomes available.</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}
