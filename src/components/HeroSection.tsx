import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Box,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Code2,
  Copy,
  Check,
  Zap,
  Globe,
  Award,
} from 'lucide-react';
import { PORTRAIT_HERO_URL, PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { MatrixRainCanvas } from './MatrixRainCanvas';

interface HeroSectionProps {
  theme: ThemeMode;
  onScrollToAbout: () => void;
  onExploreProjects: () => void;
}

const HERO_HIGHLIGHTS = [
  {
    icon: Zap,
    text: '500+ LeetCode Solved • Top 5% Global Problem Solving',
    tag: 'Algorithms',
  },
  {
    icon: Box,
    text: 'Web3 & EVM Protocols • Audited Smart Contracts',
    tag: 'Blockchain',
  },
  {
    icon: Terminal,
    text: 'High-Throughput Microservices • Node.js, Python & FastAPI',
    tag: 'Backend',
  },
  {
    icon: Globe,
    text: 'Based in Mumbai, India • Available for Full-Time & Contracts',
    tag: 'Availability',
  },
];

export function HeroSection({ theme, onScrollToAbout, onExploreProjects }: HeroSectionProps) {
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const [showCodeSnapshot, setShowCodeSnapshot] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Auto-cycle through status highlights every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % HERO_HIGHLIGHTS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const developerCodeSnippet = `// Neal Kottilingal • Lead Profile
const engineer = {
  name: "Neal Kottilingal",
  title: "Full Stack Developer & Web3 Builder",
  location: "Mumbai, Maharashtra, India",
  status: "🟢 Available for high-impact roles",
  dsa: "500+ LeetCode Solutions (Top 5% Global)",
  coreStack: {
    frontend: ["React 19", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Python (FastAPI/Django)", "Node.js", "PostgreSQL", "Docker"],
    web3: ["Solidity", "EVM", "Algorand Smart Contracts", "Ethers.js"]
  },
  contact: "${PERSONAL_INFO.email}"
};`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(developerCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2400);
  };

  const CurrentIcon = HERO_HIGHLIGHTS[activeHighlightIndex].icon;

  return (
    <section
      id="hero"
      className={`relative pt-6 sm:pt-12 pb-16 sm:pb-24 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0A0D12]' : 'bg-[#F7F5F0]'
      }`}
    >
      {/* Futuristic Faint Teal Matrix Glyphs Background Animation */}
      <MatrixRainCanvas theme={theme} />

      {/* Background Watermark Subtle Text and Grid */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.035] dark:opacity-[0.05] flex items-center justify-center z-0">
        <span className="text-[28vw] font-black leading-none uppercase text-stone-900 dark:text-white tracking-tighter">
          NK
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative flex flex-col justify-between">
        {/* Massive Hero Headline - Top Deck ("I'M A FULL STACK") */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full text-center select-none z-10"
        >
          <h1
            className={`font-hero text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.4rem] uppercase tracking-tight leading-none ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            I’M A{' '}
            <span className="relative inline-block">
              FULL STACK
              {/* Decorative Doodle */}
              <svg
                className="absolute -top-3 sm:-top-5 -right-6 sm:-right-8 w-6 sm:w-10 h-6 sm:h-10 text-amber-500 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2v4m0 12v4m-8-10H2m20 0h-4m-2.929-5.071l2.828-2.829m-11.314 0l2.829 2.829m0 8.486l-2.829 2.828m11.314 0l-2.828-2.828"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>
        </motion.div>

        {/* Centerpiece Composition: Geometric Shape, Neal's Cutout/Framed Photo, and Layered Typography */}
        <div className="relative w-full max-w-4xl mx-auto my-3 sm:my-2 flex items-center justify-center">
          {/* Large Orange Geometric Backdrop Starburst / Diamond */}
          <motion.div
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute w-52 h-52 sm:w-80 sm:h-80 md:w-96 md:h-96 -translate-x-12 sm:-translate-x-28 -translate-y-4 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-3xl opacity-95 shadow-2xl shadow-amber-500/30 flex items-center justify-center animate-glow pointer-events-none -z-0"
          >
            <div className="w-full h-full border-4 border-dashed border-white/25 rounded-3xl"></div>
          </motion.div>

          {/* Secondary soft decorative circle */}
          <div
            className={`absolute w-44 h-44 sm:w-64 sm:h-64 translate-x-24 sm:translate-x-36 translate-y-12 rounded-full blur-2xl pointer-events-none ${
              theme === 'dark' ? 'bg-amber-500/10' : 'bg-gray-900/5'
            }`}
          ></div>

          {/* Neal Kottilingal's Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className={`relative z-20 w-64 h-80 sm:w-80 sm:h-[420px] md:w-[370px] md:h-[460px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 ${
              theme === 'dark' ? 'ring-8 ring-stone-900/90 shadow-black/80' : 'ring-8 ring-white/90'
            }`}
          >
            <img
              alt="Neal Kottilingal - Full Stack Developer & Web3 Builder"
              className="w-full h-full object-cover object-top filter contrast-[1.03] saturate-[1.05]"
              loading="eager"
              src={PORTRAIT_HERO_URL}
            />

            {/* Inner Vignette Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Floating mini location badge on photo */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 inline-flex items-center gap-2 text-white text-xs shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-medium">Mumbai, India</span>
            </div>
          </motion.div>

          {/* Secondary Background Typographic Layer ("ENGINEER" outline behind photo - no duplicate text or visual clashes) */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-10 opacity-60">
            <div
              className={`font-hero text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight uppercase font-black ${
                theme === 'dark' ? 'stroke-text-dark' : 'stroke-text-light'
              }`}
            >
              ENGINEER
            </div>
          </div>

          {/* Floating Decorative Tech Badges - Left (Python & Node.js) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={`hidden lg:flex absolute -left-10 top-1/4 z-30 px-4 py-3 rounded-2xl border items-center gap-3 animate-float backdrop-blur-md cursor-pointer transition-all ${
              theme === 'dark'
                ? 'bg-[#121820] border-stone-700/90 text-white shadow-xl shadow-black/60 hover:border-amber-500/60'
                : 'bg-white border-stone-200/90 text-stone-900 shadow-xl shadow-stone-300/40 hover:border-amber-400'
            }`}
            onClick={onExploreProjects}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                theme === 'dark'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-amber-100 text-amber-600 border border-amber-200'
              }`}
            >
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div
                className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                Backend Core
              </div>
              <div
                className={`text-sm font-extrabold flex items-center gap-1 ${
                  theme === 'dark' ? 'text-white' : 'text-stone-900'
                }`}
              >
                <span>Python & Node.js</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Decorative Tech Badges - Right (Web3 & Ledger) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -8, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={`hidden lg:flex absolute -right-8 bottom-1/4 z-30 px-4 py-3 rounded-2xl border items-center gap-3 animate-float backdrop-blur-md cursor-pointer transition-all ${
              theme === 'dark'
                ? 'bg-[#121820] border-stone-700/90 text-white shadow-xl shadow-black/60 hover:border-amber-500/60'
                : 'bg-white border-stone-200/90 text-stone-900 shadow-xl shadow-stone-300/40 hover:border-amber-400'
            }`}
            style={{ animationDelay: '2s' }}
            onClick={onExploreProjects}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                theme === 'dark'
                  ? 'bg-stone-800 text-amber-400 border border-stone-700'
                  : 'bg-amber-100 text-amber-600 border border-amber-200'
              }`}
            >
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div
                className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                Web3 & Ledger
              </div>
              <div
                className={`text-sm font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-stone-900'
                }`}
              >
                Smart Contracts
              </div>
            </div>
          </motion.div>
        </div>

        {/* Massive Hero Headline - Bottom Deck ("DEVELOPER") - 100% Legible, Unobstructed */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full text-center select-none z-20 mt-1 sm:mt-2 relative"
        >
          <h2
            className={`font-hero text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] xl:text-[9.5rem] uppercase tracking-tighter leading-none transition-colors ${
              theme === 'dark' ? 'text-stone-100 hover:text-white' : 'text-gray-950'
            }`}
          >
            DEVELOPER
            <span className="text-amber-500 inline-block ml-1 animate-pulse">.</span>
          </h2>
        </motion.div>

        {/* Interactive Live Developer HUD & Tech Console (Replaces obstructive scroll logo with rich interactivity) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-3xl mx-auto mt-6 sm:mt-8 z-30 flex flex-col items-center gap-4"
        >
          {/* Dynamic Live Status Strip */}
          <div
            className={`w-full p-2.5 sm:p-3 rounded-2xl border backdrop-blur-md transition-all shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 ${
              theme === 'dark'
                ? 'bg-[#121820]/90 border-stone-800 text-stone-200 shadow-black/40'
                : 'bg-white/95 border-stone-200/90 text-stone-800 shadow-stone-300/40'
            }`}
          >
            {/* Live Availability Badge & Cycling Highlights */}
            <div className="flex items-center gap-2.5 px-2 overflow-hidden w-full sm:w-auto">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHighlightIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold truncate cursor-pointer select-none"
                  onClick={() =>
                    setActiveHighlightIndex((prev) => (prev + 1) % HERO_HIGHLIGHTS.length)
                  }
                  title="Click to cycle highlights"
                >
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                    {HERO_HIGHLIGHTS[activeHighlightIndex].tag}
                  </span>
                  <span className="truncate">{HERO_HIGHLIGHTS[activeHighlightIndex].text}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Interactive Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <motion.button
                id="toggle-code-snapshot-btn"
                onClick={() => setShowCodeSnapshot(!showCodeSnapshot)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cyber-btn px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  showCodeSnapshot
                    ? 'bg-amber-500 text-stone-950 border-amber-500'
                    : theme === 'dark'
                    ? 'bg-stone-850 hover:bg-stone-800 text-stone-300 border-stone-700'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{showCodeSnapshot ? 'Hide Stack' : 'Code Snapshot'}</span>
                <span className="terminal-cursor !h-2.5 !w-1 bg-amber-400" />
              </motion.button>

              <motion.button
                id="hero-explore-projects-btn"
                onClick={onExploreProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-btn px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* Interactive Expandable Code Snapshot */}
          <AnimatePresence>
            {showCodeSnapshot && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full overflow-hidden"
              >
                <div
                  className={`p-4 rounded-2xl border font-mono text-xs shadow-2xl relative ${
                    theme === 'dark'
                      ? 'bg-[#0E1318] border-stone-800 text-stone-300'
                      : 'bg-stone-900 border-stone-800 text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-semibold ml-2">
                        neal-developer-manifest.ts
                      </span>
                    </div>

                    <button
                      onClick={copyCodeToClipboard}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Manifest</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-amber-400/95">
                    <code>{developerCodeSnippet}</code>
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sleek, Non-Obtrusive Scroll Prompt (Safely positioned below DEVELOPER and HUD) */}
          <motion.button
            id="clean-scroll-indicator-btn"
            onClick={onScrollToAbout}
            whileHover={{ scale: 1.05, y: 2 }}
            whileTap={{ scale: 0.95 }}
            className={`cyber-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border shadow-sm cursor-pointer mt-1 ${
              theme === 'dark'
                ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border-stone-800'
                : 'bg-white/90 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border-stone-200'
            }`}
          >
            <span>Explore Bio & Stack</span>
            <ArrowDown className="w-3.5 h-3.5 text-teal-400 animate-bounce" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

