import { useId } from 'react'
import Link from 'next/link'
import { cn } from '@/helpers/utils'
import { brand } from '@/lib/brand'

type BuiltWithBadgeProps = {
  className?: string
  href?: string
  label?: string
  productName?: string
}

function ProChatMark() {
  const gradientId = `built-with-badge-mark-${useId().replace(/:/g, '')}`

  return (
    <svg
      viewBox="0 0 393 360"
      aria-hidden="true"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={brand.colors.primary} />
          <stop offset="100%" stopColor={brand.colors.primaryStrong} />
        </linearGradient>
      </defs>
      <g transform="matrix(1,0,0,1,0.236135,0.396239)">
        <g transform="matrix(1,0,0,1,500,0)">
          <g transform="matrix(2.52192,0,0,2.52192,-864.134,-274.475)">
            <path
              d="M274.284 109.44 167.656 134.732C156.995 136.941 148.281 147.69 148.193 158.743L144.551 181.254C142.828 191.367 149.954 199.567 160.469 199.567H188.904L195.604 247.453C196.127 251.506 199.752 252.741 202.077 249.382L235.001 199.567H259.493C273.19 199.567 280.884 193.358 285.25 180.818L298.622 135.43C304.133 117.151 293.237 105.516 274.284 109.44Z"
              fill={`url(#${gradientId})`}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export function BuiltWithBadge({
  className,
  href,
  label = 'Build with',
  productName = 'SaaSKit',
}: BuiltWithBadgeProps) {
  const classes = cn(
    'inline-flex items-center gap-3 rounded-[14px] border border-border-subtle/80 bg-surface-elevated/80 px-4 py-2.5 shadow-sm backdrop-blur-sm',
    className,
  )

  const content = (
    <>
      <span className="!font-brand text-base font-normal tracking-[-0.03em] text-foreground/88">
        {label}
      </span>
      <span className="inline-flex h-6 w-[1.6rem] shrink-0 items-center justify-center">
        <ProChatMark />
      </span>
      <span className="!font-brand text-lg font-bold tracking-[-0.04em] text-foreground">
        {productName}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}

export default BuiltWithBadge
