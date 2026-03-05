'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, ChevronUp, Search } from 'lucide-react'
import { cn } from '@/helpers/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Panel, listRowVariants } from '@/components/ui/surface'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { GlossaryStage } from '@/libs/glossary'

type ExplorerTerm = {
  slug: string
  title: string
  description: string
  excerpt: string
  definition: string
  category: string
  stage: GlossaryStage
  synonyms: string[]
  priority: number
}

type SortMode = 'az' | 'priority'

const TOP_TERM_SLUGS = [
  'mvp',
  'saas',
  'product-market-fit',
  'churn',
  'arr',
  'customer-acquisition-cost',
  'lifetime-value',
  'authentication',
  'billing-system',
  'api',
]

const RELATED_GUIDES = [
  {
    href: '/blog/how-to-validate-a-saas-idea-without-coding',
    label: 'How to Validate a SaaS Idea Without Coding',
  },
  {
    href: '/blog/how-to-build-a-saas-mvp-without-coding',
    label: 'How to Build a SaaS MVP Without Coding',
  },
  {
    href: '/blog/saas-foundation-for-non-technical-founders',
    label: 'SaaS Foundation for Non-Technical Founders',
  },
]

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}

function startsWithLetter(title: string) {
  return title.trim().charAt(0).toUpperCase()
}

export default function GlossaryExplorer({ terms }: { terms: ExplorerTerm[] }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStage, setSelectedStage] = useState('All')
  const [sortMode, setSortMode] = useState<SortMode>('az')
  const [showFilters, setShowFilters] = useState(false)
  const [showAlphaJump, setShowAlphaJump] = useState(false)
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    const firstTopTerm = TOP_TERM_SLUGS.find(slug =>
      terms.some(term => term.slug === slug),
    )
    return firstTopTerm || terms[0]?.slug || ''
  })
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const debouncedQuery = useDebouncedValue(query, 120)
  const normalizedQuery = debouncedQuery.trim().toLowerCase()

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(terms.map(term => term.category))).sort()],
    [terms],
  )

  const stages = useMemo(
    () => ['All', ...Array.from(new Set(terms.map(term => term.stage)))],
    [terms],
  )

  const filteredTerms = useMemo(() => {
    const queryTokens = normalizedQuery ? normalizedQuery.split(/\s+/) : []

    const matchesQuery = (term: ExplorerTerm) => {
      if (queryTokens.length === 0) return true

      const searchIndex = [
        term.title,
        term.description,
        term.excerpt,
        term.definition,
        term.synonyms.join(' '),
      ]
        .join(' ')
        .toLowerCase()

      return queryTokens.every(token => searchIndex.includes(token))
    }

    return terms
      .filter(term => (selectedCategory === 'All' ? true : term.category === selectedCategory))
      .filter(term => (selectedStage === 'All' ? true : term.stage === selectedStage))
      .filter(matchesQuery)
      .sort((a, b) => {
        if (sortMode === 'priority') {
          if (a.priority === b.priority) return a.title.localeCompare(b.title)
          return a.priority - b.priority
        }
        return a.title.localeCompare(b.title)
      })
  }, [normalizedQuery, selectedCategory, selectedStage, sortMode, terms])

  const quickJumpLetters = useMemo(
    () =>
      Array.from(new Set(filteredTerms.map(term => startsWithLetter(term.title))))
        .filter(Boolean)
        .sort(),
    [filteredTerms],
  )

  const topTerms = useMemo(
    () =>
      TOP_TERM_SLUGS.map(slug => terms.find(term => term.slug === slug)).filter(
        (term): term is ExplorerTerm => Boolean(term),
      ),
    [terms],
  )

  useEffect(() => {
    if (!filteredTerms.some(term => term.slug === selectedSlug)) {
      setSelectedSlug(filteredTerms[0]?.slug || '')
    }
  }, [filteredTerms, selectedSlug])

  useEffect(() => {
    const selectedRow = rowRefs.current[selectedSlug]
    if (selectedRow) {
      selectedRow.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedSlug])

  useEffect(() => {
    const handleFocusShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }

    window.addEventListener('keydown', handleFocusShortcut)
    return () => window.removeEventListener('keydown', handleFocusShortcut)
  }, [])

  const selectedTerm =
    filteredTerms.find(term => term.slug === selectedSlug) || filteredTerms[0] || null

  const hasActiveFilters =
    normalizedQuery.length > 0 ||
    selectedCategory !== 'All' ||
    selectedStage !== 'All' ||
    sortMode !== 'az'
  const showTopTerms =
    showFilters &&
    normalizedQuery.length === 0 &&
    selectedCategory === 'All' &&
    selectedStage === 'All'
  const canShowAlphaJump = showFilters && normalizedQuery.length === 0 && sortMode === 'az'

  const handleRowSelect = (term: ExplorerTerm) => {
    setSelectedSlug(term.slug)

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
      setIsMobilePreviewOpen(true)
    }
  }

  const handleListKeyboardNavigation = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (filteredTerms.length === 0) return

    const currentIndex = filteredTerms.findIndex(term => term.slug === selectedSlug)
    const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = Math.min(filteredTerms.length - 1, safeCurrentIndex + 1)
      setSelectedSlug(filteredTerms[nextIndex].slug)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = Math.max(0, safeCurrentIndex - 1)
      setSelectedSlug(filteredTerms[nextIndex].slug)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const active = filteredTerms[safeCurrentIndex]
      handleRowSelect(active)
    }
  }

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory('All')
    setSelectedStage('All')
    setSortMode('az')
    setShowAlphaJump(false)
  }

  return (
    <Panel
      tone="elevated"
      padding="none"
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
    >
      <header className="sticky top-0 z-30 shrink-0 border-b border-border-subtle bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/90 md:px-5">
        <div className="relative">
          <label htmlFor="glossary-search" className="sr-only">
            Search glossary terms
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="glossary-search"
            ref={inputRef}
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search term, meaning, or synonym..."
            className="h-10 border-border-subtle bg-surface-elevated pl-10 pr-4 text-foreground placeholder:text-muted-soft"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={showFilters ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setShowFilters(current => !current)}
            className="h-8 gap-1.5 px-2.5 text-xs"
          >
            Filters
            {showFilters ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2.5 text-xs text-muted-foreground"
            >
              Reset
            </Button>
          )}

          <span className="ml-auto text-xs text-muted-foreground">
            {filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'}
          </span>
          <p className="hidden items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
            <kbd className="rounded border border-border-subtle bg-surface-soft px-1.5 py-0.5 font-mono text-[10px] text-tertiary">
              ⌘/Ctrl + K
            </kbd>
          </p>
        </div>

        {showFilters && (
          <div className="mt-3 rounded-lg border border-border-subtle bg-surface-soft/70 p-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Category
                </span>
                <select
                  aria-label="Filter by category"
                  value={selectedCategory}
                  onChange={event => setSelectedCategory(event.target.value)}
                  className="h-9 w-full rounded-md border border-border-subtle bg-surface px-2.5 text-sm text-foreground shadow-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Stage
                </span>
                <select
                  aria-label="Filter by stage"
                  value={selectedStage}
                  onChange={event => setSelectedStage(event.target.value)}
                  className="h-9 w-full rounded-md border border-border-subtle bg-surface px-2.5 text-sm text-foreground shadow-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {stages.map(stage => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Sort
                </span>
                <select
                  aria-label="Sort terms"
                  value={sortMode}
                  onChange={event => setSortMode(event.target.value as SortMode)}
                  className="h-9 w-full rounded-md border border-border-subtle bg-surface px-2.5 text-sm text-foreground shadow-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="az">A–Z</option>
                  <option value="priority">Most important</option>
                </select>
              </label>
            </div>

            {showTopTerms && (
              <div className="mt-3 border-t border-border-subtle pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Top terms
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {topTerms.map(term => (
                    <button
                      key={term.slug}
                      type="button"
                      onClick={() => setSelectedSlug(term.slug)}
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[11px] transition-colors',
                        selectedSlug === term.slug
                          ? 'border-primary/30 bg-primary/10 text-primary'
                          : 'border-border-subtle bg-surface text-muted-foreground hover:border-border hover:text-foreground',
                      )}
                    >
                      {term.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {canShowAlphaJump && quickJumpLetters.length > 0 && (
              <div className="mt-3 border-t border-border-subtle pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[11px] text-muted-foreground"
                  onClick={() => setShowAlphaJump(current => !current)}
                >
                  {showAlphaJump ? 'Hide A–Z jump' : 'Show A–Z jump'}
                </Button>

                {showAlphaJump && (
                  <div className="mt-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex min-w-max gap-1 pr-1">
                      {quickJumpLetters.map(letter => (
                        <button
                          key={letter}
                          type="button"
                          className="rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                          onClick={() => {
                            const target = filteredTerms.find(
                              term => startsWithLetter(term.title) === letter,
                            )
                            if (!target) return
                            setSelectedSlug(target.slug)
                            rowRefs.current[target.slug]?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'center',
                            })
                          }}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]">
        <section className="pc-rail flex min-h-0 min-w-0 flex-col border-b border-border-subtle lg:border-b-0 lg:border-r lg:border-border-subtle">
          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2.5"
            role="listbox"
            aria-label="Glossary terms"
            tabIndex={0}
            onKeyDown={handleListKeyboardNavigation}
          >
            {filteredTerms.length === 0 ? (
              <div className="mx-2 mt-2 rounded-xl border border-dashed border-border-subtle bg-surface-soft/65 p-4 text-sm text-muted-foreground">
                No terms match this search. Try a shorter keyword or reset filters.
              </div>
            ) : (
              <ul className="space-y-1">
                {filteredTerms.map(term => (
                  <li key={term.slug}>
                    <div className={cn(listRowVariants({ selected: selectedSlug === term.slug }))}>
                      <div className="flex items-start gap-2">
                        <button
                          ref={element => {
                            rowRefs.current[term.slug] = element
                          }}
                          type="button"
                          role="option"
                          aria-selected={selectedSlug === term.slug}
                          onClick={() => handleRowSelect(term)}
                          className="min-w-0 flex-1 text-left focus-visible:outline-none"
                        >
                          <p className="truncate font-brand text-[15px] font-semibold text-foreground">
                            {term.title}
                          </p>
                          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                            {term.excerpt}
                          </p>
                          <p className="mt-1 text-[11px] text-tertiary">
                            {term.category} · {term.stage}
                          </p>
                        </button>
                        <Link
                          href={`/glossary/${term.slug}`}
                          className="shrink-0 rounded px-1.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
                        >
                          Open
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="hidden min-h-0 min-w-0 flex-col bg-surface-soft/45 lg:flex lg:overflow-hidden">
          {selectedTerm ? (
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <Panel tone="elevated" padding="default">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="border-border-subtle bg-surface px-2 py-0 text-[11px]">
                    {selectedTerm.category}
                  </Badge>
                  <span>Stage: {selectedTerm.stage}</span>
                </div>

                <h3 className="mt-4 font-brand text-3xl font-bold tracking-[-0.02em] text-foreground">
                  {selectedTerm.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-foreground">
                  {selectedTerm.definition || selectedTerm.excerpt}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {selectedTerm.excerpt}
                </p>

                {selectedTerm.synonyms.length > 0 && (
                  <p className="mt-4 text-sm text-tertiary">
                    Also called: {selectedTerm.synonyms.join(', ')}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/glossary/${selectedTerm.slug}`}
                    className="inline-flex items-center gap-1 rounded-md border border-primary/25 bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-surface transition-colors hover:bg-primary/90"
                  >
                    Open full page
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/saas-glossary"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View all terms
                  </Link>
                </div>
              </Panel>

              <Panel tone="soft" padding="compact" className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Founders also read
                </p>
                <ul className="mt-2 space-y-2">
                  {RELATED_GUIDES.map(guide => (
                    <li key={guide.href}>
                      <Link
                        href={guide.href}
                        className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                      >
                        {guide.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
              Select a term to preview.
            </div>
          )}
        </section>
      </div>

      <Sheet open={isMobilePreviewOpen} onOpenChange={setIsMobilePreviewOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-2xl border-border-subtle bg-surface-elevated shadow-elevated"
        >
          {selectedTerm && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedTerm.title}</SheetTitle>
                <SheetDescription>{selectedTerm.category}</SheetDescription>
              </SheetHeader>

              <div className="mt-4 space-y-3">
                <p className="text-sm leading-relaxed text-foreground">
                  {selectedTerm.definition || selectedTerm.excerpt}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selectedTerm.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-border-subtle bg-surface px-2 py-0 text-[11px] font-medium"
                  >
                    {selectedTerm.stage}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-border-subtle bg-surface px-2 py-0 text-[11px] font-medium"
                  >
                    {selectedTerm.category}
                  </Badge>
                </div>
                <Link
                  href={`/glossary/${selectedTerm.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Open full page
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Panel>
  )
}
