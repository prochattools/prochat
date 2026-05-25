# Book Page Blueprint

Status: canonical plan for the ProChat `/book` page.

Last updated: 2026-05-25

## Goal

Create a clear, conversion-focused booking page where people can book Steve for practical AI help through Google Calendar Appointment Scheduling.

The page should feel like ProChat: structured, practical, calm, specific, and trustworthy.

## Booking system

Use Google Calendar Appointment Scheduling with the ProChat Google Workspace account:

- Account: `info@prochat.tools`
- Free call link: `https://calendar.app.google/t6Vo8dNsHCUYgH8N9`
- Paid call link: `https://calendar.app.google/ShqLs2jtiL4tNNUa9`

Do not build a custom scheduler in ProChat for this phase.

## Route

Recommended route:

- `/book`

Reason:

It is short, clear, and conversion-oriented.

## Offer 1 — Free call

Name:

- AI Fit Check

Duration:

- 15 minutes

Price:

- Free

Primary CTA:

- Book a free AI Fit Check

Purpose:

A short triage call for questions, doubts, worries, and deciding whether a focused setup session makes sense.

Description:

Bring your main question, problem, or goal. In 15 minutes we will clarify where you are stuck, what you want AI to help with, and whether a practical AI setup session is the right next step.

This call is not free implementation work. It is a fit check and direction call.

## Offer 2 — Paid session

Name:

- Personal AI Setup Session

Duration:

- 60 minutes

Price:

- $150

Secondary CTA:

- Book a 60-minute AI Setup Session

Purpose:

A focused 1:1 session to help someone configure their personal or business AI environment.

Description:

A practical 60-minute session for AI setup, automations, local tools, CLI setup, privacy/security basics, and a simple AI workflow plan after the call. This is for people who want help making AI useful in their work, business, or personal productivity setup.

## Included in the paid session

- answer questions, doubts, and worries
- help with practical AI usage
- help with automations where feasible inside the session
- help install local tools and CLIs where feasible
- help with privacy/security basics
- create a simple AI workflow plan after the call

## Not included in the 60-minute session

- full custom software development
- guaranteed business results
- complex automation builds that do not fit inside the hour
- enterprise security consulting
- legal, medical, or financial advice
- unlimited follow-up support
- remote control of the person's computer unless Steve explicitly decides otherwise
- extra implementation work beyond the 60 minutes

Boundary:

If the work cannot be completed during the 60-minute session, the person can hire Steve for additional scoped work separately.

## Preparation instructions

Ask people to prepare:

- their main plan, problem, or goal
- one clear outcome they want to achieve
- any tools/accounts they want to discuss
- examples of repetitive or confusing work they want AI to help with

Keep this short on the page. The booking form can collect more detail if needed.

## Page positioning

Hybrid personal/business positioning:

> Get practical help setting up AI for your work, business, or personal productivity.

The page should speak to:

- solo entrepreneurs
- small business owners
- normal people who want help using AI on their computer
- coaches, consultants, creators, and freelancers
- non-technical founders
- local businesses

## Credibility section

Mention ProChat OS as the credibility anchor, because it is the flagship strategy.

Suggested copy:

> I also build ProChat OS, ProChat's Agentic Workflow OS for turning messy inputs into structured work. The same practical, workflow-first approach is what I bring into these 1:1 setup sessions.

BuildFlow may be referenced only as secondary/internal context if needed. Do not make BuildFlow the credibility center or main offer.

## Recommended page sections

### 1. Hero

Headline:

- Get practical help setting up AI for your work.

Subtitle:

- Book a short fit check or a focused setup session for your business, computer, tools, automations, and personal AI workflow.

Primary CTA:

- Book a free AI Fit Check → `https://calendar.app.google/t6Vo8dNsHCUYgH8N9`

Secondary CTA:

- Book a 60-minute AI Setup Session → `https://calendar.app.google/ShqLs2jtiL4tNNUa9`

Hero checks:

- Free 15-minute fit check
- 60-minute setup session
- Practical AI workflow plan

### 2. Who this is for

Use cards:

- You want AI to be useful, not confusing.
- You want help setting up tools, automations, or local workflows.
- You want a calm expert to answer your questions and make a plan.

### 3. Choose a call

Two cards:

#### AI Fit Check

- 15 minutes
- Free
- Good for quick questions and deciding the next step
- CTA: Book a free AI Fit Check

#### Personal AI Setup Session

- 60 minutes
- $150
- Good for practical setup, tooling, automations, privacy/security basics, and a workflow plan
- CTA: Book a 60-minute AI Setup Session

### 4. What I can help with

Bullets:

- answer AI questions, doubts, and worries
- set up practical AI workflows
- install local tools and CLIs where appropriate
- help with automations that fit inside the session
- review privacy and security basics
- create a simple AI workflow plan after the call

### 5. What is not included

Keep boundaries clear:

- no full custom software build inside one session
- no guaranteed business results
- no complex automation build unless separately scoped
- no legal, medical, financial, or enterprise security advice
- no unlimited follow-up support

### 6. How to prepare

Ask for one thing:

> Bring your main plan, problem, or goal. The clearer the outcome, the more useful the call will be.

### 7. Credibility

Light BuildFlow/ProChat credibility section.

### 8. Final CTA

Repeat both booking links.

## Tone rules

Use:

- practical
- calm
- helpful
- direct
- trustworthy
- no hype

Avoid:

- pretending AI solves everything
- promising business outcomes
- sounding too technical for non-technical users
- making the free call sound like free implementation work
- making the paid call sound like unlimited custom development

## Analytics events

Recommended later:

- `booking_cta_click`
  - `call_type: 'ai_fit_check' | 'personal_ai_setup_session'`
  - `location: 'hero' | 'offer_card' | 'final_cta'`
  - `price: 'free' | '150_usd'`

## Acceptance criteria

- `/book` uses existing ProChat design patterns.
- The two Google Calendar links are used exactly.
- The page clearly separates free triage from paid implementation help.
- The $150 paid session has clear scope and boundaries.
- ProChat OS is the main credibility anchor.
- BuildFlow is mentioned only as secondary context if needed, not as the main offer.
- No custom booking backend is created.
