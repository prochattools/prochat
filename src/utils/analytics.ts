type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

const isDev = process.env.NODE_ENV === 'development'

export const trackEvent = (name: string, payload: AnalyticsPayload = {}) => {
	if (typeof window === 'undefined') return

	const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void })
		.gtag
	if (typeof gtag === 'function') {
		gtag('event', name, payload)
		return
	}

	const plausible = (
		window as typeof window & {
			plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void
		}
	).plausible
	if (typeof plausible === 'function') {
		plausible(name, { props: payload })
		return
	}

	const analyticsTrack = (
		window as typeof window & {
			analytics?: { track?: (event: string, props?: AnalyticsPayload) => void }
		}
	).analytics?.track
	if (typeof analyticsTrack === 'function') {
		analyticsTrack(name, payload)
		return
	}

	if (isDev) {
		console.debug('[analytics]', name, payload)
	}
}
