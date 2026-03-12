import type { CSSProperties, HTMLAttributes } from 'react'

import { cn } from '@/helpers/utils'

type FeatureIconProps = HTMLAttributes<HTMLSpanElement> & {
	name: string
}

export function FeatureIcon({ name, className, style, ...props }: FeatureIconProps) {
	const iconStyle: CSSProperties = {
		maskImage: `url(/icons/system/${name}.svg)`,
		WebkitMaskImage: `url(/icons/system/${name}.svg)`,
		maskRepeat: 'no-repeat',
		WebkitMaskRepeat: 'no-repeat',
		maskPosition: 'center',
		WebkitMaskPosition: 'center',
		maskSize: 'contain',
		WebkitMaskSize: 'contain',
		...style,
	}

	return (
		<span
			aria-hidden
			{...props}
			className={cn('inline-block h-4 w-4 shrink-0 bg-current', className)}
			style={iconStyle}
		/>
	)
}
