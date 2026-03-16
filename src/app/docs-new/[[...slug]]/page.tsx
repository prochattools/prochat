import Link from 'next/link'
import {
  docsSections,
  findDocBySlug,
  getDocContent,
  getDocExtras,
} from '@/content/docs.config'
import DocsNote from '../_components/primitives/DocsNote'
import DocsWarning from '../_components/primitives/DocsWarning'
import DocsSteps from '../_components/primitives/DocsSteps'
import DocsCodeBlock from '../_components/primitives/DocsCodeBlock'
import DocsCTA from '../_components/primitives/DocsCTA'

const groupedDocs = docsSections.reduce<Record<string, typeof docsSections>>((acc, entry) => {
  // eslint-disable-next-line no-param-reassign
  (acc[entry.group] ??= []).push(entry)
  return acc
}, {})

function DocsNewHomePage() {
  const startEntry = docsSections[0]

  return (
    <div className="min-h-screen bg-slate-950/40 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:px-0">
        <header className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">ProChat Docs · Preview</p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Guides for founders who build with clarity
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-300">
            The new docs shell keeps the purpose clear: start here, understand the foundation, and move through kits and deployment with confidence.
            Each piece below links to living references or previews so you can explore without guesswork.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Start here</p>
              <h2 className="text-xl font-semibold text-white">{startEntry.title}</h2>
              <p className="text-sm text-slate-300">{startEntry.description}</p>
              <Link
                className="text-sm font-semibold text-blue-300 hover:text-blue-200"
                href={`/docs-new/${startEntry.slug}`}
              >
                Open the starter guide →
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Docs coverage</p>
              <p className="mt-2 text-base text-white">
                Every entry is organized by purpose—foundation, kit reference, and execution patterns—so you can move through the lifecycle without
                confusion.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          {Object.entries(groupedDocs).map(([group, entries]) => (
            <div key={group} className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{group}</h3>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {entries.length} topic{entries.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {entries
                  .sort((a, b) => a.order - b.order)
                  .map(entry => (
                    <Link
                      key={entry.slug}
                      href={`/docs-new/${entry.slug}`}
                      className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 transition hover:border-blue-400/60"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-base font-semibold text-white">{entry.title}</h4>
                        {entry.badges?.map(badge => (
                          <span key={badge} className="text-[0.55rem] uppercase tracking-[0.3em] text-blue-300">
                            {badge}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-slate-300">{entry.description}</p>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default async function DocsNewDynamicPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.[0]
  if (!slug) {
    return <DocsNewHomePage />
  }
  const entry = findDocBySlug(slug)
  const pageContent = getDocContent(entry.slug)
  const extras = getDocExtras(entry.slug)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.4em] text-slate-400">
        <Link href="/docs-new" className="text-blue-300 hover:text-blue-200">
          Docs home
        </Link>
        <span className="text-slate-500">/</span>
        <span className="text-white">{entry.title}</span>
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-tertiary">{entry.group}</p>
      <h1 className="text-3xl font-semibold text-foreground">{entry.title}</h1>
      <p className="text-sm text-muted-foreground">{entry.description}</p>
      <div className="space-y-6 rounded-2xl border border-border/80 bg-surface/80 p-6 text-sm text-muted-foreground">
        <p className="text-sm text-foreground">{pageContent.subtitle}</p>
        <p>{pageContent.intro}</p>
        {pageContent.sections.map(section => (
          <section key={section.title} className="rounded-xl border border-border/70 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            </div>
            <p className="mt-2 text-sm text-slate-300">{section.description}</p>
            {section.bullets && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-200">
                {section.bullets.map(bullet => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {extras.note && <DocsNote>{extras.note}</DocsNote>}
        {extras.warning && <DocsWarning>{extras.warning}</DocsWarning>}
        {extras.steps && <DocsSteps title={extras.steps.title} items={extras.steps.items} />}
        {extras.code && <DocsCodeBlock code={extras.code.snippet} language={extras.code.language} />}
        {extras.cta && <DocsCTA title={extras.cta.title} description={extras.cta.description} href={extras.cta.href} />}
      </div>
    </div>
  )
}
