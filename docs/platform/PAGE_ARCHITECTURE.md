# ProChat Public Page Architecture

**Status:** canonical repository-local page map  
**Authority:** Mind `public-platform-strategy.md`

## Global hierarchy

Active canonical visual routes:

```text
/
/memory
/memory-qa
/workbench
/docs
/contact
/privacy
/terms
```

System routes such as not-found and error states remain outside the canonical visual-route count. `/docs` is canonical content with a deliberately specialized documentation shell.

Future candidate responsibilities, not currently implemented routes:

```text
/philosophy
/about
```

Existing route names may remain temporarily for compatibility, but every active route must map to one canonical page responsibility. Future candidates must not be linked as live destinations until implemented and approved.

## Shared shell

Canonical marketing, product, contact, and legal pages use the shared company shell. `/docs` uses a specialized documentation shell while preserving the same brand foundation, accessibility expectations, responsive behavior, canonical metadata, and return paths to the public platform.

Shared public expectations are:

- company identity and stable product navigation;
- semantic main content;
- appropriate primary action for the page responsibility;
- global or docs-appropriate footer and legal paths;
- canonical metadata;
- responsive and reduced-motion behavior;
- analytics events where approved.

Protected, no-shared-shell, and temporary legacy routes remain separate classifications and are not evidence of canonical-shell inconsistency.

## Page contracts

### Homepage

Primary audience: first-time visitors and qualified product prospects.  
Primary job: explain ProChat, establish Memory as flagship, and route to Memory for QA.  
Primary CTA: Explore ProChat Memory for QA.

### Memory

Primary audience: visitors evaluating the flagship model.  
Primary job: explain reusable project memory, trust, local ownership, retrieval, and current availability.  
Primary CTA: Explore Memory for QA.

### Memory for QA

Primary audience: individual QA testers.  
Primary job: demonstrate the recurring-failure workflow and qualify beta interest.  
Primary CTA: Join the selected QA beta.

### Workbench

Primary audience: developers, builders, technical founders, and advanced ChatGPT users.  
Primary job: explain guarded local project work.  
Primary CTA: Explore or request Workbench access according to current availability.

### Philosophy

Primary audience: visitors evaluating company beliefs and trust.  
Primary job: explain the company philosophy.  
Primary CTA: Explore ProChat Memory.

### About

Primary audience: partners, testers, and visitors seeking company context.  
Primary job: present ProChat as the company and Steve as QA Engineer and Founder.  
Primary CTA: Contact ProChat.

### Contact

Primary audience: beta applicants, Workbench interest, partners, and general enquiries.  
Primary job: route enquiry type clearly and collect minimal necessary data.

### Privacy and Terms

Primary job: provide accurate, versioned, readable legal information.  
Motion: minimal.  
Required metadata: effective date, last updated, contact path.

### Documentation entry

Primary job: route visitors to current product documentation and version status without exposing stale product directions as current.

### 404 and error states

Primary job: explain what happened, preserve company tone, and route visitors to current pages.

## Navigation

Current top-level destinations:

```text
Memory
Memory for QA
Workbench
Documentation
Contact
```

`Philosophy` and `About` remain future candidate responsibilities and must not appear as live destinations until their routes are implemented and approved. Use the footer for Contact, Privacy, Terms, GitHub, LinkedIn, and deeper resources that resolve to active destinations.

## Footer architecture

Columns:

- company statement;
- products;
- company;
- resources;
- legal;
- connect.

The footer must not expose legacy products or dead routes.

## Page completion checklist

Each page requires:

- canonical copy;
- claim register;
- visual story;
- primary audience and action;
- metadata;
- desktop/mobile/reduced-motion design;
- accessibility validation;
- performance validation;
- visual regression baselines;
- route and redirect decision;
- owner and review trigger.
