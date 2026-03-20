import type { SectionName, TemplateDefinition, TemplateSection } from './templates/types'

const SECTION_REGEX = /<!--\s*AI:([a-z]+):start\s*-->([\s\S]*?)<!--\s*AI:\1:end\s*-->/gi
const LOOSE_MARKER_REGEX = /<!--\s*AI:([a-z]+)(?::([a-z]+))?\s*-->/gi

export type SectionEntry = {
  name: string
  content: string
}

export function parseSections(content: string): SectionEntry[] {
  const sections: SectionEntry[] = []
  let match: RegExpExecArray | null
  while ((match = SECTION_REGEX.exec(content))) {
    sections.push({
      name: match[1],
      content: match[2].trim(),
    })
  }
  return sections
}

export function needsRegeneration(content: string) {
  const trimmed = content.trim()
  if (!trimmed) {
    return true
  }
  return /todo|placeholder/i.test(trimmed)
}

export function buildSectionContent(section: TemplateSection, body: string) {
  const cleaned = body.trim()
  return `<!-- AI:${section.name}:start -->\n${cleaned}\n<!-- AI:${section.name}:end -->`
}

export type MarkerValidationOptions = {
  strict?: boolean
}

export function validateMarkers(content: string, allowedSections: string[] = [], options: MarkerValidationOptions = {}) {
  const errors: string[] = []
  const warnings: string[] = []
  const stack: { name: string; position: number }[] = []
  const allowed = new Set(allowedSections)
  const markerRegex = /<!--\s*AI:([a-z]+):(start|end)\s*-->/gi
  const { strict = false } = options
  markerRegex.lastIndex = 0
  LOOSE_MARKER_REGEX.lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = markerRegex.exec(content))) {
    const [, name, type] = match
    if (!allowed.has(name)) {
      warnings.push(`Unknown AI section ${name}`)
    }
    if (type === 'start') {
      if (stack.length) {
        errors.push(`Nested AI section ${name} started before ${stack[stack.length - 1].name} ended`)
      }
      stack.push({ name, position: match.index })
    } else {
      if (!stack.length) {
        errors.push(`End marker for ${name} without matching start`)
        continue
      }
      const last = stack.pop()
      if (last?.name !== name) {
        errors.push(`Mismatched AI section: expected ${last?.name ?? 'start'}, got end for ${name}`)
      }
    }
  }

  while (stack.length) {
    const dangling = stack.pop()
    errors.push(`Missing end marker for AI section ${dangling?.name}`)
  }

  let malformedMatch: RegExpExecArray | null
  while ((malformedMatch = LOOSE_MARKER_REGEX.exec(content))) {
    const [, name, type] = malformedMatch
    if (!type || !['start', 'end'].includes(type)) {
      const message = `Malformed AI marker ${malformedMatch[0].trim()} for ${name}`
      if (strict) {
        errors.push(message)
      } else {
        warnings.push(message)
      }
    }
  }

  return { errors, warnings }
}

export function ensureTemplateSections(
  template: TemplateDefinition,
  entries: SectionEntry[],
  content?: string,
): string[] {
  const names = template.sections.map(section => section.name)
  const found = new Set(entries.map(entry => entry.name))
  return names.filter(name => {
    if (found.has(name)) {
      return false
    }

    if (content && hasHeadingVariant(content, name)) {
      return false
    }

    return true
  })
}

const SECTION_HEADING_ALIASES: Record<SectionName, string[]> = {
  overview: ['overview', 'summary', 'introduction', 'about', 'what this is'],
  installation: ['installation', 'setup', 'setup notes', 'install guide', 'installation & setup', 'getting started'],
  usage: ['usage', 'usage guidance', 'how to use', 'usage notes', 'using the product'],
  examples: ['examples', 'sample', 'practical examples', 'use cases', 'demo', 'sample project', 'try it yourself'],
  api: ['api', 'api reference', 'api docs', 'api surface', 'api overview'],
}

const HEADING_REGEX = /^#{1,6}\s*(.+)$/gim

function normalizeHeading(value: string) {
  return value.replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase()
}

function hasHeadingVariant(content: string, section: SectionName) {
  const aliasList = SECTION_HEADING_ALIASES[section]
  if (!aliasList?.length) return false

  let match: RegExpExecArray | null
  while ((match = HEADING_REGEX.exec(content))) {
    const heading = normalizeHeading(match[1])
    if (!heading) {
      continue
    }

    for (const alias of aliasList) {
      const normalizedAlias = normalizeHeading(alias)
      if (normalizedAlias && heading.includes(normalizedAlias)) {
        return true
      }
    }
  }

  return false
}
