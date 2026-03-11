# Analytics Implementation Summary

## Files changed
- `.env.example`
- `docs/getting-started.md`
- `docs-public/environment.md`
- `docs/analytics-audit.md`
- `src/components/UmamiAnalytics.tsx`
- `src/lib/analytics/umami.ts`
- `src/utils/analytics.ts`
- `src/app/starting-point/_components/StartSignupForm.tsx`
- `src/app/waiting-list/WaitingListBody.tsx`
- `src/app/(marketing)/contact/page.tsx`
- `src/components/Header.tsx`
- `src/components/ContextualLinkCta.tsx`
- `src/components/TrackedOutboundLink.tsx`
- `src/app/waas/accountants/page.tsx`
- `src/app/proof/ProofPageContent.tsx`
- `src/app/kits/prokit/ProKitPageContent.tsx`
- `src/app/kits/saaskit/SaaSkitPageContent.tsx`
- `src/app/kits/_components/KitAccessFinishClient.tsx`
- `src/app/api/stripe/create-checkout/route.ts`
- `src/app/system/events/EventTaxonomyContent.tsx`

## Umami base integration
- Global script injection remains centralized in `src/app/layout.tsx` through `src/components/UmamiAnalytics.tsx`.
- Public env contract is now:
  - `NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://umami.prochat.tools/script.js`
  - `NEXT_PUBLIC_UMAMI_WEBSITE_ID=5ceba17d-4125-4a75-a1f6-9add5c4b1803`
- Legacy script URL alias usage was removed from the runtime component to keep one canonical public configuration path.

## Final event taxonomy
- `lead_magnet_view`
- `lead_magnet_submit`
- `lead_magnet_success`
- `waitlist_view`
- `waitlist_submit`
- `waitlist_success`
- `nav_cta_click`
- `product_cta_click`
- `pricing_view`
- `checkout_start`
- `checkout_success`
- `checkout_cancel`
- `contact_submit`
- `blog_cta_click`
- `outbound_funnel_click`

## Event locations

### Lead magnet
- `lead_magnet_view` — `src/app/starting-point/_components/StartSignupForm.tsx`
- `lead_magnet_submit` — `src/app/starting-point/_components/StartSignupForm.tsx`
- `lead_magnet_success` — `src/app/starting-point/_components/StartSignupForm.tsx`

### Waitlist
- `waitlist_view` — `src/app/waiting-list/WaitingListBody.tsx`
- `waitlist_submit` — `src/app/waiting-list/WaitingListBody.tsx`
- `waitlist_success` — `src/app/waiting-list/WaitingListBody.tsx`

### Navigation / CTA intent
- `nav_cta_click` — `src/components/Header.tsx`
- `product_cta_click` — `src/app/kits/prokit/ProKitPageContent.tsx`
- `product_cta_click` — `src/app/kits/saaskit/SaaSkitPageContent.tsx`
- `product_cta_click` — `src/app/proof/ProofPageContent.tsx`

### Pricing / checkout
- `pricing_view` — `src/app/kits/prokit/ProKitPageContent.tsx`
- `pricing_view` — `src/app/kits/saaskit/SaaSkitPageContent.tsx`
- `checkout_start` — `src/app/kits/prokit/ProKitPageContent.tsx`
- `checkout_start` — `src/app/kits/saaskit/SaaSkitPageContent.tsx`
- `checkout_success` — `src/app/kits/_components/KitAccessFinishClient.tsx`
- `checkout_cancel` — `src/app/kits/prokit/ProKitPageContent.tsx`
- `checkout_cancel` — `src/app/kits/saaskit/SaaSkitPageContent.tsx`

### Contact / content / outbound
- `contact_submit` — `src/app/(marketing)/contact/page.tsx`
- `blog_cta_click` — `src/components/ContextualLinkCta.tsx`
- `outbound_funnel_click` — `src/components/TrackedOutboundLink.tsx`
- `outbound_funnel_click` — `src/app/waas/accountants/page.tsx`

## Caveats
- There is no reliable in-app `lead_magnet_download` event because the Starting Point asset is delivered via email, not immediate browser download.
- `checkout_cancel` is inferred from the Stripe cancel return URL and fires once per session on the relevant kit page.
- `checkout_success` is tracked on the kit finish page when a Stripe session ID is present. This measures completed purchase return, not GitHub access completion.

## Verification
1. Confirm envs are set:
   - `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
   - `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
2. Open the site and verify one Umami script tag is present in the document head.
3. In Umami live view, verify:
   - `lead_magnet_*` by submitting `/starting-point`
   - `waitlist_*` by submitting the roadmap waitlist
   - `checkout_start` on kit pricing CTA click
   - `checkout_success` on `/kits/<product>/finish?session_id=...`
   - `checkout_cancel` by cancelling from Stripe and returning to a kit page
   - `contact_submit` on successful `/contact` submission
   - `blog_cta_click` from blog footer CTAs

## Recommended follow-up
- If the Starting Point delivery flow later becomes a direct browser download, add `lead_magnet_download` at the final download click only.
- If server-side revenue confirmation becomes available from a webhook-backed post-purchase state, reconcile client `checkout_success` with authoritative backend revenue reporting rather than expanding frontend payload complexity.
