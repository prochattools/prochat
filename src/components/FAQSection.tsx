import { ChevronDown } from 'lucide-react'
import { Section } from '@/components/ui/surface'
import { cn } from '@/helpers/utils'

const FAQ_ITEMS = [
  {
    question: 'Which product should I start with?',
    answer:
      'Start with SaaSKit if you want the clearest path to a production-ready SaaS launch. Choose ProKit if you already know exactly what you want to build and want more flexibility. Use the Kits page if you need to compare the products first.',
  },
  {
    question: 'Is SaaSKit a one-time purchase?',
    answer:
      'Yes. SaaSKit is sold as a one-time purchase with unlimited use and lifetime updates under the current product model.',
  },
  {
    question: 'Is support included?',
    answer:
      'Documentation is the primary support layer. The contact form is for real blockers, setup questions, licensing questions, and product-fit questions.',
  },
  {
    question: 'Do I need to be a developer to use ProChat products?',
    answer:
      'No. ProChat is built for non-technical founders, but you still need the willingness to follow structured systems, documentation, and setup steps.',
  },
  {
    question: 'Do you offer custom implementation or studio work?',
    answer:
      'Sometimes, but only in selected cases. ProChat is primarily a product business, not a done-for-you service business.',
  },
  {
    question: 'Where do I start if I feel stuck?',
    answer:
      'Start with the documentation if your question is product-specific. Start with the Learn page if you need the guided sequence or the right next step. Use the contact form if you hit a real blocker or need help choosing what to do next.',
  },
  {
    question: 'Where can I find setup instructions and documentation?',
    answer:
      'Use the documentation page for setup steps, deployment notes, and troubleshooting references.',
  },
]

type FAQSectionProps = {
  tone?: 'transparent' | 'muted' | 'surface'
  className?: string
}

export default function FAQSection({ tone = 'muted', className }: FAQSectionProps) {
  return (
    <Section tone={tone} spacing="compact" className={cn('pt-12 pb-16 md:pt-20 md:pb-24', className)}>
      <div className="mx-auto max-w-7xl px-page">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-brand text-2xl font-bold tracking-[-0.02em] text-foreground md:text-[1.75rem]">
              Frequently Asked Questions
            </h2>
            <p className="text-[0.96rem] leading-7 text-muted-foreground">
              Practical answers on support expectations, licensing, and what to do next.
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
                    id={`faq-trigger-${index}`}
                    type="button"
                    className="contact-faq-trigger group flex w-full items-center justify-between gap-4 rounded-xl text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-expanded="false"
                    aria-controls={`faq-panel-${index}`}
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
                  id={`faq-panel-${index}`}
                  className="mt-3 text-[0.95rem] leading-7 text-muted-foreground"
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  data-faq-panel=""
                  hidden
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
