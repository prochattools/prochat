<!-- GENERATED FILE - DO NOT EDIT -->
---
title: FormatActionLabelNode
description: FormatActionLabelNode function extracted from src/helpers/action-label.tsx.
category: boilerplate
slug: formatactionlabelnode
order: 100
keywords:
  - prokit
  - api
  - formatActionLabelNode
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/helpers/action-label.tsx
generatedAt: 2026-03-10T23:47:09.855Z
---

# FormatActionLabelNode

## Overview
Auto-generated API reference for formatActionLabelNode.

## Source
- File: `src/helpers/action-label.tsx`
- Kind: `function`

## Definition
```ts
export function formatActionLabelNode(node: ReactNode): ReactNode {
  if (typeof node === 'string') {
    return renderActionLabel(node)
  }

  if (typeof node === 'number') {
    return renderActionLabel(String(node))
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <Fragment key={`action-label-${index}`}>{formatActionLabelNode(child)}</Fragment>
    ))
  }

  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>

    if (element.props.children === undefined) {
      return element
    }

    return cloneElement(element, undefined, formatActionLabelNode(element.props.children))
  }

  return node
}
```
