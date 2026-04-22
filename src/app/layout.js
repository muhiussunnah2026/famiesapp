import localFont from "next/font/local"; // 👈 Google Font সরিয়ে Local Font আনা হলো
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from 'react-hot-toast';
import ProgressBar from "@/components/ProgressBar";

// ✅ Satoshi ফন্ট কনফিগারেশন (তোমার ফোল্ডারের .otf ফাইল অনুযায়ী)
const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: "--font-satoshi", // 👈 এই ভেরিয়েবলটা আমরা Tailwind-এ ব্যবহার করবো
  display: "swap",
});

export const metadata = {
  title: "Famies - Connect with Families",
  description: "Discover personalized tips & events smartly selected for your family.",
  icons: { icon: '/logo.png', apple: '/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ✅ বডিতে satoshi ভেরিয়েবল এবং font-sans ক্লাস দেওয়া হলো */}
      <body className={`${satoshi.variable} font-sans antialiased`}>
        <Providers>
          <ProgressBar />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          
          {/* ✅ প্রিমিয়াম গ্লসি টোস্ট */}
          <Toaster 
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: '',
              style: {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '16px',
                color: '#333',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                fontWeight: '600',
              },
              success: {
                iconTheme: { primary: '#ec4899', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#ff4b4b', secondary: '#fff' },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}