'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import Link from 'next/link'
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  Filter,
  Library,
  Search,
  X,
} from 'lucide-react'

import { cn } from '@/helpers/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  content: string
  category: string
  stage: GlossaryStage
  synonyms: string[]
  priority: number
  focusTags: string[]
}

type FilterGroupKey = 'category' | 'stage' | 'alphabet' | 'tags'

const STAGE_ORDER: GlossaryStage[] = ['Idea', 'Validation', 'MVP', 'Launch', 'Growth']

const CATEGORY_GUIDES: Record<string, { href: string; label: string }> = {
  Foundation: {
    href: '/blog/saas-foundation-for-non-technical-founders',
    label: 'Read the SaaS foundation guide',
  },
  Validation: {
    href: '/blog/how-to-validate-a-saas-idea-without-coding',
    label: 'Read the validation guide',
  },
  MVP: {
    href: '/blog/how-to-build-a-saas-mvp-without-coding',
    label: 'Read the MVP guide',
  },
  Infrastructure: {
    href: '/blog/nextjs-saas-infrastructure-checklist-for-non-technical-founders',
    label: 'Read the infrastructure checklist',
  },
  Pricing: {
    href: '/blog/founder-execution-system-from-idea-to-paying-users',
    label: 'Read the founder execution guide',
  },
  Metrics: {
    href: '/blog/founder-execution-system-from-idea-to-paying-users',
    label: 'Read the founder execution guide',
  },
  Launch: {
    href: '/blog/founder-execution-system-from-idea-to-paying-users',
    label: 'Read the founder execution guide',
  },
}

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

function SearchField({
  id,
  inputRef,
  value,
  onChange,
}: {
  id: string
  inputRef: RefObject<HTMLInputElement>
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor={id} className="sr-only">
        Search glossary terms
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id={id}
        ref={inputRef}
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder="Search term, meaning, or synonym..."
        className="h-11 border-border-subtle bg-surface/95 pl-10 pr-4 text-foreground placeholder:text-muted-soft"
      />
    </div>
  )
}

function FilterAccordion({
  groupValue,
  onGroupChange,
  categoryOptions,
  categoryCounts,
  selectedCategory,
  setSelectedCategory,
  stageOptions,
  stageCounts,
  selectedStage,
  setSelectedStage,
  letters,
  selectedLetter,
  setSelectedLetter,
  tagOptions,
  tagCounts,
  selectedTags,
  toggleTag,
  totalTerms,
}: {
  groupValue: string
  onGroupChange: (value: string) => void
  categoryOptions: string[]
  categoryCounts: Record<string, number>
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  stageOptions: string[]
  stageCounts: Record<string, number>
  selectedStage: string
  setSelectedStage: (value: string) => void
  letters: string[]
  selectedLetter: string
  setSelectedLetter: (value: string) => void
  tagOptions: string[]
  tagCounts: Record<string, number>
  selectedTags: string[]
  toggleTag: (value: string) => void
  totalTerms: number
}) {
  const groups: Array<{
    key: FilterGroupKey
    label: string
    description: string
    content: ReactNode
  }> = [
    {
      key: 'category',
      label: 'Category',
      description: 'Business area',
      content: (
        <div className="space-y-1.5">
          {categoryOptions.map(category => {
            const active = selectedCategory === category
            const count = category === 'All' ? totalTerms : categoryCounts[category] || 0

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors',
                  active
                    ? 'border-primary/25 bg-primary/10 text-foreground'
                    : 'border-border-subtle/80 bg-surface/80 text-muted-foreground hover:border-border hover:text-foreground',
                )}
              >
                <span>{category}</span>
                <span className="text-xs text-tertiary">{count}</span>
              </button>
            )
          })}
        </div>
      ),
    },
    {
      key: 'stage',
      label: 'Stage',
      description: 'Founder phase',
      content: (
        <div className="space-y-1.5">
          {stageOptions.map(stage => {
            const active = selectedStage === stage
            const count = stage === 'All' ? totalTerms : stageCounts[stage] || 0

            return (
              <button
                key={stage}
                type="button"
                onClick={() => setSelectedStage(stage)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors',
                  active
                    ? 'border-primary/25 bg-primary/10 text-foreground'
                    : 'border-border-subtle/80 bg-surface/80 text-muted-foreground hover:border-border hover:text-foreground',
                )}
              >
                <span>{stage}</span>
                <span className="text-xs text-tertiary">{count}</span>
              </button>
            )
          })}
        </div>
      ),
    },
    {
      key: 'alphabet',
      label: 'Alphabet',
      description: 'Jump by first letter',
      content: (
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedLetter('All')}
            className={cn(
              'rounded-md border px-2 py-1 text-xs transition-colors',
              selectedLetter === 'All'
                ? 'border-primary/25 bg-primary/10 text-foreground'
                : 'border-border-subtle bg-surface text-muted-foreground hover:border-border hover:text-foreground',
            )}
          >
            All
          </button>
          {letters.map(letter => (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={cn(
                'rounded-md border px-2 py-1 text-xs transition-colors',
                selectedLetter === letter
                  ? 'border-primary/25 bg-primary/10 text-foreground'
                  : 'border-border-subtle bg-surface text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {letter}
            </button>
          ))}
        </div>
      ),
    },
    {
      key: 'tags',
      label: 'Focus tags',
      description: 'Founder lenses',
      content: (
        <div className="flex flex-wrap gap-2">
          {tagOptions.map(tag => {
            const active = selectedTags.includes(tag)

            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs transition-colors',
                  active
                    ? 'border-primary/25 bg-primary/10 text-foreground'
                    : 'border-border-subtle bg-surface text-muted-foreground hover:border-border hover:text-foreground',
                )}
              >
                {tag}
                <span className="ml-1 text-tertiary">({tagCounts[tag] || 0})</span>
              </button>
            )
          })}
        </div>
      ),
    },
  ]

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      value={groupValue}
      onValueChange={onGroupChange}
      className="space-y-3"
    >
      {groups.map(group => (
        <AccordionPrimitive.Item
          key={group.key}
          value={group.key}
          className="overflow-hidden rounded-2xl border border-border-subtle/80 bg-surface/75 shadow-surface"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <div>
                <p className="text-sm font-semibold text-foreground">{group.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{group.description}</p>
              </div>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden border-t border-border-subtle/70 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-4 pb-4 pt-3">{group.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}

function TermsList({
  terms,
  selectedSlug,
  onSelect,
  rowRefs,
  onKeyDown,
}: {
  terms: ExplorerTerm[]
  selectedSlug: string
  onSelect: (term: ExplorerTerm) => void
  rowRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>
  onKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      role="listbox"
      aria-label="Glossary terms"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-inset [scroll-padding-top:3.75rem]"
    >
      {terms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border-subtle/80 bg-surface-soft/70 p-4 text-sm text-muted-foreground">
          No glossary terms match this search. Try a shorter phrase or remove a filter.
        </div>
      ) : (
        <ul className="space-y-1.5">
          {terms.map(term => (
            <li key={term.slug}>
              <button
                ref={element => {
                  rowRefs.current[term.slug] = element
                }}
                type="button"
                role="option"
                aria-selected={selectedSlug === term.slug}
                onClick={() => onSelect(term)}
                className={cn(
                  listRowVariants({ selected: selectedSlug === term.slug }),
                  'w-full rounded-xl border px-3 py-3 text-left focus-visible:outline-none',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-brand text-[15px] font-semibold text-foreground">
                      {term.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                      {term.excerpt}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="h-6 shrink-0 rounded-full border-border-subtle bg-surface px-2 py-0 text-[10px] font-medium text-muted-foreground"
                  >
                    {term.stage}
                  </Badge>
                </div>
                <p className="mt-2 text-[11px] text-tertiary">{term.category}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function GlossaryExplorer({ terms }: { terms: ExplorerTerm[] }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStage, setSelectedStage] = useState('All')
  const [selectedLetter, setSelectedLetter] = useState('All')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    const byPriority = [...terms].sort(
      (a, b) => a.priority - b.priority || a.title.localeCompare(b.title),
    )
    return byPriority[0]?.slug || ''
  })
  const [showDesktopFilters, setShowDesktopFilters] = useState(true)
  const [mobileTermsOpen, setMobileTermsOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [openFilterGroup, setOpenFilterGroup] = useState<FilterGroupKey>('category')

  const inputRef = useRef<HTMLInputElement>(null)
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const debouncedQuery = useDebouncedValue(query, 120)
  const normalizedQuery = debouncedQuery.trim().toLowerCase()

  const categoryCounts = useMemo(() => {
    return terms.reduce<Record<string, number>>((counts, term) => {
      counts[term.category] = (counts[term.category] || 0) + 1
      return counts
    }, {})
  }, [terms])

  const stageCounts = useMemo(() => {
    return terms.reduce<Record<string, number>>((counts, term) => {
      counts[term.stage] = (counts[term.stage] || 0) + 1
      return counts
    }, {})
  }, [terms])

  const tagCounts = useMemo(() => {
    return terms.reduce<Record<string, number>>((counts, term) => {
      term.focusTags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
      return counts
    }, {})
  }, [terms])

  const categoryOptions = useMemo(
    () => ['All', ...Object.keys(categoryCounts).sort()],
    [categoryCounts],
  )
  const stageOptions = useMemo(
    () => ['All', ...STAGE_ORDER.filter(stage => stageCounts[stage] > 0)],
    [stageCounts],
  )
  const tagOptions = useMemo(
    () =>
      Object.keys(tagCounts).sort((a, b) => {
        const byCount = (tagCounts[b] || 0) - (tagCounts[a] || 0)
        return byCount !== 0 ? byCount : a.localeCompare(b)
      }),
    [tagCounts],
  )

  const queryMatchedTerms = useMemo(() => {
    const tokens = normalizedQuery ? normalizedQuery.split(/\s+/) : []
    if (tokens.length === 0) return terms

    return terms.filter(term => {
      const searchIndex = [
        term.title,
        term.description,
        term.excerpt,
        term.definition,
        term.synonyms.join(' '),
        term.focusTags.join(' '),
        term.content.replace(/<[^>]+>/g, ' '),
      ]
        .join(' ')
        .toLowerCase()

      return tokens.every(token => searchIndex.includes(token))
    })
  }, [normalizedQuery, terms])

  const filteredWithoutLetter = useMemo(() => {
    return queryMatchedTerms
      .filter(term => (selectedCategory === 'All' ? true : term.category === selectedCategory))
      .filter(term => (selectedStage === 'All' ? true : term.stage === selectedStage))
      .filter(term =>
        selectedTags.length === 0
          ? true
          : selectedTags.some(tag => term.focusTags.includes(tag)),
      )
  }, [queryMatchedTerms, selectedCategory, selectedStage, selectedTags])

  const availableLetters = useMemo(
    () =>
      Array.from(new Set(filteredWithoutLetter.map(term => startsWithLetter(term.title))))
        .filter(Boolean)
        .sort(),
    [filteredWithoutLetter],
  )

  const filteredTerms = useMemo(() => {
    const scoped = filteredWithoutLetter.filter(term =>
      selectedLetter === 'All' ? true : startsWithLetter(term.title) === selectedLetter,
    )

    if (normalizedQuery || selectedLetter !== 'All') {
      return [...scoped].sort((a, b) => a.title.localeCompare(b.title))
    }

    return [...scoped].sort(
      (a, b) => a.priority - b.priority || a.title.localeCompare(b.title),
    )
  }, [filteredWithoutLetter, normalizedQuery, selectedLetter])

  const selectedTerm =
    filteredTerms.find(term => term.slug === selectedSlug) || filteredTerms[0] || null

  const relatedTerms = useMemo(() => {
    if (!selectedTerm) return []

    return terms
      .filter(term => term.slug !== selectedTerm.slug)
      .filter(term => {
        const sharesCategory = term.category === selectedTerm.category
        const sharesStage = term.stage === selectedTerm.stage
        const sharesTag = term.focusTags.some(tag => selectedTerm.focusTags.includes(tag))
        return sharesCategory || sharesStage || sharesTag
      })
      .sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title))
      .slice(0, 4)
  }, [selectedTerm, terms])

  const activeChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; onRemove: () => void }> = []

    if (normalizedQuery) {
      chips.push({
        key: 'query',
        label: `Search: “${query.trim()}”`,
        onRemove: () => setQuery(''),
      })
    }

    if (selectedCategory !== 'All') {
      chips.push({
        key: 'category',
        label: selectedCategory,
        onRemove: () => setSelectedCategory('All'),
      })
    }

    if (selectedStage !== 'All') {
      chips.push({
        key: 'stage',
        label: selectedStage,
        onRemove: () => setSelectedStage('All'),
      })
    }

    if (selectedLetter !== 'All') {
      chips.push({
        key: 'letter',
        label: `A–Z: ${selectedLetter}`,
        onRemove: () => setSelectedLetter('All'),
      })
    }

    selectedTags.forEach(tag => {
      chips.push({
        key: `tag-${tag}`,
        label: tag,
        onRemove: () =>
          setSelectedTags(current => current.filter(currentTag => currentTag !== tag)),
      })
    })

    return chips
  }, [normalizedQuery, query, selectedCategory, selectedStage, selectedLetter, selectedTags])

  useEffect(() => {
    if (filteredTerms.length === 0) {
      setSelectedSlug('')
      return
    }

    if (!filteredTerms.some(term => term.slug === selectedSlug)) {
      setSelectedSlug(filteredTerms[0].slug)
    }
  }, [filteredTerms, selectedSlug])

  useEffect(() => {
    if (!selectedSlug) return
    rowRefs.current[selectedSlug]?.scrollIntoView({ block: 'nearest' })
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

  const handleListKeyboardNavigation = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (filteredTerms.length === 0) return

    const currentIndex = filteredTerms.findIndex(term => term.slug === selectedSlug)
    const safeIndex = currentIndex >= 0 ? currentIndex : 0

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = Math.min(filteredTerms.length - 1, safeIndex + 1)
      setSelectedSlug(filteredTerms[nextIndex].slug)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = Math.max(0, safeIndex - 1)
      setSelectedSlug(filteredTerms[nextIndex].slug)
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const activeTerm = filteredTerms[safeIndex]
      if (activeTerm) setSelectedSlug(activeTerm.slug)
    }
  }

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory('All')
    setSelectedStage('All')
    setSelectedLetter('All')
    setSelectedTags([])
  }

  const handleTermSelect = (term: ExplorerTerm) => {
    setSelectedSlug(term.slug)
    setMobileTermsOpen(false)
  }

  const guide = selectedTerm ? CATEGORY_GUIDES[selectedTerm.category] : null
  const hasActiveFilters = activeChips.length > 0

  return (
    <>
      <Panel
        tone="elevated"
        padding="none"
        className="flex h-full min-h-0 flex-col overflow-hidden border-border/80 bg-surface-elevated/95 shadow-elevated"
      >
        <header className="shrink-0 border-b border-border-subtle/80 bg-surface/92 px-4 py-4 backdrop-blur md:px-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                Glossary dashboard
              </p>
              <h2 className="mt-1 font-brand text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">
                Search, scan, and open one term at a time
              </h2>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <SearchField
                id="glossary-search"
                inputRef={inputRef}
                value={query}
                onChange={setQuery}
              />

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileTermsOpen(true)}
                  className="h-10 gap-1.5 rounded-full px-3 lg:hidden"
                >
                  <Library className="h-4 w-4" />
                  Terms
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-expanded={showDesktopFilters}
                  aria-controls="glossary-filters-pane"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
                      setMobileFiltersOpen(true)
                      return
                    }
                    setShowDesktopFilters(current => !current)
                  }}
                  className="h-10 gap-1.5 rounded-full px-3"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>

                <div className="rounded-full border border-border-subtle bg-surface px-3 py-2 text-xs text-muted-foreground">
                  {filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'}
                </div>
              </div>
            </div>
          </div>

          {hasActiveFilters ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeChips.map(chip => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                >
                  <span>{chip.label}</span>
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                Reset all
              </button>
            </div>
          ) : null}
        </header>

        <div
          className={cn(
            'grid min-h-0 flex-1',
            showDesktopFilters
              ? 'lg:grid-cols-[18rem_minmax(0,1fr)_16rem] xl:grid-cols-[19rem_minmax(0,1fr)_17rem]'
              : 'lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]',
          )}
        >
          <aside className="pc-rail hidden min-h-0 flex-col overflow-hidden border-r border-border-subtle/80 lg:flex">
            <div className="shrink-0 border-b border-border-subtle/80 bg-surface-soft/55 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                Terms
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse the glossary without leaving the dashboard.
              </p>
            </div>

            <TermsList
              terms={filteredTerms}
              selectedSlug={selectedSlug}
              onSelect={term => setSelectedSlug(term.slug)}
              rowRefs={rowRefs}
              onKeyDown={handleListKeyboardNavigation}
            />
          </aside>

          <section className="min-h-0 min-w-0 overflow-hidden border-r border-border-subtle/70 bg-surface/45 lg:border-r-0 xl:border-r xl:border-border-subtle/80">
            {selectedTerm ? (
              <div className="flex h-full min-h-0 flex-col">
                <div className="shrink-0 border-b border-border-subtle/80 bg-surface/88 px-4 py-4 backdrop-blur md:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-tertiary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                      {selectedTerm.category}
                    </span>
                    <Badge
                      variant="outline"
                      className="h-6 rounded-full border-border-subtle bg-surface px-2 py-0 text-[11px] font-medium text-muted-foreground"
                    >
                      {selectedTerm.stage}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {selectedTerm.synonyms.length > 0
                        ? `Also called: ${selectedTerm.synonyms.join(', ')}`
                        : 'Founder-friendly term'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-brand text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">
                        {selectedTerm.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                        {selectedTerm.definition}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {guide ? (
                        <Link
                          href={guide.href}
                          className="text-sm font-medium text-foreground underline decoration-border-strong/80 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                        >
                          {guide.label}
                        </Link>
                      ) : null}
                      <Link
                        href={`/glossary/${selectedTerm.slug}`}
                        className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-surface transition-colors hover:bg-primary/90"
                      >
                        Open full page
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div
                  tabIndex={0}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-inset [scroll-padding-top:4.5rem] md:px-5"
                >
                  <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_15rem]">
                    <article
                      className="prose-premium max-w-none rounded-2xl border border-border-subtle/80 bg-surface/85 px-5 py-5 shadow-surface"
                      dangerouslySetInnerHTML={{ __html: selectedTerm.content }}
                    />

                    <div className="space-y-4">
                      <Panel tone="soft" padding="compact">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                          Focus tags
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedTerm.focusTags.map(tag => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() =>
                                setSelectedTags(current =>
                                  current.includes(tag)
                                    ? current.filter(currentTag => currentTag !== tag)
                                    : [...current, tag],
                                )
                              }
                              className={cn(
                                'rounded-full border px-2.5 py-1 text-xs transition-colors',
                                selectedTags.includes(tag)
                                  ? 'border-primary/25 bg-primary/10 text-foreground'
                                  : 'border-border-subtle bg-surface text-muted-foreground hover:border-border hover:text-foreground',
                              )}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </Panel>

                      {relatedTerms.length > 0 ? (
                        <Panel tone="soft" padding="compact">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                            Related terms
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {relatedTerms.map(term => (
                              <button
                                key={term.slug}
                                type="button"
                                onClick={() => setSelectedSlug(term.slug)}
                                className="rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                              >
                                {term.title}
                              </button>
                            ))}
                          </div>
                        </Panel>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-sm text-muted-foreground">
                Select a term to open its definition.
              </div>
            )}
          </section>

          {showDesktopFilters ? (
            <aside
              id="glossary-filters-pane"
              className="hidden min-h-0 flex-col overflow-hidden bg-surface-soft/45 lg:flex"
            >
              <div className="shrink-0 border-b border-border-subtle/80 bg-surface-soft/65 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
                  Filters
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Narrow the glossary without leaving the page.
                </p>
              </div>

              <div
                tabIndex={0}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-inset [scroll-padding-top:3.5rem]"
              >
                <FilterAccordion
                  groupValue={openFilterGroup}
                  onGroupChange={value => setOpenFilterGroup((value || 'category') as FilterGroupKey)}
                  categoryOptions={categoryOptions}
                  categoryCounts={categoryCounts}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  stageOptions={stageOptions}
                  stageCounts={stageCounts}
                  selectedStage={selectedStage}
                  setSelectedStage={setSelectedStage}
                  letters={availableLetters}
                  selectedLetter={selectedLetter}
                  setSelectedLetter={setSelectedLetter}
                  tagOptions={tagOptions}
                  tagCounts={tagCounts}
                  selectedTags={selectedTags}
                  toggleTag={tag =>
                    setSelectedTags(current =>
                      current.includes(tag)
                        ? current.filter(currentTag => currentTag !== tag)
                        : [...current, tag],
                    )
                  }
                  totalTerms={terms.length}
                />
              </div>
            </aside>
          ) : null}
        </div>
      </Panel>

      <Sheet open={mobileTermsOpen} onOpenChange={setMobileTermsOpen}>
        <SheetContent
          side="left"
          className="w-full max-w-sm overflow-y-auto border-border-subtle bg-surface-elevated shadow-elevated"
        >
          <SheetHeader>
            <SheetTitle>Glossary terms</SheetTitle>
            <SheetDescription>
              Choose a term to load its definition in the main pane.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
            <TermsList
              terms={filteredTerms}
              selectedSlug={selectedSlug}
              onSelect={handleTermSelect}
              rowRefs={rowRefs}
              onKeyDown={handleListKeyboardNavigation}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-sm overflow-y-auto border-border-subtle bg-surface-elevated shadow-elevated"
        >
          <SheetHeader>
            <SheetTitle>Glossary filters</SheetTitle>
            <SheetDescription>
              Filter by category, stage, alphabet, or focus tag.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                Reset all filters
              </button>
            ) : null}

            <FilterAccordion
              groupValue={openFilterGroup}
              onGroupChange={value => setOpenFilterGroup((value || 'category') as FilterGroupKey)}
              categoryOptions={categoryOptions}
              categoryCounts={categoryCounts}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              stageOptions={stageOptions}
              stageCounts={stageCounts}
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
              letters={availableLetters}
              selectedLetter={selectedLetter}
              setSelectedLetter={setSelectedLetter}
              tagOptions={tagOptions}
              tagCounts={tagCounts}
              selectedTags={selectedTags}
              toggleTag={tag =>
                setSelectedTags(current =>
                  current.includes(tag)
                    ? current.filter(currentTag => currentTag !== tag)
                    : [...current, tag],
                )
              }
              totalTerms={terms.length}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
