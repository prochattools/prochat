# ProChat Homepage — Design & Motion Research Specification

**Status:** RESEARCH COMPLETE — A2 Review Gate + B2 Context Assembly owner-approved; isolated visual/technical POC pending  
**Date:** 2026-08-08  
**Goal:** Define the approved visual and motion architecture for a premium Cloudflare-quality ProChat homepage  
**Scope:** Specification only. No code changes, dependency installs, DESIGN.md modifications, or production mutations.

---

## 1. CLOUDFLARE HOMEPAGE TEARDOWN

The Cloudflare homepage (as of 2025–2026) serves as a structural, pacing, and motion-quality reference. The analysis below maps its architecture without copying proprietary assets.

### Section 1 — Global Navigation

| Attribute | Observation |
|-----------|-------------|
| Layout | Full-width, fixed/sticky at top, ~64px height |
| Typography | Logo wordmark left, medium-weight nav links center-right, pill CTA right |
| Visual weight | Light — transparent over hero, gains solid background on scroll |
| Motion role | Background opacity transition on scroll; dropdown reveals on hover with subtle scale |
| Pinned behavior | Sticky with blur-backed glassmorphism on scroll |
| Trust placement | Brand wordmark itself is the primary trust signal |
| Mobile | Hamburger collapse, slide-in drawer |

### Section 2 — Hero

| Attribute | Observation |
|-----------|-------------|
| Layout | Full viewport height, centered content, layered background |
| Typography | Display heading at ~72–96px, bold 700+, tight tracking -0.03em; body at ~20px, regular weight, muted color |
| Visual weight | Maximum — anchors the entire page experience |
| Rhythm | Generous vertical padding (>120px top), breathing room between headline/body/CTA |
| Motion role | Ambient: slow-moving gradient mesh or particle field behind content; entrance: headline slides up with fade; CTA appears with slight delay |
| Pinned behavior | None — scrolls naturally, background parallax-like motion |
| Trust placement | Sub-CTA line with customer count or uptime stat |
| Background | Deep navy/dark gradient with luminous accent shapes, mesh gradients, or animated SVG topology |
| CTA style | Solid orange/accent pill button with arrow, secondary text link |
| Mobile | Headline scales down via clamp, single-column, background simplifies |

### Section 3 — Social Proof / Logo Strip

| Attribute | Observation |
|-----------|-------------|
| Layout | Full-width contained band, horizontal logo row |
| Typography | Small uppercase label above ("Trusted by..."), grayscale logos |
| Visual weight | Low — acts as breathing room between hero and features |
| Motion role | Logos may fade in staggered on first view; optionally a slow horizontal marquee |
| Spacing | ~80px vertical padding, minimal internal gaps |
| Mobile | Logos wrap to 2 rows or become scrollable strip |

### Section 4 — Product Platform (Multi-Feature Grid)

| Attribute | Observation |
|-----------|-------------|
| Layout | Alternating: large product visual left + text right, then reversed |
| Typography | H2 at ~48px, bold; body ~18px; label/pill above heading |
| Visual weight | High — each sub-section is a "chapter" with its own visual anchor |
| Motion role | Scroll-triggered: product visual enters with translateY + opacity; text staggers in; some interactive product demos activate on scroll entry |
| Pinned behavior | Some sections use brief pin-and-progress: product visual stays while text/features scroll alongside |
| Background | Alternating subtle gradient shifts between sections; dark → slightly lighter → dark rhythm |
| Mobile | Stack to single column, visual above text |

### Section 5 — Stats / Proof Chapter

| Attribute | Observation |
|-----------|-------------|
| Layout | Full-width dark band, 3–4 large statistics in a row |
| Typography | Stat numbers at display size (~64–80px), supporting label below at ~14px |
| Visual weight | Medium-high — dark background with large white numbers creates visual impact |
| Motion role | Counter animation on scroll entry; numbers count up from 0 |
| Pinned behavior | None |
| Trust placement | This IS the trust section — real metrics (requests served, data centers, etc.) |
| Mobile | Stats stack 2×2 grid |

### Section 6 — Deep Product Narrative (Pinned Scrollytelling)

| Attribute | Observation |
|-----------|-------------|
| Layout | Left: pinned product visual (sticky); Right: scrolling text steps |
| Typography | Step titles ~24px semi-bold; body ~16px; step indicator/number |
| Visual weight | High — the pinned visual changes state as user scrolls |
| Motion role | **Key section:** GSAP ScrollTrigger pins the visual, progress scrubs between states; product visual morphs/transitions between 3–5 states as scroll progresses |
| Pinned behavior | Visual container pinned for ~3–4 viewport heights while text scrolls |
| Background | Dark contained panel or full-width dark field |
| Mobile | Unpins; steps become sequential with inline visuals per step |
| Section transitions | Enters with a clear dark block boundary, exits when text runs out |

### Section 7 — Customer Testimonials / Case Studies

| Attribute | Observation |
|-----------|-------------|
| Layout | Large quote card or 2–3 card carousel |
| Typography | Quote at ~24–28px italic or normal weight; attribution smaller |
| Visual weight | Medium — acts as validation before final CTA |
| Motion role | Subtle card entrance; carousel may auto-advance |
| Trust placement | Company logos + person names with titles |
| Mobile | Single card, swipe-enabled |

### Section 8 — Closing CTA

| Attribute | Observation |
|-----------|-------------|
| Layout | Full-width dark section, centered content, spacious |
| Typography | Large closing question/statement at H2 scale; supporting line below |
| Visual weight | Medium-high — needs to compel action after long scroll |
| Motion role | Minimal — the CTA itself is the anchor |
| CTA style | Prominent light button on dark, secondary text link below |
| Mobile | Unchanged except font scale |

### Section 9 — Footer

| Attribute | Observation |
|-----------|-------------|
| Layout | Multi-column link grid (4–6 columns), dark background |
| Typography | Column headers bold ~14px, links ~14px regular, muted |
| Visual weight | Low — informational, not persuasive |
| Motion role | None |
| Mobile | Columns stack or accordion |

### Cross-Section Rhythm Observations

- **Pacing:** Hero (~100vh) → short proof strip (~20vh) → large chapter (~80vh) → alternating rhythm of 60–80vh sections
- **Color modulation:** Dark hero → slight lightening → dark proof → medium features → dark close
- **Scroll velocity:** Hero is fast (one viewport). Middle sections have higher content density. Pinned sections slow perceived scroll speed.
- **Visual anchors:** Every ~2.5 viewports, one large bold visual commands attention (prevents scroll fatigue)
- **Typography scale curve:** Display (hero) → H2 (sections) → H3 (sub-features) → body — never more than 2 levels in one viewport

---

## 2. PROCHAT MAPPING

For every Cloudflare structural role, the equivalent ProChat content using approved copy and product truth:

| Cloudflare Role | ProChat Equivalent | Content Source |
|---|---|---|
| Global nav | Dark floating nav: ProChat logo, Memory, Memory for QA, Workbench, Docs, Apply for Beta (pill CTA) | Existing `MarketingNav.tsx` |
| Hero headline | "Build memory that gets better with your work." | Approved in App.tsx |
| Hero body | ProChat Memory keeps reviewed decisions, evidence, corrections, and lessons reusable | Approved in App.tsx |
| Hero ambient background | Memory Laser Field — luminous vertical streams with evidence nodes converging | Existing `MemoryLaserField.tsx` (WebGL/CSS) |
| Hero card cluster | 6 memory cards: reviewed decision, pattern detected, source evidence, correction, relevant context, durable memory | Existing in App.tsx |
| Social proof strip | Trust principles: Local files · Markdown-first · Git-versioned · Human-reviewed · Model-agnostic | Approved in App.tsx |
| Product platform chapters | Two product paths: Memory for QA + Workbench with flow illustrations | Existing product section |
| Stats/proof chapter | NOT stats (pre-revenue). Replace with **Memory Model** chapter: Capture → Review → Retrieve with system diagram | Existing system section |
| Deep pinned scrollytelling | **NEW:** Memory lifecycle visualization — a record moves from raw evidence through review gate to structured retrieval | Must be designed (see Section 4) |
| Customer testimonials | NOT available (pre-revenue). Replace with **Participation** section showing adoption paths | Existing adoption section |
| Closing CTA | "Put trusted memory to work." with three differentiated actions | Existing closing section |
| Footer | Multi-column footer with product/resources/company/legal | Existing `Footer.tsx` |

### Gap Analysis

The current ProChat homepage already maps structurally to most Cloudflare roles. The quality gaps are:

1. **No pinned scrollytelling section** — the signature Cloudflare-quality interaction is missing
2. **Hero animation is implemented but not cinematic-grade** — needs refinement pass
3. **Section transitions are abrupt** — no gradient or motion continuity between sections
4. **Card cluster lacks entrance choreography** — cards appear statically
5. **No counter/stat-equivalent visual drama** — the Memory Model section needs a visual event
6. **Mobile motion is identical to desktop** — no density reduction

---

## 3. MOTION TAXONOMY

Every proposed ProChat effect classified by exact implementation technology:

### Static (no motion)
- Footer link grid
- Legal/copyright line
- Trust principles text
- Product point bullet lists
- Navigation links (resting state)

### DOM/CSS Only
- Navigation background transition on scroll (backdrop-filter + opacity)
- Status pill dot glow pulse (`@keyframes`, `box-shadow`)
- Button hover state transitions (`transform`, `background`)
- Focus-visible outlines
- Grid overlay (pure CSS background-image)
- Card border/shadow hover emphasis
- Section background gradient transitions (scroll-based `background-position`)

### Framer Motion (existing, retain)
- `Reveal.tsx` — basic viewport-entry fade+translateY for legacy sections
- Product page transitions (if used in routes)

### GSAP + ScrollTrigger (to be added)
- **Hero card cluster entrance** — staggered translateY + opacity + scale on viewport entry
- **Memory Model diagram assembly** — phases draw/reveal progressively as scroll reaches section
- **Pinned scrollytelling section** — visual container pinned while content scrolls; visual transitions between 3–5 memory lifecycle states
- **Section reveal choreography** — coordinated entrance of heading → body → visual per chapter
- **Counter-like effect** — Memory system phases counting/assembling (not numeric counters)

### Pre-rendered Video (H.264 MP4 + VP9 WebM)
- **Hero cinematic concept** (if selected) — 4–6 second loop of abstract memory convergence rendered via HyperFrames, played as ambient background `<video>` or poster+autoplay
- **NOT scroll-scrubbed** — plays autonomously as ambient texture

### Scroll-Scrub Video
- **REJECTED for initial implementation** — per HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md explicit cut-off
- **May revisit** only through separately approved future experiment

### Live WebGL/Three.js Candidate
- `MemoryLaserField` WebGL variant (already implemented) — retained as hero ambient effect
- **No additional WebGL** — the single existing shader is sufficient. Three.js/R3F rejected for homepage.

### Narrative Purpose Gate

No animation without answering: "What does this motion explain about memory?"

| Effect | Narrative Purpose |
|--------|------------------|
| Laser field convergence | Evidence flows toward structured review |
| Card stagger entrance | Memory records emerge from the system, not pre-loaded |
| Pinned state transitions | A single memory evolves through capture → review → retrieval |
| Diagram assembly | The three phases build on each other, not independent |
| Section reveals | Progressive disclosure mirrors memory's staged nature |

---

## 4. CINEMATIC STORYBOARDS

### A. Hero Cinematic — 3 Concepts

#### Concept A1: "Convergence Field" (enhance existing)

**Beginning:** Dispersed faint evidence points scattered across a dark field. No structure visible.

**Transformation:** Points begin drifting inward along curved orbital paths. As they approach center, they brighten and slow. Thin luminous traces connect them momentarily. A vertical core column solidifies as convergence peaks.

**Ending:** A stable narrow field of structured memory streams flows continuously downward. Individual evidence nodes are visible but organized. The field breathes slowly.

**Camera/Motion:** Fixed frame. Depth is created by opacity layers and scale differences, not camera movement. The "camera" is always facing the field head-on.

**Product meaning:** Raw evidence from scattered work converges into structured, reviewable memory. The transformation IS the product proposition.

**Reduced-motion fallback:** Static composition showing the stable "ending" state — organized vertical traces with a soft central glow. No continuous motion.

---

#### Concept A2: "Review Gate"

**Beginning:** A horizontal stream of fragmented text-like shapes (representing raw work artifacts) flows left to right across the field, slightly chaotic, varying opacity.

**Transformation:** The stream encounters a vertical threshold line (the review gate). Shapes that pass slow down, align, gain defined borders, and settle into a structured column on the right. Some shapes are dimmed and diverted downward (rejected/superseded).

**Ending:** Left side continues flowing (new work). Right side accumulates organized reviewed memory. The gate line pulses softly with the ProChat accent.

**Camera/Motion:** Slow continuous horizontal flow at ~40px/sec. Gate effect is transform-based. No camera movement.

**Product meaning:** Human review transforms chaotic work fragments into structured trusted memory. The gate is selective — not everything passes.

**Reduced-motion fallback:** Two-panel static composition: left shows scattered fragments, right shows organized reviewed records, with a visible boundary line between them.

---

#### Concept A3: "Depth Layers"

**Beginning:** Three transparent layers visible at slight perspective (not 3D — achieved with opacity and scale). All layers show the same faint content.

**Transformation:** Layers separate vertically in visual space. The bottom (furthest) layer shows raw evidence. Middle layer shows connected/reviewed records with subtle linking lines. Top layer shows a clean, minimal retrieval state — just the 2–3 relevant records highlighted.

**Ending:** All three layers visible simultaneously, with the top (retrieval) layer most prominent. Gentle parallax breathing between layers.

**Camera/Motion:** Layers drift at slightly different speeds (CSS parallax via translateZ or separate scroll offsets). 2D only — perspective simulated through scale and opacity.

**Product meaning:** Memory has depth — raw evidence, structured review, and focused retrieval are distinct layers of the same system.

**Reduced-motion fallback:** Three horizontal bands showing each layer's final state, stacked vertically with labels.

---

### B. Signature Pinned Scrollytelling — 3 Concepts

#### Concept B1: "Memory Lifecycle Journey"

**Beginning:** A single memory record appears in its raw state — a simple card with rough content, no metadata, faint border, positioned left-of-center in a dark contained field.

**Transformation (scroll-driven, 3 states):**

- **State 1 — Captured:** Raw card gains a source reference, timestamp, and capture indicator. Small evidence nodes connect to it via dotted lines.
- **State 2 — Reviewed:** A review gate appears. The card transforms: border solidifies, a check mark appears, metadata populates (reviewer, date, status: approved). One connected evidence node is dimmed (superseded).
- **State 3 — Retrieved:** Context shifts. A "current task" indicator appears at top. The reviewed memory card is selected (accent border). Irrelevant surrounding records fade to near-invisible. Only the relevant subset remains prominent.

**Ending:** The retrieval state settles. The single record is shown in its final useful position — connected to a current task, with full provenance visible.

**Camera/Motion:** Container is pinned for ~4 viewport heights. Each state occupies ~1.2vh of scroll progress. Transitions between states: 600ms ease-chapter, crossfade + transform. Scroll backward restores previous state predictably.

**Product meaning:** One piece of knowledge moves through the full ProChat Memory lifecycle. The user sees exactly what each phase adds.

**Reduced-motion fallback:** Three sequential static panels (capture, review, retrieve) shown vertically without pinning. Each panel is independently designed to communicate its state.

---

#### Concept B2: "Context Assembly"

**Beginning:** An empty "current task" frame sits in a dark field. Around it (scattered) are 8–12 faint memory record outlines — the full memory store.

**Transformation (scroll-driven, 4 states):**

- **State 1 — Intent declared:** The task frame gains a title and description. A search/filter indicator appears.
- **State 2 — Relevance filter:** 3 of the 12 records brighten and develop accent borders. The rest fade further. Thin dotted lines begin connecting the 3 relevant records to the task frame.
- **State 3 — Context assembled:** The 3 records move closer to the task frame, arranged in a structured column beside it. Connection lines solidify. Each shows its review status and provenance summary.
- **State 4 — Applied:** The task frame shows content that references the assembled memory. A "context: 3 reviewed records" indicator appears at bottom.

**Ending:** Task + assembled context shown in their working relationship. The surrounding faded records remain visible but clearly not selected.

**Camera/Motion:** Pinned for ~5 viewport heights. Transitions use coordinated transform + opacity with stagger. Movement is intentional — records drift toward the task, not jump.

**Product meaning:** Memory retrieval is selective, not a context dump. The system chooses relevant reviewed memory for the specific task.

**Reduced-motion fallback:** Four inline panels showing progressive states, each self-contained.

---

#### Concept B3: "Evidence Chain"

**Beginning:** A single conclusion/decision is visible at the top of a contained field — "Revised deployment timeline approved."

**Transformation (scroll-driven, 3 states):**

- **State 1 — Provenance revealed:** Below the decision, source evidence records appear connected by downward arrows. Interview notes → meeting record → technical analysis → the decision.
- **State 2 — Correction history:** One source record gains a "superseded" indicator. An alternative branch appears (the original timeline assumption), clearly marked as retired. A correction arrow shows the path from old to new.
- **State 3 — Reuse context:** The entire chain compresses slightly. A new task appears at the top referencing this decision. The chain shows it can be retrieved intact with full history.

**Ending:** A complete provenance chain from raw evidence through correction to current reuse, all visible in one diagram.

**Camera/Motion:** Pinned for ~3.5 viewport heights. Motion is primarily reveal (opacity + translateY from below). Arrows draw on using stroke-dasharray animation.

**Product meaning:** Every decision has traceable evidence. Corrections are visible, not hidden. Memory includes its own history.

**Reduced-motion fallback:** Full static diagram showing the complete chain with all states visible simultaneously (like a flowchart).

---

## 5. TECHNICAL POC SPECIFICATION

### Objective

One isolated 4–6 second proof-of-concept video demonstrating that:
1. HyperFrames can author the ProChat memory convergence aesthetic
2. FFmpeg produces both H.264 and VP9 at acceptable quality
3. The output is suitable for ambient hero background use
4. Scroll-controlled seek performs adequately

### Authoring Environment

```yaml
tool: HyperFrames (via npx hyperframes)
node_version: 22 (required by HyperFrames — separate from app's Node 20)
working_directory: ~/prochat-video-poc/ (outside the Next.js app tree)
duration: 4–6 seconds at 30fps (120–180 frames)
resolution: 1920×1080 (render), scaled to viewport in-browser
```

**Node 22 isolation:** Use `nvm use 22` or run in a separate shell. The app's Node 20 lockfile and `node_modules` remain untouched.

### Composition Content

Recreate the "Convergence Field" (Concept A1) in HyperFrames HTML:
- Dark background (#0a0a0a)
- 7–9 faint luminous vertical traces (ProChat teal: rgb(86 216 202))
- 5–7 evidence point nodes drifting downward along traces
- Central convergence glow (subtle, localized)
- GSAP timeline animates node positions and trace opacity
- No text, no product UI — pure abstract ambient texture

### FFmpeg Outputs

```bash
# H.264 MP4 — maximum browser compatibility
ffmpeg -framerate 30 -i frames/%04d.png \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -movflags +faststart \
  -vf "scale=1920:1080" \
  output-h264.mp4

# VP9 WebM — smaller file, modern browsers
ffmpeg -framerate 30 -i frames/%04d.png \
  -c:v libvpx-vp9 -b:v 0 -crf 35 -row-mt 1 \
  -vf "scale=1920:1080" \
  output-vp9.webm
```

### Test Matrix

| Test | Target | Method |
|------|--------|--------|
| H.264 MP4 playback | Chrome, Firefox, Safari, Edge, iOS Safari | `<video>` autoplay muted loop |
| VP9 WebM playback | Chrome, Firefox, Edge | `<source>` fallback chain |
| File size | < 800KB for 4-second clip | FFmpeg CRF tuning |
| First frame display | < 100ms from video element mount | `poster` attribute + `preload="auto"` |
| Scroll-scrub seek | Keyframe every 0.5s (15 frame GOP) | FFmpeg `-g 15 -keyint_min 15` |
| Seek latency | < 50ms per seek operation | `video.currentTime` JS benchmark |
| Safari HLS fallback | Verify non-HLS `<video>` works | Direct MP4 source test |
| Mobile performance | No frame drops at 30fps playback | Chrome DevTools Performance panel |
| Reduced motion | Video paused, shows poster frame | `prefers-reduced-motion` media query |
| Desktop 1440px | Visual fills hero without pixelation | CSS `object-fit: cover` |
| Mobile 390px | Acceptable at lower resolution | Serve 960×540 variant via `<source media="">` |

### Frame-Sequence Comparison

Also export the 120–180 frames as individual PNGs for testing a CSS/JS frame-sequence approach:

```bash
# Extract frames
ffmpeg -i output-h264.mp4 -vf "scale=960:540" frames/frame-%04d.png

# Measure total sequence size
du -sh frames/
```

Compare:
- **Video approach:** ~400–800KB, hardware-decoded, native seek
- **Frame sequence:** ~2–8MB (JPEG/WebP optimized), JS-driven `requestAnimationFrame`, scroll-synced
- **Decision criteria:** If video is < 3× the size of equivalent quality frames AND seek latency is acceptable, prefer video. If frame-sequence is needed for pixel-perfect scroll sync, accept the size trade-off.

### GSAP ScrollTrigger Integration Test

```javascript
// Test: scrub video playback via ScrollTrigger
ScrollTrigger.create({
  trigger: '.hero-video-container',
  start: 'top top',
  end: 'bottom top',
  scrub: 1,
  onUpdate: (self) => {
    video.currentTime = self.progress * video.duration;
  }
});
```

Benchmark:
- Measure `currentTime` seek accuracy at 60fps scroll
- Log frame drops during fast scroll
- Compare against `requestVideoFrameCallback` approach
- Document Safari-specific seek behavior (known issue: Safari requires keyframes for accurate seek)

---

## 6. PERFORMANCE BUDGET

### Media Budgets

| Asset | Budget | Justification |
|-------|--------|---------------|
| Hero video/animation total | ≤ 250KB initial | DESIGN.md: `hero_media_initial_kb_target: 250` |
| Total above-fold transfer | ≤ 700KB | DESIGN.md performance budget |
| Individual video file (if used) | ≤ 600KB | Allows room for poster + shell |
| Frame sequence (if used) | ≤ 1.2MB total | 120 frames × ~10KB WebP each |
| WebGL shader (existing) | 0KB additional download | Already inline in JS bundle |
| CSS animation (existing) | 0KB additional download | Already in stylesheet |

### Core Web Vitals Targets

| Metric | Budget | Current baseline |
|--------|--------|-----------------|
| Largest Contentful Paint | ≤ 2.5s mobile | Must measure |
| Interaction to Next Paint | ≤ 200ms | Must measure |
| Cumulative Layout Shift | ≤ 0.1 | Existing dimension reservation |

### Animation Performance

| Constraint | Budget |
|------------|--------|
| Pinned cinematic sections | ≤ 4 total (DESIGN.md) |
| Total ScrollTrigger instances | ≤ 24 (DESIGN.md) |
| Active animation layers (simultaneous) | ≤ 3 per viewport |
| Hero animation frame rate | ≥ 30fps (60fps preferred) |
| Main-thread work during scroll animation | ≤ 4ms per frame |
| Composite layers during pinned section | ≤ 8 |

### Reduced Motion Budget

| Requirement | Specification |
|-------------|---------------|
| All continuous motion | Paused or removed |
| Pinning | Removed — document flows normally |
| Parallax | Removed |
| Autoplay video | Paused on poster frame |
| Entrance reveals | Instant (no delay, no translate) |
| Information parity | 100% — all content visible without motion |
| Alternative compositions | Independently designed, not broken fallbacks |

### Lazy Loading Strategy

| Asset | Loading Strategy |
|-------|-----------------|
| Hero WebGL/CSS animation | Inline (critical path) |
| Hero video (if used) | `preload="auto"` with poster, load on idle |
| Below-fold GSAP modules | Dynamic import on IntersectionObserver |
| Pinned scrollytelling | Code-split, load when 1 viewport above trigger |
| Illustration SVG compositions | SSR (inline, no separate network request) |
| Heavy diagram animations | Load when section enters viewport margin |

### Mobile-Specific Budgets

| Constraint | Desktop | Mobile |
|------------|---------|--------|
| Animation density | Full | Reduced (fewer particles, simpler transitions) |
| Video resolution | 1920×1080 | 960×540 (via `<source media>`) |
| WebGL pixel ratio cap | 1.55 | 1.15 (already implemented) |
| Pinned section scroll height | 4–5vh | 0 (unpin, sequential panels) |
| Simultaneous animated layers | 3 | 2 |
| Background complexity | Full grid + glow | Grid only, reduced opacity |

---

## 7. TOOL DECISION

### Already Available

| Tool | Status | Location |
|------|--------|----------|
| **Framer Motion** | Installed (`^12.23.26`) | `package.json` — used in `Reveal.tsx` and legacy components |
| **FFmpeg 8.1.1** | Installed system-wide | `/opt/homebrew/bin/ffmpeg` — full codec support including libx264, libvpx-vp9, VideoToolbox |
| **Node 22** | Available via nvm | Required for HyperFrames, runs separately from app |
| **HyperFrames** | Available via Codex plugins | `brain/operations/system-configs/codex/.tmp/plugins/plugins/hyperframes/` — `npx hyperframes` |
| **Open Design** | Installed | `/Users/Office/.local/bin/open-design` — visual design workbench |
| **WebGL (custom shader)** | Implemented | `MemoryLaserField.tsx` — production-ready hero background |
| **CSS Animations** | Implemented | `prochat-home.css` — laser field, node convergence, orbit drift |
| **SVG Illustration System** | Implemented | `components/illustrations/` — full primitive library |
| **Lucide React Icons** | Installed | `package.json` — consistent icon system |

### Definitely Needed (for premium upgrade)

| Tool | Purpose | Install method |
|------|---------|----------------|
| **GSAP + ScrollTrigger + @gsap/react** | Pinned scrollytelling, scroll-driven transitions, section choreography | `npm install gsap @gsap/react` — DESIGN.md already specifies this as the canonical cinematic scroll stack |
| **Intersection Observer (native)** | Lazy-load triggers, section entry detection | No install — browser API |

### Conditional (depends on owner concept choice)

| Tool | Condition | Purpose |
|------|-----------|---------|
| **HyperFrames authoring** (POC only) | If hero video concept selected | Render 4–6s ambient video outside app tree |
| **Additional FFmpeg encoding** | If hero video concept selected | Produce H.264 + VP9 variants |
| **GSAP MotionPath** | If "Evidence Chain" scrollytelling selected | Animate elements along SVG paths |
| **GSAP DrawSVG** (Club plugin) | If arrow-draw animations needed | Stroke-dasharray animation helper (achievable without, using CSS) |

### Rejected

| Tool | Reason |
|------|--------|
| **Three.js / React Three Fiber (R3F)** | DESIGN.md explicitly prohibits as foundational dependency. Existing WebGL shader is sufficient. No 3D objects needed. |
| **Blender** | Not installed. No 3D asset pipeline needed. All visuals are 2D SVG/CSS/WebGL. |
| **Lottie / Rive** | DESIGN.md explicitly prohibits. |
| **Image sequences (as primary approach)** | Size budget violation. Video or WebGL preferred. |
| **Smooth-scroll library** | DESIGN.md: "Do not add a smooth-scroll engine by default." Native scroll only. |
| **Scroll hijacking** | Prohibited by DESIGN.md and brand-spec. |
| **Framer Motion for new cinematic work** | DESIGN.md: GSAP is the canonical cinematic stack. Framer retained only for existing components; must not mix both in one component. |

---

## 8. DESIGN AUTHORITY MIGRATION

### Current Authority Chain

```
DESIGN.md (line 9–17):
  "Public homepage template override — 2026-07-18"
  → docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md
  → Nexus automation landing page template is active visual source

DESIGN.md (line 21):
  "The prior generated-video and frame-scrub homepage direction is frozen optional research."
```

### Proposed DESIGN.md Change (DRAFT — DO NOT APPLY)

Replace lines 9–21 with:

```markdown
## Public homepage visual authority — [DATE PENDING OWNER APPROVAL]

The owner-approved public homepage visual and motion architecture is defined in:

```text
docs/research/HOMEPAGE_DESIGN_MOTION_SPECIFICATION.md  (research/concepts)
docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md       (structural template — retained)
```

The homepage uses a layered authority model:

1. **Primary structural/pacing reference:** The current Cloudflare homepage governs section structure, pacing, spatial composition, density, typography hierarchy, visual weight, cinematic motion quality, and transition rhythm.
2. **Secondary/historical component grammar:** The Nexus-derived dark template remains useful for selected component grammar, dark-surface language, cards, and grid ideas, but it is not the homepage structural or motion authority.
3. **Motion architecture:** GSAP + ScrollTrigger is the approved candidate for cinematic scroll interactions. The motion taxonomy, performance budgets, and reduced-motion requirements are defined in the Design & Motion Specification.
4. **Hero concept:** A2 — Review Gate (owner-approved).
5. **Signature scrollytelling:** B2 — Context Assembly (owner-approved).

Generated-video and frame-scrub work is re-enabled only for the approved isolated A2/B2 proof-of-concept. It is not authorized for the live homepage until the owner approves the visual POC.

Operational rule (unchanged):

> Structure first. Evidence visible. Actions explicit. Decoration restrained.
```

### What This Changes

- Cloudflare becomes the primary homepage structure/pacing/motion-quality reference
- Nexus becomes secondary/historical component-grammar reference material
- Records A2 Review Gate + B2 Context Assembly as owner-approved visual concepts
- Re-enables generated-video/frame-scrub work only for the isolated POC
- Requires separate owner approval before any live homepage implementation

---

## 9. IMPLEMENTATION PHASES

### Phase 1: Research (THIS DOCUMENT) ✓

- Cloudflare structural teardown
- ProChat content mapping
- Motion taxonomy classification
- Cinematic concept storyboards (3 hero + 3 scrollytelling)
- Technical POC specification
- Performance budget definition
- Tool decision matrix
- Design authority migration draft

**Deliverable:** This specification document  
**Risk:** None — no code or system changes  
**Duration:** Complete

---

### Phase 2: Visual Direction (COMPLETE)

**Owner-approved decisions:**
1. Hero cinematic: A2 — Review Gate
2. Signature scrollytelling: B2 — Context Assembly
3. Cloudflare is the primary homepage structure/pacing/motion-quality reference
4. Nexus is secondary/historical component-grammar reference material
5. Generated-video/frame-scrub work is permitted only inside the isolated POC until further owner approval

**Deliverable:** `docs/research/VISUAL_DIRECTION_A2_B2.md`  
**Risk:** Low — decisions only, no live implementation  
**Duration:** Complete

---

### Phase 3: Technical POC

**Scope:**
- Install GSAP + ScrollTrigger + @gsap/react in the app
- Build one isolated pinned scrollytelling prototype (selected concept) in a `/poc` route
- If video concept selected: author 4–6s HyperFrames composition in separate Node 22 environment
- Run FFmpeg encode pipeline
- Benchmark scroll-seek performance
- Test desktop/mobile/Safari/reduced-motion

**Deliverable:** Working POC at `/poc` route + benchmark results  
**Risk:** Medium — first production GSAP integration; may surface performance issues  
**Duration:** 1–2 focused sessions

---

### Phase 4: Owner Review of POC

**Owner evaluates:**
- Visual quality vs. reference standard
- Motion feel and timing
- Performance metrics
- Mobile behavior
- Reduced-motion fallback quality

**Deliverable:** POC approval or iteration notes  
**Risk:** Low  
**Duration:** Owner-paced

---

### Phase 5: DESIGN.md Approval

**Scope:**
- Apply the design authority migration to DESIGN.md
- Update brand-spec.md if motion tokens change
- Update HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md to reference new motion layer

**Deliverable:** Committed DESIGN.md changes  
**Risk:** Low — text changes only  
**Duration:** < 1 session

---

### Phase 6: Homepage Implementation

**Scope (sequential, section by section):**
1. GSAP scroll infrastructure (plugin registration, cleanup patterns, React integration)
2. Hero animation refinement (selected concept integration)
3. Card cluster entrance choreography
4. Section reveal system (coordinated heading → body → visual per chapter)
5. Pinned scrollytelling section (selected concept, full build)
6. Section transitions (gradient continuity, visual pacing)
7. Mobile-specific motion reduction
8. Reduced-motion alternative compositions

**Deliverable:** Production-ready homepage with motion architecture  
**Risk:** High — largest implementation phase; visual quality must match reference standard  
**Duration:** 3–5 focused sessions

---

### Phase 7: QA & Validation

**Scope:**
- Responsive screenshots: 360, 390, 768, 1024, 1280, 1440, 1728px
- Performance audit (Lighthouse, CWV)
- Accessibility audit (axe, keyboard, screen reader, reduced motion)
- Cross-browser: Chrome, Safari, Firefox, Edge
- Cross-device: iOS Safari, Android Chrome
- Visual comparison against Cloudflare quality reference
- Scroll behavior regression testing
- Memory leak / cleanup validation for GSAP instances

**Deliverable:** Validated homepage passing all quality gates  
**Risk:** Medium — may surface issues requiring Phase 6 iteration  
**Duration:** 1–2 sessions

---

### Phase 8: Propagation

**Scope:**
- Document GSAP patterns for reuse on product pages
- Extract shared scroll utilities if patterns repeat
- Update product pages (Memory, Memory for QA, Workbench) with consistent motion language if approved
- Archive this research document as completed

**Deliverable:** Consistent motion across public surfaces  
**Risk:** Low — optional extension  
**Duration:** Ongoing

---

## FINAL REPORT

```
RESEARCH: COMPLETE
VISUAL DIRECTION: A2 REVIEW GATE + B2 CONTEXT ASSEMBLY APPROVED
HOMEPAGE CODE: UNCHANGED
DEPENDENCIES: UNCHANGED
PRODUCTION: UNCHANGED
NEXT OWNER DECISION: APPROVE / REVISE VISUAL STYLEFRAMES + TECHNICAL POC
```
