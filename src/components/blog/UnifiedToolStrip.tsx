'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { BLOG_PILLARS } from '@/lib/blogStructure'
import { cn } from '@/helpers/utils'

type ResourceLink = {
  title: string
  href?: string
  disabled?: boolean
  comingSoon?: boolean
}

const resourceLinks: ResourceLink[] = [
  {
    href: '/saas-glossary',
    title: 'SaaS Founder Glossary',
  },
  {
    href: '/blog/how-to-validate-a-saas-idea-without-coding',
    title: 'SaaS Validation Guide',
  },
  {
    title: 'SaaS Starting Point',
    disabled: true,
    comingSoon: true,
  },
  {
    title: 'Playbooks',
    disabled: true,
    comingSoon: true,
  },
  {
    title: 'AI Prompt Generator',
    disabled: true,
    comingSoon: true,
  },
]

const lifecycleItems = BLOG_PILLARS.map(pillar => ({
  id: pillar.id,
  label: pillar.id === 'start-here' ? 'Start' : pillar.title,
}))

const toolPillClassName =
  'inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium text-foreground/92 transition-colors'

const toolPillInactiveClassName =
  'border-border-subtle/80 bg-surface-soft/72 text-tertiary hover:border-border-strong/80 hover:bg-surface hover:text-foreground'

const toolPillActiveClassName =
  'border-border-strong bg-surface text-foreground shadow-surface'

const toolPillDisabledClassName =
  'pointer-events-none cursor-default border-border-subtle/80 bg-surface-soft/55 text-muted-foreground/90'

const comingSoonBadgeClassName =
  'inline-flex items-center rounded-full border border-[color-mix(in_srgb,rgb(var(--pc-blue-500-rgb))_20%,white)] bg-[color-mix(in_srgb,rgb(var(--pc-blue-500-rgb))_14%,white)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-primary/85'

function ToolRow({
  children,
  ariaLabel,
}: {
  children: ReactNode
  ariaLabel: string
}) {
  return (
    <div
      aria-label={ariaLabel}
      className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible"
    >
      {children}
    </div>
  )
}

function ResourceTool({ item }: { item: ResourceLink }) {
  const content = (
    <>
      <span>{item.title}</span>
      {item.comingSoon ? <span className={comingSoonBadgeClassName}>Coming Soon</span> : null}
    </>
  )

  if (item.disabled) {
    return (
      <div
        aria-disabled="true"
        role="link"
        tabIndex={-1}
        className={cn(toolPillClassName, toolPillDisabledClassName)}
      >
        {content}
      </div>
    )
  }

  return (
    <Link href={item.href ?? '#'} className={cn(toolPillClassName, toolPillInactiveClassName)}>
      {content}
    </Link>
  )
}

export default function UnifiedToolStrip() {
  const [activeId, setActiveId] = useState<string>(lifecycleItems[0]?.id ?? '')

  const sectionIds = useMemo(() => lifecycleItems.map(item => item.id), [])

  useEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [sectionIds])

  const handleScroll = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }

  return (
    <section className="mx-auto mt-12 w-full max-w-7xl px-page md:mt-14 lg:mt-16">
      <div className="space-y-6 md:space-y-7">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
            Core Resources
          </p>
          <div className="mt-3">
            <ToolRow ariaLabel="Blog resources">
              {resourceLinks.map(item => (
                <ResourceTool key={item.href ?? item.title} item={item} />
              ))}
            </ToolRow>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
            Lifecycle
          </p>
          <div className="mt-3">
            <ToolRow ariaLabel="Blog lifecycle">
              {lifecycleItems.map(item => {
                const isActive = activeId === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleScroll(item.id)}
                    className={cn(
                      toolPillClassName,
                      isActive ? toolPillActiveClassName : toolPillInactiveClassName,
                    )}
                  >
                    {item.label}
                  </button>
                )
              })}
            </ToolRow>
          </div>
        </div>
      </div>
    </section>
  )
}
