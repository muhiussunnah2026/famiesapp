'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { LIVE } from '@/lib/siteConfig';
import toast from 'react-hot-toast';

//   { name: 'Beta', href: '/early-access' },
const navLinks = [
  { name: 'Hem', href: '/' },
  { name: 'Blogg', href: '/blog' },
  { name: 'Kontakt', href: '/contact' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    toast.success('Logged out successfully');
    router.push('/login');
    router.refresh();
  };

  if (!mounted) return null;

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  // Coming Soon mode: hide chrome on the homepage so the landing
  // covers the full viewport. Other routes still get the navbar.
  if (!LIVE && pathname === '/') {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "glass h-20 shadow-soft"
          : "bg-transparent border-transparent h-24 md:h-28"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          
          {/* ✅ Logo Section Fixed */}
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Link href="/" className="flex items-center gap-3 group">
              
              {/* Logo Box: Scroll করলে Black হবে */}
              <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/50 p-1.5 ring-1 ring-white/60 dark:ring-white/10 shadow-soft transition-all duration-300">
                 <Image 
                   src="/logo.png" 
                   alt="Famies Logo" 
                   width={48} 
                   height={48} 
                   className="object-contain w-full h-full"
                 />
              </div>

              {/* Text: Size ছোট করা হয়েছে (text-2xl) */}
              <span className="text-2xl md:text-[26px] font-black tracking-tight text-ink-900 dark:text-white leading-none pb-0.5">
                famies
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`text-lg font-medium transition-colors duration-300 hover:text-primary ${
                  pathname === item.href 
                    ? 'text-primary font-bold' 
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full transition-all border ${
                     scrolled ? 'bg-gray-100 border-gray-200' : 'bg-white/40 border-white/50 backdrop-blur-md'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={18} className="text-gray-800 dark:text-white transition-transform" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-60 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden p-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase">Account</p>
                        <p className="text-sm font-bold truncate text-gray-900 dark:text-white">{user.email}</p>
                      </div>
                      
                      <Link 
                        href="/dashboard" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                      >
                        <LayoutDashboard size={18} className="text-primary"/> Dashboard
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors mt-1"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {/* <Link 
                  href="/login" 
                  className="hidden md:block text-lg font-bold transition-colors duration-300 text-gray-900 dark:text-white hover:text-primary"
                >
                  Login
                </Link> */}

                <Link
                  href="/#download"
                  className="press hidden md:flex items-center gap-2 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 bg-primary hover:bg-primary-500 shadow-pink"
                >
                  <Download size={18} />
                  Ladda ner
                </Link>
              </>
            )}

            <button 
              className="lg:hidden p-2 text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl"
          >
             <div className="flex flex-col p-6 space-y-4">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   href={link.href}
                   onClick={() => setMobileMenuOpen(false)}
                   className="text-xl font-medium text-gray-900 dark:text-white hover:text-primary"
                 >
                   {link.name}
                 </Link>
               ))}
               <hr className="border-gray-100 dark:border-gray-800 my-2"/>
               {user ? (
                 <Link href="/dashboard" className="text-primary font-bold text-xl flex items-center gap-2">
                   <LayoutDashboard /> Dashboard
                 </Link>
               ) : (
                 <Link href="/login" className="text-primary font-bold text-xl">Login</Link>
               )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}