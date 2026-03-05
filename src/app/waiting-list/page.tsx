import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import WaitingListBody from "./WaitingListBody";

export const metadata = getSEOTags({
  title: `${config.appName} Waiting List | Best AI tools`,
  description: "How to launch your MicroSaaS",
});

export default function WaitingList() {
  return <WaitingListBody />;
}
