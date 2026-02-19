'use client'

import React, { useState } from 'react'
import { Button } from '@/app/(marketing)/components/ui/Button'
import { Scaffolding } from '@/app/(marketing)/components/ui/Scaffolding'

export default function ContactPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		setStatus('idle')

		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (!response.ok) throw new Error('Failed to send')

			setStatus('success')
			;(e.target as HTMLFormElement).reset()
		} catch (error) {
			console.error(error)
			setStatus('error')
		} finally {
			setIsLoading(false)
		}
	}

	const inputClasses =
		'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8] transition-all duration-300 text-sm dark:bg-[#0F1626] dark:border-[#1E242D] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-[#1D4ED8]/30'
	const labelClasses =
		'block text-sm font-bold text-slate-700 mb-2 dark:text-slate-200'

	return (
		<main className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-[#2563EB]/20 dark:bg-[#0B111B] dark:text-[#E6EAF2] dark:selection:bg-[#1D4ED8]/40 overflow-x-hidden relative">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10 min-h-screen pt-24 pb-24">
				<div className="max-w-4xl mx-auto px-6 text-center mb-20">
					<h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight dark:text-white">
						Contact ProChat
					</h1>
					<p className="text-xl text-slate-600 mb-4 font-light leading-relaxed dark:text-slate-300">
						Structured communication. No noise. No sales traps.
					</p>
					<p className="text-xs text-slate-400 uppercase tracking-widest font-bold dark:text-slate-500">
						Clients, customers, and regulatory requests are handled here.
					</p>
				</div>

				<div className="max-w-xl mx-auto px-6">
					<div className="mb-16">
						<div className="mb-8">
							<h2 className="text-2xl font-bold text-slate-900 mb-2 dark:text-white">
								Send a message
							</h2>
							<p className="text-slate-500 text-sm dark:text-slate-400">
								Use this form for product support, service inquiries, or legal
								requests. <br />
								We reply within 1–2 business days.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="name" className={labelClasses}>
									Name
								</label>
								<input
									required
									type="text"
									name="name"
									id="name"
									className={inputClasses}
									placeholder="Jane Doe"
								/>
							</div>

							<div>
								<label htmlFor="email" className={labelClasses}>
									Email
								</label>
								<input
									required
									type="email"
									name="email"
									id="email"
									className={inputClasses}
									placeholder="jane@company.com"
								/>
							</div>

							<div>
								<label htmlFor="reason" className={labelClasses}>
									Reason for contact
								</label>
								<div className="relative">
									<select
										required
										name="reason"
										id="reason"
										className={`${inputClasses} appearance-none cursor-pointer`}
										defaultValue=""
									>
										<option value="" disabled>
											Select a reason...
										</option>
										<option value="Product support">
											Product support (Kits / System)
										</option>
										<option value="Studio inquiry">Studio / Website project</option>
										<option value="Privacy / GDPR / Legal">
											Privacy / GDPR / Legal
										</option>
										<option value="General inquiry">General inquiry</option>
									</select>
									<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
										<svg
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path d="M6 9l6 6 6-6" />
										</svg>
									</div>
								</div>
							</div>

							<div>
								<label htmlFor="message" className={labelClasses}>
									Message
								</label>
								<textarea
									required
									name="message"
									id="message"
									rows={5}
									className={inputClasses}
									placeholder="How can we help?"
								/>
							</div>

							<div className="pt-2">
								<Button
									type="submit"
									className="w-full justify-center"
									disabled={isLoading}
								>
									{isLoading ? 'Sending...' : 'Send Message'}
								</Button>
							</div>

							{status === 'success' && (
								<div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-sm font-medium flex items-center gap-2 dark:bg-emerald-500/10 dark:border-emerald-400/20 dark:text-emerald-200">
									<div className="w-2 h-2 rounded-full bg-emerald-500" />
									Message sent. We’ll reply by email.
								</div>
							)}

							{status === 'error' && (
								<div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm font-medium flex items-center gap-2 dark:bg-red-500/10 dark:border-red-400/20 dark:text-red-200">
									<div className="w-2 h-2 rounded-full bg-red-500" />
									Something went wrong. Please email support@prochat.tools
								</div>
							)}
						</form>
					</div>

					<div className="border-t border-slate-100 pt-12 mb-12 dark:border-[#1E242D]">
						<h3 className="text-lg font-bold text-slate-900 mb-6 dark:text-white">
							Other ways to reach us
						</h3>

						<div className="space-y-8">
							<div>
								<div className="text-sm font-bold text-slate-900 mb-2 dark:text-white">
									Email
								</div>
								<ul className="space-y-1 text-slate-600 text-sm font-medium font-mono dark:text-slate-300">
									<li>
										<a
											href="mailto:support@prochat.tools"
											className="hover:text-[#1D4ED8] dark:hover:text-[#2563EB]"
										>
											support@prochat.tools
										</a>
									</li>
									<li>
										<a
											href="mailto:privacy@prochat.tools"
											className="hover:text-[#1D4ED8] dark:hover:text-[#2563EB]"
										>
											privacy@prochat.tools
										</a>
									</li>
								</ul>
								<p className="text-xs text-slate-400 mt-2 dark:text-slate-500">
									Email is required for legal and GDPR-related communication.
								</p>
							</div>

							<div>
								<div className="text-sm font-bold text-slate-900 mb-2 dark:text-white">
									Community
								</div>
								<p className="text-sm text-slate-500 mb-2 dark:text-slate-400">
									We also run a Discord for builders and community discussion.
								</p>
								<p className="text-xs text-slate-400 dark:text-slate-500">
									Discord is not used for support or legal requests.
								</p>
							</div>
						</div>
					</div>

					<div className="bg-slate-50 border border-slate-200 rounded-lg p-6 flex gap-4 dark:bg-[#0F1626] dark:border-[#1E242D]">
						<div className="w-1 bg-slate-300 rounded-full shrink-0 dark:bg-slate-600" />
						<div className="space-y-1">
							<p className="text-sm font-medium text-slate-900 dark:text-white">
								We don’t offer live chat or instant support by design.
							</p>
							<p className="text-sm text-slate-500 dark:text-slate-400">
								Clear communication beats urgency.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
