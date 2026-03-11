# Analytics Audit

## Current Umami integration
- Base script injection already exists in `src/app/layout.tsx` via `src/components/UmamiAnalytics.tsx`.
- Public env setup uses `NEXT_PUBLIC_UMAMI_SCRIPT_URL` plus `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- The script is rendered once in the root layout head as a deferred Umami script tag.
- The website ID should match the Umami property configured for ProChat.

## Current analytics layer
- Tracking is centralized in `src/utils/analytics.ts` and implemented in `src/lib/analytics/umami.ts`.
- The helper uses `window.umami.track(...)` only and queues early events briefly until the tracker is available.
- Event usage is fragmented:
  - `explore_kits_click`
  - `kit_view`
  - `cta_click`
  - `checkout_start`
  - `proof_view`
  - `contact_submit`
  - `blog_cta_click`

## Existing tracked flows
- Global header CTA:
  - `src/components/Header.tsx`
- Product page CTAs and checkout starts:
  - `src/app/kits/prokit/ProKitPageContent.tsx`
  - `src/app/kits/saaskit/SaaSkitPageContent.tsx`
- Contact form success:
  - `src/app/(marketing)/contact/page.tsx`
- Blog CTA clicks:
  - `src/components/ContextualLinkCta.tsx`
  - blog pages that pass analytics props into it
- Proof page custom view/click events:
  - `src/app/proof/ProofPageContent.tsx`
- Outbound bridge CTA:
  - `src/app/waas/accountants/page.tsx`

## High-value funnel points found

### Lead magnet / starting point
- Page: `src/app/starting-point/page.tsx`
- Form: `src/app/starting-point/_components/StartSignupForm.tsx`
- API: `src/app/api/mailerlite/subscribe/route.ts`
- Notes:
  - This is a strong acquisition funnel.
  - The current flow delivers by email, not direct in-app PDF download.
  - `lead_magnet_download` is not currently observable from the product code and should not be fabricated.

### Waitlist
- Page and UI:
  - `src/app/waiting-list/WaitlistPageMarkup.tsx`
  - `src/app/waiting-list/WaitingListBody.tsx`
- API:
  - `src/app/api/waitlist/route.ts`
- Notes:
  - This is now a multi-product waitlist for `uxkit`, `waaskit`, and `prochat-os`.
  - Product selection is meaningful context and should be tracked.

### Product / pricing / checkout intent
- SaaSKit page:
  - `src/app/kits/saaskit/SaaSkitPageContent.tsx`
- ProKit page:
  - `src/app/kits/prokit/ProKitPageContent.tsx`
- Checkout client:
  - `src/helpers/checkout.ts`
- Checkout creation API:
  - `src/app/api/stripe/create-checkout/route.ts`
- Checkout success / entitlement page:
  - `src/app/kits/_components/KitAccessFinishClient.tsx`
  - `src/app/kits/prokit/finish/page.tsx`
  - `src/app/kits/saaskit/finish/page.tsx`
- Notes:
  - `checkout_start` is already partially tracked.
  - `checkout_success` should be tracked from the finish pages.
  - Product values are available safely from config / kit page metadata and can be included.

### Contact / sales intent
- Page:
  - `src/app/(marketing)/contact/page.tsx`
- Markup:
  - `src/app/(marketing)/contact/ContactPageMarkup.tsx`
- Notes:
  - Contact form success is already tracked.
  - This is a strong high-intent lead event and should remain.

### Content intent
- Blog CTA component:
  - `src/components/ContextualLinkCta.tsx`
- Blog pages:
  - `src/app/blog/page.tsx`
  - `src/components/blog/ArticleLayout.tsx`
- Notes:
  - Existing `blog_cta_click` is useful and already high-signal.
  - No need to track low-signal article interactions.

## Current problems
- One script injection point exists, which is good.
- The website ID is stale.
- Env naming is slightly inconsistent in the legacy setup.
- Event taxonomy is fragmented and too generic in places:
  - `cta_click`
  - `kit_view`
  - `proof_view`
- Some meaningful funnels have no tracking:
  - lead magnet view / submit / success
  - waitlist view / submit / success
  - pricing section views
  - checkout success
  - checkout cancel

## Recommended lean event map

### Acquisition / lead generation
- `lead_magnet_view`
- `lead_magnet_submit`
- `lead_magnet_success`

### Waitlist
- `waitlist_view`
- `waitlist_submit`
- `waitlist_success`

### Commercial intent
- `nav_cta_click`
- `product_cta_click`
- `pricing_view`
- `checkout_start`
- `checkout_success`
- `checkout_cancel`

### Sales intent
- `contact_submit`

### Content intent
- `blog_cta_click`

## Payload guidance
- Keep payloads small and operational:
  - `product`
  - `location`
  - `source_page`
  - `products` (comma-separated for waitlists where multiple selections are allowed)
  - `value`
  - `currency`
- Avoid over-encoding session data or user identity.

## Files likely to change
- `src/components/UmamiAnalytics.tsx`
- `src/app/layout.tsx`
- `src/utils/analytics.ts`
- `src/app/system/events/EventTaxonomyContent.tsx`
- `src/app/starting-point/_components/StartSignupForm.tsx`
- `src/app/waiting-list/WaitingListBody.tsx`
- `src/app/(marketing)/contact/page.tsx`
- `src/components/Header.tsx`
- `src/components/ContextualLinkCta.tsx`
- `src/app/proof/ProofPageContent.tsx`
- `src/helpers/checkout.ts`
- `src/app/kits/prokit/ProKitPageContent.tsx`
- `src/app/kits/saaskit/SaaSkitPageContent.tsx`
- `src/app/kits/_components/KitAccessFinishClient.tsx`
- `src/app/api/stripe/create-checkout/route.ts`
- `.env.example`
- `docs/getting-started.md`
- `docs/environment.md`

## Implementation recommendation
- Keep one global Umami script injection point.
- Add a small typed analytics helper as the source of truth.
- Re-export from the legacy helper path if needed to avoid broad churn.
- Normalize existing business events rather than adding more.
- Track only meaningful funnel step entry, submits, completions, and core CTA intent.
