import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

import { addCollaborator } from '@/lib/store/github'
import {
	findLatestPaidUnprovisionedSessionByEmail,
	getSessionStatusById,
	markSessionProvisioned,
	retrieveSessionById,
} from '@/lib/store/stripe'
import { ProductSlug } from '@/lib/store/types'

type ClaimBody = {
	session_id?: string | null
	email?: string | null
	github_username?: string | null
}

const PRODUCT_SLUG: ProductSlug = 'saaskit'
const GITHUB_USERNAME_PATTERN = /^[A-Za-z0-9-]{1,39}$/

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as ClaimBody
		const sessionId = body.session_id?.trim() || ''
		const email = body.email?.trim() || ''
		const githubUsername = body.github_username?.trim() || ''

		if (
			!githubUsername ||
			!GITHUB_USERNAME_PATTERN.test(githubUsername) ||
			(!sessionId && !email)
		) {
			return NextResponse.json(
				{
					error: 'invalid_input',
					message:
						'Please provide a valid GitHub username and either your session link or checkout email.',
				},
				{ status: 400 }
			)
		}

		let targetSessionId = sessionId
		let targetSession: Stripe.Checkout.Session | null = null

		if (sessionId) {
			const status = await getSessionStatusById(sessionId, PRODUCT_SLUG)

			if (status.state === 'invalid_session') {
				return NextResponse.json(
					{
						error: 'invalid_session',
						message:
							status.message ||
							'We could not verify this checkout session. Use your checkout email below to recover access.',
					},
					{ status: 400 }
				)
			}

			if (status.state === 'unpaid') {
				return NextResponse.json(
					{
						error: 'unpaid',
						message:
							"We can't confirm your payment yet. If you just paid, wait a minute and refresh this page.",
					},
					{ status: 400 }
				)
			}

			if (status.state === 'error') {
				return NextResponse.json(
					{
						error: 'server_error',
						message:
							"We couldn't verify this purchase right now. Please retry in a moment.",
					},
					{ status: 500 }
				)
			}

			if (status.state === 'provisioned') {
				const existingUsername = (status.githubUsername || '').trim()
				if (
					existingUsername &&
					existingUsername.toLowerCase() !== githubUsername.toLowerCase()
				) {
					return NextResponse.json(
						{
							error: 'already_linked',
							message:
								'This purchase has already been linked to a different GitHub username. Contact support if this is unexpected.',
						},
						{ status: 409 }
					)
				}
				return NextResponse.json({
					success: true,
					alreadyProvisioned: true,
					githubUsername: existingUsername || githubUsername,
				})
			}

			targetSession = await retrieveSessionById(sessionId)
			if (!targetSession) {
				return NextResponse.json(
					{
						error: 'invalid_session',
						message:
							'We could not verify this checkout session. Use your checkout email below to recover access.',
					},
					{ status: 400 }
				)
			}
		} else {
			const lookup = await findLatestPaidUnprovisionedSessionByEmail(
				email,
				PRODUCT_SLUG
			)

			if (!lookup.session) {
				const statusCode = lookup.status.state === 'error' ? 500 : 404
				return NextResponse.json(
					{
						error: statusCode === 500 ? 'server_error' : 'purchase_not_found',
						message:
							statusCode === 500
								? "We couldn't verify purchases for that email right now. Please retry."
								: "We couldn't find a completed purchase for that email. Double-check the email used at checkout or contact support.",
					},
					{ status: statusCode }
				)
			}

			targetSession = lookup.session
			targetSessionId = lookup.session.id
		}

		if (!targetSession) {
			return NextResponse.json(
				{
					error: 'invalid_session',
					message:
						'We could not verify this checkout session. Use your checkout email below to recover access.',
				},
				{ status: 400 }
			)
		}

		const provisionResult = await addCollaborator(PRODUCT_SLUG, githubUsername)

		if (provisionResult === 'ok' || provisionResult === 'already') {
			await markSessionProvisioned(targetSession, PRODUCT_SLUG, githubUsername)

			return NextResponse.json({
				success: true,
				sessionId: targetSessionId,
				alreadyCollaborator: provisionResult === 'already',
			})
		}

		if (provisionResult.error === 'not_found') {
			return NextResponse.json(
				{
					error: 'github_user_not_found',
					message:
						'GitHub username not found. Double-check the spelling or create your GitHub account first.',
				},
				{ status: 400 }
			)
		}

		if (provisionResult.error === 'forbidden') {
			console.error('[store/saaskit/claim] GitHub permission error', {
				sessionId: targetSessionId,
			})
			return NextResponse.json(
				{
					error: 'server_error',
					message:
						"We couldn't add this GitHub username automatically. Please contact support so we can fix your access.",
				},
				{ status: 500 }
			)
		}

		console.error('[store/saaskit/claim] Unknown GitHub API error', {
			sessionId: targetSessionId,
			details: provisionResult.message,
		})
		return NextResponse.json(
			{
				error: 'server_error',
				message:
					"We couldn't add this GitHub username automatically. Please contact support so we can fix your access.",
			},
			{ status: 500 }
		)
	} catch (error) {
		console.error('[store/saaskit/claim] Unexpected error', error)
		return NextResponse.json(
			{
				error: 'server_error',
				message:
					'Something went wrong while linking your GitHub account. Please retry or contact support.',
			},
			{ status: 500 }
		)
	}
}
