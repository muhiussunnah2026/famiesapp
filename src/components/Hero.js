'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, PlayCircle, X } from 'lucide-react';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#fff0f5] to-[#e6fcf0] dark:from-black dark:via-gray-900 dark:to-gray-900 overflow-hidden pt-20 pb-10">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন (তোমার আগের কোড) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- বাম পাশ: টেক্সট কন্টেন্ট (সুইডিশ আপডেট) --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary/50 border border-secondary text-green-800 dark:text-green-300 font-semibold text-sm">
            🚀 #1 Appen för moderna familjer
          </div>
          
          {/* Headline: সুন্দর রিদম ও কালার গ্রেডিয়েন্ট */}
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
            De bästa tipsen <br />
            för <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">familjelivet.</span> <br />
            Där du bor.
          </h1>
          
          {/* Subheadline: দুই লাইনে ভাঙা হয়েছে */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Vad ska vi göra idag? <br />
            <span className="text-gray-500 dark:text-gray-400">Andra familjer har redan svaret.</span>
          </p>

          {/* বাটন সেকশন */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* ডাউনলোড বাটন */}
            <Link href="/#download" className="flex items-center justify-center gap-2 bg-primary hover:bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <Download size={24} />
              Ladda ner Famies
            </Link>
            
            {/* ওয়াচ ডেমো বাটন */}
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-100 dark:border-gray-700 hover:border-primary hover:text-primary px-8 py-4 rounded-full font-bold text-lg transition hover:bg-gray-50 dark:hover:bg-gray-700 group"
            >
              <PlayCircle size={24} className="text-primary group-hover:scale-110 transition" />
              Se Demo
            </button>
          </div>
        </motion.div>

        {/* --- ডান পাশ: ফোন মকআপ (তোমার আগের কোড) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          {/* ফোনের বাইরের ফ্রেম */}
          <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3.5rem] border-[12px] border-gray-900 shadow-2xl overflow-hidden mx-auto rotate-[-5deg] hover:rotate-0 transition duration-500 z-20">
            
            {/* ফোনের ভেতরের স্ক্রিন */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-800">
              <Image 
                src="/app-screenshot.png" // তোমার ফাইলের নাম ঠিক রেখেছি
                alt="Famies App Screenshot"
                fill 
                className="object-cover"
                priority 
              />
            </div>

            {/* নচ */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-3xl z-30"></div>
          </div>

          {/* ফ্লোটিং এলিমেন্ট (Translated) */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-20 -right-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-40"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-2xl">🎉</div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Smarta Evenemang</p>
                <p className="text-xs text-gray-500">Utvalt för dig</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* --- ভিডিও পপ-আপ মোডাল (Same as before) --- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-red-500 z-10 bg-black/50 hover:bg-white rounded-full p-2 transition-all duration-300"
              >
                <X size={24} />
              </button>

              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/MEOn5GX_-hU?autoplay=1"
                title="Famies Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}