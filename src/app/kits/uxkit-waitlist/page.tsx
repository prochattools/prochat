import { getSEOTags } from '@/libs/seo'
import WaitingListBody from '@/app/waiting-list/WaitingListBody'
import StructuredData from '@/components/StructuredData'
import { getEventSchema } from '@/libs/structured-data'

export const metadata = getSEOTags({
  title: 'ProChat Waitlist — Early Access for Upcoming Products',
  description:
    'Join the ProChat waitlist for UXKit, WaaSKit, and ProChat OS. Get early access, roadmap updates, and launch pricing.',
  canonicalUrlRelative: '/kits/uxkit-waitlist',
  openGraph: {
    title: 'ProChat Waitlist — Early Access for Upcoming Products',
    description:
      'Join the ProChat waitlist for UXKit, WaaSKit, and ProChat OS. Get early access, roadmap updates, and launch pricing.',
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
          name: 'ProChat Waitlist',
          description:
            'Early access waitlist for upcoming ProChat products including UXKit, WaaSKit, and ProChat OS.',
          urlPath: '/kits/uxkit-waitlist',
        })}
      />
      <WaitingListBody />
    </>
  )
}
