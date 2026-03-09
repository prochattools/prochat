'use client'

import Link from 'next/link'
import { ACTION_LABEL_CLASS_NAME, renderActionLabel } from '@/helpers/action-label'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import {
	isValidGithubUsernameInput,
	parseGithubUsername,
} from '@/lib/store/github-username'
import type { ProductSlug } from '@/lib/store/types'

type ClaimResponse = {
	success?: boolean
	alreadyProvisioned?: boolean
	accessState?: 'invited' | 'pending_invitation' | 'already_has_access'
	githubUsername?: string
	error?: string
	message?: string
}

type SuccessState = {
	githubUsername: string
	alreadyProvisioned: boolean
	accessState?: 'invited' | 'pending_invitation' | 'already_has_access'
}

interface KitAccessFinishClientProps {
	productSlug: ProductSlug
}

const productLabelMap: Record<ProductSlug, string> = {
	prokit: 'ProKit',
	saaskit: 'SaaSKit',
}

export default function KitAccessFinishClient({
	productSlug,
}: KitAccessFinishClientProps) {
	const searchParams = useSearchParams()
	const sessionId = searchParams?.get('session_id')?.trim() || ''
	const productLabel = productLabelMap[productSlug]
	const claimEndpoint = `/api/store/${productSlug}/claim`

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [successState, setSuccessState] = useState<SuccessState | null>(null)
	const [errorCode, setErrorCode] = useState('')
	const [fallbackVisible, setFallbackVisible] = useState(!sessionId)

	const canSubmitSession = useMemo(
		() => !!sessionId && isValidGithubUsernameInput(username) && !submitting,
		[sessionId, username, submitting]
	)

	const canSubmitEmailFallback = useMemo(() => {
		return !!email.trim() && isValidGithubUsernameInput(username) && !submitting
	}, [email, username, submitting])

	async function submitClaim(payload: {
		session_id?: string
		email?: string
		github_username: string
	}) {
		setSubmitting(true)
		setErrorMessage('')
		setSuccessState(null)

		try {
			const response = await fetch(claimEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			const data = (await response.json()) as ClaimResponse

			if (!response.ok) {
				const nextErrorCode = data.error || 'server_error'
				setErrorCode(nextErrorCode)
				setErrorMessage(
					data.message ||
						'Something went wrong while linking your GitHub account. Please retry or contact support.'
				)
				if (nextErrorCode === 'invalid_session') {
					setFallbackVisible(true)
				}
				return
			}

			setErrorCode('')
			const linkedUsername = (data.githubUsername || payload.github_username).trim()
			setSuccessState({
				githubUsername: linkedUsername,
				alreadyProvisioned: Boolean(data.alreadyProvisioned),
				accessState: data.accessState,
			})
		} catch (error) {
			console.error(`[kits/${productSlug}/finish] Claim request failed`, error)
			setErrorCode('server_error')
			setErrorMessage(
				'Something went wrong while linking your GitHub account. Please retry or contact support.'
			)
		} finally {
			setSubmitting(false)
		}
	}

	function onSessionSubmit() {
		if (!canSubmitSession) {
			return
		}
		const parsedUsername = parseGithubUsername(username)
		if (!parsedUsername) {
			return
		}
		submitClaim({ session_id: sessionId, github_username: parsedUsername })
	}

	function onFallbackSubmit() {
		if (!canSubmitEmailFallback) {
			return
		}
		const parsedUsername = parseGithubUsername(username)
		if (!parsedUsername) {
			return
		}
		submitClaim({
			email: email.trim(),
			github_username: parsedUsername,
		})
	}

	const showFallback = !sessionId || fallbackVisible || errorCode === 'invalid_session'

	return (
		<section className='relative isolate flex min-h-screen items-center overflow-hidden bg-background px-0 py-24'>
			<div aria-hidden className='pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden' />
			<div aria-hidden className='pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block' />
			<div aria-hidden className='pc-marketing-hero__wash hidden dark:block' />
			<div aria-hidden className='pc-marketing-hero__glow hidden dark:block' />
			<div aria-hidden className='pc-marketing-hero__vignette hidden dark:block' />

			<div className='relative z-10 mx-auto flex w-full max-w-4xl flex-col justify-center px-page'>
				<div className='mx-auto w-full max-w-4xl'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-[-0.05em] text-foreground sm:text-5xl'>
							Finalize your {productLabel} access
						</h1>
						<p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
							You&apos;ve completed payment. To unlock the private GitHub repository, we
							need your GitHub username.
						</p>
					</div>

					<ol className='mx-auto mt-8 max-w-3xl space-y-3 text-left text-lg text-foreground/90'>
						<li>
							1. Create a GitHub account, if you do not have one yet.{' '}
							<Link
								href='https://github.com/join'
								target='_blank'
								className='text-primary underline underline-offset-4'
							>
								Create account
							</Link>
						</li>
						<li>2. Tell us your GitHub username.</li>
						<li>3. Accept the GitHub invite from your notifications or email.</li>
					</ol>

					{sessionId ? (
						<div className='mt-10 rounded-2xl border border-border bg-surface/95 p-8 shadow-sm backdrop-blur-sm'>
							<h2 className='text-lg font-semibold text-foreground'>
								Claim with checkout session
							</h2>
							<p className='mt-2 text-sm text-muted-foreground'>
								Session detected. Enter your GitHub username to complete provisioning.
							</p>
							<div className='mt-4 space-y-3'>
								<label className='block text-sm font-medium text-foreground'>
									GitHub username
									<input
										value={username}
										onChange={event => setUsername(event.target.value)}
										placeholder='your-github-username'
										className='mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-secondary/50'
									/>
								</label>
								<button
									type='button'
									onClick={onSessionSubmit}
									disabled={!canSubmitSession}
									className={`inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm text-primary-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 ${ACTION_LABEL_CLASS_NAME}`}
								>
									{renderActionLabel(submitting ? 'Submitting...' : 'Link GitHub username')}
								</button>
							</div>
						</div>
					) : (
						<div className='mt-10 rounded-lg border border-amber-400/35 bg-amber-500/10 p-4 text-amber-100'>
							<p>
								No checkout session was found in this URL. Use your checkout email
								below to recover access.
							</p>
							<Link
								href='/kits'
								className='mt-2 inline-flex text-sm font-medium text-amber-100 underline underline-offset-4'
							>
								Back to Kits
							</Link>
						</div>
					)}

					{showFallback && (
						<div className='mt-6 rounded-2xl border border-border bg-surface/95 p-8 shadow-sm backdrop-blur-sm'>
							<h2 className='text-lg font-semibold text-foreground'>
								Recover access with checkout email
							</h2>
							<p className='mt-2 text-sm text-muted-foreground'>
								Use the email you entered during Stripe checkout. We will find your
								latest paid {productLabel} purchase and link it.
							</p>
							<div className='mt-4 space-y-3'>
								<label className='block text-sm font-medium text-foreground'>
									Checkout email
									<input
										type='email'
										value={email}
										onChange={event => setEmail(event.target.value)}
										placeholder='you@company.com'
										className='mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-secondary/50'
									/>
								</label>
								<label className='block text-sm font-medium text-foreground'>
									GitHub username
									<input
										value={username}
										onChange={event => setUsername(event.target.value)}
										placeholder='your-github-username'
										className='mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-secondary/50'
									/>
								</label>
								<button
									type='button'
									onClick={onFallbackSubmit}
									disabled={!canSubmitEmailFallback}
									className={`inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white ${ACTION_LABEL_CLASS_NAME}`}
								>
									{renderActionLabel(submitting ? 'Checking purchase...' : 'Find purchase and link access')}
								</button>
							</div>
						</div>
					)}

					{errorMessage && (
						<div className='mt-6 rounded-xl border border-red-400/30 bg-red-500/10 p-5 text-red-100'>
							{errorCode === 'already_linked' ? (
								<p>
									This purchase has already been linked to a different GitHub username.{' '}
									<Link
										href='https://prochat.tools/contact'
										target='_blank'
										rel='noopener noreferrer'
										className='font-medium underline underline-offset-4'
									>
										Contact Support
									</Link>{' '}
									if this is unexpected.
								</p>
							) : (
								<p>{errorMessage}</p>
							)}
							{errorCode === 'invalid_session' && (
								<Link
									href='/kits'
									className='mt-2 inline-flex text-sm font-medium text-red-100 underline underline-offset-4'
								>
									Back to Kits
								</Link>
							)}
						</div>
					)}
					{successState && (
						<div className='mt-6 flex flex-col gap-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-5 text-emerald-50'>
							<p>
								{successState.alreadyProvisioned
									? `Your purchase is already linked to @${successState.githubUsername}. Check your GitHub account for access.`
									: successState.accessState === 'already_has_access'
										? `@${successState.githubUsername} already has access to the repository. You can start building now from your GitHub account.`
										: successState.accessState === 'pending_invitation'
											? `GitHub already has a pending repository invitation for @${successState.githubUsername}. Check your GitHub notifications or email, then accept the invite before cloning the repository.`
											: `We've requested GitHub access for @${successState.githubUsername}. You will receive a GitHub invite in your notifications or email. Once you accept it, you can clone the repository from your GitHub account.`}
							</p>
							<div>
								<Link
									href='https://prochat.tools/docs'
									className='inline-flex items-center justify-center rounded-lg border border-emerald-300/35 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-500/25'
								>
									Start Building
								</Link>
							</div>
						</div>
					)}

					<p className='mt-8 text-sm text-muted-foreground'>
						Lost your checkout email or seeing errors? Contact us at
						support@prochat.tools with your payment email and we will manually grant
						access.
					</p>
				</div>
			</div>
		</section>
	)
}
