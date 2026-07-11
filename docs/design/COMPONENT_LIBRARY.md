# ProChat Component Library Contract

**Status:** canonical production-component specification

## Purpose

This document defines how approved design-lab primitives become reusable production components.

## Component classes

### Foundations

- typography;
- button;
- link;
- input;
- textarea;
- select;
- checkbox;
- status label;
- divider;
- surface;
- container;
- section shell.

### Navigation and platform

- header;
- mobile navigation;
- footer;
- breadcrumb;
- table of contents;
- page hero;
- CTA group;
- contact form;
- legal metadata;
- error state.

### Product visuals

Use the primitives defined in `docs/design/PRODUCT_VISUAL_LIBRARY.md`.

## Required documentation per component

```yaml
component:
  purpose: ""
  permitted_uses: []
  prohibited_uses: []
  props_or_schema: []
  states: []
  content_guidance: []
  responsive_behavior: ""
  keyboard_behavior: ""
  screen_reader_behavior: ""
  reduced_motion_behavior: ""
  visual_tests: []
  functional_tests: []
  migration_notes: []
```

## API principles

- Prefer semantic prop names tied to product meaning.
- Avoid styling-only APIs that expose arbitrary color, radius, or shadow choices.
- Use variants only for documented semantic roles.
- Keep content separate from animation timelines.
- Keep visual states representable without JavaScript animation.
- Use composition where a component would otherwise gain many unrelated flags.

## State completeness

Interactive components must define:

- default;
- hover;
- focus-visible;
- active;
- disabled;
- loading;
- success where applicable;
- error where applicable.

Product components must define every canonical product state, including rejected, blocked, conflict, or retired states where relevant.

## Responsiveness

Components must not rely on page-level emergency CSS to become usable on mobile.

Each component defines:

- minimum readable width;
- wrapping behavior;
- stacking behavior;
- detail reduction rules;
- touch-target behavior;
- overflow behavior.

## Accessibility

- Use native elements before custom interaction.
- Preserve logical DOM and focus order.
- Provide visible labels and state text.
- Never use color alone.
- Keep touch targets at least 44×44 CSS pixels where practical.
- Respect reduced motion.
- Test at 200% zoom.

## Performance

- Avoid components that start observers or animation timelines when static.
- Lazy-load heavy product stories below the fold.
- Do not bundle prototype controls into production.
- Prefer CSS and SVG over video or canvas for essential visuals.

## Promotion and deprecation

Promotion:

```text
prototype
→ reviewed candidate
→ documented production component
→ tested shared component
```

Deprecation:

```text
mark deprecated
→ identify consumers
→ provide replacement
→ migrate consumers
→ verify
→ remove in isolated commit
```

## Ownership rule

A production component has one canonical implementation. Page-local copies are temporary and require a migration task.
