import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
	title: 'Terms of Service | ProChat',
	description:
		'Terms of Service for ProChat and the use of https://prochat.tools.',
	openGraph: {
		title: 'Terms of Service | ProChat',
		description:
			'Terms of Service for ProChat and the use of https://prochat.tools.',
	},
	canonicalUrlRelative: '/terms',
})

export default function TermsPage() {
	return (
		<section className="py-24 bg-white relative dark:bg-[#0B111B]">
			<main className="mx-auto w-full max-w-3xl px-6 sm:px-8">
				<article className="space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed">
					<header className="mb-12">
						<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-white">
							TERMS OF SERVICE
						</h1>
						<p className="text-slate-500 text-sm font-medium dark:text-slate-400">
							Last updated: 28 October 2025
						</p>
					</header>

					<div className="space-y-4">
						<p className="font-bold text-slate-900 uppercase tracking-wide text-xs md:text-sm dark:text-white">
							PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY, AS IT
							CONTAINS IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS AND
							REMEDIES.
						</p>
					</div>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							1. OVERVIEW
						</h2>
						<p>
							This Terms of Service Agreement (&quot;Agreement&quot;) is entered
							into by and between ProChat™, registered address 40, A. dos Descobr.,
							Portugal (&quot;Company&quot;) and you, and is made effective as of
							the date of your use of this website https://prochat.tools
							(&quot;Site&quot;) or the date of electronic acceptance. This
							Agreement sets forth the general terms and conditions of your use of
							the https://prochat.tools as well as the products and/or services
							purchased or accessed through this Site (the &quot;Services&quot;).
							Whether you are simply browsing or using this Site or purchase
							Services, your use of this Site and your electronic acceptance of this
							Agreement signifies that you have read, understand, acknowledge and
							agree to be bound by this Agreement our Privacy policy.
						</p>
						<p className="mt-4">
							The terms &quot;we&quot;, &quot;us&quot; or &quot;our&quot; shall
							refer to Company. The terms &quot;you&quot;, &quot;your&quot;,
							&quot;User&quot; or &quot;customer&quot; shall refer to any individual
							or entity who accepts this Agreement, uses our Site, has access or
							uses the Services. Nothing in this Agreement shall be deemed to
							confer any third-party rights or benefits.
						</p>
						<p className="mt-4">
							Company may, in its sole and absolute discretion, change or modify
							this Agreement, and any policies or agreements which are incorporated
							herein, at any time, and such changes or modifications shall be
							effective immediately upon posting to this Site. Your use of this Site
							or the Services after such changes or modifications have been made
							shall constitute your acceptance of this Agreement as last revised. IF
							YOU DO NOT AGREE TO BE BOUND BY THIS AGREEMENT AS LAST REVISED, DO NOT
							USE (OR CONTINUE TO USE) THIS SITE OR THE SERVICES.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							2. ELIGIBILITY
						</h2>
						<p>
							This Site and the Services are available only to Users who can form
							legally binding contracts under applicable law. By using this Site or
							the Services, you represent and warrant that you are (i) at least
							eighteen (18) years of age, (ii) otherwise recognized as being able to
							form legally binding contracts under applicable law, and (iii) are not
							a person barred from purchasing or receiving the Services found under
							the laws of the Portugal or other applicable jurisdiction.
						</p>
						<p className="mt-4">
							If you are entering into this Agreement on behalf of a company or any
							corporate entity, you represent and warrant that you have the legal
							authority to bind such corporate entity to the terms and conditions
							contained in this Agreement, in which case the terms &quot;you&quot;,
							&quot;your&quot;, &quot;User&quot; or &quot;customer&quot; shall refer
							to such corporate entity. If, after your electronic acceptance of this
							Agreement, Company finds that you do not have the legal authority to
							bind such corporate entity, you will be personally responsible for the
							obligations contained in this Agreement.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							3. RULES OF USER CONDUCT
						</h2>
						<p className="mb-4">
							By using this Site You acknowledge and agree that: Your use of this
							Site, including any content you submit, will comply with this
							Agreement and all applicable local, state, national and international
							laws, rules and regulations.
						</p>
						<p className="mb-2 font-medium text-slate-900 dark:text-white">
							You will not use this Site in a manner that:
						</p>
						<ul className="list-disc pl-5 space-y-2 mb-6 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Is illegal, or promotes or encourages illegal activity;</li>
							<li>
								Promotes, encourages or engages in child pornography or the
								exploitation of children;
							</li>
							<li>
								Promotes, encourages or engages in terrorism, violence against
								people, animals, or property;
							</li>
							<li>
								Promotes, encourages or engages in any spam or other unsolicited
								bulk email, or computer or network hacking or cracking;
							</li>
							<li>
								Infringes on the intellectual property rights of another User or
								any other person or entity;
							</li>
							<li>
								Violates the privacy or publicity rights of another User or any
								other person or entity, or breaches any duty of confidentiality
								that you owe to another User or any other person or entity;
							</li>
							<li>Interferes with the operation of this Site;</li>
							<li>
								Contains or installs any viruses, worms, bugs, Trojan horses,
								Cryptocurrency Miners or other code, files or programs designed to,
								or capable of, using many resources, disrupting, damaging, or
								limiting the functionality of any software or hardware.
							</li>
						</ul>
						<p className="mb-2 font-medium text-slate-900 dark:text-white">
							You will not:
						</p>
						<ul className="list-disc pl-5 space-y-2 marker:text-slate-300 dark:marker:text-slate-600">
							<li>
								Copy or distribute in any medium any part of this Site, except
								where expressly authorized by Company;
							</li>
							<li>
								Copy or duplicate this Terms of Services agreement, which was
								created with the help of the TermsHub.io and the T&amp;C Generator;
							</li>
							<li>Modify or alter any part of this Site or any of its related technologies;</li>
							<li>
								Access Companies Content (as defined below) or User Content
								through any technology or means other than through this Site
								itself.
							</li>
						</ul>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							4. INTELLECTUAL PROPERTY
						</h2>
						<p>
							In addition to the general rules above, the provisions in this
							Section apply specifically to your use of Companies Content posted to
							Site. Companies Content on this Site, including without limitation
							the text, software, scripts, source code, API, graphics, photos,
							sounds, music, videos and interactive features and the trademarks,
							service marks and logos contained therein (&quot;Companies
							Content&quot;), are owned by or licensed to ProChat™ in perpetuity,
							and are subject to copyright, trademark, and/or patent protection.
						</p>
						<p className="mt-4">
							Companies Content is provided to you &quot;as is&quot;, &quot;as
							available&quot; and &quot;with all faults&quot; for your information
							and personal, non-commercial use only and may not be downloaded,
							copied, reproduced, distributed, transmitted, broadcast, displayed,
							sold, licensed, or otherwise exploited for any purposes whatsoever
							without the express prior written consent of Company. No right or
							license under any copyright, trademark, patent, or other proprietary
							right or license is granted by this Agreement.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							5. LINKS TO THIRD-PARTY WEBSITES
						</h2>
						<p>
							This Site may contain links to third-party websites that are not
							owned or controlled by Company. Company assumes no responsibility for
							the content, terms and conditions, privacy policies, or practices of
							any third-party websites. In addition, Company does not censor or
							edit the content of any third-party websites. By using this Site you
							expressly release Company from any and all liability arising from
							your use of any third-party website. Accordingly, Company encourages
							you to be aware when you leave this Site and to review the terms and
							conditions, privacy policies, and other governing documents of each
							other website that you may visit.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							6. DISCLAIMER OF REPRESENTATIONS AND WARRANTIES
						</h2>
						<p className="uppercase text-sm leading-relaxed">
							YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT YOUR USE OF THIS SITE
							SHALL BE AT YOUR OWN RISK AND THAT THIS SITE ARE PROVIDED &quot;AS
							IS&quot;, &quot;AS AVAILABLE&quot; AND &quot;WITH ALL FAULTS&quot;.
							COMPANY, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, DISCLAIM ALL
							WARRANTIES, STATUTORY, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED
							TO, ANY IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A
							PARTICULAR PURPOSE AND NON-INFRINGEMENT. COMPANY, ITS OFFICERS,
							DIRECTORS, EMPLOYEES, AND AGENTS MAKE NO REPRESENTATIONS OR WARRANTIES
							ABOUT (I) THE ACCURACY, COMPLETENESS, OR CONTENT OF THIS SITE, (II)
							THE ACCURACY, COMPLETENESS, OR CONTENT OF ANY SITES LINKED (THROUGH
							HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE, AND/OR
							(III) THE SERVICES FOUND AT THIS SITE OR ANY SITES LINKED (THROUGH
							HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE, AND COMPANY
							ASSUMES NO LIABILITY OR RESPONSIBILITY FOR THE SAME. IN ADDITION, YOU
							SPECIFICALLY ACKNOWLEDGE AND AGREE THAT NO ORAL OR WRITTEN INFORMATION
							OR ADVICE PROVIDED BY COMPANY, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR
							AGENTS, AND THIRD-PARTY SERVICE PROVIDERS WILL (I) CONSTITUTE LEGAL OR
							FINANCIAL ADVICE OR (II) CREATE A WARRANTY OF ANY KIND WITH RESPECT TO
							THIS SITE OR THE SERVICES FOUND AT THIS SITE, AND USERS SHOULD NOT
							RELY ON ANY SUCH INFORMATION OR ADVICE. THE FOREGOING DISCLAIMER OF
							REPRESENTATIONS AND WARRANTIES SHALL APPLY TO THE FULLEST EXTENT
							PERMITTED BY LAW, AND SHALL SURVIVE ANY TERMINATION OR EXPIRATION OF
							THIS AGREEMENT OR YOUR USE OF THIS SITE OR THE SERVICES FOUND AT THIS
							SITE.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							7. LIMITATION OF LIABILITY
						</h2>
						<p className="uppercase text-sm leading-relaxed">
							IN NO EVENT SHALL COMPANY, ITS OFFICERS, DIRECTORS, EMPLOYEES,
							AGENTS, AND ALL THIRD PARTY SERVICE PROVIDERS, BE LIABLE TO YOU OR
							ANY OTHER PERSON OR ENTITY FOR ANY DIRECT, INDIRECT, INCIDENTAL,
							SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER, INCLUDING ANY
							DAMAGES THAT MAY RESULT FROM (I) THE ACCURACY, COMPLETENESS, OR
							CONTENT OF THIS SITE, (II) THE ACCURACY, COMPLETENESS, OR CONTENT OF
							ANY SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE)
							TO THIS SITE, (III) THE SERVICES FOUND AT THIS SITE OR ANY SITES
							LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS
							SITE, (IV) PERSONAL INJURY OR PROPERTY DAMAGE OF ANY NATURE WHATSOEVER,
							(V) THIRD-PARTY CONDUCT OF ANY NATURE WHATSOEVER, (VI) ANY
							INTERRUPTION OR CESSATION OF SERVICES TO OR FROM THIS SITE OR ANY
							SITES LINKED (THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO
							THIS SITE, (VII) ANY VIRUSES, WORMS, BUGS, TROJAN HORSES, OR THE LIKE,
							WHICH MAY BE TRANSMITTED TO OR FROM THIS SITE OR ANY SITES LINKED
							(THROUGH HYPERLINKS, BANNER ADVERTISING OR OTHERWISE) TO THIS SITE,
							(VIII) ANY USER CONTENT OR CONTENT THAT IS DEFAMATORY, HARASSING,
							ABUSIVE, HARMFUL TO MINORS OR ANY PROTECTED CLASS, PORNOGRAPHIC,
							&quot;X-RATED&quot;, OBSCENE OR OTHERWISE OBJECTIONABLE, AND/OR (IX)
							ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR USE OF
							THIS SITE OR THE SERVICES FOUND AT THIS SITE, WHETHER BASED ON
							WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL OR EQUITABLE THEORY, AND
							WHETHER OR NOT COMPANY IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
							IN ADDITION, YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT ANY CAUSE OF
							ACTION ARISING OUT OF OR RELATED TO THIS SITE OR THE SERVICES FOUND
							AT THIS SITE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF
							ACTION ACCRUES, OTHERWISE SUCH CAUSE OF ACTION SHALL BE PERMANENTLY
							BARRED. THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE
							FULLEST EXTENT PERMITTED BY LAW, AND SHALL SURVIVE ANY TERMINATION OR
							EXPIRATION OF THIS AGREEMENT OR YOUR USE OF THIS SITE OR THE SERVICES
							FOUND AT THIS SITE.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							8. INDEMNITY
						</h2>
						<p>
							You agree to protect, defend, indemnify and hold harmless Company and
							its officers, directors, employees, agents from and against any and
							all claims, demands, costs, expenses, losses, liabilities and damages
							of every kind and nature (including, without limitation, reasonable
							attorneys’ fees) imposed upon or incurred by Company directly or
							indirectly arising from (i) your use of and access to this Site; (ii)
							your violation of any provision of this Agreement or the policies or
							agreements which are incorporated herein; and/or (iii) your violation
							of any third-party right, including without limitation any
							intellectual property or other proprietary right. The indemnification
							obligations under this section shall survive any termination or
							expiration of this Agreement or your use of this Site or the Services
							found at this Site.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							9. DATA TRANSFER
						</h2>
						<p>
							If you are visiting this Site from a country other than the country
							in which our servers are located, your communications with us may
							result in the transfer of information across international boundaries.
							By visiting this Site and communicating electronically with us, you
							consent to such transfers.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							10. AVAILABILITY OF WEBSITE
						</h2>
						<p>
							Subject to the terms and conditions of this Agreement and our
							policies, we shall use commercially reasonable efforts to attempt to
							provide this Site on 24/7 basis. You acknowledge and agree that from
							time to time this Site may be inaccessible for any reason including,
							but not limited to, periodic maintenance, repairs or replacements
							that we undertake from time to time, or other causes beyond our
							control including, but not limited to, interruption or failure of
							telecommunication or digital transmission links or other failures. You
							acknowledge and agree that we have no control over the availability
							of this Site on a continuous or uninterrupted basis, and that we
							assume no liability to you or any other party with regard thereto.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							11. DISCONTINUED SERVICES
						</h2>
						<p>
							Company reserves the right to cease offering or providing any of the
							Services at any time, for any or no reason, and without prior notice.
							Although Company makes great effort to maximize the lifespan of all
							its Services, there are times when a Service we offer will be
							discontinued. If that is the case, that product or service will no
							longer be supported by Company. In such case, Company will either
							offer a comparable Service for you to migrate to or a refund. Company
							will not be liable to you or any third party for any modification,
							suspension, or discontinuance of any of the Services we may offer or
							facilitate access to.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							12. FEES AND PAYMENTS
						</h2>
						<p>
							You acknowledge and agree that your payment will be charged and
							processed by ProChat™. You agree to pay any and all prices and fees
							due for Services purchased or obtained at this Site at the time you
							order the Services. Company expressly reserves the right to change or
							modify its prices and fees at any time, and such changes or
							modifications shall be posted online at this Site and effective
							immediately without need for further notice to you. Except as
							expressly provided in these Terms, all charges and payments are
							non-refundable, non-cancellable, and non-creditable, even if your
							Services are suspended, terminated, or transferred prior to the end
							of the Services term.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							13. NO THIRD-PARTY BENEFICIARIES
						</h2>
						<p>
							Nothing in this Agreement shall be deemed to confer any third-party
							rights or benefits.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							14. COMPLIANCE WITH LOCAL LAWS
						</h2>
						<p>
							Company makes no representation or warranty that the content
							available on this Site are appropriate in every country or
							jurisdiction, and access to this Site from countries or jurisdictions
							where its content is illegal is prohibited. Users who choose to
							access this Site are responsible for compliance with all local laws,
							rules and regulations.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							15. GOVERNING LAW
						</h2>
						<p>
							This Agreement and any dispute or claim arising out of or in
							connection with it or its subject matter or formation shall be
							governed by and construed in accordance with the laws of Portugal,
							Porto, to the exclusion of conflict of law rules.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							16. DISPUTE RESOLUTION
						</h2>
						<p>
							Any controversy or claim arising out of or relating to these Terms
							of Services will be settled by binding arbitration. Any such
							controversy or claim must be arbitrated on an individual basis, and
							must not be consolidated in any arbitration with any claim or
							controversy of any other party. The arbitration must be conducted in
							Portugal, Porto, and judgment on the arbitration award may be entered
							into any court having jurisdiction thereof.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							17. TITLES AND HEADINGS
						</h2>
						<p>
							The titles and headings of this Agreement are for convenience and
							ease of reference only and shall not be utilized in any way to
							construe or interpret the agreement of the parties as otherwise set
							forth herein.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							18. SEVERABILITY
						</h2>
						<p>
							Each covenant and agreement in this Agreement shall be construed for
							all purposes to be a separate and independent covenant or agreement.
							If a court of competent jurisdiction holds any provision (or portion
							of a provision) of this Agreement to be illegal, invalid, or
							otherwise unenforceable, the remaining provisions (or portions of
							provisions) of this Agreement shall not be affected thereby and shall
							be found to be valid and enforceable to the fullest extent permitted
							by law.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							19. CONTACT INFORMATION
						</h2>
						<p className="mb-4">
							If you have any questions about this Agreement, please contact us by
							email or regular mail at the following address: ProChat™ 40, A. dos
							Descobr. Portugal info@prochat.tools
						</p>
					</article>

					<div className="pt-10 border-t border-slate-100 mt-10 dark:border-[#1E242D]">
						<p>
							Still have a question? Here you can{' '}
							<span className="font-medium text-slate-900 dark:text-white">
								submit a ticket
							</span>
							.
						</p>
					</div>
				</article>
			</main>
		</section>
	)
}
