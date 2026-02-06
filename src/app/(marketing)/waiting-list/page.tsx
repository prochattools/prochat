import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import WaitingListHero from '@/components/WaitingListHero'

export const metadata = getSEOTags({
  title: `${config.appName} Waiting List`,
  description: `Get notified when ${config.appName} opens access.`,
  canonicalUrlRelative: '/waiting-list',
})

export default function WaitingList() {
  return <WaitingListHero prochatVersion={process.env.PROCHAT_VERSION} />
}
