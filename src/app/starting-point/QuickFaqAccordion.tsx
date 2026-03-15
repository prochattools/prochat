'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Panel } from '@/components/ui/surface'

type FaqItem = {
  question: string
  answer: string
}

type Props = {
  items: FaqItem[]
}

export default function QuickFaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <Panel
            key={item.question}
            tone="default"
            padding="default"
            className="border-border bg-background transition-shadow duration-200 hover:shadow-elevated"
          >
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`starting-point-faq-panel-${index}`}
                onClick={() => setOpenIndex(prev => (prev === index ? null : index))}
                className="flex-1 text-left text-base font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.question}
              </button>
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-foreground' : ''
                }`}
              />
            </div>
            {isOpen ? (
              <div
                id={`starting-point-faq-panel-${index}`}
                className="mt-4 text-sm leading-relaxed text-muted-foreground"
              >
                <p>{item.answer}</p>
              </div>
            ) : null}
          </Panel>
        )
      })}
    </div>
  )
}
