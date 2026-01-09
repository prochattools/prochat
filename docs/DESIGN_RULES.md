# Design Rules

## Source of truth
- The home page is canonical: `src/app/page.tsx` (MarketingApp) and its imported sections under `src/app/marketing-ai-studio/components/sections/`.
- Shared layout is canonical: `src/app/layout.tsx` + `src/components/AppShell.tsx` + `src/app/marketing-ai-studio/components/layout/`.

## Do
- Reuse existing section components or their exact patterns from the home page.
- Reuse motion wrappers already in the system (`Reveal`, `Scaffolding`, existing `motion` usage).
- Keep all typography, colors, spacing, and animations exactly as defined in existing sections.
- Ensure dark mode works via existing `dark:` classes and theme provider.
- Preserve semantic HTML and accessibility (headings, lists, labels, focus rings).

## Do not
- Do not add new headers or footers.
- Do not add new fonts or font stacks.
- Do not add or edit global CSS, tokens, or color palettes.
- Do not add new animation systems or one-off motion styles.
- Do not introduce new section archetypes or layouts.
- Do not use inline styles for new UI (use existing Tailwind classes from current patterns).

## Accessibility basics
- Maintain readable contrast in both light and dark mode.
- Do not remove focus states; keep interactive elements keyboard accessible.
- Provide alt text and aria labels where needed.

## Content tone
- System-first, evidence-based, no hype.
- Avoid revenue claims, growth claims, or unverifiable outcomes.

## New pages
- Use App Router: add pages under `src/app/<route>/page.tsx`.
- Pages must inherit `AppShell` (no custom layout unless required by existing structure).
- Use the same `main` wrapper conventions as the home page when matching visual language.
