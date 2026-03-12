#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const repoName = path.basename(repoRoot)
const markdownTargets = [
  'README.md',
  'AGENTS.md',
  'REPO_OPERATIONS.md',
  'docs',
  'docs-public',
  'scripts/docs',
]

function gatherMarkdownFiles(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return []
  }

  const stat = fs.statSync(targetPath)
  if (stat.isFile()) {
    return targetPath.match(/\.mdx?$/i) ? [targetPath] : []
  }

  return fs.readdirSync(targetPath, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.')) {
      return []
    }

    return gatherMarkdownFiles(path.join(targetPath, entry.name))
  })
}

function readLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const regex = /\[[^\]]*]\(([^)]+)\)/g
  const links = []
  let match

  while ((match = regex.exec(content))) {
    const rawTarget = match[1].trim()
    if (!rawTarget) continue
    if (rawTarget.startsWith('http://') || rawTarget.startsWith('https://') || rawTarget.startsWith('#')) {
      continue
    }

    const cleanTarget = rawTarget.split('#')[0].split('?')[0].trim()
    if (!cleanTarget.match(/\.mdx?$/i)) {
      continue
    }

    links.push({ source: filePath, target: cleanTarget })
  }

  return links
}

function normalizeAbsoluteTarget(target) {
  if (!path.isAbsolute(target)) {
    return null
  }

  if (target.startsWith(repoRoot)) {
    return target
  }

  const repoMarker = `${path.sep}${repoName}${path.sep}`
  const repoIndex = target.lastIndexOf(repoMarker)

  if (repoIndex >= 0) {
    return path.resolve(repoRoot, target.slice(repoIndex + repoMarker.length))
  }

  return target
}

function resolveTarget(sourcePath, target) {
  if (path.isAbsolute(target)) {
    return normalizeAbsoluteTarget(target)
  }

  if (target.startsWith('/')) {
    return path.resolve(repoRoot, target.slice(1))
  }

  return path.resolve(path.dirname(sourcePath), target)
}

const filesToScan = markdownTargets.flatMap(target =>
  gatherMarkdownFiles(path.resolve(repoRoot, target)),
)

const missingLinks = []

for (const filePath of filesToScan) {
  const links = readLinks(filePath)

  for (const { target, source } of links) {
    const resolved = resolveTarget(source, target)

    if (!resolved || !fs.existsSync(resolved)) {
      missingLinks.push({
        source: path.relative(repoRoot, source),
        target,
      })
    }
  }
}

if (missingLinks.length > 0) {
  console.error('Broken documentation links found:')
  missingLinks.forEach(({ source, target }) => {
    console.error(`${source} -> ${target}`)
  })
  process.exit(1)
}

console.log('Documentation links are valid.')
