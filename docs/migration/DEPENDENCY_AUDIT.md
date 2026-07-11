# ProChat Dependency Audit

**Status:** canonical audit specification  
**Scope:** runtime, development, build, styling, animation, UI, analytics, testing, content, and compatibility dependencies

## Purpose

The dependency audit identifies why every package exists, where it is used, what it costs, and whether it remains necessary in the new public platform.

Dependencies are not removed merely because they appear unused in one search, and they are not retained merely because they are familiar.

## Required record

```yaml
id: "DEP-000"
package: ""
version: ""
dependency_type: "runtime | development | optional | peer"
category: "framework | ui | motion | styling | icons | forms | analytics | content | testing | build | compatibility | utility"
current_purpose: ""
consumers: []
server_or_client: "server | client | both | build-only"
bundle_cost: ""
runtime_cost: ""
licence: ""
security_status: ""
maintenance_status: ""
replacement_or_native_alternative: ""
status: "CURRENT | DUPLICATE | LEGACY | UNUSED | RISKY | PLANNED"
disposition: "KEEP | UPDATE | REPLACE | REMOVE | ADD_LATER"
migration_wave: 0
validation: []
rollback: ""
removal_approved: false
owner: ""
notes: ""
```

## Inventory targets

Audit:

- `dependencies`;
- `devDependencies`;
- `peerDependencies`;
- package scripts;
- lockfile versions;
- transitive packages with material bundle or security impact;
- CLI and build tools;
- framework plugins;
- analytics and monitoring packages;
- content-platform packages;
- UI and icon packages;
- motion packages;
- test packages;
- abandoned compatibility packages.

## Initial known areas

### Framework and rendering

- Next.js;
- React;
- TypeScript.

The public-platform program does not authorize a framework upgrade. Audit current compatibility and security separately from redesign work.

### Styling

- Tailwind CSS;
- Sass;
- class utilities;
- any CSS-in-JS or theme packages.

Retain multiple styling tools only where their responsibilities remain clear.

### UI and icons

- Radix UI packages;
- class-variance-authority;
- Lucide React;
- duplicated icon or component libraries.

### Motion

- Framer Motion currently exists;
- GSAP and `@gsap/react` are planned only for the approved motion-prototype phase;
- smooth-scroll libraries are not approved;
- Three.js, Rive, Lottie, and similar systems are not approved foundational dependencies.

### Testing

- current test stack;
- Playwright planned for browser and visual testing;
- `@axe-core/playwright` planned for accessibility checks;
- duplicate browser or screenshot tooling.

### Content, forms, analytics, and integrations

Audit current providers, SDKs, scripts, data collection, privacy implications, and whether public pages still require them.

## Decision questions

For every package, answer:

1. What user or development value does it provide?
2. Which exact files import or invoke it?
3. Is it required at runtime, build time, or only in development?
4. Does the platform or browser provide a simpler alternative?
5. Is another installed package solving the same responsibility?
6. What is the client bundle cost?
7. Does it create accessibility or performance risk?
8. Is the licence compatible?
9. Is it actively maintained and secure?
10. What breaks if it is removed?
11. What validation proves removal is safe?

## Addition policy

Before adding a package, document:

- approved task and phase;
- problem being solved;
- alternatives considered;
- expected imports and consumers;
- bundle and runtime cost;
- browser support;
- accessibility impact;
- licence;
- maintenance owner;
- rollback and removal plan.

Do not install planned animation or testing dependencies during documentation-only or static-design work.

## Removal policy

1. Search direct imports and dynamic imports.
2. Search scripts, config, generated code, and runtime references.
3. Identify transitive dependency implications.
4. Remove usage or migrate consumers.
5. Remove package and update lockfile in the same bounded task.
6. Run type check, tests, build, browser checks, and bundle review.
7. Verify no configuration or deployment path still expects it.
8. Commit package and consumer changes together when rollback remains clear.

## Framer Motion decision boundary

Do not remove Framer Motion merely because GSAP is introduced.

Required sequence:

- audit all Framer Motion consumers;
- retain existing valid micro-interactions during migration;
- prevent new cinematic work from using it when GSAP is approved;
- migrate or remove consumers deliberately;
- remove the package only after a separate zero-consumer proof.

## Planned GSAP boundary

GSAP may be added only after:

- static hero approval;
- named motion states;
- reduced-motion design;
- approved implementation task;
- bundle and licence review;
- proof-of-concept acceptance.

## Security and licence review

Record:

- licence identifier;
- source repository;
- maintenance activity;
- known advisories;
- supply-chain considerations;
- whether the package executes during build or deployment;
- whether it processes user or repository data;
- whether it introduces external network behavior.

## Validation

- import search;
- package-script review;
- lockfile review;
- type check;
- unit and integration tests;
- production build;
- browser tests;
- bundle report;
- runtime smoke test;
- security audit using approved tooling;
- licence review;
- zero-consumer proof before removal.

## Completion criteria

- every direct dependency has a documented purpose and owner;
- duplicate or obsolete packages have migration decisions;
- planned packages are added only in authorized phases;
- runtime client dependencies remain intentionally small;
- removed packages have zero-consumer and build evidence;
- no dependency silently adds external data transfer, inaccessible behavior, or unbudgeted client cost.
