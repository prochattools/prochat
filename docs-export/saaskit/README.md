# Documentation Index

SaaSKit follows the same ProKit taxonomy for its core documentation, so every engineering, runtime, and deployment topic has a predictable home. Use this index to jump straight to the section you need.

## ProKit-aligned sections
- **overview** – this file. Use it to orient yourself, understand what lives in `docs-public/` vs `docs-private/`, and see the navigation order before you start clicking.  
- **development** – `docs-public/development.md` (local workflow, bootstrap scripts, verification steps, and how runtime variables map to stages).  
- **architecture** – `docs-public/architecture.md` (public/app layer boundaries, runtime contracts, and deployment model callouts).  
- **stack** – `docs-public/stack.md` (technology layers, runtimes, and how the multi-tenant/db story is implemented).  
- **database** – `docs-public/database.md` (Supabase Dev/Prod split, migration flow, and safety rules).  
- **deployment** – `docs-public/deployment.md` (recommended Supabase + Vercel path, migration behavior, and launch checklist).  
- **features** – `docs-public/features.md` (what ships in the boilerplate and which parts intentionally stay out).  
- **scripts** – `docs-private/scripts.md` (command reference and aliases; private because it mentions more sensitive operational scripts).  
- **optional-features** – `docs-public/integrations.md` (Clerk, Stripe, Resend, WordPress, and n8n, plus graceful fallbacks).  
- **git-workflow** – `docs-public/git-workflow.md` (branch expectations, release script, and tagging guidance).

## Supplemental (marketing / productivity)
- `docs-private/ai-prompts.md`: ready-to-use AI prompts for onboarding, branding swaps, and integration checks. Treat this as a marketing/messaging helper—keep it private until the team decides what to publish.

## How to use this index
1. Start with **overview** to understand the taxonomy above.
2. Follow **development** → **stack** → **database** → **deployment** when you set up a workspace for the first time.
3. Use **features**, **optional-features**, and **scripts** whenever you need to verify what functionality ships out of the box or how to run a command safely.
4. Reference **git-workflow** before cutting releases, and keep the AI prompt library handy when you need to accelerate routine writing tasks.
