---
name: "✅ New SaaS Project Checklist"
about: "Checklist for setting up a new SaaS project from boilerplate-saas"
title: "New SaaS Setup"
labels:
 - "setup"
assignees: []
---

## New SaaS Project Setup Checklist
- [ ] Created repo from the SaaSKit template
- [ ] Cloned repo locally
- [ ] Provisioned a Postgres database (Supabase or any managed Postgres)
- [ ] Added required env vars to `.env` (at minimum: `APP_SLUG`, `DATABASE_URL`, `SYSTEM_DATABASE_URL`, `SHADOW_DATABASE_URL`)
- [ ] (Optional) Added optional feature env vars (for example `RESEND_API_KEY`, `WP_REST_ENDPOINT`, Clerk, Stripe)
- [ ] Configured DNS + TLS for your app domain
- [ ] Set up Dokploy app with tag-gated deploys 
- [ ] Deployed to Dokploy via release tag
- [ ] Verified `/api/health` endpoint works
- [ ] Updated `README.md` project name (keep `package.json` as-is; it is the ProKit engine package)
