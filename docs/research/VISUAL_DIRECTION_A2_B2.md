# Visual Direction Package — Hero A2 + Scrollytelling B2

**Status:** OWNER-APPROVED VISUAL DIRECTION  
**Date:** 2026-08-08  
**Selections:** Hero A2 (Review Gate) + Signature Scrollytelling B2 (Context Assembly)  
**Primary homepage reference:** Cloudflare current homepage (structure, pacing, spatial composition, density, typography hierarchy, visual weight, cinematic motion quality, transition rhythm)  
**Secondary/historical reference:** Nexus homepage direction (retained for component grammar and dark template system only)  
**Scope:** Visual specification only. No code changes, no dependency installs, no DESIGN.md modifications, no production mutations.

---

## 1. REFERENCE AUTHORITY MIGRATION

### Current state

```
DESIGN.md → docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md
Role: primary visual source for homepage
```

### Approved migration (DRAFT — apply in later phase)

```
PRIMARY HOMEPAGE REFERENCE:
  Cloudflare current homepage
  Role: structure, pacing, spatial composition, density,
        typography hierarchy, visual weight, cinematic motion quality,
        transition rhythm

RETAINED FROM NEXUS:
  docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md
  Role: component grammar, dark template system, card language,
        grid system (structural only — NOT pacing/motion authority)

HISTORICAL/SECONDARY:
  Nexus automation landing page visual direction
  Role: reference material only, not active authority
```

### What this changes

- Cloudflare becomes the quality standard and structural pacing model
- Nexus template retains authority over component grammar and dark mode system
- Motion architecture, section density, typography scale, and transition rhythm follow Cloudflare quality (not Cloudflare assets or copy)
- No Cloudflare source, copy, trademarks, proprietary assets, illustrations, or video are used

### What ProChat retains

- Brand: ProChat Cobalt (#3158C7), Golos Text, JetBrains Mono
- Approved copy from App.tsx
- Dark tokens from brand-spec.md
- Product truth: Memory lifecycle, review gates, evidence hierarchy
- Original illustration system (SVG primitives)
- Historical MemoryLaserField WebGL shader retained only as source/reference material; it is not an active visual direction and the new hero must not inherit its laser/particle aesthetic
- Design principles from DESIGN_PRINCIPLES.md

---

## 2. HERO A2 — "REVIEW GATE" VISUAL DIRECTION

### Concept elevation

The research specification described A2 as "fragmented text-like shapes flowing through a threshold line." This is elevated into a premium, product-grounded cinematic using realistic ProChat UI evidence objects, physical depth, and directional lighting.

### Frame 0 — Raw Evidence Stream

**Composition:**
- Full viewport height, dark field (--brand-canvas dark: #0d1118)
- Left 60% of frame: 5–7 realistic EvidenceCard objects drift rightward at varied depths
- Cards are real product primitives: source type pill, title text (Golos Text 14px/500), timestamp (JetBrains Mono 11px), state indicator
- Cards use actual homepage-example-data content: "Use stable data attributes for checkout selectors", "Expected confirmation banner was not found", etc.
- Cards have slight Y variance (±20px), opacity 0.6–0.9, subtle parallax depth layering via scale (0.92–1.0)
- Background: faint radial gradient from center-right (#141a24 → #0d1118), subtle 1px grid at 0.03 opacity
- No particles, no glowing blobs, no lasers

**Camera/depth:**
- Fixed orthographic frame, no perspective distortion
- Depth created by: 3 Z-layers of cards (far: scale 0.92, opacity 0.6; mid: scale 0.96, opacity 0.75; near: scale 1.0, opacity 0.9)
- Near-layer cards cast subtle drop shadow (0 4px 24px rgba(0,0,0,0.4))

**Lighting:**
- Ambient: dark uniform field
- Accent: soft ProChat Cobalt glow (12px blur, 0.15 opacity) on near-layer card borders
- No directional spotlight, no volumetric effects

**Typography/UI:**
- Each evidence card contains: `[source type pill] Title text` + `source · timestamp` below
- Source type pills use --brand-surface-strong background, --brand-text-secondary text
- State indicators: raw = amber dot, current = cobalt dot, resolved = muted dot

**Color use:**
- Card backgrounds: --brand-surface (#141a24)
- Card borders: --brand-border-subtle (#293446)
- Text: --brand-text (#f5f7fa) for titles, --brand-text-muted (#8995a6) for metadata
- Accent: cobalt only on "current" state indicators

**Moving objects:**
- 5–7 EvidenceCards drift rightward at 30–50px/sec (varied per card)
- Cards maintain 40–80px horizontal spacing (no overlap)
- New cards enter from left edge (opacity 0 → 0.9 over 200ms)
- Stream is continuous, not pulsed

**Background treatment:**
- #0d1118 base
- Radial gradient: center-right anchor, #1a2230 at 0%, #0d1118 at 70%
- Faint orthogonal grid lines (--brand-border-subtle at 0.03 opacity)
- No stars, no noise texture

**Headline overlay:**
- "Build memory that gets better with your work." — Golos Text, 700 weight, 72px desktop / clamp(2.5rem, 5vw, 4.5rem)
- Positioned upper-left quadrant, z-index above cards
- --brand-text color, max-width 12ch for dramatic line breaks

**Mobile version:**
- Cards reduced to 3–4, stacked vertically with slight horizontal offset
- Headline centered, 40px
- Cards at 80% viewport width
- Movement: gentle downward drift at 15px/sec
- Single depth layer

**Reduced-motion equivalent:**
- Static composition: 4 evidence cards arranged in a gentle arc from left to right
- Cards at varied opacity (0.5, 0.7, 0.85, 1.0) suggesting progression toward the gate
- No continuous movement

**Transition into next frame:**
- As scroll progresses (0–30% of hero scroll range), rightward drift accelerates slightly
- A vertical luminous boundary begins appearing at the 65% horizontal mark
- Cards approaching the boundary slow and rotate 0° → 1° (subtle tension)
- Duration of transition: 800ms equivalent scroll distance

---

### Frame 1 (Midpoint) — Review Gate in Action

**Composition:**
- The "gate" is a vertical ReviewGate element at 65% horizontal position
- Gate visual: 2px solid line (--brand-primary at 0.6) with a soft 20px glow bloom (--brand-primary at 0.08)
- Above the gate line: small label "Review" in JetBrains Mono 10px, --brand-text-muted
- Gate height: 70% of viewport, centered vertically
- Left of gate: 2–3 incoming evidence cards (opacity 0.7, still drifting)
- At the gate: 1 card is actively being reviewed — it gains a bright border (--brand-primary), a review action row appears below it (approve ✓ / reject ✗ / edit ✎)
- Right of gate: 2 cards have already passed — they have transformed into MemoryRecord style (thicker border, state: "approved", added metadata fields visible)
- Below gate: 1 dimmed card drifts downward-right at 45° angle, opacity fading to 0.3 (rejected/superseded)

**Camera/depth:**
- Same fixed orthographic frame
- Gate exists in the mid-Z layer
- Approved cards (right) are promoted to near-Z layer (scale 1.0, full opacity)
- Rejected card sinks to far-Z layer (scale 0.9, opacity 0.3)

**Lighting:**
- Gate line emits subtle cobalt ambient light (box-shadow: 0 0 20px var(--brand-primary) at 0.12)
- Approved cards on the right gain a very subtle warm edge highlight (1px lighter border-top)
- Rejected card loses all accent color

**Typography/UI:**
- Card being reviewed shows expanded state:
  - Title: "Use stable data attributes for checkout selectors"
  - Source: "QA review"
  - Review actions row: three small icons with labels
  - State badge transitions from "raw" → "under review" (amber → cobalt)
- Approved cards show enriched metadata:
  - State: "approved" (green dot + text)
  - Reviewer: "Senior QA"
  - Scope: "project" badge
  - Evidence count: "3 sources"
- Rejected card shows:
  - State: "superseded" (muted dot)
  - Strike-through on title (CSS text-decoration, subtle)

**Color use:**
- Gate line: --brand-primary (#7d9af2 dark mode)
- Gate glow: --brand-primary at 8% opacity
- Approved cards border: --status-success (#176b4a) thin line or dot
- Rejected card: fully desaturated, --brand-text-muted only
- Active review card: --brand-primary border (2px)

**Moving objects:**
- Left-side cards continue drifting rightward at reduced speed (15px/sec, decelerating)
- Card at gate: stationary, gently pulsing border opacity (0.6 → 0.8 → 0.6, 2s cycle)
- Approved cards on right: settled, micro-float (±2px Y, 4s cycle)
- Rejected card: diagonal drift downward-right at 8px/sec, opacity decreasing

**Background treatment:**
- Same base as Frame 0
- Gate vertical line divides background: left side retains original gradient, right side is slightly warmer (#141a24 shifts to #161e2a) suggesting structured space

**Mobile version:**
- Gate becomes a horizontal line at 45% vertical position
- Cards above: incoming (1–2 cards)
- Card at gate: centered, full-width
- Cards below gate: approved stack downward
- Rejected card exits to bottom-right corner
- Horizontal layout abandoned; vertical flow maintained

**Reduced-motion equivalent:**
- Three-column static layout:
  - Left: "Incoming" — 2 evidence cards, raw state
  - Center: "Under review" — 1 card with review actions visible, cobalt border
  - Right: "Approved" — 2 cards with enriched metadata, green state dot
- Below center: 1 faded card with "superseded" badge
- Gate represented as a subtle vertical divider line between columns

**Transition into next frame:**
- Over scroll progress 30–70%, the review action on the active card resolves:
  - ✓ button highlights → card transforms (border solidifies, metadata populates)
  - Card moves rightward past the gate (translateX + opacity sequence)
- Simultaneously, the headline begins fading (opacity 1.0 → 0.0) and a new element prepares to enter

---

### Frame 2 (Final) — Structured Trusted Memory

**Composition:**
- Right 70% of frame now dominates: a clean, structured MemoryWorkspace
- Workspace contains: 4–5 approved MemoryRecord cards arranged in a readable vertical stack
- Each record shows: type badge, title, summary line, state (approved), scope badge, evidence count
- Left 30%: the stream has faded to near-invisible (opacity 0.1) — new work still flows, but attention is on the structured side
- A "current task" indicator at the top-right suggests retrieval readiness
- The gate line remains visible but receded (opacity 0.2, no glow)

**Camera/depth:**
- Workspace cards are all at near-Z (scale 1.0, full opacity)
- Background stream cards are at far-Z (scale 0.88, opacity 0.1)
- Single focal plane: the workspace

**Lighting:**
- Workspace area has slightly elevated background (#161e2a vs #0d1118)
- No dramatic lighting — premium through clean surfaces and typography
- Current-task indicator has cobalt accent dot (the only bright accent)

**Typography/UI:**
- Workspace header: "Trusted Memory" in Golos Text 600, 18px, --brand-text-secondary
- Each MemoryRecord card:
  - Type: "Decision" / "Correction" / "Pattern" / "Evidence" — JetBrains Mono 10px, pill
  - Title: Golos Text 500, 15px, --brand-text
  - Summary: Golos Text 400, 13px, --brand-text-muted (1 line, truncated)
  - Footer: state dot + "approved" + scope badge + "3 sources" — all 11px
- Current task indicator: "Next task: Review checkout flow" — JetBrains Mono 12px, cobalt border card

**Color use:**
- Workspace background panel: --brand-surface-subtle (#1a2230)
- Card backgrounds: --brand-surface (#141a24)
- Card borders: --brand-border (#354156)
- State dots: green for approved
- Scope badges: --brand-surface-strong background
- Task indicator border: --brand-primary

**Moving objects:**
- Workspace cards: static, settled
- Micro-interaction: when a record "arrives" from the gate (scroll-driven), it slides into position (translateY from +20px, opacity 0 → 1, 400ms)
- Faint background stream: barely perceptible rightward drift (5px/sec, opacity 0.1)

**Background treatment:**
- Workspace panel: rounded rectangle (--radius-lg: 12px), --brand-surface-subtle background
- Outside workspace: continues dark field from previous frames
- No decorative elements, no gradients within workspace

**Mobile version:**
- Workspace fills 90% width, full vertical stack
- Background stream hidden entirely
- Gate line not visible
- Current-task indicator above the stack
- Clean, app-like card list appearance

**Reduced-motion equivalent:**
- Static workspace: 4 memory record cards in a clean stack
- Each card fully populated with approved state
- Current-task indicator visible above
- No animation, no stream
- Designed as an independently excellent static composition

**Transition out of hero:**
- As user scrolls past hero (100% progress), workspace compresses slightly (scale 0.98)
- Natural scroll continues into the next section (social proof strip)
- No parallax, no overlap — clean section boundary with 80px padding

---

## 3. SIGNATURE SCROLLYTELLING B2 — "CONTEXT ASSEMBLY"

### Concept elevation

The research specification described B2 as abstract outlines brightening and moving. This elevation uses realistic MemoryRecord cards, visible task signals, and product-grounded context assembly logic that communicates ProChat's selective retrieval mechanism.

### Scrollytelling container specification

```yaml
container:
  position: pinned (sticky)
  pin_duration: 5 viewport heights (5 × 100vh scroll distance)
  layout: split — visual left (60%), text steps right (40%)
  background: --brand-canvas (#0d1118)
  border: subtle top/bottom (--brand-border-subtle)
  mobile: unpinned, sequential panels, full-width
  z_index: above normal content, below nav
```

### State 1 — Task Intent Declared

**Composition:**
- Left panel (60%): Dark field containing a prominent "Current Task" card at top-center
- Task card: empty/minimal state — only a title field populated: "Investigate checkout timeout in EU staging"
- Below task card: 10–12 faint MemoryRecord outlines scattered in a loose organic arrangement
- Records are real product cards but at low opacity (0.25), showing type + title only
- No connections, no selection — this is the "full workspace, nothing relevant yet" state
- Right panel (40%): Step text — heading: "A task arrives" / body: explains that retrieval begins with intent

**Camera/depth:**
- Task card at near-Z (scale 1.0, opacity 1.0)
- Workspace records at far-Z (scale 0.94, opacity 0.25)
- Clear depth separation communicates "these exist but aren't active"

**Lighting:**
- Task card has elevated surface (--brand-surface-subtle) with subtle inner glow (1px inset shadow)
- Workspace records have no accent, no glow — deliberately subdued
- Ambient only

**Typography/UI:**
- Task card:
  - Label: "Current task" — JetBrains Mono 10px, cobalt pill
  - Title: "Investigate checkout timeout in EU staging" — Golos Text 600, 16px
  - Fields: environment, framework, failure type — empty/pending indicators
  - Border: --brand-primary (2px)
- Workspace records (faded):
  - Each shows: type pill + title (Golos Text 400, 13px, --brand-text-muted at 0.5)
  - Example titles from homepage-example-data: various QA and development decisions

**Color use:**
- Task card: cobalt border, cobalt label pill
- Workspace records: mono-tone (--brand-text-muted at 25% opacity), no color coding
- Background: flat #0d1118

**Moving objects:**
- None in resting state
- On scroll entry (first 5% of pin progress): task card fades in from top (translateY: -20px → 0, 400ms)
- Workspace records appear in a stagger (50ms each, opacity 0 → 0.25)

**Background treatment:**
- Flat dark, matching hero continuation
- Right panel: slightly elevated surface (--brand-surface #141a24) for text readability
- Clean separator line between left and right panels

**Mobile version:**
- Full-width panel, no split
- Task card at top, 90% width
- Below: visible text "10 memory records in workspace" with 3–4 faded mini-cards
- Step text below the visual

**Reduced-motion equivalent:**
- Static panel 1: Task card prominent, faded record outlines arranged below
- Self-contained — communicates "task exists, workspace exists, nothing connected yet"

**Transition into State 2:**
- Scroll progress 0–25%
- Task card's empty fields begin populating: environment appears "EU staging", framework "Playwright", failure type "timeout"
- These appear as typed characters (JetBrains Mono, sequential reveal 40ms/char)
- Simultaneously: a soft search/filter pulse radiates outward from the task card (concentric circle, --brand-primary at 0.05 opacity, expanding from 0 to 300px radius, fading)

---

### State 2 — Relevance Filtering

**Composition:**
- Left panel: Task card now fully populated (all fields visible)
- Of the 10–12 workspace records, 3 have brightened significantly (opacity 0.25 → 0.9)
- The 3 relevant records develop cobalt accent borders (--brand-primary-line)
- The remaining 7–9 records fade further (opacity 0.25 → 0.12)
- Thin dotted connector lines begin drawing from the 3 relevant records toward the task card (stroke-dasharray animation, cobalt at 0.3 opacity)
- Right panel: Step heading: "Relevance signals applied" / body: explains task signals select matching reviewed memory

**Camera/depth:**
- Task card: near-Z, unchanged
- Relevant records: promoted from far-Z to mid-Z (scale 0.94 → 0.97, opacity 0.9)
- Irrelevant records: demoted further (scale 0.92, opacity 0.12)
- Clear three-tier depth

**Lighting:**
- Relevant records gain a subtle cobalt edge glow (box-shadow: 0 0 8px var(--brand-primary) at 0.06)
- Task card gains a slightly stronger glow (0 0 12px var(--brand-primary) at 0.08)
- Irrelevant records lose all accent

**Typography/UI:**
- Task card fields now filled:
  - Environment: "EU staging" — JetBrains Mono 11px
  - Framework: "Playwright" — JetBrains Mono 11px
  - Failure: "timeout" — JetBrains Mono 11px
  - These function as visible retrieval signals
- Relevant records now show expanded information:
  - Record 1: "Decision: Use stable data attributes for checkout selectors" + scope: project + state: approved
  - Record 2: "Correction: The failure occurs only in the EU staging environment" + state: current
  - Record 3: "Pattern: Timeout failures after deployment correlate with cache invalidation delay" + state: approved
- Irrelevant records: unchanged, just dimmer

**Color use:**
- Relevant record borders: --brand-primary-line (#3b579b)
- Connector lines: --brand-primary at 0.3, dotted (4px dash, 4px gap)
- Task signals (field values): --brand-primary text color
- Irrelevant: pure grayscale, muted

**Moving objects:**
- Relevant records drift slightly toward center (10–20px total translate, over 600ms)
- Connector lines draw from record → task (stroke-dashoffset animation, 400ms per line, staggered 150ms)
- Irrelevant records drift slightly outward (5–10px, over 800ms) — barely perceptible
- No bouncing, no elastic

**Background treatment:**
- Unchanged from State 1
- Subtle radial gradient appears centered on task card (--brand-primary-soft at 0.03, 200px radius)

**Mobile version:**
- Task card at top with populated fields highlighted in cobalt
- Below: 3 relevant records in a vertical list (full opacity, cobalt left-border accent)
- Below that: "7 records not relevant" muted text
- Connector lines become left-border accent strips

**Reduced-motion equivalent:**
- Static panel 2: Task card with fields filled; 3 records immediately shown at full opacity with cobalt borders; remaining records dimmed; dotted lines visible connecting to task
- No animation needed — spatial arrangement communicates the selection

**Transition into State 3:**
- Scroll progress 25–60%
- Connector lines solidify (dotted → solid, opacity 0.3 → 0.6)
- Relevant records begin translating toward the task card (coordinated 300ms movement)
- Irrelevant records continue fading (opacity 0.12 → 0.06)

---

### State 3 — Context Assembled

**Composition:**
- Left panel: The 3 relevant records have moved into a structured vertical column immediately left of the task card
- They are now arranged in a clean stack with 12px spacing
- Connection lines are solid (2px, --brand-primary at 0.5)
- Each record shows its full identity: type, title, summary, state badge, evidence count, review date
- The task card and its assembled context form a unified "working unit"
- The 7–9 irrelevant records are barely visible (opacity 0.06) — still there, clearly not selected
- Right panel: Step heading: "Context assembled" / body: explains that only reviewed, relevant records attach

**Camera/depth:**
- Task card + assembled records: all at near-Z (scale 1.0)
- They form a single visual group
- Irrelevant records: far-Z (scale 0.88, opacity 0.06)

**Lighting:**
- The task-card + record group has a shared container glow:
  - Subtle panel background (#161e2a) behind the group
  - 1px border (--brand-border) around the logical group
- Individual records have clean borders, no additional glow
- Calm, workspace-like appearance

**Typography/UI:**
- Each assembled record (expanded detail):
  - Type pill: "Decision" / "Correction" / "Pattern"
  - Title: Golos Text 500, 14px, --brand-text
  - Summary: 1 line, 12px, --brand-text-secondary
  - Footer row: state dot (green) + "approved" + scope badge + "reviewed 3 days ago" + evidence count
  - Border: --brand-border, with cobalt left-accent (3px solid --brand-primary)
- Connection lines: solid 1.5px, --brand-primary at 0.4, straight paths (no curves)
- Group label above: "Assembled context (3)" — JetBrains Mono 10px, --brand-text-muted

**Color use:**
- Container group: --brand-surface-subtle background
- Records within group: --brand-surface background
- Left-accent on each: --brand-primary (3px)
- State dots: green (approved), cobalt (current)
- Connections: --brand-primary at 0.4

**Moving objects:**
- Group settled — no continuous motion
- Micro-interaction on arrival: each record slides into position from its previous location (translateX/Y, 400ms ease-out, staggered 100ms)
- After settling: gentle shared micro-float (±1px Y, 6s cycle) for the entire group as one unit

**Background treatment:**
- Group container: rounded rect (12px radius), --brand-surface-subtle
- Outside: continues dark field
- Faint grid still visible at 0.02 opacity

**Mobile version:**
- Task card at top
- "Assembled context:" label
- 3 records stacked below in a clean list
- Each has cobalt left-border
- No floating irrelevant records — replaced by muted text "7 other records not relevant"
- Clean app-like appearance

**Reduced-motion equivalent:**
- Static panel 3: Task card with 3 records arranged in a neat column beside it
- Solid connection lines visible
- Surrounding records faded to near-invisible
- The composition itself tells the story without needing motion history

**Transition into State 4:**
- Scroll progress 60–100%
- The task card's content area begins populating with a response that references the assembled memory
- A "context applied" indicator appears

---

### State 4 — Applied Context

**Composition:**
- Left panel: The task card has expanded to show a response/output area
- Response area contains brief text that references the assembled records:
  - "Using stable data attributes (Decision #01). Checking EU staging specifically (Correction #01). Accounting for post-deployment cache delay (Pattern #01)."
- The 3 assembled records are still visible in their column, but each now shows a small "referenced" indicator (a subtle → arrow connecting to the response text)
- A footer bar on the task card shows: "context: 3 reviewed records · all approved · project scope"
- Right panel: Step heading: "Context applied" / body: explains that the AI response is grounded in reviewed memory

**Camera/depth:**
- Everything at near-Z — this is the "settled working state"
- No depth variation needed — the story has resolved

**Lighting:**
- Calm, even — workspace lighting
- The response area has a very subtle warm tint (--brand-surface-strong as background)
- No dramatic effects

**Typography/UI:**
- Task response area:
  - Background: --brand-surface-strong
  - Text: Golos Text 400, 14px, --brand-text
  - References inline: "(Decision #01)" — JetBrains Mono 11px, --brand-primary, clickable appearance
- Context footer:
  - Full width of task card bottom
  - "context: 3 reviewed records · all approved · project scope"
  - JetBrains Mono 11px, --brand-text-muted
  - Small ProChat Cobalt accent dot before "context:"
- Reference arrows: 1px solid --brand-primary at 0.3, from record to inline citation

**Color use:**
- Response background: --brand-surface-strong (#222c3c)
- Inline references: --brand-primary text
- Footer: --brand-text-muted with cobalt accent dot
- Records: unchanged from State 3 (stable)

**Moving objects:**
- Response text appears line-by-line (opacity 0 → 1, 200ms stagger per line)
- Reference arrows draw after corresponding text appears (stroke animation, 300ms)
- Context footer slides up from below task card (translateY: 10px → 0, 400ms)
- After all elements settle: no continuous motion

**Background treatment:**
- Unchanged — clean workspace appearance
- This frame should feel "resolved" and stable

**Mobile version:**
- Task card expanded to show response text
- Below: "Grounded in 3 reviewed records" with collapsed record list (expandable)
- Clean, final, no motion
- Reads naturally as the conclusion of the story

**Reduced-motion equivalent:**
- Static panel 4: Task card with response visible, assembled records beside it, context footer shown
- All information present, all relationships visible through spatial arrangement
- The four panels together form a complete sequential story readable without scrollytelling

---

## 4. MEDIA PRODUCTION PIPELINE

### 4.1 Product/UI Visuals

```yaml
method: HTML/CSS/SVG built from ProChat product design language
source_components:
  - EvidenceCard (illustration primitives)
  - MemoryRecord (illustration primitives)
  - ReviewGate (illustration primitives)
  - ContextWindow (illustration primitives)
  - SourceConnector (illustration primitives)
source_tokens: brand-spec.md dark color tokens
source_data: docs/homepage-example-data.md
constraint: no fake generative screenshots, no stock UI mockups
output: React components using existing illustration system
```

All hero cards and scrollytelling records are built from the existing `src/app/(marketing)/components/illustrations/` primitive system. They use sanitized example data from `docs/homepage-example-data.md`. They are real product-grammar components, not decorative approximations.

### 4.2 Styleframes / Art Direction

```yaml
primary_tool: OpenDesign CLI (/Users/Office/.local/bin/open-design)
secondary_tool: ProChat SVG illustration primitives (existing)
tertiary_tool: Brain flux-local (concept backgrounds/lighting only)

usage_rules:
  - OpenDesign: generate initial composition layouts, test spatial relationships, explore lighting
  - SVG primitives: all product objects (cards, records, gates, connectors)
  - flux-local: background texture/atmosphere concepts ONLY (never product truth)
  - NEVER use generated imagery for product UI, card content, or text
  - Generated imagery is permitted for: lighting studies, atmospheric depth, background gradients, texture exploration
  - All final production assets are HTML/CSS/SVG — generated art is concept-only
```

### 4.3 Cinematic Video (Hero A2 rendered loop)

```yaml
workflow: HyperFrames + GSAP → deterministic rendered frames → FFmpeg → H.264 MP4 + VP9 WebM + poster

isolation:
  working_directory: ~/prochat-motion-lab/
  node_version: 22 (via nvm, separate from app's Node 20)
  constraint: completely isolated from Next.js application tree
  shared_assets: none — motion-lab renders independently

pipeline:
  1_author:
    tool: HyperFrames (npx hyperframes)
    content: Hero A2 Review Gate 4–6 second ambient loop
    resolution: 1920×1080
    framerate: 30fps
    frames: 120–180

  2_render:
    tool: HyperFrames built-in frame export
    output: ~/prochat-motion-lab/frames/%04d.png

  3_encode_h264:
    command: |
      ffmpeg -framerate 30 -i frames/%04d.png \
        -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
        -movflags +faststart \
        -g 15 -keyint_min 15 \
        -vf "scale=1920:1080" \
        output-h264.mp4

  4_encode_vp9:
    command: |
      ffmpeg -framerate 30 -i frames/%04d.png \
        -c:v libvpx-vp9 -b:v 0 -crf 35 -row-mt 1 \
        -vf "scale=1920:1080" \
        output-vp9.webm

  5_poster:
    command: |
      ffmpeg -i output-h264.mp4 -vframes 1 -q:v 2 poster.jpg

  6_mobile_variant:
    command: |
      ffmpeg -framerate 30 -i frames/%04d.png \
        -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p \
        -movflags +faststart \
        -vf "scale=960:540" \
        output-h264-mobile.mp4

delivery:
  - output-h264.mp4 (desktop, Safari-compatible)
  - output-vp9.webm (modern browsers, smaller)
  - output-h264-mobile.mp4 (mobile variant)
  - poster.jpg (prefers-reduced-motion and initial frame)
```

### 4.4 Runtime Technology Stack

```yaml
runtime:
  framer_motion:
    role: micro-interactions only
    scope: existing Reveal.tsx, button hovers, route transitions
    constraint: do NOT use for new cinematic work

  gsap_scrolltrigger:
    role: cinematic scroll choreography
    scope:
      - Hero A2 entrance sequence
      - B2 pinned scrollytelling (primary)
      - Section reveal choreography
      - Card cluster entrance stagger
    install: npm install gsap @gsap/react
    constraint: canonical cinematic stack per DESIGN.md

  native_scrolling:
    role: all page scroll behavior
    constraint: no smooth-scroll library, no scroll hijacking

  three_r3f:
    status: CONDITIONAL — not rejected
    install_condition: "only if a later approved scene genuinely requires live 3D geometry (e.g., a rotating memory object with real depth)"
    current_need: none — A2 and B2 are 2D compositions
    constraint: do not preemptively install

  blender:
    status: CONDITIONAL — for authored 3D assets only
    install_condition: "only if Three.js scene is approved and requires authored mesh/material"
    current_need: none
    constraint: not installed, not planned
```

---

## 5. TECHNICAL POC PLAN

### Scope

One proof-of-concept demonstrating both approved concepts:

1. **Hero A2** — 4–6 second deterministic cinematic rendered through HyperFrames/FFmpeg as ambient hero background video
2. **B2 live GSAP ScrollTrigger** — pinned scrollytelling interaction with 4 states, scroll-driven transitions

### POC location

```
Route: /poc (isolated Next.js page, not linked from production nav)
Video assets: ~/prochat-motion-lab/ (external, not in app tree)
GSAP: installed in app for POC (gsap, @gsap/react)
```

### Measurable approval criteria

| Criterion | Target | Measurement method |
|-----------|--------|-------------------|
| Visual quality | Matches Cloudflare-tier composition feel | Owner subjective review against reference |
| Hero video loop smoothness | Zero visible stutter at native playback | Chrome DevTools Performance panel, 10s recording |
| Seek smoothness (if scroll-scrub tested) | < 50ms per seek, no blank frames | JS benchmark: measure currentTime assignment latency |
| H.264 file size | ≤ 600KB for 4s clip | `ls -la` on encoded output |
| VP9 file size | ≤ 400KB for 4s clip | `ls -la` on encoded output |
| Desktop FPS during B2 scroll | ≥ 55fps sustained during pin | Chrome DevTools FPS meter during scroll interaction |
| Mobile FPS during B2 scroll | ≥ 30fps sustained | Chrome DevTools mobile emulation + real device |
| Safari behavior | Video plays, ScrollTrigger pins work, no visual glitch | Safari 17+ manual test |
| Reduced motion | All motion removed, static compositions display, content accessible | Toggle `prefers-reduced-motion: reduce`, verify all states visible |
| LCP impact | Hero LCP ≤ 2.5s on Fast 3G throttle | Lighthouse audit on /poc route |
| Cumulative Layout Shift | ≤ 0.1 | Lighthouse audit |
| B2 backward scroll | All states restore predictably when scrolling up | Manual test: scroll down through all 4 states, scroll back up, verify each state |
| Memory cleanup | Zero GSAP instances leaked after route unmount | React DevTools + GSAP.globalTimeline inspection |
| Keyboard/screen reader | All B2 content accessible without scroll, logical reading order | VoiceOver test, Tab navigation |

### POC does NOT include

- Production styling/polish
- Mobile-specific compositions (documented above, implemented in production phase)
- Video integration into actual hero (just proves the pipeline works)
- Full section choreography
- Nav interaction with pinned state

---

## 6. DESIGN.MD MIGRATION (DRAFT — DO NOT APPLY)

The following replaces DESIGN.md lines 9–21 when approved:

```markdown
## Public homepage visual authority — 2026-08-08

The owner-approved public homepage visual and motion architecture is defined by:

### Primary homepage reference

Cloudflare's current homepage serves as the quality and structural reference for:
- homepage section structure and pacing
- spatial composition and density
- typography hierarchy and visual weight
- cinematic motion quality and transition rhythm

No Cloudflare source code, copy, trademarks, proprietary assets, illustrations, or video are used.

### ProChat retains

- ProChat brand (Cobalt, Golos Text, JetBrains Mono, dark tokens)
- All approved copy
- Product truth (Memory lifecycle, review gates, evidence hierarchy)
- Original visual assets (SVG primitives, WebGL shader, illustration system)

### Structural template (Nexus — retained, narrowed)

```text
docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md
```

The Nexus-derived dark template system remains the source for:
- page component grammar
- card/grid language
- dark mode implementation
- structural layout system

The template no longer governs pacing, motion architecture, section density, or cinematic behavior.

### Motion and interaction authority

```text
docs/research/HOMEPAGE_DESIGN_MOTION_SPECIFICATION.md  (research + concepts)
docs/research/VISUAL_DIRECTION_A2_B2.md                (approved direction)
```

### Selected concepts

- **Hero:** A2 — Review Gate (raw evidence → review gate → structured trusted memory)
- **Signature scrollytelling:** B2 — Context Assembly (task intent → relevance → assembly → applied context)

### Generated-video/frame-scrub direction

Frozen optional research. Not active.

### Operational rule (unchanged)

> Structure first. Evidence visible. Actions explicit. Decoration restrained.
```

---

## 7. FINAL REPORT

```
VISUAL DIRECTION: A2 + B2 APPROVED
CLOUDFLARE: PRIMARY HOMEPAGE REFERENCE
NEXUS: SECONDARY/HISTORICAL (retained for component grammar)
HOMEPAGE CODE: UNCHANGED
PRODUCTION: UNCHANGED
NEXT STEP: VISUAL STYLEFRAMES + TECHNICAL POC
```

---

## Appendix A — Frame specification index

| Frame | Section | Key objects | Primary product meaning |
|-------|---------|-------------|------------------------|
| Hero A2 Frame 0 | Hero | 5–7 EvidenceCards drifting | Raw work exists before structure |
| Hero A2 Midpoint | Hero | ReviewGate + cards in transition | Human review separates trusted from untrusted |
| Hero A2 Final | Hero | MemoryWorkspace with approved records | Structured memory is the outcome |
| B2 State 1 | Scrollytelling | Empty task + faded workspace | Retrieval begins with intent |
| B2 State 2 | Scrollytelling | Task signals + 3 highlighted records | Relevance is selective, not a dump |
| B2 State 3 | Scrollytelling | Assembled context column | Only reviewed records attach to tasks |
| B2 State 4 | Scrollytelling | Applied response + references | Memory grounds AI output with provenance |

## Appendix B — Color token reference (dark mode, production use)

| Token | Hex | Usage in A2/B2 |
|-------|-----|----------------|
| --brand-canvas | #0d1118 | All backgrounds |
| --brand-surface | #141a24 | Card backgrounds |
| --brand-surface-subtle | #1a2230 | Container/group backgrounds |
| --brand-surface-strong | #222c3c | Response area, elevated surfaces |
| --brand-border-subtle | #293446 | Inactive card borders |
| --brand-border | #354156 | Active card borders |
| --brand-primary | #7d9af2 | Gate line, task indicator, selection accent |
| --brand-primary-line | #3b579b | Connector lines, relevant-record borders |
| --brand-primary-soft | #1c2b52 | Subtle glow backgrounds |
| --brand-text | #f5f7fa | Primary text |
| --brand-text-secondary | #b6c0cd | Summaries, labels |
| --brand-text-muted | #8995a6 | Metadata, timestamps |
| --status-success | #176b4a | Approved state dots |
