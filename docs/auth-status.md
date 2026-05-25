# ProChat Auth Status

- ProChat runtime does not use Clerk.
- Clerk shims and active imports have been removed.
- `@clerk/nextjs` has been removed from package dependencies.
- Ory is the intended authentication direction.
- Ory session validation is not fully implemented yet.
- Middleware is currently pass-through until Ory validation is implemented.
- Protected routes must not assume auth enforcement until Ory is complete.

## TODO

- define protected routes
- define Ory env vars
- implement Ory middleware/session validation
- implement route-level guards where needed
- add smoke tests for protected routes
- update deployment docs
- remove this temporary pass-through warning when Ory is active

## Legacy references

Any Clerk mention that remains in legacy boilerplate or generated docs is historical only and must not be read as ProChat runtime guidance.
