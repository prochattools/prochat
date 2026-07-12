# ProChat Dependency Audit

**Status:** Phase 5 Task 5.4 inventory complete  
**Inventory date:** 2026-07-12  
**Scope:** direct runtime and development dependencies, package scripts, package consumers, client/build/server boundaries, legacy-only packages, protected operational packages, and unused candidates

## Summary

```yaml
dependencies: 49
dev_dependencies: 22
total_direct_packages: 71
package_json_changed: 0
lockfile_changed: 0
packages_added_updated_or_removed: 0
```

The consumer scan searched current source, scripts, Prisma, and major configuration files for literal package names. Zero detected consumers are candidates only: packages may still be required by framework configuration, TypeScript, PostCSS, CLI scripts, package scripts, transitive tooling, generated code, or deployment.

## Clean-slate policy

- Packages supporting old products, old themes, legacy docs, historical waitlists/newsletters, MailerLite/GitHub/n8n/Make integrations, old payment flows, or old UI should not automatically carry into the new public platform.
- Protected database, auth, admin, commerce, email, analytics, and application dependencies remain until those workflows are explicitly archived or migrated.
- The lean landing-page foundation should keep its browser dependency surface intentionally small.
- No package was installed, updated, removed, or reclassified as safe-to-delete in this task.

## Duplicate and overlapping systems

### Radix

Both individual `@radix-ui/react-*` packages and the umbrella `radix-ui` package are installed. The umbrella package has detected consumers because its name appears in the individual primitives and code references, but exact import style must be verified before deciding consolidation.

### MDX and documentation

The repository includes:

- `@mdx-js/loader`
- `@mdx-js/react`
- `@next/mdx`
- `@types/mdx`
- Nextra
- Nextra Theme Docs

Some MDX packages have zero direct literal consumers while Nextra is active. The final docs architecture should use one clear stack.

### Tooltips

Both Radix Tooltip and `react-tooltip` exist. `react-tooltip` is mounted through providers; Radix Tooltip has a local primitive. Consolidation should follow actual accessibility and docs/application needs.

### Fonts

`@fontsource/jetbrains-mono`, local public TTF files, local Host WOFF2, and `next/font` coexist. Package and asset cleanup must be coordinated with the root font migration and OG generation.

### PDF/export

`html2canvas`, `jspdf`, `html2pdf.js`, `react-to-print`, and `@types/pdfkit` overlap around export/printing. Only `html2canvas` and `jspdf` have direct source consumers. The others require exact script/runtime proof.

### Validation/forms

Formik + Yup serve legacy application forms, while Zod serves Contact and waitlist schemas. The new public form system should prefer one validated server/client contract; protected app forms may remain separate.

### Styling and animation

Sass, Tailwind, Tailwind Animate, Framer Motion, `next-themes`, and legacy CSS systems coexist. GSAP is not installed.

## Protected operational dependencies

Protected until exact migration:

- `next`, `react`, `react-dom`;
- Prisma and PostgreSQL packages;
- Stripe server/client packages;
- Resend and React Email packages;
- Zod for current Contact/waitlist schemas;
- Ax&#105;os HTTP client, Formik, Yup, and toast for legacy application flows;
- New Relic if deployment instrumentation loads it outside static source;
- Nextra while current public docs remain reachable;
- Sass, Tailwind, PostCSS, and Autoprefixer while current styles build;
- TypeScript and Node types;
- package tooling used by scripts, CI, deployment, database, or documentation generation.

Protected means functionally sensitive, not canonical for the future public site.

## Client-heavy packages

Potentially material browser cost:

- Framer Motion;
- `html2canvas`;
- `jspdf`;
- Stripe.js;
- Formik/Yup;
- Nextra and docs runtime;
- React Syntax Highlighter;
- React Tooltip;
- React Responsive Masonry;
- Lucide React where broad imports are not tree-shaken;
- next-themes;
- nextjs-toploader.

Bundle measurement is required before any keep/remove decision.

## Zero-consumer and legacy-only candidates

Zero literal consumers or legacy-only purpose was found for several packages:

- `@mdx-js/loader`
- `@mdx-js/react`
- `@next/mdx`
- `@next/third-parties`
- `form-data`
- `html2pdf.js`
- `newrelic` in scanned source
- `nextjs-toploader`
- `prop-types`
- `react-syntax-highlighter`
- `react-to-print`
- several type/tooling packages whose purpose is configuration or compilation rather than import

Legacy-only or likely archive-bound packages include:

- Framer Motion if no retained micro-interactions remain;
- React Responsive Masonry used only by legacy testimonials;
- MailerLite/GitHub/n8n/Make behavior appears implemented through HTTP or source integrations rather than dedicated direct packages;
- Nextra/MDX stack if legacy docs are archived and new docs use a smaller system;
- PDF/export packages tied to legacy invoice/payment flows;
- Formik/Yup tied to legacy app flows if those flows are archived separately.

No removal is authorized without configuration, scripts, lockfile, build, runtime, and protected-flow proof.

## Package records

| ID | Package | Version/type | Exact consumer or infrastructure purpose | Boundary | Status | Provisional disposition | Wave/risk |
|---|---|---|---|---|---|---|---|
| DEP-001 | `@fontsource/jetbrains-mono` | ^5 runtime | `src/app/layout.tsx` | client/build font | DUPLICATE FONT PATH | REPLACE/REMOVE after root-font migration | 1/8 HIGH |
| DEP-002 | `@mdx-js/loader` | ^2.3 runtime | MDX build tooling; zero literal consumer | build | UNVERIFIED | ARCHIVE/REMOVE if Nextra path does not need it | 6/8 MEDIUM |
| DEP-003 | `@mdx-js/react` | ^2.3 runtime | MDX React integration; zero literal consumer | build/runtime | UNVERIFIED | VERIFY/REMOVE | 6/8 MEDIUM |
| DEP-004 | `@next/mdx` | ^13.5 runtime | Next MDX integration; zero literal consumer | build | VERSION-SKEW/UNVERIFIED | VERIFY/REMOVE | 6/8 HIGH |
| DEP-005 | `@next/third-parties` | ^14.2 runtime | no literal consumer | client/runtime | UNUSED CANDIDATE | REMOVE after proof | 8 LOW |
| DEP-006 | `@prisma/client` | 6.7 runtime | licence, waitlist, admin, Stripe storage, Prisma client | server | PROTECTED | KEEP until data flows migrate | protected CRITICAL |
| DEP-007 | `@radix-ui/react-accordion` | ^1.2 runtime | FAQSection and accordion primitive | client | CURRENT/LEGACY MIX | KEEP/REVIEW | 1/6 MEDIUM |
| DEP-008 | `@radix-ui/react-avatar` | ^1.1 runtime | avatar primitive | client | CURRENT | KEEP | 1 LOW |
| DEP-009 | `@radix-ui/react-dialog` | ^1.1 runtime | dialog and sheet primitives | client | CURRENT | KEEP | 1 HIGH |
| DEP-010 | `@radix-ui/react-navigation-menu` | ^1.2 runtime | navigation-menu primitive | client | ZERO-ACTIVE-CONSUMER CANDIDATE | VERIFY | 1/8 MEDIUM |
| DEP-011 | `@radix-ui/react-slider` | ^1.2 runtime | slider primitive | client | PROTECTED APP | KEEP/VERIFY | protected MEDIUM |
| DEP-012 | `@radix-ui/react-slot` | ^1.1 runtime | canonical button candidate | client | CURRENT | KEEP | 1 HIGH |
| DEP-013 | `@radix-ui/react-switch` | ^1.1 runtime | switch primitive | client | PROTECTED APP | KEEP/VERIFY | protected MEDIUM |
| DEP-014 | `@radix-ui/react-tooltip` | ^1.1 runtime | tooltip primitive | client | DUPLICATE TOOLTIP SYSTEM | KEEP/CONSOLIDATE | 1/8 MEDIUM |
| DEP-015 | `@react-email/components` | ^0.0.25 runtime | seven transactional templates | server/build | PROTECTED | KEEP/REBRAND | protected CRITICAL |
| DEP-016 | `@stripe/stripe-js` | ^4.7 runtime | CheckoutButton, StripeClient | client | PROTECTED COMMERCE | KEEP until commerce decision | protected CRITICAL |
| DEP-017 | Ax&#105;os HTTP client | ^1.7 runtime | chat, scenarios, GPT/API utilities | client/server | PROTECTED LEGACY APP | KEEP/REVIEW | protected HIGH |
| DEP-018 | `class-variance-authority` | ^0.7 runtime | badge, button, navigation, sheet, surface | client/build | CURRENT | KEEP | 1 MEDIUM |
| DEP-019 | `clsx` | ^2.1 runtime | `src/helpers/utils.ts` | client/build | CURRENT | KEEP | 1 LOW |
| DEP-020 | `form-data` | ^4 runtime | zero literal consumer; possible server HTTP use | server | UNUSED CANDIDATE | VERIFY/REMOVE | 8 MEDIUM |
| DEP-021 | `formik` | ^2.4 runtime | chat, Dashboard, Scenarios | client | PROTECTED LEGACY APP | KEEP until app archive/migration | protected HIGH |
| DEP-022 | `framer-motion` | ^12.23 runtime | Reveal, Proof, Newsletter, maintenance, 404 | client | LEGACY MOTION | REMOVE after consumers archive unless re-approved | 3/6/8 HIGH |
| DEP-023 | `html2canvas` | ^1.4 runtime | payment/login and invoice export | client | PROTECTED COMMERCE | KEEP until export decision | protected HIGH |
| DEP-024 | `html2pdf.js` | ^0.10 runtime | zero literal consumer | client | UNUSED CANDIDATE | VERIFY/REMOVE | 8 HIGH |
| DEP-025 | `jspdf` | ^2.5 runtime | payment/login and invoice export | client | PROTECTED COMMERCE | KEEP until export decision | protected HIGH |
| DEP-026 | `lucide-react` | ^0.408 runtime | 41 component consumers | client | CURRENT/LEGACY MIX | KEEP; audit imports | 1/8 HIGH |
| DEP-027 | `newrelic` | ^13.18 runtime | no literal consumer; may load via deployment agent | server | INFRASTRUCTURE UNVERIFIED | VERIFY deployment before removal | protected CRITICAL |
| DEP-028 | `next` | ^14.2.31 runtime | framework across 140 files | server/client/build | CORE | KEEP; no redesign upgrade | protected CRITICAL |
| DEP-029 | `next-themes` | ^0.4 runtime | ThemeToggle and providers | client | LEGACY THEME | REMOVE if public theme is removed and protected consumers migrate | 1/8 HIGH |
| DEP-030 | `nextjs-toploader` | ^1.6 runtime | zero literal consumer | client | UNUSED CANDIDATE | VERIFY/REMOVE | 8 MEDIUM |
| DEP-031 | `nextra` | ^4.6 runtime | docs routes and config | server/client/build | LEGACY DOCS/PROTECTED | KEEP until docs strategy executes | 6/8 HIGH |
| DEP-032 | `nextra-theme-docs` | ^4.6 runtime | docs layout and helpers | client/build | LEGACY DOCS | ARCHIVE/REMOVE after docs replacement | 6/8 HIGH |
| DEP-033 | `pg` | ^8.12 runtime | DB init/cleanup scripts | server/tooling | PROTECTED DATABASE | KEEP | protected CRITICAL |
| DEP-034 | `prop-types` | ^15.8 runtime | zero literal consumer | client | UNUSED CANDIDATE | REMOVE after proof | 8 LOW |
| DEP-035 | `radix-ui` | ^1.0 runtime | overlaps individual Radix primitives | client | DUPLICATE PACKAGE SURFACE | VERIFY imports and consolidate | 1/8 HIGH |
| DEP-036 | `react` | ^18.3 runtime | framework across 142 files | client/server | CORE | KEEP | protected CRITICAL |
| DEP-037 | `react-dom` | ^18.3 runtime | framework peer; zero literal app import expected | client/server | CORE | KEEP | protected CRITICAL |
| DEP-038 | `react-email` | ^3 runtime | seven email templates/tooling | server/build | PROTECTED EMAIL | KEEP/REVIEW duplication with components package | protected HIGH |
| DEP-039 | `react-hot-toast` | ^2.4 runtime | Dashboard, payment, providers, signup/GitHub utility | client | PROTECTED LEGACY APP | KEEP until flows migrate | protected HIGH |
| DEP-040 | `react-responsive-masonry` | ^2.4 runtime | legacy Testimonials only | client | LEGACY SINGLE-CONSUMER | ARCHIVE/REMOVE with testimonials | 8 MEDIUM |
| DEP-041 | `react-syntax-highlighter` | ^15.5 runtime | zero literal consumer | client | UNUSED CANDIDATE | VERIFY/REMOVE | 6/8 HIGH |
| DEP-042 | `react-to-print` | ^2.15 runtime | zero literal consumer | client | UNUSED CANDIDATE | VERIFY/REMOVE | 8 MEDIUM |
| DEP-043 | `react-tooltip` | ^5.26 runtime | providers and tooltip wrapper | client | DUPLICATE TOOLTIP SYSTEM | REPLACE with Radix or justify | 1/8 HIGH |
| DEP-044 | `resend` | ^4 runtime | Contact, waitlist, licence, event/email services | server | PROTECTED EMAIL | KEEP until new mailing/contact architecture | protected CRITICAL |
| DEP-045 | `sass` | ^1.82 runtime | SCSS compiler purpose despite zero literal import | build | CURRENT BUILD | KEEP until legacy SCSS removed | 1/8 HIGH |
| DEP-046 | `stripe` | ^16.12 runtime | 29 commerce, webhook, kit, invoice consumers | server | PROTECTED COMMERCE | KEEP until obligations resolved | protected CRITICAL |
| DEP-047 | `tailwind-merge` | ^2.4 runtime | class utility helper | client/build | CURRENT | KEEP | 1 LOW |
| DEP-048 | `yup` | ^1.4 runtime | chat, Dashboard, Scenarios | client | PROTECTED LEGACY APP | KEEP then archive with legacy forms if unused | protected HIGH |
| DEP-049 | `zod` | ^4.3 runtime | Contact and waitlist schemas | server/client | CURRENT/LEGACY MIX | KEEP for new canonical forms | 6 HIGH |
| DEP-050 | `@next/bundle-analyzer` | ^16.1 dev | `next.config.js`; version newer than Next runtime | build | VERSION-SKEW | KEEP/ALIGN version after audit | 9 HIGH |
| DEP-051 | `@types/jest` | ^29.5 dev | test typing; no test config/consumer found | tooling | UNUSED CANDIDATE | VERIFY/REMOVE or add real tests later | 8 LOW |
| DEP-052 | `@types/mdx` | ^2 dev | MDX type support | tooling | DOCS TOOLING | KEEP until docs decision | 6 MEDIUM |
| DEP-053 | `@types/node` | ^20 dev | TypeScript platform types | tooling | CORE TOOLING | KEEP | protected HIGH |
| DEP-054 | `@types/pdfkit` | ^0.13 dev | no corresponding direct `pdfkit` package found | tooling | ORPHAN TYPE CANDIDATE | VERIFY/REMOVE | 8 MEDIUM |
| DEP-055 | `@types/react` | ^18 dev | React TypeScript types | tooling | CORE TOOLING | KEEP | protected HIGH |
| DEP-056 | `@types/react-dom` | ^18 dev | React DOM TypeScript types | tooling | CORE TOOLING | KEEP | protected HIGH |
| DEP-057 | `@types/react-syntax-highlighter` | ^15.5 dev | paired with zero-consumer runtime package | tooling | UNUSED CANDIDATE | REMOVE with runtime after proof | 6/8 LOW |
| DEP-058 | `@typescript-eslint/eslint-plugin` | ^7.16 dev | ESLint TypeScript integration purpose | tooling | CONFIGURATION PURPOSE | KEEP/VERIFY config | 9 MEDIUM |
| DEP-059 | `@typescript-eslint/parser` | ^7.16 dev | ESLint TypeScript parser purpose | tooling | CONFIGURATION PURPOSE | KEEP/VERIFY config | 9 MEDIUM |
| DEP-060 | `autoprefixer` | ^10.4 dev | `postcss.config.js` | build | CURRENT BUILD | KEEP | 1 MEDIUM |
| DEP-061 | `eslint` | ^8 dev | lint framework/config and directives | tooling | CURRENT TOOLING | KEEP | 9 HIGH |
| DEP-062 | `eslint-config-next` | ^14.2 dev | Next ESLint config purpose | tooling | CURRENT TOOLING | KEEP | 9 HIGH |
| DEP-063 | `husky` | ^9.1 dev | Git hook tooling; zero literal consumer | tooling | UNVERIFIED | VERIFY `.husky` before keep/remove | 8 MEDIUM |
| DEP-064 | `postcss` | ^8.4 dev | CSS build via PostCSS config | build | CURRENT BUILD | KEEP | 1 HIGH |
| DEP-065 | `prisma` | 6.7 dev | schema generation/migrations and DB scripts | server/tooling | PROTECTED DATABASE | KEEP | protected CRITICAL |
| DEP-066 | `tailwindcss` | ^3.4 dev | Tailwind/PostCSS configuration | build | CURRENT BUILD | KEEP | 1 HIGH |
| DEP-067 | `tailwindcss-animate` | ^1.0.7 dev | Tailwind animation plugin | build/client CSS | LEGACY MOTION CANDIDATE | REMOVE if no retained utility consumers | 1/8 MEDIUM |
| DEP-068 | `ts-node` | ^10.9 dev | sitemap script command | tooling | CURRENT SCRIPT | KEEP/REPLACE with tsx later | 9 MEDIUM |
| DEP-069 | `tsconfig-paths` | ^4.2 dev | sitemap script preload | tooling | CURRENT SCRIPT | KEEP/REVIEW | 9 MEDIUM |
| DEP-070 | `tsx` | ^4.21 dev | docs/social/design scripts | tooling | CURRENT TOOLING | KEEP | 9 HIGH |
| DEP-071 | `typescript` | ^5 dev | compiler and docs extraction | tooling | CORE TOOLING | KEEP | protected CRITICAL |

## Package scripts and legacy coupling

Scripts tied to legacy or broad infrastructure include:

- generated social images;
- static sitemap generation;
- automatic provisioning;
- Prisma postinstall and database init/migration;
- design-system linting;
- large documentation generation, extraction, ingestion, AI generation, and restructuring pipeline;
- `docs:clean`, which explicitly removes ProKit, SaaSKit, WaaSKit, and future docs folders.

The scripts prove that zero direct source imports do not imply unused tooling. Each package candidate must be checked against package scripts and configuration before removal.

## Highest-risk dependency findings

1. `@next/bundle-analyzer` major version 16 is installed beside Next 14; compatibility must be verified.
2. MDX packages span Next 13-era packages and Nextra 4 while the application uses Next 14.
3. Both umbrella and individual Radix package surfaces exist.
4. Both Radix Tooltip and React Tooltip exist.
5. PDF/export libraries overlap and may inflate client bundles.
6. Framer Motion remains for legacy pages but the new system plans GSAP later; both must not become competing cinematic systems.
7. Protected Stripe, Prisma, Resend, PostgreSQL, app-form, and analytics packages prevent blind clean-slate package removal.
8. New Relic has no literal source consumer but may be loaded by deployment/runtime configuration.
9. `@types/pdfkit` appears orphaned because `pdfkit` is not a direct dependency.
10. Test typing exists without clearly discoverable component/browser test infrastructure.
11. Current public docs and package scripts are heavily coupled to ProKit/SaaSKit/WaaSKit history.
12. MailerLite, GitHub, n8n, and Make behavior may be implemented through raw HTTP/config rather than direct packages, so package removal alone will not archive those integrations.

## Validation required before package migration

- exact import, dynamic import, config, package-script, generated-code, and deployment search;
- lockfile/transitive review;
- licence and security advisory review using approved current tooling;
- bundle analyzer baseline;
- server/client boundary measurement;
- type check, tests, and production build;
- protected auth/admin/commerce/email/database/application smoke tests;
- zero-consumer proof;
- package and lockfile changes in one bounded rollback-safe commit.

## Unresolved decisions

1. Whether protected internal application functionality is archived wholesale or maintained behind a separate internal boundary.
2. Whether Stripe/licensing remains for previous purchasers after the public platform relaunch.
3. Whether Nextra remains for future documentation.
4. Whether the future mailing-list implementation uses Resend directly or another approved provider.
5. Whether New Relic remains part of production observability.
6. Whether Radix is consolidated to individual packages or the umbrella package.
7. Whether Tooltip, PDF/export, and form-validation systems are consolidated.
8. Which package versions must be upgraded for security independently of redesign.
9. Which documentation scripts remain valuable after legacy docs archive.
10. When Playwright, axe, and GSAP become authorized additions; none are installed now.
