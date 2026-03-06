'use client'

import { useEffect, useRef } from 'react'

type KeyboardNavigationHandler = (event: KeyboardEvent) => void

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  const tagName = target.tagName.toLowerCase()
  if (target.isContentEditable) return true

  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    target.getAttribute('role') === 'textbox'
  )
}

export function useKeyboardNavigation(
  handler: KeyboardNavigationHandler,
  enabled = true,
) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!enabled) return

    const listener = (event: KeyboardEvent) => {
      handlerRef.current(event)
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [enabled])
}

export { isEditableTarget }
