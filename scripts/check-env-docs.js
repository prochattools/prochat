#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/*
  Directories to scan for env usage
*/
const CODE_DIRS = ['src', 'scripts', 'prisma', 'components', 'instructions', 'types']

/*
  Directories ignored during scan
*/
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'content/docs',
  'dist',
  'build'
])

/*
  File types scanned
*/
const ALLOWED_EXTENSIONS = [
  '.js',
  '.ts',
  '.tsx',
  '.jsx',
  '.mjs',
  '.cjs'
]

/*
  CI / platform variables that should NOT require documentation
*/
const CI_ENV_ALLOWLIST = new Set([
  'GITHUB_BASE_REF',
  'GITHUB_REF',
  'GITHUB_SHA',
  'GITHUB_REPOSITORY',
  'DOCS_COVERAGE_DIFF_BASE',
  'CI',
  'NODE_ENV'
])

const envNames = new Set()

function collectFiles(dir) {
  const results = []

  if (!fs.existsSync(dir)) {
    return results
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue
    }

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath))
    } else {
      const ext = path.extname(entry.name).toLowerCase()

      if (ALLOWED_EXTENSIONS.includes(ext)) {
        results.push(fullPath)
      }
    }
  }

  return results
}

/*
  Collect source files
*/
const codeFiles = CODE_DIRS.flatMap((dir) => {
  const abs = path.join(process.cwd(), dir)
  return collectFiles(abs)
})

/*
  Regex patterns to detect env usage
*/
const dotEnvRegex = /process\.env\.([A-Za-z0-9_]+)/g
const bracketEnvRegex = /process\.env\[['"]([A-Za-z0-9_]+)['"]\]/g

/*
  Scan code
*/
for (const filePath of codeFiles) {
  const content = fs.readFileSync(filePath, 'utf8')

  const matchEnv = (regex) => {
    let match
    while ((match = regex.exec(content))) {
      envNames.add(match[1].toUpperCase())
    }
  }

  matchEnv(dotEnvRegex)
  matchEnv(bracketEnvRegex)
}

/*
  Remove CI / system variables
*/
for (const ciVar of CI_ENV_ALLOWLIST) {
  envNames.delete(ciVar)
}

if (envNames.size === 0) {
  console.log('⚠️  No environment variables detected in code.')
  process.exit(0)
}

/*
  Load documentation file
*/
const docsPath = path.join(process.cwd(), 'docs-public', 'environment.md')

if (!fs.existsSync(docsPath)) {
  console.warn('⚠️  docs-public/environment.md not found. Skipping env documentation validation.')
  process.exit(0)
}

const docContent = fs.readFileSync(docsPath, 'utf8')

const docVars = new Set()
const docRegex = /`([A-Z0-9_]+)`/g

let docMatch

while ((docMatch = docRegex.exec(docContent))) {
  docVars.add(docMatch[1])
}

/*
  Compare detected env vars with documentation
*/
const missing = [...envNames].filter((env) => !docVars.has(env))

if (missing.length > 0) {
  console.error('\n❌ Missing environment documentation:\n')

  missing
    .sort()
    .forEach((name) => console.error(`  ${name}`))

  console.error('\nAdd them to docs-public/environment.md\n')

  process.exit(1)
}

console.log('✅ Environment documentation is synchronized.')
