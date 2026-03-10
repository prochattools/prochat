<!-- GENERATED FILE - DO NOT EDIT -->
---
title: FormatActionLabel
description: FormatActionLabel function extracted from src/helpers/action-label.tsx.
category: boilerplate
slug: formatactionlabel
order: 100
keywords:
  - prokit
  - api
  - formatActionLabel
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/action-label.tsx
generatedAt: 2026-03-10T23:47:09.854Z
---

# FormatActionLabel

## Overview
Auto-generated API reference for formatActionLabel.

## Source
- File: `src/helpers/action-label.tsx`
- Kind: `function`

## Definition
```ts
export function formatActionLabel(label: string): string {
  const normalized = label
    .replace(/[→←↗↘↙↖]/g, ' ')
    .replace(/\s*[—–-]+\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!normalized) return label

  const [actionWord, ...descriptorWords] = normalized.split(' ')
  if (!actionWord) return label

  const descriptor = descriptorWords.join(' ').trim()
  return descriptor
    ? `${actionWord.toUpperCase()} - ${descriptor.toUpperCase()}`
    : actionWord.toUpperCase()
}
```
