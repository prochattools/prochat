<!-- GENERATED FILE - DO NOT EDIT -->
---
title: GetActionLabelHtml
description: GetActionLabelHtml function extracted from src/helpers/action-label.tsx.
category: boilerplate
slug: getactionlabelhtml
order: 100
keywords:
  - prokit
  - api
  - getActionLabelHtml
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/action-label.tsx
generatedAt: 2026-03-10T23:47:09.855Z
---

# GetActionLabelHtml

## Overview
Auto-generated API reference for getActionLabelHtml.

## Source
- File: `src/helpers/action-label.tsx`
- Kind: `function`

## Definition
```ts
export function getActionLabelHtml(label: string) {
  const { actionWord, descriptor } = splitFormattedActionLabel(label)

  if (!descriptor) {
    return `<span class="font-semibold text-current">${actionWord}</span>`
  }

  return [
    `<span class="font-semibold text-current">${actionWord}</span>`,
    `<span aria-hidden="true" class="opacity-50"> - </span>`,
    `<span class="opacity-50">${descriptor}</span>`,
  ].join('')
}
```
