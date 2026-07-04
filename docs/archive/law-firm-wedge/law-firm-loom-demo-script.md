# Law-Firm Loom Demo Script

Status: outreach asset for first law-firm validation campaign.

Last updated: 2026-05-24

## Source of truth

This script follows the mind-led ProChat OS strategy and the ProChat repo docs:

```text
docs/strategy.md
docs/prochat-os-go-to-market.md
docs/prochat-os-implementation-roadmap.md
docs/product-operating-map.md
```

Mind remains leading when conflicts appear.

## Purpose

Create a 60–90 second Loom that makes the law-firm wedge tangible.

The Loom should not sell the whole ProChat OS platform immediately. It should start a conversation about painful document/admin workflows.

## Core demo idea

```text
messy legal/client documents
→ MikeOSS legal document workspace
→ ProChat OS workflow layer
→ structured intake summary, missing-info checklist, tasks, and draft follow-up
```

## Safety rules

- Use fake/sample legal data only.
- Do not use real client files.
- Do not claim legal advice.
- Do not imply MikeOSS is ProChat-owned software.
- Do not promise full automation without human approval.
- Present ProChat OS as the workflow layer around the demo.

## Demo setup

Recommended domains:

```text
legal.prochat.tools      → MikeOSS frontend
legal-api.prochat.tools  → MikeOSS backend
```

Sample matter:

```text
Matter: Van Dijk Consulting Contract Dispute
```

Sample fake documents:

- client-intake-email.pdf
- services-agreement.pdf
- invoice-summary.pdf
- meeting-notes.pdf
- timeline-of-events.pdf
- missing-documents-note.pdf

Example demo questions:

- What is this matter about?
- What are the key dates?
- What documents are missing?
- What follow-up questions should the lawyer ask the client?
- Create a structured client intake summary.
- Create a missing-information checklist.

## Short Loom structure

Target length: 60–90 seconds.

```text
0–10s   Hook: messy client intake/admin problem
10–25s  Show messy document pack
25–45s  Show legal document workspace result
45–65s  Explain ProChat OS workflow layer around it
65–80s  Human approval and no-legal-advice trust note
80–90s  Discovery question / call to action
```

## Full script

### Opening hook

```text
Hi, I’m Steve from ProChat.

I’m testing a new workflow for document-heavy law firms.

The problem I’m looking at is not legal advice. It is the admin around client intake and document review: messy emails, PDFs, notes, forms, attachments, timelines, and follow-ups.
```

### Show messy inputs

```text
Here is a fake sample matter.

We have a client email, an agreement, invoice notes, meeting notes, a timeline, and a missing-documents note. This is the kind of scattered information that often has to be read, summarized, structured, and turned into next actions manually.
```

Visual:

- show folder or list of fake PDFs
- show file names clearly
- avoid real client names

### Show MikeOSS document workspace

```text
For the demo, I’m using an open-source legal document workspace called MikeOSS.

It gives us a private place to load the document pack, ask questions, and get document-grounded answers.
```

Visual:

- open `legal.prochat.tools`
- show project/matter
- show loaded fake documents

### Ask questions and show output

```text
For example, we can ask: what is this matter about, what are the key dates, and what information is still missing?

The useful part is not just the answer. The useful part is turning scattered documents into something structured that a lawyer or assistant can review quickly.
```

Visual:

- ask one or two questions
- show structured answer/citations if available
- show generated summary/checklist

### Introduce ProChat OS

```text
MikeOSS is only the document workspace.

The bigger system I’m building is ProChat OS: an Agentic Workflow OS that sits between messy inputs and the tools a business already uses.

Around a legal document workspace like this, ProChat OS can help prepare intake summaries, missing-information checklists, follow-up drafts, task lists, and status updates.
```

Visual:

- show simple diagram or say while showing structured outputs

### Human approval and trust

```text
The goal is not to replace legal judgment.

The goal is to reduce repetitive admin work and prepare structured outputs for human review. Anything sensitive can require approval before it is sent, updated, or routed.
```

### Discovery question

```text
I’m not trying to guess which workflow matters most from the outside.

I’m looking for one or two local law firms willing to tell me: which intake, document, or admin workflow takes too much time and feels like it should be automated?

If you have a workflow like that, I’d be interested to learn what it looks like.
```

## Ultra-short version

Use if the Loom needs to be closer to 45 seconds.

```text
Hi, I’m Steve from ProChat.

I’m testing a workflow for document-heavy law firms. This is not legal advice. It is about the admin around client intake and document review.

Here is a fake matter with messy emails, PDFs, notes, invoices, and timelines. In the demo, I’m using MikeOSS, an open-source legal document workspace, to load the documents and ask grounded questions.

The bigger system is ProChat OS: an Agentic Workflow OS that sits between messy inputs and the tools a business already uses. Around this document workspace, it can help prepare intake summaries, missing-information checklists, follow-up drafts, task lists, and status updates — with human approval first.

I’m looking for local law firms willing to tell me which document or admin workflow takes too much time and should be automated. Is there one workflow in your firm that fits that description?
```

## Visual checklist

Before recording:

- [ ] Use fake legal matter only.
- [ ] Confirm `legal.prochat.tools` loads.
- [ ] Confirm fake documents are loaded.
- [ ] Prepare one strong question and one strong output.
- [ ] Hide bookmarks, private tabs, notifications, and secrets.
- [ ] Keep the desktop clean.
- [ ] Record in one take if possible.
- [ ] End with a discovery question, not a hard sales pitch.

## Follow-up CTA

Use this after the Loom link in outreach:

```text
Is there one repetitive intake, document, or admin workflow in your firm that takes too much time and feels like it should be automated?
```

## What success looks like

The Loom works if the lawyer thinks:

```text
I have messy workflows like this.
This is not trying to replace legal judgment.
This could save admin time.
I can name a workflow worth discussing.
```
