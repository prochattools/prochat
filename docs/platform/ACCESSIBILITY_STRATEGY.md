# ProChat Accessibility Strategy

**Status:** canonical repository-local accessibility program  
**Minimum target:** WCAG 2.2 AA

## Principle

Accessibility is designed and validated throughout research, content, design, prototyping, implementation, review, and maintenance.

## Content

- Use direct language and descriptive headings.
- Link text must identify the destination.
- Instructions do not depend on position, shape, or color alone.
- Legal and technical content remains readable and structured.

## Semantics

- Preserve logical heading hierarchy.
- Use native landmarks, buttons, links, forms, lists, tables, and disclosures.
- Keep DOM order aligned with reading and focus order, including pinned layouts.
- Product visuals require accessible summaries and visible state labels.

## Keyboard and focus

- All interactive elements are keyboard operable.
- Focus is visible against every surface.
- Focus does not enter hidden or transformed-away controls.
- Dialogs and mobile navigation manage focus and Escape correctly.
- Skip navigation is available.

## Color and contrast

- Normal text: at least 4.5:1.
- Large text: at least 3:1.
- Meaningful UI and graphical objects: at least 3:1.
- Status never relies on color alone.
- Muted text remains readable at its actual size and context.

## Motion

At `prefers-reduced-motion: reduce`:

- remove pinning;
- remove scrubbed object travel;
- remove parallax and large zoom;
- stop autoplay loops;
- show static or stepwise states;
- preserve every product conclusion and CTA.

Avoid flashing, rapid repeated movement, large multi-axis depth movement, and motion that blocks reading.

## Forms

- Every input has a persistent visible label.
- Required and optional status is explicit.
- Errors identify the field and corrective action.
- Success and failure are announced.
- Do not ask for unnecessary data.
- Use appropriate autocomplete and input modes.

## Product visualisations

- Do not place essential content only in canvas.
- SVG connectors supplement semantic HTML content.
- Each named state has an `ariaSummary` or equivalent accessible description.
- Interactive diagrams provide a non-interactive readable alternative.

## Zoom, reflow, and text

- Support 200% zoom without content loss.
- Support narrow reflow without horizontal page scrolling.
- Do not truncate critical copy.
- Code, paths, and tables wrap or provide accessible scrolling regions.

## Testing

Automated:

- Playwright;
- `@axe-core/playwright`;
- contrast checks;
- accessibility-tree snapshots for critical components.

Manual:

- keyboard-only walkthrough;
- screen-reader review of critical paths;
- reduced-motion review;
- 200% zoom;
- touch target review;
- mobile orientation;
- form errors and success;
- browser high-contrast behavior where available.

## Release gate

No public page launches with critical or serious accessibility findings, incomplete keyboard flows, inaccessible product meaning, or a broken reduced-motion experience.
