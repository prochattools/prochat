# ProKit Notice

ProKit is ProChat’s **developer core boilerplate** for building SaaS apps.

It is intentionally lean: ProKit ships the SaaS engine only (auth, billing wiring, database lifecycle, runtime deploy gate), and does **not** include a marketing site or SEO/blog/content systems.

Production deploys are tag-gated. Provisioning + migrations run automatically via the runtime deploy gate; do not run ad-hoc database commands in production.

