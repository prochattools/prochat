'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { Section } from '@/components/ui/surface'
import { cn } from '@/helpers/utils'

export type FAQItem = {
  question: string
  answer: string
}

const DEFAULT_FAQ_ITEMS: readonly FAQItem[] = [
  {
    question: 'Where should I start if I am still figuring out the product?',
    answer:
      'Start with Starting Point. It helps you clarify the buyer, pain, outcome, and proof before you build. Once the decision is clear, move into the Production Guide and then SaaSKit.',
  },
  {
    question: 'Which product should I choose first?',
    answer:
      'Most non-technical founders should start with SaaSKit. It is the default production-ready path. Choose ProKit only if you already know your scope and intentionally want the lighter engine layer without the fuller launch structure.',
  },
  {
    question: 'Is SaaSKit a one-time purchase or a subscription?',
    answer:
      'SaaSKit is sold as a one-time purchase under the current product model. The goal is to give founders a production-ready foundation without adding another recurring software bill.',
  },
  {
    question: 'Do I need to be technical to use ProChat products?',
    answer:
      'You do not need to be a developer to follow the ProChat path, but you do need to work through the docs, setup steps, and implementation decisions carefully. SaaSKit is the better fit for most non-technical founders. ProKit expects you to own more of the structure yourself.',
  },
  {
    question: 'What support is included?',
    answer:
      'Documentation is the primary support layer. Starting Point, the Production Guide, prompts, and the docs are there to keep the implementation path clear. Use the contact form for real blockers, licensing questions, or product-fit questions.',
  },
  {
    question: 'Where are the setup instructions and implementation docs?',
    answer:
      'Use the Docs section for auth, billing, email, deployment, configuration, and shared feature setup. If you are following the default path, start with the SaaSKit docs first and use ProKit docs only if you intentionally chose the lighter foundation.',
  },
  {
    question: 'Do you offer custom implementation help?',
    answer:
      'Sometimes, in limited cases. ProChat is product-first, not a done-for-you service business. The default path is to use the kits and docs to implement the product yourself, then reach out only when there is a real blocker or a clearly scoped need.',
  },
] as const

type FAQSectionProps = {
  id?: string
  tone?: 'transparent' | 'muted' | 'surface'
  className?: string
  title?: string
  description?: string
  items?: readonly FAQItem[]
}

export default function FAQSection({
  id,
  tone = 'muted',
  className,
  title = 'Frequently Asked Questions',
  description = 'Practical answers on where to start, which kit to choose, and what support to expect.',
  items = DEFAULT_FAQ_ITEMS,
}: FAQSectionProps) {
  return (
    <Section
      id={id}
      tone={tone}
      spacing="compact"
      className={cn('pt-12 pb-16 md:pt-20 md:pb-24', className)}
    >
      <div className="mx-auto max-w-7xl px-page">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-brand text-2xl font-bold tracking-[-0.02em] text-foreground md:text-[1.75rem]">
              {title}
            </h2>
            <p className="text-[0.96rem] leading-7 text-muted-foreground">
              {description}
            </p>
          </div>

          <AccordionPrimitive.Root
            type="single"
            collapsible
            className="space-y-3"
            data-faq-accordion=""
          >
            {items.map((item, index) => (
              <AccordionPrimitive.Item
                key={item.question}
                value={`faq-${index}`}
                className="group rounded-2xl border border-border-subtle bg-surface p-4 shadow-surface transition-all data-[state=open]:border-primary/25 data-[state=open]:bg-surface-elevated data-[state=open]:shadow-elevated md:p-5"
                data-faq-item=""
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger
                    id={`faq-trigger-${index}`}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 rounded-xl text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    data-faq-trigger=""
                  >
                    <span className="pr-3 text-[0.98rem] font-semibold leading-6 text-foreground transition-colors group-data-[state=open]:text-primary">
                      {item.question}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-tertiary transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                      aria-hidden="true"
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>

                <AccordionPrimitive.Content
                  id={`faq-panel-${index}`}
                  className="overflow-hidden text-[0.95rem] leading-7 text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  data-faq-panel=""
                >
                  <div className="mt-3 border-t border-border-subtle/80 pt-4">
                    <p>{item.answer}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </Section>
  )
}
