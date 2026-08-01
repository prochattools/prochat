#!/usr/bin/env node
/**
 * Self-tests for validate-static-asset-imports.mjs
 * Uses Node.js built-in test runner (node:test).
 *
 * Run: node --test scripts/validate-static-asset-imports.test.mjs
 */

import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

import {
  isAssetPath,
  isExternalOrPublic,
  resolveImportPath,
  collectFiles,
  extractImportsFromAST,
  extractImportsFromCSS,
  validate,
  ASSET_EXTENSIONS,
  SCAN_EXTENSIONS,
  EXCLUDE_DIRS,
} from './validate-static-asset-imports.mjs'

// --- Helper to create temp project structure ---

function createTempProject() {
  const root = mkdtempSync(join(tmpdir(), 'asset-validator-test-'))
  const src = join(root, 'src')
  mkdirSync(src, { recursive: true })
  return { root, src }
}

function cleanTempProject(root) {
  rmSync(root, { recursive: true, force: true })
}

// --- Unit tests: isAssetPath ---

describe('isAssetPath', () => {
  it('recognizes known asset extensions', () => {
    assert.ok(isAssetPath('./icon.svg'))
    assert.ok(isAssetPath('./photo.png'))
    assert.ok(isAssetPath('./image.jpg'))
    assert.ok(isAssetPath('./image.jpeg'))
    assert.ok(isAssetPath('./anim.gif'))
    assert.ok(isAssetPath('./hero.webp'))
    assert.ok(isAssetPath('./favicon.ico'))
    assert.ok(isAssetPath('./font.woff'))
    assert.ok(isAssetPath('./font.woff2'))
  })

  it('is case-insensitive', () => {
    assert.ok(isAssetPath('./Icon.SVG'))
    assert.ok(isAssetPath('./Photo.PNG'))
  })

  it('rejects non-asset extensions', () => {
    assert.ok(!isAssetPath('./component.tsx'))
    assert.ok(!isAssetPath('./styles.css'))
    assert.ok(!isAssetPath('./data.json'))
    assert.ok(!isAssetPath('react'))
  })
})

// --- Unit tests: isExternalOrPublic ---

describe('isExternalOrPublic', () => {
  it('skips http URLs', () => {
    assert.ok(isExternalOrPublic('http://example.com/icon.svg'))
  })

  it('skips https URLs', () => {
    assert.ok(isExternalOrPublic('https://cdn.example.com/icon.svg'))
  })

  it('skips node: protocol', () => {
    assert.ok(isExternalOrPublic('node:fs'))
  })

  it('skips public root paths (start with /)', () => {
    assert.ok(isExternalOrPublic('/images/logo.svg'))
  })

  it('does not skip @/ alias paths', () => {
    assert.ok(!isExternalOrPublic('@/assets/icon.svg'))
  })

  it('does not skip relative paths', () => {
    assert.ok(!isExternalOrPublic('./assets/icon.svg'))
    assert.ok(!isExternalOrPublic('../shared/icon.svg'))
  })
})

// --- Unit tests: resolveImportPath ---

describe('resolveImportPath', () => {
  it('resolves @/ alias to src directory', () => {
    const result = resolveImportPath('@/assets/icon.svg', '/project/src/components/App.tsx', '/project/src')
    assert.equal(result, '/project/src/assets/icon.svg')
  })

  it('resolves relative paths from importer directory', () => {
    const result = resolveImportPath('./icon.svg', '/project/src/components/App.tsx', '/project/src')
    assert.equal(result, '/project/src/components/icon.svg')
  })

  it('resolves parent-relative paths', () => {
    const result = resolveImportPath('../assets/icon.svg', '/project/src/components/App.tsx', '/project/src')
    assert.equal(result, '/project/src/assets/icon.svg')
  })

  it('returns null for bare specifiers (non-resolvable)', () => {
    const result = resolveImportPath('lodash', '/project/src/App.tsx', '/project/src')
    assert.equal(result, null)
  })
})

// --- Unit tests: extractImportsFromAST ---

describe('extractImportsFromAST - default import', () => {
  it('extracts default import', () => {
    const source = `import icon from './assets/icon.svg';`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/icon.svg'))
  })
})

describe('extractImportsFromAST - named import', () => {
  it('extracts named import', () => {
    const source = `import { ReactComponent as Icon } from './assets/icon.svg';`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/icon.svg'))
  })
})

describe('extractImportsFromAST - namespace import', () => {
  it('extracts namespace import', () => {
    const source = `import * as icons from './assets/icons.svg';`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/icons.svg'))
  })
})

describe('extractImportsFromAST - side-effect import', () => {
  it('extracts side-effect import', () => {
    const source = `import './styles/background.svg';`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./styles/background.svg'))
  })
})

describe('extractImportsFromAST - multiline import', () => {
  it('extracts multiline import', () => {
    const source = `import {
  foo,
  bar
} from './assets/bundle.svg';`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/bundle.svg'))
  })
})

describe('extractImportsFromAST - dynamic import', () => {
  it('extracts dynamic import()', () => {
    const source = `const icon = import('./assets/lazy-icon.svg');`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/lazy-icon.svg'))
  })
})

describe('extractImportsFromAST - require', () => {
  it('extracts require()', () => {
    const source = `const img = require('./assets/logo.png');`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/logo.png'))
  })
})

describe('extractImportsFromAST - export from', () => {
  it('extracts named export-from', () => {
    const source = `export { icon } from './assets/icon.svg';`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/icon.svg'))
  })

  it('extracts star export-from', () => {
    const source = `export * from './assets/all-icons.svg';`
    const imports = extractImportsFromAST(source, 'test.tsx')
    assert.ok(imports.includes('./assets/all-icons.svg'))
  })
})

describe('extractImportsFromAST - new URL pattern', () => {
  it('extracts new URL with import.meta.url', () => {
    const source = `const url = new URL('./assets/worker.png', import.meta.url);`
    const imports = extractImportsFromAST(source, 'test.mjs')
    assert.ok(imports.includes('./assets/worker.png'))
  })

  it('does not extract new URL without import.meta.url', () => {
    const source = `const url = new URL('./assets/worker.png', window.location.href);`
    const imports = extractImportsFromAST(source, 'test.mjs')
    assert.ok(!imports.includes('./assets/worker.png'))
  })
})

describe('extractImportsFromAST - non-asset imports ignored', () => {
  it('extracts all imports (filtering happens elsewhere)', () => {
    const source = `
import React from 'react';
import { useState } from 'react';
import './styles.css';
import icon from './icon.svg';
`
    const imports = extractImportsFromAST(source, 'test.tsx')
    // All are extracted; filtering by isAssetPath is done in validate()
    assert.ok(imports.includes('react'))
    assert.ok(imports.includes('./styles.css'))
    assert.ok(imports.includes('./icon.svg'))
  })
})

// --- Unit tests: extractImportsFromCSS ---

describe('extractImportsFromCSS', () => {
  it('extracts unquoted url()', () => {
    const source = `.bg { background: url(./images/bg.svg); }`
    const imports = extractImportsFromCSS(source)
    assert.ok(imports.includes('./images/bg.svg'))
  })

  it('extracts single-quoted url()', () => {
    const source = `.bg { background: url('./images/bg.png'); }`
    const imports = extractImportsFromCSS(source)
    assert.ok(imports.includes('./images/bg.png'))
  })

  it('extracts double-quoted url()', () => {
    const source = `.bg { background: url("./images/bg.jpg"); }`
    const imports = extractImportsFromCSS(source)
    assert.ok(imports.includes('./images/bg.jpg'))
  })

  it('extracts multiple url() references', () => {
    const source = `
.a { background: url(./a.svg); }
.b { background: url('./b.png'); }
.c { background: url("./c.webp"); }
`
    const imports = extractImportsFromCSS(source)
    assert.ok(imports.includes('./a.svg'))
    assert.ok(imports.includes('./b.png'))
    assert.ok(imports.includes('./c.webp'))
  })

  it('handles url with whitespace', () => {
    const source = `.bg { background: url(  ./images/bg.svg  ); }`
    const imports = extractImportsFromCSS(source)
    assert.ok(imports.includes('./images/bg.svg'))
  })
})

// --- Unit tests: collectFiles ---

describe('collectFiles', () => {
  let root

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'collect-files-test-'))
    mkdirSync(join(root, 'src'), { recursive: true })
    mkdirSync(join(root, 'node_modules', 'pkg'), { recursive: true })
    mkdirSync(join(root, 'src', 'components'), { recursive: true })
    writeFileSync(join(root, 'src', 'index.ts'), '')
    writeFileSync(join(root, 'src', 'components', 'App.tsx'), '')
    writeFileSync(join(root, 'node_modules', 'pkg', 'index.js'), '')
    writeFileSync(join(root, 'src', 'styles.css'), '')
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('collects files with specified extensions', () => {
    const files = collectFiles(root, ['.ts', '.tsx'], ['node_modules'])
    assert.equal(files.length, 2)
    assert.ok(files.some(f => f.endsWith('index.ts')))
    assert.ok(files.some(f => f.endsWith('App.tsx')))
  })

  it('excludes files in excluded directories', () => {
    const files = collectFiles(root, ['.js'], ['node_modules'])
    assert.equal(files.length, 0)
  })

  it('collects CSS files when specified', () => {
    const files = collectFiles(root, ['.css'], ['node_modules'])
    assert.equal(files.length, 1)
    assert.ok(files[0].endsWith('styles.css'))
  })
})

// --- Integration tests: validate ---

describe('validate - clean pass', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    // Create asset that exists
    mkdirSync(join(src, 'assets'), { recursive: true })
    writeFileSync(join(src, 'assets', 'icon.svg'), '<svg></svg>')

    // Create source file that imports existing asset
    mkdirSync(join(src, 'components'), { recursive: true })
    writeFileSync(
      join(src, 'components', 'App.tsx'),
      `import icon from '../assets/icon.svg';\nexport default function App() { return <img src={icon} />; }`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('returns empty array when all assets exist', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 0)
  })
})

describe('validate - missing asset detection', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    // Source file imports asset that does NOT exist
    mkdirSync(join(src, 'components'), { recursive: true })
    writeFileSync(
      join(src, 'components', 'App.tsx'),
      `import icon from '../assets/missing-icon.svg';`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('detects missing assets', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 1)
    assert.ok(missing[0].importPath.includes('missing-icon.svg'))
  })
})

describe('validate - @/ alias resolution', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    // Create asset at src/assets/logo.png
    mkdirSync(join(src, 'assets'), { recursive: true })
    writeFileSync(join(src, 'assets', 'logo.png'), 'PNG')

    // Source file uses @/ alias
    mkdirSync(join(src, 'pages'), { recursive: true })
    writeFileSync(
      join(src, 'pages', 'Home.tsx'),
      `import logo from '@/assets/logo.png';`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('resolves @/ alias correctly', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 0)
  })

  it('reports missing for @/ alias when file does not exist', () => {
    writeFileSync(
      join(src, 'pages', 'Home.tsx'),
      `import logo from '@/assets/nonexistent.png';`
    )
    const missing = validate(root, src)
    assert.equal(missing.length, 1)
    assert.ok(missing[0].importPath === '@/assets/nonexistent.png')
  })
})

describe('validate - external/public URLs skipped', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    mkdirSync(join(src, 'components'), { recursive: true })
    writeFileSync(
      join(src, 'components', 'App.tsx'),
      `
import ext1 from 'https://cdn.example.com/icon.svg';
import ext2 from 'http://example.com/icon.svg';
const x = require('/public/icon.svg');
`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('does not report external/public URLs as missing', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 0)
  })
})

describe('validate - non-asset imports are ignored', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    mkdirSync(join(src, 'components'), { recursive: true })
    writeFileSync(
      join(src, 'components', 'App.tsx'),
      `
import React from 'react';
import { useState } from 'react';
import './styles.css';
import utils from '../utils/helper.ts';
`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('does not report non-asset imports', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 0)
  })
})

describe('validate - excluded directories', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    // Create file in node_modules that imports a missing asset
    mkdirSync(join(root, 'node_modules', 'some-pkg'), { recursive: true })
    writeFileSync(
      join(root, 'node_modules', 'some-pkg', 'index.js'),
      `import icon from './missing.svg';`
    )

    // Create file in .next directory
    mkdirSync(join(root, '.next', 'static'), { recursive: true })
    writeFileSync(
      join(root, '.next', 'static', 'chunk.js'),
      `import icon from './missing.svg';`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('skips files in excluded directories', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 0)
  })
})

describe('validate - CSS url() references', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    // Create existing asset
    mkdirSync(join(src, 'assets'), { recursive: true })
    writeFileSync(join(src, 'assets', 'bg.svg'), '<svg></svg>')

    // Create CSS file with url() references
    writeFileSync(
      join(src, 'styles.css'),
      `
.hero { background: url(./assets/bg.svg); }
.missing { background: url('./assets/missing.png'); }
`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('reports missing CSS url() asset references', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 1)
    assert.ok(missing[0].importPath.includes('missing.png'))
  })

  it('does not report existing CSS url() asset references', () => {
    // Rewrite CSS to only reference existing asset
    writeFileSync(
      join(src, 'styles.css'),
      `.hero { background: url(./assets/bg.svg); }`
    )
    const missing = validate(root, src)
    assert.equal(missing.length, 0)
  })
})

describe('validate - all import forms detected', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    mkdirSync(join(src, 'components'), { recursive: true })

    // All imports reference missing assets to ensure detection works
    writeFileSync(
      join(src, 'components', 'AllForms.tsx'),
      `
// Default import
import defaultIcon from './default.svg';

// Named import
import { ReactComponent as NamedIcon } from './named.svg';

// Namespace import
import * as nsIcon from './namespace.svg';

// Side-effect import
import './sideeffect.svg';

// Multiline import
import {
  a,
  b
} from './multiline.svg';

// Dynamic import
const dyn = import('./dynamic.svg');

// Require
const req = require('./require.png');

// Export from
export { x } from './export-named.svg';
export * from './export-star.svg';

// new URL pattern
const url = new URL('./newurl.webp', import.meta.url);
`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('detects all missing assets across all import forms', () => {
    const missing = validate(root, src)
    const paths = missing.map(m => m.importPath)

    assert.ok(paths.includes('./default.svg'), 'default import not detected')
    assert.ok(paths.includes('./named.svg'), 'named import not detected')
    assert.ok(paths.includes('./namespace.svg'), 'namespace import not detected')
    assert.ok(paths.includes('./sideeffect.svg'), 'side-effect import not detected')
    assert.ok(paths.includes('./multiline.svg'), 'multiline import not detected')
    assert.ok(paths.includes('./dynamic.svg'), 'dynamic import not detected')
    assert.ok(paths.includes('./require.png'), 'require not detected')
    assert.ok(paths.includes('./export-named.svg'), 'export-from named not detected')
    assert.ok(paths.includes('./export-star.svg'), 'export-from star not detected')
    assert.ok(paths.includes('./newurl.webp'), 'new URL pattern not detected')

    assert.equal(missing.length, 10)
  })
})

describe('validate - relative path resolution', () => {
  let root, src

  beforeEach(() => {
    const project = createTempProject()
    root = project.root
    src = project.src

    // Create nested structure
    mkdirSync(join(src, 'assets'), { recursive: true })
    mkdirSync(join(src, 'components', 'deep', 'nested'), { recursive: true })
    writeFileSync(join(src, 'assets', 'icon.svg'), '<svg></svg>')

    // Deep file uses relative path to reach asset
    writeFileSync(
      join(src, 'components', 'deep', 'nested', 'Widget.tsx'),
      `import icon from '../../../assets/icon.svg';`
    )
  })

  afterEach(() => {
    cleanTempProject(root)
  })

  it('resolves deeply nested relative paths correctly', () => {
    const missing = validate(root, src)
    assert.equal(missing.length, 0)
  })
})
