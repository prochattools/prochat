<!-- GENERATED FILE - DO NOT EDIT -->
---
title: IsFullscreenPath
description: IsFullscreenPath function extracted from src/helpers/chrome-routes.ts.
category: boilerplate
slug: isfullscreenpath
order: 100
keywords:
  - prokit
  - api
  - isFullscreenPath
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/chrome-routes.ts
generatedAt: 2026-03-10T23:47:09.856Z
---

# IsFullscreenPath

## Overview
Auto-generated API reference for isFullscreenPath.

## Source
- File: `src/helpers/chrome-routes.ts`
- Kind: `function`

## Definition
```ts
export function isFullscreenPath(pathname: string) {
  return FULLSCREEN_ROUTES.some(route => pathname === route)
}
```
