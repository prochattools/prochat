import {
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'

export const ACTION_LABEL_CLASS_NAME =
  '!font-mono !font-normal uppercase tracking-[0.16em] [font-variant-ligatures:none]'
export const BUTTON_LABEL_CLASS_NAME = 'pc-action-label'

function splitFormattedActionLabel(label: string) {
  const formatted = formatActionLabel(label)
  const [actionWord, ...descriptorParts] = formatted.split(' - ')

  return {
    actionWord,
    descriptor: descriptorParts.join(' - ').trim(),
  }
}

export function formatActionLabel(label: string): string {
  const normalized = label
    .replace(/[→←↗↘↙↖]/g, ' ')
    .replace(/\s*[—–-]+\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!normalized) return label

  const [actionWord, ...descriptorWords] = normalized.split(' ')
  if (!actionWord) return label

  const descriptor = descriptorWords.join(' ').trim()
  return descriptor
    ? `${actionWord.toUpperCase()} - ${descriptor.toUpperCase()}`
    : actionWord.toUpperCase()
}

export function renderActionLabel(label: string) {
  const { actionWord, descriptor } = splitFormattedActionLabel(label)

  return (
    <span className={BUTTON_LABEL_CLASS_NAME}>
      <span className="font-semibold text-current">{actionWord}</span>
      {descriptor ? (
        <>
          <span aria-hidden="true" className="opacity-70">
            {' - '}
          </span>
          <span className="opacity-70">{descriptor}</span>
        </>
      ) : null}
    </span>
  )
}

export function getActionLabelHtml(label: string) {
  const { actionWord, descriptor } = splitFormattedActionLabel(label)

  if (!descriptor) {
    return `<span class="font-semibold text-current">${actionWord}</span>`
  }

  return [
    `<span class="font-semibold text-current">${actionWord}</span>`,
    `<span aria-hidden="true" class="opacity-50"> - </span>`,
    `<span class="opacity-50">${descriptor}</span>`,
  ].join('')
}

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

export function formatOptionalActionLabel(label?: string | null) {
  return label ? formatActionLabel(label) : label
}
