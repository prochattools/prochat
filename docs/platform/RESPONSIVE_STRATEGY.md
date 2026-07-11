# ProChat Responsive Strategy

**Status:** canonical repository-local responsive guidance

## Principle

Responsive design is not desktop compression. Each page and product story must be intentionally composed for mobile, tablet, and desktop.

## Breakpoint roles

```yaml
mobile: "320–767px"
tablet: "768–1023px"
desktop: "1024px and above"
wide: "1440px and above"
```

Use content-driven breakpoints when components fail before these ranges.

## Mobile first

Start with:

- semantic content order;
- one dominant idea per viewport;
- readable product details;
- normal scrolling;
- touch-friendly controls;
- stable CTA placement;
- minimal simultaneous animation.

Then enhance for wider compositions.

## Typography

- Use fluid `clamp()` scales.
- Preserve deliberate line breaks only when they remain stable across target widths.
- Avoid headings wider than the viewport or body text below readable size.
- Technical metadata must not shrink below the approved minimum; reflow or disclose details instead.

## Product visuals

### Desktop

- pinned chapters permitted;
- layered canvases permitted;
- details may remain visible simultaneously;
- controlled overlap is allowed.

### Tablet

- reduce pin duration;
- simplify overlap;
- preserve visible record anatomy;
- use two-column layouts only when both columns remain readable.

### Mobile

- no long pinned sequences;
- one state or step per scene;
- no scaled desktop dashboard;
- collapse secondary metadata behind accessible disclosure only when necessary;
- keep the primary state, source, scope, and action visible;
- prohibit horizontal page scrolling.

## Navigation

- Mobile navigation must be keyboard accessible and focus managed.
- Primary CTA remains visible without crowding the header.
- Do not duplicate full desktop navigation inside the page body.

## Forms

- Single-column mobile layout.
- Labels above fields.
- Correct input types and autofill.
- Clear inline errors.
- Submit state remains visible when the keyboard is open.

## Legal and documentation pages

- Sticky table of contents may become an in-flow disclosure on mobile.
- Tables require responsive alternatives rather than tiny text.
- Long URLs and code wrap safely.

## Testing widths

```text
320
360
390
430
768
1024
1280
1440
1728
```

Also test zoom, orientation change, dynamic browser bars, and text expansion.

## Acceptance

A page passes when mobile preserves the same product truth and conversion purpose without depending on desktop-only density, pinning, hover, or side-by-side comparison.
