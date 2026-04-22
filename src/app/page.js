import Hero from "@/components/Hero";
import Features from "@/components/Features"; 
import DownloadSection from "@/components/DownloadSection";
import ScrollToTop from "@/components/ScrollToTop";
import BlogSlider from "@/components/BlogSlider";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Features />
      <DownloadSection /> 
      <BlogSlider />
      <Newsletter />
      <ScrollToTop />
    </main>
  );
}