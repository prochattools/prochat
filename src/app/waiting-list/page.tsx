import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import WaitingListBody from "./WaitingListBody";

export const metadata = getSEOTags({
  title: `${config.appName} UXKit Waiting List`,
  description:
    'Join the UXKit waitlist for early access, launch updates, and founding pricing.',
  canonicalUrlRelative: '/waiting-list',
});

export default function WaitingList() {
  return <WaitingListBody />;
}
