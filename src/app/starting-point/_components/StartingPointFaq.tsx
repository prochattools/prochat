'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
}

type StartingPointFaqProps = {
  items: FAQItem[]
}

export default function StartingPointFaq({ items }: StartingPointFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `starting-point-faq-button-${index}`
        const panelId = `starting-point-faq-panel-${index}`

        return (
          <div
            key={item.question}
            className={index === items.length - 1 ? 'px-6' : 'border-b border-border px-6'}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-semibold text-foreground">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                strokeWidth={2.1}
              />
            </button>

            <div
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="text-[15px] leading-relaxed text-muted-foreground"
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
