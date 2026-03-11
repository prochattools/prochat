#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CODE_DIRS = ['src', 'scripts', 'prisma', 'components', 'instructions', 'types'];
const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'content/docs']);

const envNames = new Set();
const ALLOWED_EXTENSIONS = ['.js', '.ts', '.tsx', '.jsx', '.mjs', '.cjs'];

function collectFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const codeFiles = CODE_DIRS.flatMap((dir) => {
  const abs = path.join(process.cwd(), dir);
  if (!fs.existsSync(abs)) return [];
  return collectFiles(abs);
});

const dotEnvRegex = /process\.env\.([A-Za-z0-9_]+)/g;
const bracketEnvRegex = /process\.env\[['"]([A-Za-z0-9_]+)['"]\]/g;

for (const filePath of codeFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matchEnv = (regex) => {
    let match;
    while ((match = regex.exec(content))) {
      envNames.add(match[1].toUpperCase());
    }
  };
  matchEnv(dotEnvRegex);
  matchEnv(bracketEnvRegex);
}

if (envNames.size === 0) {
  console.log('⚠️  No environment variables detected in code.');
  process.exit(0);
}

const docContent = fs.readFileSync(
  path.join(process.cwd(), 'docs', 'environment.md'),
  'utf8'
);
const docVars = new Set();
const docRegex = /`([A-Z0-9_]+)`/g;
let docMatch;
while ((docMatch = docRegex.exec(docContent))) {
  docVars.add(docMatch[1]);
}

const missing = [...envNames].filter((env) => !docVars.has(env));

if (missing.length > 0) {
  console.error('Missing environment documentation:');
  missing.sort().forEach((name) => console.error(name));
  process.exit(1);
}

console.log('✅ Environment documentation is synchronized.');
