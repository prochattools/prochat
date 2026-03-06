import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types'

import { cn } from '@/helpers/utils'

import Callout from './Callout'
import PullQuote from './PullQuote'

function ArticleLink({
  href = '',
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const classes = cn('pc-prose-link', className)

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

export const blogMdxComponents: MDXComponents = {
  p: ({ className, ...props }) => <p className={cn(className)} {...props} />,
  h1: ({ className, ...props }) => <h1 className={cn(className)} {...props} />,
  h2: ({ className, ...props }) => <h2 className={cn(className)} {...props} />,
  h3: ({ className, ...props }) => <h3 className={cn(className)} {...props} />,
  h4: ({ className, ...props }) => <h4 className={cn(className)} {...props} />,
  ul: ({ className, ...props }) => <ul className={cn(className)} {...props} />,
  ol: ({ className, ...props }) => <ol className={cn(className)} {...props} />,
  li: ({ className, ...props }) => <li className={cn(className)} {...props} />,
  a: ArticleLink,
  strong: ({ className, ...props }) => (
    <strong className={cn(className)} {...props} />
  ),
  em: ({ className, ...props }) => <em className={cn(className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn(className)} {...props} />
  ),
  hr: ({ className, ...props }) => <hr className={cn(className)} {...props} />,
  pre: ({ className, ...props }) => <pre className={cn(className)} {...props} />,
  code: ({ className, ...props }) => (
    <code className={cn(className)} {...props} />
  ),
  PullQuote,
  Callout,
}
