# ProChat Notice (built on ProKit)

ProChat is the **SaaS boilerplate built on the ProKit engine** for building SaaS apps.

It is intentionally lean: ProKit ships the SaaS engine only (auth, billing wiring, database lifecycle, runtime deploy gate), and ProChat keeps it focused—no marketing site or SEO/blog/content systems.

Production deploys are tag-gated. Provisioning + migrations run automatically via the runtime deploy gate; do not run ad-hoc database commands in production.
