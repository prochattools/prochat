import { createSign, randomUUID } from 'crypto'

import { parseGithubUsername } from './github-username'
import { ProductSlug } from './types'

type GithubConfig = {
	repoOwner: string
	repoName: string
}

type AddCollaboratorResult =
	| { ok: true; accessState: 'invited' | 'pending_invitation' | 'already_has_access' }
	| { error: 'not_found' | 'forbidden' | 'unknown'; message?: string }

type GithubInstallationTokenResponse = {
	token?: string
	expires_at?: string
}

type GithubRepositoryInstallationResponse = {
	id?: number
}

type GithubInvitation = {
	id?: number
	invitee?: {
		login?: string
	}
}

type CachedInstallationToken = {
	token: string
	expiresAtMs: number
	installationId: string
	repoKey: string
}

const PRODUCT_REPOS: Record<ProductSlug, GithubConfig> = {
	prokit: {
		repoOwner: 'stevewesthoek',
		repoName: 'prokit',
	},
	saaskit: {
		repoOwner: 'stevewesthoek',
		repoName: 'saaskit',
	},
}

let cachedInstallationToken: CachedInstallationToken | null = null

function getRequiredEnv(name: string): string {
	const value = process.env[name]?.trim()
	if (!value) {
		throw new Error(`[store] Missing required environment variable: ${name}`)
	}
	return value
}

function toBase64Url(value: string): string {
	return Buffer.from(value)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
}

function getGithubAppPrivateKey(): string {
	const encoded = getRequiredEnv('GITHUB_APP_PRIVATE_KEY_BASE64')
	const decoded = Buffer.from(encoded, 'base64')
		.toString('utf8')
		.replace(/\\n/g, '\n')
		.trim()

	if (!decoded.includes('BEGIN') || !decoded.includes('PRIVATE KEY')) {
		throw new Error(
			'[store] GITHUB_APP_PRIVATE_KEY_BASE64 must decode to a valid PEM private key'
		)
	}

	return decoded
}

function createGithubAppJwt(): string {
	const appId = getRequiredEnv('GITHUB_APP_ID')
	const privateKey = getGithubAppPrivateKey()
	const now = Math.floor(Date.now() / 1000)
	const header = toBase64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
	const payload = toBase64Url(
		JSON.stringify({
			iat: now - 60,
			exp: now + 9 * 60,
			iss: appId,
		})
	)
	const unsignedToken = `${header}.${payload}`
	const signature = createSign('RSA-SHA256')
		.update(unsignedToken)
		.sign(privateKey, 'base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
	return `${unsignedToken}.${signature}`
}

function buildGithubApiHeaders(authToken: string): Record<string, string> {
	return {
		Authorization: `Bearer ${authToken}`,
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
	}
}

function computeTokenExpiryMs(expiresAt: string | undefined): number {
	const expiresAtMs = Date.parse(expiresAt || '')
	return Number.isFinite(expiresAtMs)
		? Math.max(Date.now() + 1_000, expiresAtMs - 60_000)
		: Date.now() + 4 * 60_000
}

async function requestInstallationAccessToken(
	appJwt: string,
	installationId: string
): Promise<
	| {
			ok: true
			token: string
			expiresAtMs: number
			githubRequestId: string | null
	  }
	| {
			ok: false
			statusCode: number
			githubRequestId: string | null
			bodyText: string
	  }
> {
	const response = await fetch(
		`https://api.github.com/app/installations/${installationId}/access_tokens`,
		{
			method: 'POST',
			headers: buildGithubApiHeaders(appJwt),
		}
	)

	const githubRequestId = response.headers.get('x-github-request-id') || null
	if (!response.ok) {
		return {
			ok: false,
			statusCode: response.status,
			githubRequestId,
			bodyText: (await response.text()).slice(0, 500),
		}
	}

	const data = (await response.json()) as GithubInstallationTokenResponse
	const token = data.token?.trim()
	if (!token) {
		return {
			ok: false,
			statusCode: 500,
			githubRequestId,
			bodyText: 'GitHub installation token response missing token',
		}
	}

	return {
		ok: true,
		token,
		expiresAtMs: computeTokenExpiryMs(data.expires_at),
		githubRequestId,
	}
}

async function discoverInstallationIdForRepository(
	appJwt: string,
	repoOwner: string,
	repoName: string
): Promise<
	| {
			ok: true
			installationId: string
			githubRequestId: string | null
	  }
	| {
			ok: false
			statusCode: number
			githubRequestId: string | null
			bodyText: string
	  }
> {
	const response = await fetch(
		`https://api.github.com/repos/${repoOwner}/${repoName}/installation`,
		{
			method: 'GET',
			headers: buildGithubApiHeaders(appJwt),
		}
	)

	const githubRequestId = response.headers.get('x-github-request-id') || null
	if (!response.ok) {
		return {
			ok: false,
			statusCode: response.status,
			githubRequestId,
			bodyText: (await response.text()).slice(0, 500),
		}
	}

	const data = (await response.json()) as GithubRepositoryInstallationResponse
	if (!data.id) {
		return {
			ok: false,
			statusCode: 500,
			githubRequestId,
			bodyText: 'GitHub repository installation lookup returned no installation id',
		}
	}

	return {
		ok: true,
		installationId: String(data.id),
		githubRequestId,
	}
}

async function getGithubInstallationTokenForRepo(
	repoOwner: string,
	repoName: string,
	requestId: string,
	productSlug: ProductSlug
): Promise<string> {
	const repoKey = `${repoOwner}/${repoName}`
	const configuredInstallationId = getRequiredEnv('GITHUB_APP_INSTALLATION_ID')
	if (
		cachedInstallationToken &&
		Date.now() < cachedInstallationToken.expiresAtMs &&
		(cachedInstallationToken.installationId === configuredInstallationId ||
			cachedInstallationToken.repoKey === repoKey)
	) {
		return cachedInstallationToken.token
	}

	const appJwt = createGithubAppJwt()
	const configuredAttempt = await requestInstallationAccessToken(
		appJwt,
		configuredInstallationId
	)

	if (configuredAttempt.ok) {
		cachedInstallationToken = {
			token: configuredAttempt.token,
			expiresAtMs: configuredAttempt.expiresAtMs,
			installationId: configuredInstallationId,
			repoKey,
		}
		return configuredAttempt.token
	}

	if (configuredAttempt.statusCode === 404) {
		const discoveredAttempt = await discoverInstallationIdForRepository(
			appJwt,
			repoOwner,
			repoName
		)

		if (discoveredAttempt.ok) {
			const discoveredInstallationId = discoveredAttempt.installationId
			if (
				cachedInstallationToken &&
				Date.now() < cachedInstallationToken.expiresAtMs &&
				cachedInstallationToken.installationId === discoveredInstallationId
			) {
				return cachedInstallationToken.token
			}

			const fallbackTokenAttempt = await requestInstallationAccessToken(
				appJwt,
				discoveredInstallationId
			)
			if (fallbackTokenAttempt.ok) {
				console.warn('[store] Falling back to discovered GitHub installation id', {
					requestId,
					productSlug,
					repo: `${repoOwner}/${repoName}`,
					configuredInstallationId,
					discoveredInstallationId,
					configuredStatusCode: configuredAttempt.statusCode,
				})
				cachedInstallationToken = {
					token: fallbackTokenAttempt.token,
					expiresAtMs: fallbackTokenAttempt.expiresAtMs,
					installationId: discoveredInstallationId,
					repoKey,
				}
				return fallbackTokenAttempt.token
			}

			console.error('[store] Discovered installation token fetch failed', {
				requestId,
				productSlug,
				repo: `${repoOwner}/${repoName}`,
				configuredInstallationId,
				discoveredInstallationId,
				statusCode: fallbackTokenAttempt.statusCode,
				githubRequestId: fallbackTokenAttempt.githubRequestId,
				body: fallbackTokenAttempt.bodyText,
			})
		} else {
			console.error('[store] GitHub repository installation discovery failed', {
				requestId,
				productSlug,
				repo: `${repoOwner}/${repoName}`,
				configuredInstallationId,
				statusCode: discoveredAttempt.statusCode,
				githubRequestId: discoveredAttempt.githubRequestId,
				body: discoveredAttempt.bodyText,
			})
		}
	}

	console.error('[store] Failed to fetch GitHub App installation token', {
		requestId,
		productSlug,
		repo: `${repoOwner}/${repoName}`,
		configuredInstallationId,
		statusCode: configuredAttempt.statusCode,
		githubRequestId: configuredAttempt.githubRequestId,
		body: configuredAttempt.bodyText,
	})
	throw new Error(
		`[store] Unable to fetch GitHub installation token (status ${configuredAttempt.statusCode})`
	)
}

export function getGithubConfig(productSlug: ProductSlug): GithubConfig {
	const repo = PRODUCT_REPOS[productSlug]
	if (!repo) {
		throw new Error(`[store] Unsupported product slug: ${productSlug}`)
	}
	return repo
}

async function hasRepositoryAccess(
	installationToken: string,
	repoOwner: string,
	repoName: string,
	username: string
): Promise<boolean | null> {
	const response = await fetch(
		`https://api.github.com/repos/${repoOwner}/${repoName}/collaborators/${username}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${installationToken}`,
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
			},
		}
	)

	if (response.status === 204) {
		return true
	}

	if (response.status === 404) {
		return false
	}

	return null
}

async function hasPendingRepositoryInvitation(
	installationToken: string,
	repoOwner: string,
	repoName: string,
	username: string
): Promise<boolean | null> {
	const response = await fetch(
		`https://api.github.com/repos/${repoOwner}/${repoName}/invitations`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${installationToken}`,
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
			},
		}
	)

	if (response.status === 404) {
		return false
	}

	if (!response.ok) {
		return null
	}

	const invitations = (await response.json()) as GithubInvitation[]
	const normalizedUsername = username.trim().toLowerCase()
	return invitations.some(invitation => invitation.invitee?.login?.trim().toLowerCase() === normalizedUsername)
}

export async function addCollaborator(
	productSlug: ProductSlug,
	githubUsername: string
): Promise<AddCollaboratorResult> {
	const requestId = randomUUID()
	const normalizedUsername = parseGithubUsername(githubUsername)
	let repo = ''

	try {
		const { repoOwner, repoName } = getGithubConfig(productSlug)
		repo = `${repoOwner}/${repoName}`
		if (!normalizedUsername) {
			console.error('[store] GitHub collaborator invite input error', {
				requestId,
				productSlug,
				repo,
				username: githubUsername.trim(),
				statusCode: 0,
			})
			return { error: 'not_found' }
		}

		const installationToken = await getGithubInstallationTokenForRepo(
			repoOwner,
			repoName,
			requestId,
			productSlug
		)
		const endpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators/${normalizedUsername}`

		const response = await fetch(endpoint, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${installationToken}`,
				Accept: 'application/vnd.github+json',
				'Content-Type': 'application/json',
				'X-GitHub-Api-Version': '2022-11-28',
			},
			body: JSON.stringify({ permission: 'pull' }),
		})

		const statusCode = response.status
		const githubRequestId = response.headers.get('x-github-request-id') || null
		console.info('[store] GitHub collaborator invite response', {
			requestId,
			productSlug,
			repo,
			username: normalizedUsername,
			statusCode,
			githubRequestId,
		})

		if (response.status === 201) {
			return { ok: true, accessState: 'invited' }
		}
		if (response.status === 204) {
			const alreadyHasAccess = await hasRepositoryAccess(
				installationToken,
				repoOwner,
				repoName,
				normalizedUsername
			)

			if (alreadyHasAccess === true) {
				return { ok: true, accessState: 'already_has_access' }
			}

			const hasPendingInvitation = await hasPendingRepositoryInvitation(
				installationToken,
				repoOwner,
				repoName,
				normalizedUsername
			)

			if (hasPendingInvitation === true) {
				return { ok: true, accessState: 'pending_invitation' }
			}

			console.error('[store] GitHub collaborator verification failed after 204', {
				requestId,
				productSlug,
				repo,
				username: normalizedUsername,
				statusCode,
				githubRequestId,
				alreadyHasAccess,
				hasPendingInvitation,
			})
			return {
				error: 'unknown',
				message:
					"We couldn't confirm whether GitHub created an invitation or whether this account already has repository access.",
			}
		}
		if (response.status === 422) {
			return { ok: true, accessState: 'already_has_access' }
		}
		if (response.status === 404) {
			return { error: 'not_found' }
		}
		if (response.status === 403) {
			console.error('[store] GitHub collaborator invite forbidden', {
				requestId,
				productSlug,
				repo,
				username: normalizedUsername,
				statusCode,
				githubRequestId,
			})
			return {
				error: 'forbidden',
				message:
					'GitHub App does not have collaborator invite permissions for this repository.',
			}
		}

		const bodyText = await response.text()
		console.error('[store] GitHub collaborator API error', {
			requestId,
			productSlug,
			repo,
			username: normalizedUsername,
			statusCode,
			githubRequestId,
			body: bodyText.slice(0, 500),
		})
		return { error: 'unknown', message: `GitHub API status ${response.status}` }
	} catch (error) {
		console.error('[store] Failed to add GitHub collaborator', {
			requestId,
			productSlug,
			repo: repo || null,
			username: normalizedUsername || githubUsername.trim(),
			statusCode: 0,
			error: error instanceof Error ? error.message : 'Unknown error',
		})
		return { error: 'unknown', message: 'Request failed' }
	}
}
