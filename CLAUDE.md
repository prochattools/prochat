# CLAUDE.md — prochat

## Purpose
Claude Code instructions for the prochat repo.

## Workflow
- Work only within this repo unless explicitly told otherwise.
- Prefer surgical changes over broad rewrites.
- Before major structural changes, inspect and explain the proposed plan.

## Architecture
[To be filled in as project-specific context is established.]

## Commands
[To be filled in as project-specific context is established.]

## Memory
Use this file for repo-specific decisions, commands, and constraints.
Use `decision-log.md` (if present) for confirmed architecture and workflow decisions only.

## AI Memory

This repo uses a lightweight file-based AI memory system.

- `.ai/current.md` — short-term resumable session handoff; overwritten each session
- `.ai/handoffs/` — archive of timestamped past handoffs
- `decision-log.md` — long-term durable decisions only; append-only

Use `/handoff resume` to load context at session start.
Use `/handoff pause` to write a compressed handoff at session end.
Use `/handoff setup` to initialize this system in a new repo.
