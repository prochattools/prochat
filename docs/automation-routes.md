# Automation Routes

This document describes the automation-oriented API surfaces currently implemented in ProChat.

These routes provision and manage Make and n8n-backed projects for authenticated users.

## Purpose

The automation layer lets the app:

- clone template scenarios or workflows
- activate or deactivate automation flows
- retrieve webhook links
- store resulting project metadata in Prisma

The core project model lives in the `Project` table in [prisma/system.prisma](/Users/Office/Repos/Organisation/ProChat/Web/prochat/prisma/system.prisma).

## Shared storage model

Project records are persisted through Prisma and used by the automation routes to track:

- user ownership
- automation type
- scenario or workflow ID
- webhook link
- assistant ID
- activation status

Relevant route:

- [projects/route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/projects/route.ts)

That route returns the current user’s stored projects.

## Make routes

Route group:

- `src/app/api/(make)/...`

### Scenario listing

Implementation:

- [scenarios/route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/(make)/scenarios/route.ts)

Purpose:

- returns available Make scenarios for the authenticated user session

Required env:

- `MAKE_API_KEY`
- `MAKE_TEAM_ID`
- `MAKE_API_URL`

### Scenario cloning for OpenAI assistant flows

Implementation:

- [openAIAssistant/route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/(make)/scenarios/openAIAssistant/route.ts)

Purpose:

- creates a Make connection
- creates a webhook
- reads a source scenario blueprint
- rewrites key modules in the flow
- creates a cloned scenario
- starts the cloned scenario
- stores a `Project` record with type `make`

Request payload currently includes:

- source scenario ID
- OpenAI API key
- OpenAI org value
- assistant ID

### Activation and status

Implementation:

- [active/route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/(make)/active/route.ts)

Purpose:

- POST toggles a project between active and inactive
- GET checks the active state for a project’s Make scenario

### Webhook link retrieval

Implementation:

- [link/route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/(make)/link/route.ts)

Purpose:

- returns the stored `webhookLink` for a given project

## n8n routes

Route group:

- `src/app/api/(n8n)/...`

### Workflow cloning for OpenAI assistant flows

Implementation:

- [openAIAssistant/route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/(n8n)/workflows/openAIAssistant/route.ts)

Purpose:

- creates n8n credentials
- reads a source workflow
- rewrites webhook and OpenAI node settings
- creates a cloned workflow
- activates the new workflow
- stores a `Project` record with type `n8n`

Required env:

- `N8N_API_KEY`
- `N8N_API_URL`
- `N8N_WEBHOOK_URL`

## Required integrations

### Make

- `MAKE_API_KEY`
- `MAKE_TEAM_ID`
- `MAKE_API_URL`

### n8n

- `N8N_API_KEY`
- `N8N_API_URL`
- `N8N_WEBHOOK_URL`

### Shared

- working ProChat auth context for route access
- working Prisma database connection

## Operational caveats

- these routes are authenticated and expect a current ProChat/Ory session
- Make and n8n provisioning both persist project metadata in the same Prisma model
- Make routes currently call fixed upstream API shapes and expect valid scenario IDs
- the n8n workflow clone route currently requires caller-supplied API key input for the cloned OpenAI credential
- activation state in the database is updated alongside upstream Make state for the Make toggle route
- link retrieval depends on `webhookLink` already being stored in the project record

## Related references

- [integrations.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/integrations.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [development.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/development.md)
