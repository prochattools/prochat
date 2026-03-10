<!-- GENERATED FILE - DO NOT EDIT -->
---
title: IsFooterlessPath
description: IsFooterlessPath function extracted from src/helpers/chrome-routes.ts.
category: boilerplate
slug: isfooterlesspath
order: 100
keywords:
  - prokit
  - api
  - isFooterlessPath
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/chrome-routes.ts
generatedAt: 2026-03-10T23:47:09.856Z
---

# IsFooterlessPath

## Overview
Auto-generated API reference for isFooterlessPath.

## Source
- File: `src/helpers/chrome-routes.ts`
- Kind: `function`

## Definition
```ts
export function isFooterlessPath(pathname: string) {
  return FOOTERLESS_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}
```
