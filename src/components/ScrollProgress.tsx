import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ThemeMode } from '../types';

interface ScrollProgressProps {
  theme: ThemeMode;
}

export function ScrollProgress({ theme }: ScrollProgressProps) {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowScrollTop(latest > 280);
    });
  }, [scrollY]);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <>
      {/* Top Fixed Reading Progress Indicator with PCB Circuit Dual-Glow (Teal to Amber) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-[#4FD1C5] to-[#F2A93B] z-[999] origin-left shadow-[0_0_10px_rgba(79,209,197,0.7)]"
        style={{ scaleX }}
      />

      {/* Floating Animated Back-To-Top Button with Scroll Progress Gauge */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Scroll back to top"
              className={`relative w-12 h-12 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-md transition-colors border group ${
                theme === 'dark'
                  ? 'bg-stone-900/95 text-stone-200 border-stone-700/80 hover:border-amber-500/80 shadow-black/70'
                  : 'bg-white/95 text-stone-800 border-stone-200 hover:border-amber-400 shadow-stone-400/40'
              }`}
            >
              {/* Circular SVG Scroll Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="transparent"
                  stroke={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
                  strokeWidth="2.5"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-150"
                />
              </svg>

              {/* Arrow Icon with Upward Bounce Hover Motion */}
              <motion.div
                className="relative z-10 flex items-center justify-center text-amber-500 group-hover:text-amber-400"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowUp className="w-5 h-5 stroke-[2.5]" />
              </motion.div>

              {/* Tooltip on hover */}
              <span className="absolute -top-8 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                {scrollPercent}%
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
