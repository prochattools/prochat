'use client'

type ThemeTransitionOverlayProps = {
  backgroundColor: string
  fadeOut: boolean
}

export default function ThemeTransitionOverlay({
  backgroundColor,
  fadeOut,
}: ThemeTransitionOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`theme-overlay${fadeOut ? ' fade-out' : ''}`}
      style={{ backgroundColor }}
    />
  )
}
