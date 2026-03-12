import Link from 'next/link'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Learn SaaS | ProChat',
  description: 'Guides, frameworks, and resources for founders building software businesses.',
  canonicalUrlRelative: '/learn',
})

const sectionClass = 'max-w-5xl px-page mx-auto'

type ResourceGroup = {
  title: string
  description: string
  links: { href: string; label: string }[]
}

const resourceGroups: ResourceGroup[] = [
  {
    title: 'Guides',
    description: 'Foundational guides explaining how SaaS businesses are built.',
    links: [
      { href: '/guides/waas-to-saas', label: 'From Website-as-a-Service to SaaS' },
      { href: '/guides/what-is-website-as-a-service', label: 'What is Website-as-a-Service?' },
      { href: '/guides/how-to-find-saas-ideas', label: 'How to Find SaaS Ideas' },
    ],
  },
  {
    title: 'SaaS Glossary',
    description: 'Definitions of important SaaS and startup concepts.',
    links: [{ href: '/saas-glossary', label: 'SaaS Founder Glossary' }],
  },
  {
    title: 'Articles',
    description: 'Insights and ideas about building and launching SaaS products.',
    links: [{ href: '/blog', label: 'Blog' }],
  },
  {
    title: 'Playbooks',
    description: 'Step-by-step operational frameworks.',
    links: [{ href: '/playbooks', label: 'Playbooks' }],
  },
  {
    title: 'Prompts',
    description: 'AI prompts and workflows for founders.',
    links: [{ href: '/prompts', label: 'Prompts' }],
  },
  {
    title: 'Snippets',
    description: 'Reusable code and automation examples.',
    links: [{ href: '/snippets', label: 'Snippets' }],
  },
]

export default function LearnIndexPage() {
  return (
    <div className="space-y-10 bg-[rgb(var(--section-bg-rgb))] pb-20 text-foreground">
      <section className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-24 text-center">
        <div className="mx-auto max-w-4xl px-page">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Learn</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">Learn SaaS</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Guides, frameworks, and resources for founders building software businesses.
          </p>
        </div>
      </section>

      {resourceGroups.map(group => (
        <section key={group.title} className="py-16">
          <div className={sectionClass}>
            <h2 className="text-3xl font-bold text-foreground">{group.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{group.description}</p>
            <ul className="mt-3 space-y-2 text-lg text-muted-foreground">
              {group.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-primary underline decoration-border-strong/80 underline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  )
}
