const GITHUB_USERNAME_PATTERN = /^[A-Za-z0-9-]{1,39}$/
const GITHUB_HOSTS = new Set(['github.com', 'www.github.com'])

function extractFromUrl(value: string): string {
	const raw = value.trim()
	if (!raw) {
		return ''
	}

	const urlCandidate =
		raw.startsWith('http://') ||
		raw.startsWith('https://') ||
		raw.startsWith('github.com/') ||
		raw.startsWith('www.github.com/')
			? raw.startsWith('http://') || raw.startsWith('https://')
				? raw
				: `https://${raw}`
			: ''

	if (!urlCandidate) {
		return ''
	}

	try {
		const parsed = new URL(urlCandidate)
		if (!GITHUB_HOSTS.has(parsed.hostname.toLowerCase())) {
			return ''
		}
		const firstPathSegment = parsed.pathname
			.split('/')
			.map(segment => segment.trim())
			.filter(Boolean)[0]
		return firstPathSegment || ''
	} catch {
		return ''
	}
}

export function parseGithubUsername(input: string): string {
	const fromUrl = extractFromUrl(input)
	const raw = (fromUrl || input).trim()
	if (!raw) {
		return ''
	}

	const withoutAt = raw.startsWith('@') ? raw.slice(1) : raw
	const firstSegment = withoutAt
		.replace(/^\/+/, '')
		.split('/')
		.map(segment => segment.trim())
		.filter(Boolean)[0]

	return firstSegment || ''
}

export function isValidGithubUsernameInput(input: string): boolean {
	const username = parseGithubUsername(input)
	return GITHUB_USERNAME_PATTERN.test(username)
}

export function normalizeGithubUsernameForComparison(input: string): string {
	return parseGithubUsername(input).toLowerCase()
}
