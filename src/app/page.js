import { LIVE } from "@/lib/siteConfig";
import ComingSoon from "@/components/ComingSoon";
import HomeContent from "@/components/HomeContent";

/**
 * To go live: flip LIVE to `true` in src/lib/siteConfig.js.
 * To show the Coming Soon landing again: set it back to `false`.
 */
export default function Home() {
  return LIVE ? <HomeContent /> : <ComingSoon />;
}
