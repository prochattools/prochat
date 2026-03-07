import React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/helpers/utils'
import { Button as CoreButton, type ButtonProps as CoreButtonProps } from '@/components/ui/button'

type MarketingButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass'
type MarketingButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps
  extends Omit<CoreButtonProps, 'variant' | 'size' | 'asChild'> {
  variant?: MarketingButtonVariant
  size?: MarketingButtonSize
  withArrow?: boolean
}

const VARIANT_MAP: Record<
  MarketingButtonVariant,
  NonNullable<CoreButtonProps['variant']>
> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  glass: 'secondary',
}

const SIZE_MAP: Record<
  MarketingButtonSize,
  NonNullable<CoreButtonProps['size']>
> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
}

const VARIANT_STYLE_MAP: Record<MarketingButtonVariant, string> = {
  primary: '',
  secondary: '',
  ghost: '',
  glass:
    'border-border-subtle bg-surface/70 shadow-surface backdrop-blur-md hover:bg-surface-soft',
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
  ...props
}) => {
  return (
    <CoreButton
      variant={VARIANT_MAP[variant]}
      size={SIZE_MAP[size]}
      className={cn(
        'group',
        VARIANT_STYLE_MAP[variant],
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </CoreButton>
  )
}
