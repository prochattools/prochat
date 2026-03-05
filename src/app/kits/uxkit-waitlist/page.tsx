import { getSEOTags } from '@/libs/seo'
import WaitingListBody from '@/app/waiting-list/WaitingListBody'
import StructuredData from '@/components/StructuredData'
import { getEventSchema } from '@/libs/structured-data'

export const metadata = getSEOTags({
  title: 'UXKit — UX System for AI SaaS Builders (Early Access)',
  description:
    'Join the UXKit waitlist. A structured UX system for non-technical founders building SaaS with AI.',
  canonicalUrlRelative: '/kits/uxkit-waitlist',
  openGraph: {
    title: 'UXKit — UX System for AI SaaS Builders (Early Access)',
    description:
      'Join the UXKit waitlist. A structured UX system for non-technical founders building SaaS with AI.',
    images: ['/og/uxkit-waitlist.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/uxkit-waitlist.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
})

export default function UXKitWaitlistPage() {
  return (
    <>
      <StructuredData
        id="schema-uxkit-event"
        data={getEventSchema({
          name: 'UXKit Early Access',
          description:
            'Early access waitlist for UXKit, a structured UX system for AI SaaS builders.',
          urlPath: '/kits/uxkit-waitlist',
        })}
      />
      <WaitingListBody />
    </>
  )
}
