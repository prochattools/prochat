export type DocsSection = {
  slug: string
  title: string
  description: string
  order: number
  group: string
  badges?: string[]
}

export type DocsSectionDetail = {
  title: string
  description: string
  bullets?: string[]
}

export type DocsPageContent = {
  subtitle: string
  intro: string
  sections: DocsSectionDetail[]
}

export type DocsExtras = {
  note?: string
  warning?: string
  steps?: {
    title: string
    items: string[]
  }
  code?: {
    language?: string
    snippet: string
  }
  cta?: {
    title: string
    description: string
    href: string
  }
}

export const docsSections: DocsSection[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Clarify your idea, roadmap, and the structural decisions before building.',
    order: 1,
    group: 'Foundation',
    badges: ['start'],
  },
  {
    slug: 'kits',
    title: 'SaaSKit Quickstart',
    description: 'Kick off your first build with the SaaSKit UI + backend starter bundle.',
    order: 2,
    group: 'Framework',
    badges: ['reference'],
  },
  {
    slug: 'deployment',
    title: 'Deployment Overview',
    description: 'Review the production patterns, observability, and release flow we recommend.',
    order: 3,
    group: 'Execution',
    badges: ['ops'],
  },
]

const docsContent: Record<string, DocsPageContent> = {
  'getting-started': {
    subtitle: 'Clarify the direction before you build anything.',
    intro:
      'Use this guide to define your buyer, outcome, and boundary before you wire infrastructure. The clearer the idea, the faster you can move through the rest of the system.',
    sections: [
      {
        title: 'Define your buyer & pain',
        description: 'Document the buyer type, frictions, and evidence that this problem is worth solving. Keep the language plain.',
        bullets: ['Who needs this now?', 'What is the recurring pain?', 'How will you know they care?'],
      },
      {
        title: 'Sharpen the outcome & proof',
        description: 'Describe what clarity looks like and what proof will mean in week one. Outline the simplest first story you can ship.',
        bullets: ['What change feels real for the buyer?', 'What data will prove the change?', 'What counts as success in 1–2 weeks?'],
      },
      {
        title: 'Set boundaries & next steps',
        description: 'Capture what you will leave for later and the next set of questions the framework should answer.',
        bullets: ['What is outside scope for now?', 'What experiments should happen next?', 'Which kit or path fits the decision?'],
      },
    ],
  },
  kits: {
    subtitle: 'Start building with SaaSKit’s UI + backend starter.',
    intro:
      'SaaSKit pairs interface scaffolding, auth wiring, data models, and automation patterns so you can focus on the product ideas the framework validated.',
    sections: [
      {
        title: 'Bootstrap in minutes',
        description: 'Clone the starter repo, update the config, and ship a polished SaaS surface inside a day.',
        bullets: ['GitHub tempo: a single repo with example UI', 'Auth + billing hooks wired out of the box', 'Branding and theming tokens ready to extend'],
      },
      {
        title: 'Ship interface + infrastructure together',
        description: 'The kit ships with ProChat styles, reusable patterns, and production-ready guardrails.',
        bullets: ['Navigation, forms, tables, dashboards', 'Background jobs + notifications already scoped', 'Guided defaults + optional automation'],
      },
      {
        title: 'Move from clarity to execution',
        description: 'Connect the kit to your validated Starting Point output and start collecting real usage data.',
        bullets: ['Link the buyer/outcome/pain story to SaaSKit tags', 'Capture feedback in the built-in storytelling UI', 'Shift into ProChat OS once workflows merit coordination'],
      },
    ],
  },
  deployment: {
    subtitle: 'Ship with confidence and oversight.',
    intro:
      'Deployment patterns span from preview environments to production observability. This overview keeps the rules of thumb handy as you grow.',
    sections: [
      {
        title: 'Previews & staging',
        description: 'Use preview URLs to gather stakeholder feedback before each release. Automate smoke checks and acceptance notes.',
        bullets: ['Branch previews are tied to GitHub PRs', 'Automated email/Slack notes on readiness', 'Checklist for smoke testing key flows'],
      },
      {
        title: 'Monitoring & alerts',
        description: 'Keep an eye on uptime, queue depth, and billing events with the built-in dashboards.',
        bullets: ['Alert for spikes in job failure rates', 'Track customer-facing latency', 'Log structured events for audits'],
      },
      {
        title: 'Operations cadence',
        description: 'Formalize releases with a lightweight playbook: plan, ship, observe, iterate.',
        bullets: ['Weekly review of adoption metrics', 'Incident review and learnings log', 'Prep for the next feature/kit cycle'],
      },
    ],
  },
}

export function findDocBySlug(slug?: string | null) {
  if (!slug) return docsSections[0]
  return docsSections.find(entry => entry.slug === slug) ?? docsSections[0]
}

const docsExtras: Record<string, DocsExtras> = {
  'getting-started': {
    note: 'Keep the focus on clarity. Avoid adding tooling questions until the buyer/outcome story is locked.',
    steps: {
      title: 'Core thinking path',
      items: ['Define the buyer and pain', 'Describe the outcome & proof', 'Set clear boundaries'],
    },
    code: {
      language: 'bash',
      snippet: 'npx saas-starting-point init && npm run start',
    },
    cta: {
      title: 'Capture your SaaS Starting Point',
      description: 'Use the email capture funnel to download the full framework workbook and prompts.',
      href: '/starting-point',
    },
  },
  kits: {
    warning: 'SaaSKit is still evolving. Allow room in your roadmap for kit-specific tuning as we expand the UI and automation patterns.',
    steps: {
      title: 'Quickstart steps',
      items: ['Clone the SaaSKit starter repo', 'Wire your product config & theming', 'Launch a playground preview and review analytics'],
    },
    code: {
      language: 'bash',
      snippet: 'git clone https://github.com/prochat/saaskit && npm install && npm run dev',
    },
  },
  deployment: {
    note: 'Follow the release cadence checklist before marking features as production-ready.',
    steps: {
      title: 'Release cadence',
      items: ['Run smoke tests on preview URLs', 'Review observability dashboards', 'Communicate next steps in the incident log'],
    },
    code: {
      language: 'bash',
      snippet: 'npm run deploy -- --env=production',
    },
  },
}

export function getDocContent(slug: string) {
  return docsContent[slug] ?? {
    subtitle: 'Coming soon',
    intro: 'We are working on this entry. Check back for updates.',
    sections: [],
  }
}

export function getDocExtras(slug: string) {
  return docsExtras[slug] ?? {}
}
