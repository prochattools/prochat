# PROKIT_REWRITE_PLAN.md

## 0. Purpose & Constraints

**Goal:**  
Transform the existing boilerplate into **ProKit**, an internal ProChat product, with:

- Completely new naming and branding.
- Rewritten documentation and comments.
- Preserved **features and behavior** (same stack, same infra, same flows).
- Cleaner structure and DX tailored to Steve / ProChat.

**Non-negotiables:**

- **Tech stack stays the same:**
  - Next.js + TypeScript
  - TailwindCSS + shadcn/ui
  - Clerk
  - Supabase Postgres + Prisma
  - Stripe
  - Resend
  - n8n integration
- **Features stay the same:**
  - Multi-tenant app model
  - System database + tenant schema pattern
  - DB scripts (`db:init`, `db:migrate:*`, `db:cleanup`)
  - Dev/prod infra assumptions (Supabase, Dokploy, etc.)
- **Allowed to change:**
  - File/folder structure (within reason)
  - Namespaces, component names, internal APIs
  - Documentation text and layout
  - Internal comments and code style

Each phase below is designed to be executed by Codex **separately**, in order.

---

## Phase 1 – Baseline Snapshot & Invariants

**Goal:**  
Lock in what **must not change** functionally, and take a snapshot so regressions can be spotted.

### Tasks

1. Create `docs/PROKIT_INVARIANTS.md` with:
   - List of required environment variables and their semantics.
   - Required npm/pnpm scripts and their expected behavior.
   - Core runtime assumptions:
     - System DB + tenant schemas.
     - How tenants are created and cleaned.
     - How auth, billing, emails, and n8n hooks work at a high level.

2. Document the critical flows:
   - New user signup → workspace creation → dashboard access.
   - Workspace / tenant DB creation / migration.
   - Subscription flow (Stripe).
   - Example feature CRUD (whatever “core resource” currently is).
   - Tenant cleanup flow.

3. (Optional) Add a tiny smoke test file (if not present) that hits:
   - `/` (landing or app entry).
   - Auth pages.
   - Dashboard.
   - One core API route.

### Codex prompt template

> You are refactoring an existing SaaS boilerplate into an internal product called ProKit.  
> 1. Create a new file at `docs/PROKIT_INVARIANTS.md`.  
> 2. Read the existing README and SAAS_* docs. Summarize:  
>    - All required env vars and what they do.  
>    - All important npm/pnpm scripts and what they do.  
>    - The core flows: signup → workspace → tenant DB; billing; core CRUD; tenant cleanup.  
> 3. Do **not** change any code in this phase. Only document invariants.

---

## Phase 2 – Branding & Metadata Rebrand

**Goal:**  
Rebrand the project as **ProKit** / **ProChat**, without touching code behavior.

### Tasks

1. **Root README rename**
   - Update title and first paragraphs to:
     - Name: **ProKit**
     - Vendor: **ProChat**
     - Author: **Steve Westhoek**
   - Short description:
     - “ProKit is ProChat’s internal SaaS starter used to build micro-SaaS apps quickly.”

2. **Project metadata**
   - In `package.json` and any similar metadata:
     - `"name": "@prochat/prokit"` (or similar)
     - `"author": "Steve Westhoek"`
     - `"description": "ProKit – ProChat’s SaaS starter for micro-SaaS apps."`
   - Update `repository` / `homepage` fields if they exist.

3. **License & Notice**
   - Add `PROKIT_NOTICE.md` explaining:
     - ProKit is an internal ProChat boilerplate.
     - Copyright (c) 2025 Steve Westhoek / ProChat.
   - If there is an existing LICENSE, keep it if required, or clarify it in this notice (you control this).

4. **Header comments (minimal)**
   - In key infra files (e.g. DB scripts, main config), add a top comment:

     ```ts
     // ProKit – ProChat SaaS Starter
     // (c) 2025 Steve Westhoek / ProChat
     ```

### Codex prompt template

> Rebrand this repository as “ProKit”, an internal ProChat product.  
> 1. Update README title and intro to use the name “ProKit” and mention ProChat and author Steve Westhoek.  
> 2. Update `package.json` (and similar files) to use a package name like `@prochat/prokit`, with correct author and description.  
> 3. Add a `PROKIT_NOTICE.md` file that states that ProKit is a ProChat SaaS starter, copyrighted by Steve Westhoek / ProChat.  
> 4. Add a short ProKit header comment at the top of the core infra files (e.g. DB/scripts, main config files), without changing the functional code.

---

## Phase 3 – Documentation Rewrite & Restructure

**Goal:**  
Take all existing docs and rewrite them into ProKit-branded docs with new wording and better structure, preserving meaning and contracts.

**Input docs you have:**

- `README.md`
- `SAAS_DATABASE.md`
- `SAAS_DEV.md`
- `SAAS_INFRASTRUCTURE.md`
- `SAAS_TENANT_CLEANUP.md`
- `AI_GUIDELINES.md`
- `README_TEMPLATE.md`
- `README_TRUSTLESS.md`
- `SAAS_REFERENCE.md`

### Target structure

Move/rename into:

- `docs/PROKIT_OVERVIEW.md`
- `docs/PROKIT_DATABASE.md`
- `docs/PROKIT_DEV_GUIDE.md`
- `docs/PROKIT_INFRASTRUCTURE.md`
- `docs/PROKIT_TENANT_CLEANUP.md`
- `docs/PROKIT_AI_GUIDELINES.md`
- `docs/PROKIT_README_TEMPLATE.md`
- `docs/PROKIT_README_TRUSTLESS.md`
- `docs/PROKIT_REFERENCE.md`

### Tasks

1. **Overview**
   - Create `docs/PROKIT_OVERVIEW.md`:
     - High-level description of ProKit.
     - Links to other docs.
     - Short explanation of:
       - Tenant schema model
       - Infra expectations
       - Dev workflow
       - AI usage guidelines

2. **Database doc**
   - `SAAS_DATABASE.md` → `docs/PROKIT_DATABASE.md`
   - Rewrite text:
     - Keep same workflows and commands.
     - Use different phrasing, new headings where helpful.
     - Update all names to ProKit/ProChat.

3. **Dev guide**
   - `SAAS_DEV.md` → `docs/PROKIT_DEV_GUIDE.md`
   - Rewrite to:
     - Describe how to work with ProKit day-to-day (local dev, migrations, env setup, etc.).
     - Keep all actual steps and contracts.

4. **Infra doc**
   - `SAAS_INFRASTRUCTURE.md` → `docs/PROKIT_INFRASTRUCTURE.md`
   - Rewrite into a cleaner, ProKit-branded infra reference.

5. **Tenant cleanup doc**
   - `SAAS_TENANT_CLEANUP.md` → `docs/PROKIT_TENANT_CLEANUP.md`
   - Rewrite text, keep algorithm and safety instructions intact.

6. **AI guidelines**
   - `AI_GUIDELINES.md` → `docs/PROKIT_AI_GUIDELINES.md`
   - Rewrite instructions but preserve:
     - Invariants AI must respect.
     - Expectations for DB provisioning, naming, commands, etc.
   - Make it clearly ProKit-specific.

7. **Reference + templates**
   - `README_TEMPLATE.md` → `docs/PROKIT_README_TEMPLATE.md`
   - `README_TRUSTLESS.md` → `docs/PROKIT_README_TRUSTLESS.md`
   - `SAAS_REFERENCE.md` → `docs/PROKIT_REFERENCE.md`
   - Rebrand all copy, keep the intent and structure.

8. **Update links**
   - Make sure README and other docs link to the new doc paths.

### Codex prompt template

> We are converting all SAAS_* docs into ProKit docs.  
> 1. Move all SAAS_* and README_* docs into a `/docs` folder, renaming them to use the `PROKIT_*.md` naming pattern as follows:  
>    - SAAS_DATABASE.md → PROKIT_DATABASE.md  
>    - SAAS_DEV.md → PROKIT_DEV_GUIDE.md  
>    - SAAS_INFRASTRUCTURE.md → PROKIT_INFRASTRUCTURE.md  
>    - SAAS_TENANT_CLEANUP.md → PROKIT_TENANT_CLEANUP.md  
>    - AI_GUIDELINES.md → PROKIT_AI_GUIDELINES.md  
>    - README_TEMPLATE.md → PROKIT_README_TEMPLATE.md  
>    - README_TRUSTLESS.md → PROKIT_README_TRUSTLESS.md  
>    - SAAS_REFERENCE.md → PROKIT_REFERENCE.md  
> 2. For each file, **rewrite the text**: keep the meaning, commands, env vars, and workflows exactly the same, but change the wording, headings, and examples so that the text is new and ProKit-branded.  
> 3. Create a new `PROKIT_OVERVIEW.md` that describes ProKit at a high level and links to all of the other ProKit docs.  
> 4. Update README.md to link to the new `/docs/PROKIT_*.md` files instead of the old ones.

---

## Phase 4 – Code Naming & Structural Refactor (Behavior-Preserving)

**Goal:**  
Make the codebase feel like ProKit, without breaking behavior.

### Tasks

1. **Search & replace branding**
   - Replace any remaining occurrences of the old boilerplate name with “ProKit” or “ProChat” in:
     - Comments
     - Non-public constant names
     - Log messages
   - Do **not** touch external contracts (API URLs, env var names, etc.) unless you also update docs and infra.

2. **Internal naming cleanup**
   - Rename internal modules / folders from generic or old names to ProKit-style names where helpful:
     - e.g. `saas-infra` → `prokit-infra` for internal-only modules.
   - Keep imports consistent.

3. **Light structure reorg**
   - Optionally group ProKit-specific infra under something like `src/prokit/infra` or `scripts/prokit/`.
   - Do not alter the behavior of DB scripts, just their location/naming if you’re also updating references.

4. **Comment & style refresh**
   - Update comments to reflect the new docs and naming.
   - Harmonize code style (e.g. consistent import ordering, consistent naming conventions).

### Codex prompt template

> We now want to refactor code to use ProKit naming consistently, without changing behavior.  
> 1. Find all references in comments and internal identifiers to the old boilerplate name or brand and replace them with “ProKit” or “ProChat”, as appropriate.  
> 2. Keep public interfaces (env var names, public API routes, CLI commands) the same unless there is a clear, documented change.  
> 3. Where there are clearly internal modules or folders named after the old boilerplate, rename them to use a `prokit-*` naming convention and update all imports accordingly.  
> 4. Refresh comments so they refer to the ProKit docs and naming, but do not alter any runtime logic.

---

## Phase 5 – Dev Experience & Guardrails

**Goal:**  
Ensure ProKit is nice to work with and consistent.

### Tasks

1. **DX scripts**
   - Confirm:
     - `npm run dev` (or `pnpm dev`) works with minimal setup.
     - DB scripts behave exactly as documented.
   - Add helper scripts if useful:
     - `prokit:doctor` to check env vars.
     - `prokit:smoke` to run a small sanity check.

2. **Env example**
   - Update `.env.example`:
     - Ensure all required variables are listed.
     - Use ProKit wording in comments.

3. **Onboarding doc**
   - Create `docs/PROKIT_GETTING_STARTED.md`:
     - Clone repo.
     - Set env vars.
     - Run DB init/migrate.
     - Start dev server.
     - First login flow.

4. **Align docs with real behavior**
   - Make Codex cross-check:
     - Docs vs scripts vs code.
     - Update any mismatched instructions.

### Codex prompt template

> Improve ProKit’s developer experience based on the existing scripts and docs.  
> 1. Ensure `.env.example` includes all required env vars and ProKit-branded comments.  
> 2. Verify that the documented commands in the ProKit docs match actual `package.json` scripts and update the docs where they are out of sync.  
> 3. Add a `docs/PROKIT_GETTING_STARTED.md` file that describes, step-by-step, how to clone, configure, initialize the database, and run ProKit locally.  
> 4. Do not change any of the underlying behavior of the app; only align docs, comments, and helper scripts.

---

## Phase 6 – Final Sanity Pass

**Goal:**  
Make sure ProKit is internally consistent and free of legacy naming.

### Tasks

1. **Global search**
   - Search for old boilerplate name/brand.
   - Replace or remove any leftover references.

2. **Docs consistency pass**
   - Codex compares:
     - `PROKIT_INVARIANTS.md`
     - `PROKIT_OVERVIEW.md`
     - `PROKIT_DATABASE.md`
     - `PROKIT_DEV_GUIDE.md`
     - `PROKIT_INFRASTRUCTURE.md`
   - Fix contradictions or outdated steps.

3. **Smoke test**
   - Run your existing smoke tests and/or basic manual checklist:
     - Signup → workspace → dashboard.
     - Tenant DB creation / migration.
     - Subscription flow (test mode).
     - Example feature CRUD.
     - Tenant cleanup.

### Codex prompt template

> Perform a final ProKit consistency pass.  
> 1. Search the entire codebase and docs for any leftover occurrences of the old boilerplate name or branding and replace them with the correct ProKit / ProChat naming, or remove them if obsolete.  
> 2. Make sure that `docs/PROKIT_INVARIANTS.md`, `PROKIT_OVERVIEW.md`, `PROKIT_DATABASE.md`, `PROKIT_DEV_GUIDE.md`, and `PROKIT_INFRASTRUCTURE.md` describe the same behaviors and commands without contradictions.  
> 3. Do not modify the underlying behavior, only update wording and references to make the ProKit identity fully consistent.

---

## Summary

- **Phases 1–2:** Establish invariants and rebrand metadata.
- **Phase 3:** Rewrite & restructure docs into ProKit-branded documentation.
- **Phase 4:** Refactor code naming and comments to ProKit, behavior-preserving.
- **Phase 5:** Polish DX and onboarding.
- **Phase 6:** Sanity pass to ensure there is no leftover legacy naming and everything matches.

This plan assumes Codex is run **phase by phase**, with you manually verifying between phases that behavior is intact and that the ProKit identity is consistent.