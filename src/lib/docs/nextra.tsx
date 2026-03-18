import path from 'path'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { jsxDEV } from 'react/jsx-dev-runtime'
import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react'
import Link from 'next/link'

import { compileMdx } from 'nextra/compile'
import { useMDXComponents as getDocsMdxComponents } from 'nextra-theme-docs'

import { getPublicDocHrefResolver } from '@/lib/docs/public-docs'
import type { ContentEntry } from '@/lib/content/types'

type EvaluatedMdxModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>
  metadata?: Record<string, unknown>
  sourceCode?: string
  toc?: Array<{ depth: number; id: string; value: string }>
}

const renderedDocsMdxCache = new Map<string, Promise<ReactNode>>()

function evaluateCompiledMdx(
  compiledSource: string,
  scope: Record<string, unknown> = {},
) {
  const keys = Object.keys(scope)
  const values = Object.values(scope)
  const hydrate = Reflect.construct(
    Function,
    ['$', ...keys, compiledSource],
  ) as (
    runtime: Record<string, unknown>,
    ...args: unknown[]
  ) => { default: () => JSX.Element }

  return hydrate(
    {
      Fragment,
      jsx,
      jsxDEV,
      jsxs,
      useMDXComponents: getDocsMdxComponents,
    },
    ...values,
  ) as EvaluatedMdxModule
}

function stripGeneratedDocsMarkers(source: string) {
  return source
    .replace(/^<!-- GENERATED FILE - DO NOT EDIT -->\s*/m, '')
    .replace(/^\s*<!--\s*AI:[\w-]+:(?:start|end)\s*-->\s*$/gm, '')
}

function stripMdxExtension(value: string) {
  return value.replace(/\/index\.mdx$/i, '').replace(/\.mdx$/i, '')
}

function getDocsRouteSegments(href: string, entry: ContentEntry) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null
  }

  if (/^[a-z]+:/i.test(href)) {
    return null
  }

  if (href.startsWith('/')) {
    if (!href.startsWith('/docs/')) {
      return null
    }

    return stripMdxExtension(href).replace(/^\/docs\/?/, '').split('/').filter(Boolean)
  }

  const baseSegments = entry.sourcePath.endsWith('/index.mdx')
    ? entry.routeSegments
    : entry.routeSegments.slice(0, -1)

  const resolvedSegments: string[] = [...baseSegments]

  for (const part of href.split('/')) {
    if (!part || part === '.') {
      continue
    }
    if (part === '..') {
      resolvedSegments.pop()
      continue
    }
    resolvedSegments.push(part)
  }

  return stripMdxExtension(resolvedSegments.join('/')).split('/').filter(Boolean)
}

function resolveDocsHref(
  href: string,
  entry: ContentEntry,
  resolvePublicDocHref: (routeSegments: string[]) => string | null,
) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href
  }

  if (/^[a-z]+:/i.test(href)) {
    return href
  }

  if (href.startsWith('/')) {
    if (!href.startsWith('/docs/')) {
      return href
    }

    const routeSegments = getDocsRouteSegments(href, entry)
    return routeSegments ? resolvePublicDocHref(routeSegments) : href
  }

  const routeSegments = getDocsRouteSegments(href, entry)
  return routeSegments ? resolvePublicDocHref(routeSegments) : href
}

function createDocsLink(
  entry: ContentEntry,
  resolvePublicDocHref: (routeSegments: string[]) => string | null,
  BaseLink?: ComponentType<ComponentPropsWithoutRef<'a'>>,
) {
  return function DocsLink({
    href = '',
    children,
    ...props
  }: ComponentPropsWithoutRef<'a'>) {
    const normalizedHref = resolveDocsHref(href, entry, resolvePublicDocHref)

    if (!normalizedHref) {
      return <span>{children}</span>
    }

    if (BaseLink) {
      return (
        <BaseLink href={normalizedHref} {...props}>
          {children}
        </BaseLink>
      )
    }

    if (normalizedHref.startsWith('/')) {
      return (
        <Link href={normalizedHref}>
          {children}
        </Link>
      )
    }

    return (
      <a href={normalizedHref} {...props}>
        {children}
      </a>
    )
  }
}

export async function renderDocsMdxContent(entry: ContentEntry) {
  const source = stripGeneratedDocsMarkers(entry.content)
  const routeKey = entry.routeSegments.join('/')
  const cacheKey = `${entry.sourcePath}:${routeKey}:${source}`

  if (!renderedDocsMdxCache.has(cacheKey)) {
    renderedDocsMdxCache.set(
      cacheKey,
      renderDocsMdxContentInternal(entry.sourcePath, source, routeKey),
    )
  }

  return renderedDocsMdxCache.get(cacheKey)!
}

async function renderDocsMdxContentInternal(
  sourcePath: string,
  source: string,
  routeKey: string,
) {
  const filePath = path.join(process.cwd(), sourcePath)
  const resolvePublicDocHref = await getPublicDocHrefResolver()
  const compiledSource = await compileMdx(source, {
    filePath,
    mdxOptions: {
      format: 'mdx',
    },
  })

  const { default: MDXContent, metadata, sourceCode, toc } = evaluateCompiledMdx(compiledSource)
  const components = getDocsMdxComponents()
  const Wrapper = components.wrapper as ComponentType<{
    children: ReactNode
    metadata?: Record<string, unknown>
    sourceCode?: string
    toc?: Array<{ depth: number; id: string; value: string }>
  }> | undefined
  const BaseLink = components.a as ComponentType<ComponentPropsWithoutRef<'a'>> | undefined
  const { wrapper: _wrapper, ...pageComponents } = components
  const docsLink = createDocsLink(
    {
      routeSegments: routeKey ? routeKey.split('/') : [],
      sourcePath,
    } as ContentEntry,
    resolvePublicDocHref,
    BaseLink,
  )
  const enhancedContent = <MDXContent components={{ ...pageComponents, a: docsLink }} />

  if (!Wrapper) {
    return enhancedContent
  }

  return (
    <Wrapper
      metadata={metadata}
      sourceCode={sourceCode}
      toc={toc}
    >
      {enhancedContent}
    </Wrapper>
  )
}
