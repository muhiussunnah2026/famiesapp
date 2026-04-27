import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import DownloadSection from "@/components/DownloadSection";
import BlogSlider from "@/components/BlogSlider";
import Newsletter from "@/components/Newsletter";
import ScrollToTop from "@/components/ScrollToTop";

/**
 * The full redesigned Famies home page.
 * Shown when LIVE = true in src/lib/siteConfig.js.
 */
export default function HomeContent() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <section id="pain"><PainPoints /></section>
      <section id="how"><HowItWorks /></section>
      <section id="features"><Features /></section>
      <section id="reviews"><SocialProof /></section>
      <DownloadSection />
      <BlogSlider />
      <Newsletter />
      <ScrollToTop />
    </div>
  );
}
