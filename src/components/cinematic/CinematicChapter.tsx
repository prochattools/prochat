import type { ReactNode } from 'react'

export type CinematicChapterAlign = 'left' | 'right' | 'center' | 'wide'

export function CinematicChapter({
  id,
  index,
  title,
  headingLevel = 'h2',
  eyebrow,
  align = 'left',
  children,
}: {
  id: string
  index: number
  title?: string
  headingLevel?: 'h1' | 'h2'
  eyebrow?: string
  align?: CinematicChapterAlign
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`cm-chapter cm-chapter--${align}`}
      data-cinematic-chapter={index}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div className="cm-chapter__inner">
        {eyebrow ? <p className="cm-chapter__eyebrow">{eyebrow}</p> : null}
        {title ? headingLevel === 'h1' ? <h1 id={`${id}-title`}>{title}</h1> : <h2 id={`${id}-title`}>{title}</h2> : null}
        {children}
      </div>
    </section>
  )
}

export function CinematicGlassPanel({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'aside'
}) {
  return <Tag className={`cm-glass-panel ${className}`.trim()}>{children}</Tag>
}
