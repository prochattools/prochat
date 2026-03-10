#!/usr/bin/env node
import { mkdir, readdir, readFile, rm, writeFile } from 'fs/promises'
import path from 'path'

import yaml from 'yaml'

export const REGISTRY_PATH = path.resolve('scripts', 'docs', 'products-registry.json')
export const DOCS_EXPORT_ROOT = path.resolve('docs-export')
export const SOURCE_COMMIT = process.env.DOCS_SOURCE_COMMIT?.trim() || null

export type ApiSourceType = 'typescript' | 'openapi' | 'none'

export type RegistryProduct = {
  id: string
  title: string
  category: string
  docsPath: string
  template?: string
  apiSource?: ApiSourceType
  apiSourcePaths?: string[]
}

export async function loadRegistry(): Promise<RegistryProduct[]> {
  try {
    const raw = await readFile(REGISTRY_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.products)) {
      return parsed.products as RegistryProduct[]
    }
  } catch (error) {
    console.error(`Unable to read product registry: ${(error as Error).message}`)
  }

  return []
}

export async function listFiles(dir: string, allowedExtensions: string[]): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
  const files: string[] = []

  await Promise.all(
    entries.map(async entry => {
      if (entry.name.startsWith('.')) return
      const resolved = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await listFiles(resolved, allowedExtensions)))
        return
      }
      if (!allowedExtensions.some(extension => entry.name.toLowerCase().endsWith(extension))) {
        return
      }
      files.push(resolved)
    }),
  )

  return files
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim()
}

export const GENERATED_FILE_MARKER = '<!-- GENERATED FILE - DO NOT EDIT -->'

export async function resetGeneratedApiDir(productId: string) {
  const apiRoot = path.join(DOCS_EXPORT_ROOT, productId, 'api')
  await rm(apiRoot, { recursive: true, force: true })
  await mkdir(apiRoot, { recursive: true })
  return apiRoot
}

function splitFrontmatter(raw: string) {
  let trimmed = raw.trim()

  if (trimmed.startsWith(GENERATED_FILE_MARKER)) {
    trimmed = trimmed.slice(GENERATED_FILE_MARKER.length).trimStart()
  }

  const match = trimmed.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, content: trimmed }
  }

  try {
    return {
      frontmatter: (yaml.parse(match[1]) as Record<string, unknown>) || {},
      content: match[2].trim(),
    }
  } catch {
    return { frontmatter: {}, content: match[2].trim() }
  }
}

export async function writeGeneratedMarkdown(
  outputPath: string,
  frontmatter: Record<string, unknown>,
  content: string,
) {
  await mkdir(path.dirname(outputPath), { recursive: true })

  let generatedAt =
    typeof frontmatter.generatedAt === 'string' ? frontmatter.generatedAt : new Date().toISOString()

  try {
    const existingRaw = await readFile(outputPath, 'utf-8')
    const existing = splitFrontmatter(existingRaw)
    if (existing.content === content.trim()) {
      const existingGeneratedAt = existing.frontmatter.generatedAt
      if (typeof existingGeneratedAt === 'string' && existingGeneratedAt.trim()) {
        generatedAt = existingGeneratedAt
      }
    }
  } catch {
    generatedAt = typeof frontmatter.generatedAt === 'string'
      ? frontmatter.generatedAt
      : new Date().toISOString()
  }

  const payload = {
    ...frontmatter,
    generatedAt,
  }

  const serialized = yaml.stringify(payload, { indent: 2 }).trim()
  const fileContent = `${GENERATED_FILE_MARKER}\n---\n${serialized}\n---\n\n${content.trim()}\n`
  await writeFile(outputPath, fileContent, 'utf-8')
}

export function hasGeneratedMarker(raw: string) {
  return raw.trimStart().startsWith(GENERATED_FILE_MARKER)
}
