'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Apple, Play, Mail } from 'lucide-react';
import { LIVE } from '@/lib/siteConfig';

// সোশ্যাল মিডিয়া লিঙ্ক
const SocialLink = ({ href, icon: Icon, color }) => (
  <motion.a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -3 }}
    className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:bg-white hover:shadow-lg ${color}`}
  >
    <Icon size={20} />
  </motion.a>
);

// টিকটক আইকন
const TiktokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Coming Soon mode: hide footer on the homepage (the landing
  // ships its own minimal footer). Other routes still get this.
  if (!LIVE && pathname === '/') {
    return null;
  }

  // ✅ আপডেটেড লিগ্যাল লিঙ্কস (Cookie Policy -> Account Deletion Manual)
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Account Deletion Manual', href: '/deletion' }, 
     { name: 'Login', href: '/login' }// 🔥 Updated Here
  ];

  return (
    <footer className="relative pt-20 pb-10 border-t border-ink-100/80 dark:border-ink-700/50 overflow-hidden section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* ১. ব্র্যান্ড ইনফো ও লোগো */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-soft">
                <Image
                  src="/logo-black.webp"
                  alt="Famies logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-2xl font-black text-ink-900 dark:text-white tracking-tight">Famies</span>
            </Link>
            <p className="text-ink-500 dark:text-ink-300 text-sm leading-relaxed mb-6">
              Byggd av föräldrar, för föräldrar. Få utvalda evenemang, tips och idéer, nära dig. Mindre skärmtid, mer familjetid.
            </p>
            
            {/* সোশ্যাল আইকন */}
            <div className="flex items-center gap-3">
              <SocialLink href="#" icon={Instagram} color="hover:text-pink-600 hover:shadow-pink-500/30" />
              <SocialLink href="#" icon={TiktokIcon} color="hover:text-black dark:hover:text-white hover:shadow-gray-500/30" />
              <SocialLink href="https://www.youtube.com/@TheFamies" icon={Youtube} color="hover:text-red-600 hover:shadow-red-500/30" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-ink-900 dark:text-white mb-6">Utforska</h4>
            <ul className="space-y-4">
              {[
                { name: 'Hem', href: '/' },
                { name: 'Så funkar det', href: '/#how' },
                { name: 'Funktioner', href: '/#features' },
                { name: 'Recensioner', href: '/#reviews' },
                { name: 'Inspiration', href: '/inspiration' },
                { name: 'Skapa event', href: '/skapa-event' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-ink-500 dark:text-ink-300 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-ink-900 dark:text-white mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@famies.app" className="flex items-center gap-2 text-ink-500 dark:text-ink-300 hover:text-primary transition-colors text-sm font-medium">
                  <Mail size={16} />
                  support@famies.app
                </a>
              </li>
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-ink-500 dark:text-ink-300 hover:text-primary transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get the App */}
          <div>
            <h4 className="font-bold text-ink-900 dark:text-white mb-6">Hämta appen</h4>
            <p className="text-ink-500 dark:text-ink-300 text-sm mb-4">
              Öppna Famies på din mobil, gratis, alltid.
            </p>
            <div className="flex flex-col gap-3">
              
              {/* iOS Button */}
              <a href="https://apps.apple.com/se/app/famies/id6450005701" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition shadow-sm hover:shadow-md group">
                <Apple size={24} className="text-gray-900 dark:text-white group-hover:scale-110 transition-transform" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase opacity-60">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </a>

              {/* Android Button */}
              <a href="https://play.google.com/store/apps/details?id=com.famapdirectory.apps&hl=en" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition shadow-sm hover:shadow-md group">
                <Play size={22} className="ml-0.5 text-gray-900 dark:text-white group-hover:scale-110 transition-transform" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase opacity-60">Get it on</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* বটম বার */}
        <div className="pt-8 border-t border-ink-100/70 dark:border-ink-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-500 dark:text-ink-300 text-sm">
            © {currentYear} FAM MAP AB • Famies. All rights reserved.
          </p>
          <p className="text-ink-500 dark:text-ink-300 text-xs">
            Gjort med <span className="text-primary">♥</span> i Stockholm
          </p>
        </div>

      </div>
    </footer>
  );
}