# ProChat Notice (built on the ProKit engine)

ProKit is the core SaaS engine maintained and sold by ProChat (founded by Steve Westhoek, info@prochat.tools). SaaSKit and WaaSKit are packaged offerings built on the same ProKit engine; this repo is the bare ProKit boilerplate.

The engine is intentionally lean: auth, billing wiring, database lifecycle, and the runtime deploy gate—no marketing layer or SEO/blog/content systems.

Production deploys are tag-gated. Provisioning + migrations run automatically via the runtime deploy gate; do not run ad-hoc database commands in production.
