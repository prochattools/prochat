<!-- GENERATED FILE - DO NOT EDIT -->
---
title: RenderActionLabel
description: RenderActionLabel function extracted from src/helpers/action-label.tsx.
category: boilerplate
slug: renderactionlabel
order: 100
keywords:
  - prokit
  - api
  - renderActionLabel
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/action-label.tsx
generatedAt: 2026-03-10T23:47:09.854Z
---

# RenderActionLabel

## Overview
Auto-generated API reference for renderActionLabel.

## Source
- File: `src/helpers/action-label.tsx`
- Kind: `function`

## Definition
```ts
export function renderActionLabel(label: string) {
  const { actionWord, descriptor } = splitFormattedActionLabel(label)

  return (
    <span className={BUTTON_LABEL_CLASS_NAME}>
      <span className="font-semibold text-current">{actionWord}</span>
      {descriptor ? (
        <>
          <span aria-hidden="true" className="opacity-70">
            {' - '}
          </span>
          <span className="opacity-70">{descriptor}</span>
        </>
      ) : null}
    </span>
  )
}
```
