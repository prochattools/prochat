<!-- GENERATED FILE - DO NOT EDIT -->
---
title: TrackEvent
description: TrackEvent function extracted from src/lib/analytics/umami.ts.
category: boilerplate
slug: trackevent
order: 100
keywords:
  - prokit
  - api
  - trackEvent
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/analytics/umami.ts
generatedAt: 2026-03-10T23:47:09.849Z
---

# TrackEvent

## Overview
Auto-generated API reference for trackEvent.

## Source
- File: `src/lib/analytics/umami.ts`
- Kind: `function`

## Definition
```ts
export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (!isBrowser()) return

  const umami = getUmamiTracker()
  if (typeof umami?.track === 'function') {
    sendToUmami(umami, name, payload)
    flushPendingEvents()
    return
  }

  pendingEvents.push({ name, payload })
  scheduleFlush()

  if (isDev) {
    console.debug('[umami:queued]', name, payload)
  }
}
```
