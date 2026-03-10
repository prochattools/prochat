'use client'

import { MouseEvent } from 'react'
import { trackEvent, type AnalyticsEventName } from '@/utils/analytics'

type TrackedOutboundLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	eventName?: AnalyticsEventName
	eventPayload?: Parameters<typeof trackEvent>[1]
}

const TrackedOutboundLink = ({
	eventName = 'outbound_funnel_click',
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
