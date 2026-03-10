#!/usr/bin/env node
import { readFile } from 'fs/promises'
import path from 'path'

import yaml from 'yaml'

import {
  SOURCE_COMMIT,
  listFiles,
  loadRegistry,
  resetGeneratedApiDir,
  slugify,
  titleCase,
  writeGeneratedMarkdown,
} from './shared.ts'

type OpenApiDocument = {
  openapi?: string
  info?: {
    title?: string
  }
  paths?: Record<string, Record<string, Record<string, unknown>>>
}

async function readOpenApiDocument(filePath: string): Promise<OpenApiDocument | null> {
  const raw = await readFile(filePath, 'utf-8').catch(() => '')
  if (!raw.trim()) {
    return null
  }

  try {
    if (filePath.endsWith('.json')) {
      return JSON.parse(raw) as OpenApiDocument
    }
    return yaml.parse(raw) as OpenApiDocument
  } catch (error) {
    console.warn(`Unable to parse OpenAPI document ${filePath}: ${(error as Error).message}`)
    return null
  }
}

function endpointSlug(method: string, routePath: string) {
  return slugify(`${method}-${routePath.replace(/[{}]/g, '')}`)
}

async function run() {
  const registry = await loadRegistry()
  const products = registry.filter(
    product => product.apiSource === 'openapi' && Array.isArray(product.apiSourcePaths) && product.apiSourcePaths.length > 0,
  )

  if (!products.length) {
    console.log('No OpenAPI extraction targets configured.')
    return
  }

  for (const product of products) {
    const sourceRoots = product.apiSourcePaths!.map(sourcePath => path.resolve(sourcePath))
    const schemaFiles = (
      await Promise.all(sourceRoots.map(sourceRoot => listFiles(sourceRoot, ['openapi.json', 'openapi.yaml', 'openapi.yml'])))
    ).flat()

    const apiDir = await resetGeneratedApiDir(product.id)
    let generated = 0

    for (const schemaPath of schemaFiles) {
      const document = await readOpenApiDocument(schemaPath)
      if (!document?.paths) continue

      for (const [routePath, methods] of Object.entries(document.paths)) {
        for (const [method, operation] of Object.entries(methods)) {
          const slug = endpointSlug(method, routePath)
          const summary = String(operation.summary || operation.operationId || `${method.toUpperCase()} ${routePath}`)
          const description =
            String(operation.description || summary)
          const outputPath = path.join(apiDir, `${slug}.md`)
          const body = [
            `# ${summary}`,
            '',
            '## Overview',
            description,
            '',
            '## Endpoint',
            `- Method: \`${method.toUpperCase()}\``,
            `- Path: \`${routePath}\``,
            `- Source: \`${path.relative(process.cwd(), schemaPath)}\``,
            '',
            '## OpenAPI Operation',
            '```yaml',
            yaml.stringify(operation).trim(),
            '```',
          ].join('\n')

          await writeGeneratedMarkdown(outputPath, {
            title: summary,
            description,
            category: product.category,
            slug,
            order: 100,
            keywords: [product.id, 'api', method.toUpperCase(), routePath],
            generator: 'auto',
            sourceRepo: product.id,
            sourceCommit: SOURCE_COMMIT,
            sourcePath: path.relative(process.cwd(), schemaPath),
          }, body)
          generated += 1
        }
      }
    }

    console.log(`Extracted ${generated} OpenAPI docs for ${product.id} into ${path.relative(process.cwd(), apiDir)}`)
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
