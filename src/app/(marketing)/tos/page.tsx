import Link from 'next/link'

import config from '@/config'
import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: '/tos',
})

export default function Tos() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-[#B2B5BA] dark:hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </Link>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        Terms and Conditions
      </h1>
      <p className="mt-2 text-slate-600 dark:text-[#B2B5BA]">For {config.appName}.</p>

      <pre className="mt-10 whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-[#B2B5BA]">
        {`Last Updated: September 26, 2023

Welcome to SaaSKit!

These Terms of Service ("Terms") govern your use of the SaaSKit website at https://prochat.tools ("Website") and the services provided by SaaSKit. By using our Website and services, you agree to these Terms.

1. Description of SaaSKit

SaaSKit is a platform that offers a SaaS starter kit to assist entrepreneurs in launching their startups more efficiently.

2. Ownership and Usage Rights

When you purchase a package from SaaSKit, you gain the right to download and use the code provided for creating applications. You own the code you create but do not have the right to resell it. We offer a full refund within 7 days of purchase, as specified in our refund policy.

3. User Data and Privacy

We collect and store user data, including name, email, and payment information, as necessary to provide our services. For details on how we handle your data, please refer to our Privacy Policy at https://prochat.tools/privacy-policy.

4. Non-Personal Data Collection

We use web cookies to collect non-personal data for the purpose of improving our services and user experience.

5. Governing Law

These Terms are governed by the laws of France.

6. Updates to the Terms

We may update these Terms from time to time. Users will be notified of any changes via email.

For any questions or concerns regarding these Terms of Service, please contact us at info@prochat.tools.

Thank you for using SaaSKit!`}
      </pre>
    </div>
  )
}
