import Link from 'next/link'

import CTASection from '@/components/content/CTASection'
import RelatedContent from '@/components/content/RelatedContent'
import PromptCopyButton from '@/components/prompts/PromptCopyButton'
import { Panel } from '@/components/ui/surface'
import { getContentConfig } from '@/lib/content/config'
import type { ContentEntry } from '@/lib/content/types'

function getFrontmatterText(entry: ContentEntry, key: string, fallback = '') {
  const value = entry.rawFrontmatter[key]
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export default function PromptPageLayout({
  entry,
  related = [],
}: {
  entry: ContentEntry
  related?: ContentEntry[]
}) {
  const config = getContentConfig(entry.section)
  const intro = getFrontmatterText(entry, 'intro', entry.description)
  const whoFor = getFrontmatterText(entry, 'whoFor')
  const whenToUse = getFrontmatterText(entry, 'whenToUse')
  const journeyLine = getFrontmatterText(entry, 'journeyLine')
  const promptText = entry.content.trim()

  return (
    <main className="mx-auto max-w-5xl px-page pb-24 pt-24 md:pt-28">
      <article className="pc-article-shell">
        <header className="border-b border-border-subtle/80 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              href={config.indexPath}
              className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Back to {config.label}
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-tertiary">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle/80 bg-surface-soft/70 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                Prompt
              </span>
              {entry.category ? (
                <span className="inline-flex items-center rounded-full border border-border-subtle/70 bg-surface/75 px-2.5 py-1 text-[11px] text-muted-foreground">
                  {entry.category}
                </span>
              ) : null}
            </div>
          </div>
          <h1 className="mt-5 font-brand text-4xl font-bold tracking-[-0.05em] text-foreground md:text-[3.4rem]">
            {entry.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[1rem] leading-7 text-muted-foreground md:text-[1.02rem]">
            {intro}
          </p>
          {journeyLine ? (
            <p className="mt-4 max-w-3xl text-sm font-medium text-foreground/82">
              {journeyLine}
            </p>
          ) : null}
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <Panel tone="soft" padding="default" className="border-border-subtle/80 bg-surface-soft/75">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tertiary">Who it is for</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-[0.96rem]">{whoFor}</p>
          </Panel>
          <Panel tone="soft" padding="default" className="border-border-subtle/80 bg-surface-soft/75">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tertiary">When to use it</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-[0.96rem]">{whenToUse}</p>
          </Panel>
        </section>

        <section className="mt-8">
          <Panel tone="default" padding="default" className="border-border-subtle/80 bg-surface/95 shadow-surface">
            <div className="flex flex-col gap-4 border-b border-border-subtle/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tertiary">Full prompt</p>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Copy the full prompt and paste it into your AI workflow without editing the structure first.
                </p>
              </div>
              <PromptCopyButton value={promptText} />
            </div>

            <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-border-subtle/80 bg-background/85 p-4 md:p-6">
              <pre className="font-mono text-[13px] leading-6 text-foreground md:text-[13.5px]">
                <code className="whitespace-pre-wrap break-words">{promptText}</code>
              </pre>
            </div>
          </Panel>
        </section>
      </article>

      <CTASection section={entry.section} />
      <RelatedContent entries={related} />
    </main>
  )
}
