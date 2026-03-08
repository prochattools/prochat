'use client'

type ThemeRadialTransitionProps = {
  active: boolean
  fadeOut: boolean
}

export default function ThemeRadialTransition({
  active,
  fadeOut,
}: ThemeRadialTransitionProps) {
  return (
    <div
      aria-hidden="true"
      className={`theme-radial-overlay${active ? ' active' : ''}${fadeOut ? ' fade-out' : ''}`}
    />
  )
}
