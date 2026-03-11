#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const docDir = path.join(root, 'docs');

function readLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /\[.*?\]\((?!https?:\/\/)([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(content))) {
    const target = match[1].split('#')[0].trim();
    if (!target) continue;
    if (target.includes('/docs/') && target.endsWith('.md')) {
      links.push({ source: filePath, target });
    }
  }
  return links;
}

const filesToScan = [path.join(root, 'README.md')]
  .concat(
    fs.readdirSync(docDir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(docDir, file))
  );

const missingLinks = [];

for (const filePath of filesToScan) {
  const relDir = path.dirname(path.relative(root, filePath));
  const links = readLinks(filePath);
  for (const { target, source } of links) {
    let resolved;
    if (target.startsWith('/docs/')) {
      resolved = path.join(root, target.replace(/^\//, ''));
    } else {
      resolved = path.resolve(path.join(root, relDir), target);
    }
    if (!fs.existsSync(resolved)) {
      missingLinks.push({ source, target, resolved });
    }
  }
}

if (missingLinks.length > 0) {
  console.error('Broken documentation links found:');
  missingLinks.forEach(({ source, target }) => {
    console.error(`${source} -> ${target}`);
  });
  process.exit(1);
}

console.log('✅ Documentation links are valid.');
