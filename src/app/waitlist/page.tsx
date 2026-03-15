import { getSEOTags } from '@/libs/seo'
import WaitingListBody from '@/app/waiting-list/WaitingListBody'
import StructuredData from '@/components/StructuredData'
import { getEventSchema } from '@/libs/structured-data'

export const metadata = getSEOTags({
  title: 'ProChat Waitlist — Early Access for Upcoming Products',
  description:
    'Join the ProChat waitlist for UXKit, WaaSKit, and ProChat OS. Get roadmap updates, early previews, and access notices.',
  canonicalUrlRelative: '/waitlist',
  openGraph: {
    title: 'ProChat Waitlist — Early Access for Upcoming Products',
    description:
      'Join the ProChat waitlist for UXKit, WaaSKit, and ProChat OS. Get roadmap updates, early previews, and access notices.',
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
          urlPath: '/waitlist',
        })}
      />
      <WaitingListBody />
    </>
  )
}
