#!/usr/bin/env node
import path from 'path'
import ts from 'typescript'

import {
  DOCS_EXPORT_ROOT,
  SOURCE_COMMIT,
  listFiles,
  loadRegistry,
  resetGeneratedApiDir,
  slugify,
  titleCase,
  writeGeneratedMarkdown,
} from './shared.ts'

type ExportedEntity = {
  name: string
  kind: 'interface' | 'type' | 'function'
  sourcePath: string
  sourceText: string
  documentation: string
}

function isExported(node: ts.Node) {
  return (
    ts.canHaveModifiers(node) &&
    Boolean(ts.getModifiers(node)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword))
  )
}

function getDocumentation(checker: ts.TypeChecker, symbol: ts.Symbol | undefined) {
  if (!symbol) return ''
  return ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim()
}

function getSymbolForNode(checker: ts.TypeChecker, sourceFile: ts.SourceFile, node: ts.Node) {
  const namedNode = node as ts.NamedDeclaration
  if (namedNode.name && ts.isIdentifier(namedNode.name)) {
    return checker.getSymbolAtLocation(namedNode.name)
  }

  if (ts.isVariableStatement(node)) {
    const declaration = node.declarationList.declarations[0]
    if (declaration && ts.isIdentifier(declaration.name)) {
      return checker.getSymbolAtLocation(declaration.name)
    }
  }

  return checker.getSymbolAtLocation(sourceFile)
}

function collectExports(program: ts.Program, files: string[]): ExportedEntity[] {
  const checker = program.getTypeChecker()
  const entities: ExportedEntity[] = []

  for (const filePath of files) {
    const sourceFile = program.getSourceFile(filePath)
    if (!sourceFile) continue

    sourceFile.forEachChild(node => {
      if (!isExported(node)) return

      if (ts.isInterfaceDeclaration(node)) {
        entities.push({
          name: node.name.text,
          kind: 'interface',
          sourcePath: path.relative(process.cwd(), filePath),
          sourceText: node.getText(sourceFile).trim(),
          documentation: getDocumentation(checker, getSymbolForNode(checker, sourceFile, node)),
        })
        return
      }

      if (ts.isTypeAliasDeclaration(node)) {
        entities.push({
          name: node.name.text,
          kind: 'type',
          sourcePath: path.relative(process.cwd(), filePath),
          sourceText: node.getText(sourceFile).trim(),
          documentation: getDocumentation(checker, getSymbolForNode(checker, sourceFile, node)),
        })
        return
      }

      if (ts.isFunctionDeclaration(node) && node.name) {
        entities.push({
          name: node.name.text,
          kind: 'function',
          sourcePath: path.relative(process.cwd(), filePath),
          sourceText: node.getText(sourceFile).trim(),
          documentation: getDocumentation(checker, getSymbolForNode(checker, sourceFile, node)),
        })
        return
      }

      if (ts.isVariableStatement(node)) {
        for (const declaration of node.declarationList.declarations) {
          if (!ts.isIdentifier(declaration.name)) continue
          const initializer = declaration.initializer
          if (!initializer) continue
          if (!ts.isArrowFunction(initializer) && !ts.isFunctionExpression(initializer)) continue
          entities.push({
            name: declaration.name.text,
            kind: 'function',
            sourcePath: path.relative(process.cwd(), filePath),
            sourceText: node.getText(sourceFile).trim(),
            documentation: getDocumentation(checker, getSymbolForNode(checker, sourceFile, node)),
          })
        }
      }
    })
  }

  return entities
}

function buildMarkdown(entity: ExportedEntity) {
  const title = titleCase(entity.name)
  const description = entity.documentation || `${title} ${entity.kind} extracted from ${entity.sourcePath}.`
  const overview = entity.documentation || `Auto-generated API reference for ${entity.name}.`

  return {
    title,
    description,
    body: [
      `# ${title}`,
      '',
      '## Overview',
      overview,
      '',
      '## Source',
      `- File: \`${entity.sourcePath}\``,
      `- Kind: \`${entity.kind}\``,
      '',
      '## Definition',
      '```ts',
      entity.sourceText,
      '```',
    ].join('\n'),
  }
}

async function run() {
  const registry = await loadRegistry()
  const products = registry.filter(
    product => product.apiSource === 'typescript' && Array.isArray(product.apiSourcePaths) && product.apiSourcePaths.length > 0,
  )

  if (!products.length) {
    console.log('No TypeScript API extraction targets configured.')
    return
  }

  let generated = 0

  for (const product of products) {
    const sourceRoots = product.apiSourcePaths!.map(sourcePath => path.resolve(sourcePath))
    const files = (
      await Promise.all(sourceRoots.map(sourceRoot => listFiles(sourceRoot, ['.ts', '.tsx'])))
    )
      .flat()
      .filter(filePath => !filePath.endsWith('.d.ts'))

    if (!files.length) {
      console.warn(`No TypeScript files found for ${product.id}.`)
      continue
    }

    const program = ts.createProgram(files, {
      allowJs: false,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      skipLibCheck: true,
    })

    const entities = collectExports(program, files)
    const apiDir = await resetGeneratedApiDir(product.id)

    for (const entity of entities) {
      const slug = slugify(entity.name)
      const markdown = buildMarkdown(entity)
      const outputPath = path.join(apiDir, `${slug}.md`)
      await writeGeneratedMarkdown(outputPath, {
        title: markdown.title,
        description: markdown.description,
        category: product.category,
        slug,
        order: 100,
        keywords: [product.id, 'api', entity.name],
        generator: 'auto',
        sourceRepo: product.id,
        sourceCommit: SOURCE_COMMIT,
        sourcePath: entity.sourcePath,
      }, markdown.body)
      generated += 1
    }

    console.log(`Extracted ${entities.length} TypeScript API docs for ${product.id} into ${path.relative(process.cwd(), apiDir)}`)
  }

  if (!generated) {
    console.log(`No TypeScript API docs were generated under ${path.relative(process.cwd(), DOCS_EXPORT_ROOT)}.`)
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
