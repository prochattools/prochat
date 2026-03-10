<!-- GENERATED FILE - DO NOT EDIT -->
---
title: IsMinimalHeaderPath
description: IsMinimalHeaderPath function extracted from src/helpers/chrome-routes.ts.
category: boilerplate
slug: isminimalheaderpath
order: 100
keywords:
  - prokit
  - api
  - isMinimalHeaderPath
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/chrome-routes.ts
generatedAt: 2026-03-10T23:47:09.856Z
---

# IsMinimalHeaderPath

## Overview
Auto-generated API reference for isMinimalHeaderPath.

## Source
- File: `src/helpers/chrome-routes.ts`
- Kind: `function`

## Definition
```ts
export function isMinimalHeaderPath(pathname: string) {
  return MINIMAL_HEADER_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}
```
