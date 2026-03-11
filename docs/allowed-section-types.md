# Allowed Section Types

Only the section components used on the home page are allowed. These live under `src/app/(marketing)/components/sections/` and are composed in `src/app/(marketing)/App.tsx`.

## Hero
- Path: `src/app/(marketing)/components/sections/Hero.tsx`
- Reuse: Use the component directly; it accepts props for headline, subhead, CTA labels/links, and micro-proof.
- Must not change: Layout, typography scale, CTA styling, motion timing, or background spotlight.

## ProblemSolution
- Path: `src/app/(marketing)/components/sections/ProblemSolution.tsx`
- Reuse: Use as-is or pass `title`, `bullets`, and optional `closingLine` to swap copy.
- Must not change: Split layout, card styling, and icon/bullet styling.

## Principle
- Path: `src/app/(marketing)/components/sections/Principle.tsx`
- Reuse: Centered, text-forward section with Reveal-wrapped heading and body.
- Must not change: Typography scale, spacing, and border treatment.

## ShipFast
- Path: `src/app/(marketing)/components/sections/ShipFast.tsx`
- Reuse: Loop/steps grid pattern with numbered cards. Copy can be overridden via `heading`, `subhead`, `steps`, and optional `supportingCopy`.
- Must not change: Step card styling, connector line behavior, and Reveal timing.

## Features
- Path: `src/app/(marketing)/components/sections/Features.tsx`
- Reuse: Grid of `BlueprintCard` feature blocks.
- Must not change: Card styling, icon container styling, and hover effects.

## RoutingTiles
- Path: `src/app/(marketing)/components/sections/RoutingTiles.tsx`
- Reuse: Three-tile entry-point grid.
- Must not change: Tile layout, typography hierarchy, and link styling.

## Proof (Expansions)
- Path: `src/app/(marketing)/components/sections/Expansions.tsx`
- Reuse: Screenshot/mockup grid using `BlueprintCard` and `Visuals` mockups. Copy can be overridden via `title` and `description`. CTA can be hidden with `showCta={false}`.
- Must not change: Grid layout, card padding, and label treatment.

## Trust
- Path: `src/app/(marketing)/components/sections/Trust.tsx`
- Reuse: Centered text + bullet list block with Reveal. Copy can be overridden via `heading`, `bullets`, and optional `disclaimer`. CTA can be hidden by passing empty `ctaLabel`/`ctaHref`.
- Must not change: List styling and spacing.

## SystemApply
- Path: `src/app/(marketing)/components/sections/SystemApply.tsx`
- Reuse: Dark CTA band with grid background and two buttons.
- Must not change: Background treatment, typography, and button styles.

## FAQ
- Path: `src/app/(marketing)/components/sections/FAQ.tsx`
- Reuse: Accordion list with Reveal.
- Must not change: Accordion animation, card styling, and icon treatment.

## FinalCTA
- Path: `src/app/(marketing)/components/sections/FinalCTA.tsx`
- Reuse: Centered CTA section with two buttons. Copy and links can be overridden via `heading`, `subhead`, and CTA labels/links.
- Must not change: Typography scale, button styling, and spacing.
