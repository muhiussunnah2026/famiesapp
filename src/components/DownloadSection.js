'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Apple, Play, CheckCircle2 } from 'lucide-react';

export default function DownloadSection() {
  return (
    <section id="download" className="relative w-full py-24 overflow-hidden bg-gradient-to-br from-white via-[#fff0f5] to-[#f0fff4] dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-500">
      
      {/* --- ডাইনামিক অ্যানিমেটেড ব্যাকগ্রাউন্ড --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#FF8FAF]/30 dark:bg-[#FF8FAF]/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#CCFAD6]/40 dark:bg-[#CCFAD6]/10 rounded-full blur-[130px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* হেডার টেক্সট */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 mb-6 rounded-full bg-[#FF8FAF]/10 border border-[#FF8FAF]/20 text-[#FF8FAF] font-bold text-xs uppercase tracking-wide"
          >
            🚀 Finns på iOS & Android
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Less screen time. <br/>
            <span className="text-[#FF8FAF]">
              More family time.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 font-medium"
          >
            Få idéer och tips som passar ert familjeliv, från familjer nära dig.
          </motion.p>
        </div>

        {/* ডাউনলোড কার্ডস */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* iOS Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[2rem] p-8 shadow-xl shadow-[#FF8FAF]/10 dark:shadow-none transition-all duration-500 hover:border-[#FF8FAF]/50 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-gray-50 dark:bg-white rounded-2xl border border-gray-100 dark:border-transparent flex items-center justify-center text-black shadow-sm">
                <Apple size={36} fill="currentColor" />
              </div>
              <span className="px-3 py-1 bg-[#FF8FAF]/20 text-[#FF8FAF] text-[10px] font-bold rounded-full border border-[#FF8FAF]/30 uppercase">
                Rekommenderas
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ladda ner för iOS</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Kompatibel med iPhone, iPad & Watch.</p>
            
            <Link 
              href="https://apps.apple.com/us/app/fam-map/id6450005701" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 bg-[#FF8FAF] text-white font-bold rounded-xl hover:bg-[#ff7eb9] transition gap-2 shadow-lg shadow-[#FF8FAF]/30"
            >
              <Apple size={22} className="mb-1" fill="currentColor" />
              App Store
            </Link>
          </motion.div>

          {/* Android Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[2rem] p-8 shadow-xl shadow-[#CCFAD6]/20 dark:shadow-none transition-all duration-500 hover:border-[#CCFAD6]/50 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-gray-50 dark:bg-white rounded-2xl border border-gray-100 dark:border-transparent flex items-center justify-center text-black shadow-sm">
                <Play size={36} fill="currentColor" className="ml-1" /> 
              </div>
              <span className="px-3 py-1 bg-[#CCFAD6]/40 dark:bg-[#CCFAD6]/20 text-teal-700 dark:text-[#CCFAD6] text-[10px] font-bold rounded-full border border-[#CCFAD6]/30 uppercase">
                Senaste versionen
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hämta på Android</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Stödjer Android 10 och senare enheter.</p>
            
            <Link 
              href="https://play.google.com/store/apps/details?id=com.famapdirectory.apps&hl=bn" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 bg-[#CCFAD6] text-teal-900 font-bold rounded-xl hover:bg-[#b0f5bf] transition gap-2 shadow-lg shadow-[#CCFAD6]/30"
            >
              <Play size={22} fill="currentColor" />
              Google Play
            </Link>
          </motion.div>

        </div>

        {/* Benefits List (Translated) */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-12 text-gray-600 dark:text-gray-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#FF8FAF]" />
            <span>Gratis för alltid</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#FF8FAF]" />
            <span>Inget kreditkort krävs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#FF8FAF]" />
            <span>Säker datakryptering</span>
          </div>
        </div>

      </div>
    </section>
  );
}