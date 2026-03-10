<!-- GENERATED FILE - DO NOT EDIT -->
---
title: FormatOptionalActionLabel
description: FormatOptionalActionLabel function extracted from src/helpers/action-label.tsx.
category: boilerplate
slug: formatoptionalactionlabel
order: 100
keywords:
  - prokit
  - api
  - formatOptionalActionLabel
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/action-label.tsx
generatedAt: 2026-03-10T23:47:09.855Z
---

# FormatOptionalActionLabel

## Overview
Auto-generated API reference for formatOptionalActionLabel.

## Source
- File: `src/helpers/action-label.tsx`
- Kind: `function`

## Definition
```ts
export function formatOptionalActionLabel(label?: string | null) {
  return label ? formatActionLabel(label) : label
}
```
