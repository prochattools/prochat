# Analytics audit

Status: current lean implementation.

## Provider

ProChat uses Umami for public analytics.

Runtime integration:

- `src/components/UmamiAnalytics.tsx` mounts the script only when both public Umami env values are configured.
- `src/lib/analytics/umami.ts` provides route-agnostic event helpers.
- `src/app/layout.tsx` mounts the analytics component globally.

Required public configuration:

- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`

## Current event call sites

The active repository uses analytics on current lean surfaces only. Event helpers are called from current homepage/product/contact/beta-interest interactions rather than retired Kits or checkout flows.

The implementation intentionally avoids reviving retired checkout, pricing, subscription, or purchase-return events.

## Privacy boundary

Analytics configuration is disclosed on the active `/privacy` page. Do not add a new analytics provider without updating privacy documentation and validating the new data flow.

## Validation

For analytics changes:

1. verify the event has a live source consumer;
2. keep payloads free of secrets or message/contact contents unless explicitly approved;
3. run TypeScript, ESLint, build, and focused browser evidence;
4. verify analytics remains disabled when the two Umami public env values are absent.

## Historical analytics documents

The former Kits/checkout analytics implementation summary is archived under `docs/archive/retired-systems/analytics-implementation-summary.md`. It is historical evidence, not current guidance.
