<!-- GENERATED FILE - DO NOT EDIT -->
---
title: IsChromelessPath
description: IsChromelessPath function extracted from src/helpers/chrome-routes.ts.
category: boilerplate
slug: ischromelesspath
order: 100
keywords:
  - prokit
  - api
  - isChromelessPath
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/chrome-routes.ts
generatedAt: 2026-03-10T23:47:09.856Z
---

# IsChromelessPath

## Overview
Auto-generated API reference for isChromelessPath.

## Source
- File: `src/helpers/chrome-routes.ts`
- Kind: `function`

## Definition
```ts
export function isChromelessPath(pathname: string) {
  return CHROMELESS_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}
```
