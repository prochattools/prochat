'use client'

import { MouseEvent } from 'react'
import { trackEvent } from '@/utils/analytics'

type TrackedOutboundLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	eventName?: string
	eventPayload?: Parameters<typeof trackEvent>[1]
}

const TrackedOutboundLink = ({
	eventName = 'cta_click',
	eventPayload = {},
	onClick,
	...props
}: TrackedOutboundLinkProps) => {
	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		trackEvent(eventName, eventPayload)
		if (onClick) {
			onClick(event)
		}
	}

	return <a {...props} onClick={handleClick} />
}

export default TrackedOutboundLink
