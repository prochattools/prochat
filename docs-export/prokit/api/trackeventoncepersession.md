<!-- GENERATED FILE - DO NOT EDIT -->
---
title: TrackEventOncePerSession
description: TrackEventOncePerSession function extracted from src/lib/analytics/umami.ts.
category: boilerplate
slug: trackeventoncepersession
order: 100
keywords:
  - prokit
  - api
  - trackEventOncePerSession
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/analytics/umami.ts
generatedAt: 2026-03-10T23:47:09.849Z
---

# TrackEventOncePerSession

## Overview
Auto-generated API reference for trackEventOncePerSession.

## Source
- File: `src/lib/analytics/umami.ts`
- Kind: `function`

## Definition
```ts
export function trackEventOncePerSession(
  name: AnalyticsEventName,
  key: string,
  payload: AnalyticsPayload = {},
) {
  if (!isBrowser()) return

  try {
    const storageKey = getStorageKey(key)
    if (window.sessionStorage.getItem(storageKey)) {
      return
    }

    trackEvent(name, payload)
    window.sessionStorage.setItem(storageKey, '1')
  } catch {
    trackEvent(name, payload)
  }
}
```
