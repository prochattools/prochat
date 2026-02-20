import type { CSSProperties, HTMLAttributes } from 'react'

import { cn } from '@/helpers/utils'

type StitchIconProps = HTMLAttributes<HTMLSpanElement> & {
	name: string
}

export function StitchIcon({ name, className, style, ...props }: StitchIconProps) {
	const iconStyle: CSSProperties = {
		maskImage: `url(/stitch/icons/${name}.svg)`,
		WebkitMaskImage: `url(/stitch/icons/${name}.svg)`,
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
