'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Apple, Play, CheckCircle2, Star } from 'lucide-react';
import WaveDivider from './WaveDivider';

export default function DownloadSection() {
  return (
    <>
      <WaveDivider variant="pink-to-mint" height={100} />
      <section
        id="download"
        className="relative w-full py-24 md:py-32 overflow-hidden section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Big glass card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden glass shadow-soft"
          >
            {/* Inner gradient wash */}
            <div className="absolute inset-0 bg-brand-gradient-soft pointer-events-none" />
            {/* Floating decorative blobs inside the card */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/25 blur-3xl pointer-events-none animate-float-y" />
            <div className="absolute -bottom-24 -right-10 w-96 h-96 rounded-full bg-secondary/40 blur-3xl pointer-events-none animate-float-y-slow" />

            <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center p-8 md:p-14 lg:p-16">
              {/* LEFT — copy + CTAs */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass shadow-soft"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-white">
                    iOS + Android • Gratis
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-black text-ink-900 dark:text-white leading-[1.02] mb-6">
                  Mindre skärmtid.<br />
                  <span className="text-brand-gradient">Mer familjetid.</span>
                </h2>

                <p className="text-lg md:text-xl text-ink-500 dark:text-ink-200 mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  Ladda ner Famies. Ge era barn en bättre lördag —
                  <span className="text-ink-900 dark:text-white font-semibold">
                    {' '}innan ni hinner bråka om vad ni ska hitta på.
                  </span>
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                  <Link
                    href="https://apps.apple.com/se/app/famies/id6450005701"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press group flex items-center gap-3 px-6 py-4 rounded-2xl bg-ink-900 dark:bg-white text-white dark:text-ink-900 font-bold shadow-soft hover:shadow-pink transition-all"
                  >
                    <Apple size={28} fill="currentColor" />
                    <span className="flex flex-col leading-none text-left">
                      <span className="text-[10px] uppercase opacity-70 tracking-wider">Ladda ner för</span>
                      <span className="text-base font-extrabold">App Store</span>
                    </span>
                  </Link>

                  <Link
                    href="https://play.google.com/store/apps/details?id=com.famapdirectory.apps&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press group flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary text-white font-bold shadow-pink hover:shadow-glow-pink transition-all"
                  >
                    <Play size={26} fill="currentColor" />
                    <span className="flex flex-col leading-none text-left">
                      <span className="text-[10px] uppercase opacity-85 tracking-wider">Hämta på</span>
                      <span className="text-base font-extrabold">Google Play</span>
                    </span>
                  </Link>
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-ink-500 dark:text-ink-200 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    Gratis för alltid
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    Inget kreditkort
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary" />
                    30 sek att komma igång
                  </div>
                </div>
              </div>

              {/* RIGHT — phone + rating card */}
              <div className="relative mx-auto max-w-[320px] lg:max-w-none">
                <div className="relative w-[260px] sm:w-[300px] h-[540px] sm:h-[620px] mx-auto rotate-[4deg] hover:rotate-0 transition-transform duration-700">
                  <div className="relative w-full h-full bg-ink-900 rounded-[2.8rem] border-[10px] border-ink-900 shadow-2xl overflow-hidden">
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white">
                      <Image
                        src="/app-screenshot.png"
                        alt="Famies app-flöde"
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-ink-900 rounded-b-2xl z-10" />
                  </div>

                  {/* Rating card floating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute -bottom-4 -left-4 sm:-left-10 glass rounded-2xl p-4 shadow-pink animate-float-y"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} size={14} className="fill-primary text-primary" />
                      ))}
                      <span className="ml-1.5 text-sm font-black text-ink-900 dark:text-white">
                        4.8
                      </span>
                    </div>
                    <p className="text-xs text-ink-500 dark:text-ink-200 font-medium">
                      från 10k+ familjer
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
