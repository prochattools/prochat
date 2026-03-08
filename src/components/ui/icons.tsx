import { FeatureIcon } from '@/app/kits/saaskit/_components/FeatureIcon'

import { cn } from '@/helpers/utils'

type HeroCheckIconProps = {
  className?: string
}

export function HeroCheckIcon({ className }: HeroCheckIconProps) {
  return <FeatureIcon name="check-green" className={cn('h-4 w-4 text-green-600', className)} />
}
