'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * Scroll-to-top button with brand pink + mint glossy fill and a circular
 * progress ring around it that fills as the page scrolls.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? Math.min(1, Math.max(0, y / h)) : 0;
        setProgress(p);
        setIsVisible(y > 300);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Geometry for the SVG progress ring
  const size = 60;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group focus:outline-none"
          aria-label="Scroll to top"
          style={{ width: size, height: size }}
        >
          {/* Progress ring */}
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute inset-0 -rotate-90"
          >
            <defs>
              <linearGradient
                id="scrollRingGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF8FAF" />
                <stop offset="55%" stopColor="#ff9bb6" />
                <stop offset="100%" stopColor="#a8f0ba" />
              </linearGradient>
            </defs>

            {/* Faint background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(12,10,19,0.07)"
              strokeWidth={stroke}
            />
            {/* Animated progress arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#scrollRingGradient)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition: 'stroke-dashoffset 90ms linear',
                filter: 'drop-shadow(0 2px 6px rgba(255,143,175,0.45))',
              }}
            />
          </svg>

          {/* Glossy inner pill — solid brand colors with subtle gloss */}
          <span
            className="absolute inset-1.5 rounded-full flex items-center justify-center text-white overflow-hidden transition-all duration-300"
            style={{
              background:
                'linear-gradient(135deg, #ff6f99 0%, #FF8FAF 40%, #a8f0ba 100%)',
              boxShadow:
                '0 12px 28px -6px rgba(255,111,153,0.55), 0 6px 14px -3px rgba(168,240,186,0.4), inset 0 1px 0 0 rgba(255,255,255,0.35), inset 0 -3px 6px 0 rgba(0,0,0,0.1)',
            }}
          >
            {/* Light top highlight, kept subtle so brand colors stay vivid */}
            <span
              aria-hidden
              className="absolute inset-x-2 top-1 h-1/3 rounded-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 100%)',
              }}
            />
            {/* Soft corner sheen */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 30% 22%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 50%)',
              }}
            />

            <ArrowUp
              size={20}
              strokeWidth={3}
              className="relative z-10"
              style={{
                filter: 'drop-shadow(0 1px 2px rgba(12,10,19,0.35))',
              }}
            />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
