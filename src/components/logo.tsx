type LogoProps = {
  isLarge?: boolean
  scale?: number
}

const Logo = ({ isLarge = false, scale = 1 }: LogoProps) => {
  const baseHeight = isLarge ? 52 : 42
  const height = Math.round(baseHeight * scale)
  const markWidth = Math.round(height * 1.09)
  const wordSize = Math.max(16, Math.round(height * 0.5))

  const markMask = {
    WebkitMaskImage: 'url(/logo/logo-mark.svg)',
    maskImage: 'url(/logo/logo-mark.svg)',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  } as const

  return (
    <span
      role="img"
      aria-label="ProChat logo"
      className="pc-logo-wordmark inline-flex shrink-0 items-center"
      style={{ gap: Math.max(8, Math.round(height * 0.18)), height }}
    >
      <span
        aria-hidden="true"
        className="pc-logo-wordmark__mark block shrink-0"
        style={{
          ...markMask,
          width: markWidth,
          height,
          background: 'currentColor',
        }}
      />
      <span
        aria-hidden="true"
        className="pc-logo-wordmark__text whitespace-nowrap font-brand font-bold lowercase tracking-[-0.045em]"
        style={{ fontSize: wordSize, lineHeight: 1 }}
      >
        prochat
      </span>
    </span>
  )
}

export default Logo
