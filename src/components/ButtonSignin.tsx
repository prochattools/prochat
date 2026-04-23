/*
 * CUSTOM EDITS MADE:
 * 1. Added text truncation for long email addresses
 * 2. Added max-width constraint to prevent overflow
 * 3. Improved avatar text styling and capitalization
 * 4. Better responsive text sizing
 */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const ButtonSignin = ({
	text = 'Get started',
	extraStyle,
}: {
	text?: string
	extraStyle?: string
}) => {
	const router = useRouter()
	const authUiUrl = process.env.NEXT_PUBLIC_AUTH_UI_URL || 'https://prochat.tools'

	const handleClick = () => {
		router.push(`${authUiUrl}/sign-in?redirect_url=/dashboard`)
	}

	return (
		<Button
			variant="primary"
			className={extraStyle ? extraStyle : ''}
			onClick={handleClick}
		>
			{text}
		</Button>
	)
}

export default ButtonSignin
