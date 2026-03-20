import fs from 'fs'
import path from 'path'

import { brand } from '@/lib/brand'
import { applyWordmarkGradient, svgToDataUri } from '@/lib/og-utils'

const DEFAULT_SOCIAL_TITLE = 'Build SaaS with Structure, not Guesswork.'
const SOCIAL_TITLE_MAX_LENGTH = 90
const SOCIAL_HEADLINE_LINE_MAX_LENGTH = 56
const SOCIAL_SUBTITLE_MAX_LENGTH = 48

const logoWordmarkSvg = fs.readFileSync(
  path.join(process.cwd(), 'public', 'logo', 'logo-wordmark.svg'),
  'utf8',
)

export function getSocialDefaultTitle() {
  return DEFAULT_SOCIAL_TITLE
}

export function sanitizeSocialSubtitle(input?: string | null) {
  const cleaned = collapseWhitespace(stripHtml(input ?? ''))
  if (!cleaned) return ''

  return clampTitleLength(cleaned, SOCIAL_SUBTITLE_MAX_LENGTH)
}

export function sanitizeSocialHeadlineLine(input?: string | null) {
  const cleaned = collapseWhitespace(normalizeLineBreaks(stripHtml(input ?? '')).replace(/\n/g, ' '))
  if (!cleaned) return ''

  return clampTitleLength(cleaned, SOCIAL_HEADLINE_LINE_MAX_LENGTH)
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, ' ')
}

function collapseWhitespace(input: string) {
  return input.replace(/\s+/g, ' ').trim()
}

function normalizeLineBreaks(input: string) {
  return input.replace(/\r\n?/g, '\n')
}

function sanitizeSocialTitleLines(input: string) {
  return normalizeLineBreaks(stripHtml(input))
    .split('\n')
    .map(line => collapseWhitespace(line))
    .filter(Boolean)
    .slice(0, 2)
}

function clampTitleLength(input: string, maxLength: number) {
  if (input.length <= maxLength) return input

  const candidate = input.slice(0, maxLength)
  const lastSpace = candidate.lastIndexOf(' ')

  return `${candidate.slice(0, lastSpace > 36 ? lastSpace : maxLength).trimEnd()}…`
}

export function sanitizeSocialTitle(input?: string | null) {
  const lines = sanitizeSocialTitleLines(input ?? '')
  if (lines.length === 0) return DEFAULT_SOCIAL_TITLE

  const cleaned = lines.join('\n')

  return clampTitleLength(cleaned, SOCIAL_TITLE_MAX_LENGTH)
}

export function splitSocialTitle(title: string) {
  const explicitLines = normalizeLineBreaks(title)
    .split('\n')
    .map(line => collapseWhitespace(line))
    .filter(Boolean)

  if (explicitLines.length > 1) {
    return explicitLines.slice(0, 2)
  }

  const words = title.split(' ').filter(Boolean)
  if (words.length <= 3 || title.length <= 42) {
    return [title]
  }

  let bestIndex = 1
  let bestScore = Number.POSITIVE_INFINITY

  for (let index = 1; index < words.length; index += 1) {
    const left = words.slice(0, index).join(' ')
    const right = words.slice(index).join(' ')
    const score = Math.abs(left.length - right.length)

    if (score < bestScore) {
      bestScore = score
      bestIndex = index
    }
  }

  return [words.slice(0, bestIndex).join(' '), words.slice(bestIndex).join(' ')]
}

export function getSocialHeadlineFontSize(lines: string[]) {
  const longestLine = Math.max(...lines.map(line => line.length))

  if (longestLine > 34) return 68
  if (longestLine > 28) return 74
  if (longestLine > 22) return 80
  return 88
}

export function getSocialWordmarkDataUri() {
  return svgToDataUri(
    applyWordmarkGradient(
      logoWordmarkSvg,
      brand.colors.primary,
      brand.colors.primaryStrong,
      brand.colors.white,
    ),
  )
}
