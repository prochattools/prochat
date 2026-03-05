import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import WaitingListBody from "./WaitingListBody";

export const metadata = getSEOTags({
  title: `${config.appName} UXKit Waiting List`,
  description:
    'Legacy waitlist route. Visit the canonical UXKit waitlist page.',
  canonicalUrlRelative: '/kits/uxkit-waitlist',
  robots: {
    index: false,
    follow: false,
  },
});

export default function WaitingList() {
  return <WaitingListBody />;
}
