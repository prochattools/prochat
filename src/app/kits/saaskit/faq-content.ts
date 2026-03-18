import type { FAQItem } from '@/components/FAQSection'

export const SAASKIT_FAQ_ITEMS: readonly FAQItem[] = [
  {
    question: 'What does SaaSKit actually include?',
    answer:
      'SaaSKit gives you the full production-ready foundation: ProKit infrastructure, auth, billing, database structure, launch-ready marketing and SEO systems, deployment patterns, and the documentation needed to implement the stack without guessing through setup.',
  },
  {
    question: 'Who is SaaSKit for?',
    answer:
      'SaaSKit is the default fit for non-technical founders who already have an idea, audience, or paying customers and want the clearest path to launching a real SaaS product. More technical builders can use it too when they want speed and a fuller productization layer.',
  },
  {
    question: 'Do I need to be technical to use SaaSKit?',
    answer:
      'No, but you do need to follow the implementation path carefully. SaaSKit is built for founders who want to move fast without wiring every system themselves. If you want more raw control and fewer built-in launch decisions, ProKit is the lighter alternative.',
  },
  {
    question: 'Is SaaSKit a one-time purchase or a subscription?',
    answer:
      'SaaSKit is sold as a one-time purchase under the current product model. The goal is to give founders a reusable production-ready foundation without adding another recurring software fee.',
  },
  {
    question: 'Can I use SaaSKit for multiple projects?',
    answer:
      'Yes. The current product policy is unlimited use with lifetime updates. If you need the exact licensing terms before purchase, check the terms page or ask through the contact form.',
  },
  {
    question: 'Should I choose SaaSKit or ProKit?',
    answer:
      'Choose SaaSKit if you want the full production-ready path and the clearest launch structure. Choose ProKit only if you already know your scope and intentionally want the lighter engine layer without the fuller productization and launch systems.',
  },
  {
    question: 'Where do setup instructions and implementation docs live?',
    answer:
      'The docs live under /docs, with SaaSKit as the default starting point. Use the SaaSKit docs for setup, auth, billing, email, deployment, and shared systems. Starting Point and the Production Guide support the decision and implementation order around the product.',
  },
  {
    question: 'What support is included, and do you offer implementation help?',
    answer:
      'Documentation is the primary support layer. The contact form is for real blockers, licensing questions, or product-fit questions. Limited implementation help may exist in selected cases, but ProChat is product-first, not a done-for-you service business.',
  },
] as const
