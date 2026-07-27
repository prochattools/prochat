import { brand } from '@/lib/brand'

type LogoProps = {
	isLarge?: boolean
	scale?: number
}

const LOGO_ASSET = '/logo/logo-wordmark.svg'

const Logo = ({ isLarge = false, scale = 1 }: LogoProps) => {
	const baseWidth = isLarge ? 200 : 160
	const baseHeight = isLarge ? 61 : 49
	const width = Math.round(baseWidth * scale)
	const height = Math.round(baseHeight * scale)
	const maskStyles = {
		WebkitMaskImage: `url(${LOGO_ASSET})`,
		maskImage: `url(${LOGO_ASSET})`,
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
			className="pc-logo-wordmark relative inline-flex shrink-0"
			style={{ width, height }}
		>
			<span
				aria-hidden="true"
				className="absolute inset-0 bg-white"
				style={maskStyles}
			/>
			<span
				aria-hidden="true"
				className="absolute inset-0"
				style={{
					...maskStyles,
					backgroundImage: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.primaryStrong})`,
					clipPath: 'inset(0 69% 0 0)',
				}}
			/>
		</span>
	)
}

export default Logo
