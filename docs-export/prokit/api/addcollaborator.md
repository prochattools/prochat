<!-- GENERATED FILE - DO NOT EDIT -->
---
title: AddCollaborator
description: AddCollaborator function extracted from src/lib/store/github.ts.
category: boilerplate
slug: addcollaborator
order: 100
keywords:
  - prokit
  - api
  - addCollaborator
generator: auto
sourceRepo: prokit
sourceCommit: null
sourcePath: src/lib/store/github.ts
generatedAt: 2026-03-10T23:47:09.851Z
---

# AddCollaborator

## Overview
Auto-generated API reference for addCollaborator.

## Source
- File: `src/lib/store/github.ts`
- Kind: `function`

## Definition
```ts
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
```
