'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden relative text-center px-4">
      
      {/* ব্যাকগ্রাউন্ড অ্যানিমেশন */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" 
      />

      {/* 404 টেক্সট অ্যানিমেশন */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-[10rem] md:text-[14rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary to-pink-200 opacity-80 select-none">
          404
        </h1>
        
        {/* ফ্লোটিং এলিমেন্ট */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-xl border border-gray-100 dark:border-gray-700 whitespace-nowrap"
        >
          <span className="text-lg font-bold text-gray-800 dark:text-white">Oops! Lost? 🧸</span>
        </motion.div>
      </motion.div>

      {/* মেসেজ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 max-w-lg mx-auto relative z-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          We can't find that page.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          It looks like you've wandered off the map. Don't worry, let's get you back to safety.
        </p>

        {/* বাটন */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:scale-105"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </motion.div>

    </div>
  );
}