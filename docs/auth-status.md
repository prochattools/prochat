# Authentication status

Status: public browser-flow auth is active; internal runtime session authorization is deferred and fail-closed.

## Active behavior

Sign-in/sign-up pages create Ory browser flows using:

- `NEXT_PUBLIC_ORY_PUBLIC_URL`
- `NEXT_PUBLIC_AUTH_UI_URL`

This supports the shared ProChat authentication UI and Ory-hosted identity flow.

## Deferred internal authorization

The repository does not yet implement authenticated Ory session retrieval for runtime authorization inside:

- `/admin/**`
- `/api/projects`
- Make-related internal API routes
- n8n-related internal API routes
- related project/scenario internal endpoints covered by security tests

Those routes intentionally return HTTP 501, a misconfigured state, or another fail-closed response. This is deliberate hardening, not a production outage.

`ADMIN_EMAILS` and `ADMIN_USER_IDS` define future allowlist metadata only. They do not authenticate a request without a validated Ory session.

## Why the boundary stays closed

Enabling these internal routes safely requires all of the following in one separately approved implementation:

1. retrieve and validate the request's Ory session server-side;
2. normalize the authenticated user identity;
3. apply admin/tenant/project authorization;
4. preserve CSRF/cookie/session semantics required by Ory;
5. add positive and negative security tests;
6. update environment/integration documentation;
7. rerun production security and browser evidence.

Until that work is approved, do not bypass the 501/misconfigured behavior and do not infer identity from headers, query params, or allowlist configuration alone.

## Current decision

For the lean public-site release this capability is explicitly **deferred internal functionality**. Public canonical behavior does not depend on it, so no auth implementation is included in the post-release hygiene pass.
