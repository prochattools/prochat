import { createSign, randomUUID } from 'crypto'

import { parseGithubUsername } from './github-username'
import { ProductSlug } from './types'

type GithubConfig = {
	repoOwner: string
	repoName: string
}

type AddCollaboratorResult =
	| 'ok'
	| 'already'
	| { error: 'not_found' | 'forbidden' | 'unknown'; message?: string }

type GithubInstallationTokenResponse = {
	token?: string
	expires_at?: string
}

type CachedInstallationToken = {
	token: string
	expiresAtMs: number
}

const DEFAULT_REPOS: Record<ProductSlug, string> = {
	prokit: 'stevewesthoek/prokit',
	saaskit: 'stevewesthoek/saaskit',
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

async function getGithubInstallationToken(): Promise<string> {
	if (cachedInstallationToken && Date.now() < cachedInstallationToken.expiresAtMs) {
		return cachedInstallationToken.token
	}

	const installationId = getRequiredEnv('GITHUB_APP_INSTALLATION_ID')
	const appJwt = createGithubAppJwt()
	const response = await fetch(
		`https://api.github.com/app/installations/${installationId}/access_tokens`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${appJwt}`,
				Accept: 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
			},
		}
	)

	if (!response.ok) {
		const bodyText = await response.text()
		console.error('[store] Failed to fetch GitHub App installation token', {
			statusCode: response.status,
			githubRequestId: response.headers.get('x-github-request-id') || null,
			body: bodyText.slice(0, 500),
		})
		throw new Error(
			`[store] Unable to fetch GitHub installation token (status ${response.status})`
		)
	}

	const data = (await response.json()) as GithubInstallationTokenResponse
	const token = data.token?.trim()
	if (!token) {
		throw new Error('[store] GitHub installation token response missing token')
	}

	const expiresAtMs = Date.parse(data.expires_at || '')
	cachedInstallationToken = {
		token,
		expiresAtMs: Number.isFinite(expiresAtMs)
			? Math.max(Date.now() + 1_000, expiresAtMs - 60_000)
			: Date.now() + 4 * 60_000,
	}

	return token
}

export function getGithubConfig(productSlug: ProductSlug): GithubConfig {
	const repoEnvName =
		productSlug === 'prokit' ? 'GITHUB_PROKIT_REPO' : 'GITHUB_SAASKIT_REPO'
	const repo = process.env[repoEnvName]?.trim() || DEFAULT_REPOS[productSlug]

	const [repoOwner, repoName] = repo.split('/')
	if (!repoOwner || !repoName) {
		throw new Error(`[store] Invalid repository format in ${repoEnvName}`)
	}

	return { repoOwner, repoName }
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

		const installationToken = await getGithubInstallationToken()
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
			return 'ok'
		}
		if (response.status === 204) {
			return 'already'
		}
		if (response.status === 422) {
			return 'already'
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
