import { evaluate } from '@mdx-js/mdx'
import type { MDXComponents } from 'mdx/types'
import { ComponentType } from 'react'
import * as devRuntime from 'react/jsx-dev-runtime'
import * as runtime from 'react/jsx-runtime'

import { contentMdxComponents } from '@/components/content/mdx-components'

const isDevelopment = process.env.NODE_ENV === 'development'

function normalizeHeadingText(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

function stripDuplicateLeadingTitle(source: string, title?: string) {
  if (!title) return source

  const normalizedTitle = normalizeHeadingText(title)
  const atxMatch = source.match(/^#\s+(.+?)\s*(?:\n+|$)/)

  if (atxMatch && normalizeHeadingText(atxMatch[1]) === normalizedTitle) {
    return source.slice(atxMatch[0].length).trimStart()
  }

  const setextMatch = source.match(/^([^\n]+)\n=+\s*(?:\n+|$)/)

  if (setextMatch && normalizeHeadingText(setextMatch[1]) === normalizedTitle) {
    return source.slice(setextMatch[0].length).trimStart()
  }

  return source
}

function normalizeMdxSource(source: string, title?: string) {
  return stripDuplicateLeadingTitle(source.replace(/^import\s+.+$/gm, '').trim(), title)
}

type EvaluatedMdxModule = {
  default: ComponentType<{ components?: MDXComponents }>
}

async function getMdxComponent(source: string, title?: string) {
  const evaluatedModule = (await evaluate(normalizeMdxSource(source, title), {
    ...(isDevelopment ? { ...runtime, ...devRuntime } : runtime),
    development: isDevelopment,
    useMDXComponents: () => contentMdxComponents,
  })) as EvaluatedMdxModule

  return evaluatedModule.default
}

export async function renderMdxContent(source: string, title?: string) {
  const Content = await getMdxComponent(source, title)
  return <Content components={contentMdxComponents} />
}

export default async function MDXRenderer({ source, title }: { source: string; title?: string }) {
  return renderMdxContent(source, title)
}
