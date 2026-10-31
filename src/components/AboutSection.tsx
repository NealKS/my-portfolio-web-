import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Github, Code, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { PORTRAIT_ABOUT_URL, PERSONAL_INFO, STATS } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import { CodeCompileReveal, StaggerCompileContainer, StaggerCompileItem } from './CodeCompileReveal';

interface AboutSectionProps {
  theme: ThemeMode;
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export function AboutSection({ theme, onExploreProjects, onContactClick }: AboutSectionProps) {
  const [terminalActiveTab, setTerminalActiveTab] = useState<'bio' | 'stack' | 'status'>('bio');
  const [copiedStatus, setCopiedStatus] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText('npx neal-kottilingal');
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2400);
  };

  return (
    <section
      id="about"
      className="relative bg-[#0E1318] text-white pt-24 sm:pt-32 pb-24 sm:pb-32 overflow-hidden transition-colors duration-300 border-b border-stone-800"
    >
      {/* Subtle Checkerboard/Grid Decorative Background Pattern */}
      <div className="absolute right-0 top-12 w-96 h-96 opacity-5 pointer-events-none">
        <div className="grid grid-cols-4 gap-4 w-full h-full">
          <div className="bg-white rounded-lg"></div>
          <div></div>
          <div className="bg-white rounded-lg"></div>
          <div></div>
          <div></div>
          <div className="bg-white rounded-lg"></div>
          <div></div>
          <div className="bg-white rounded-lg"></div>
          <div className="bg-white rounded-lg"></div>
          <div></div>
          <div className="bg-white rounded-lg"></div>
          <div></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Bio & Core Metrics with Staggered Code-Compile Reveal */}
          <div className="lg:col-span-6 space-y-8">
            {/* Sub-header Tag */}
            <CodeCompileReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-800/90 border border-teal-500/30 text-teal-400 text-xs uppercase tracking-widest font-mono font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span>Hello World // Neal.init()</span>
              </div>
            </CodeCompileReveal>

            {/* Section Main Title */}
            <CodeCompileReveal delay={0.15}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                I’M NEAL KOTTILINGAL
              </h2>
            </CodeCompileReveal>

            {/* Descriptive Narrative */}
            <CodeCompileReveal delay={0.25}>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
                {PERSONAL_INFO.bio}
              </p>
            </CodeCompileReveal>

            {/* Verified Key Metrics */}
            <StaggerCompileContainer className="pt-4 space-y-5 border-t border-stone-800">
              {STATS.map((stat, idx) => (
                <StaggerCompileItem key={idx} className="flex items-center gap-4 group">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-10 h-10 rounded-full bg-stone-800 group-hover:bg-teal-500 text-white group-hover:text-stone-950 flex items-center justify-center transition-colors duration-300 shadow-md"
                  >
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </motion.div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <span className="text-stone-400 text-sm sm:text-base font-semibold">
                      {stat.label}
                    </span>
                  </div>
                </StaggerCompileItem>
              ))}
            </StaggerCompileContainer>

            {/* Quick Action Buttons & CLI Pill with Cyber Hover Scanline Effects */}
            <CodeCompileReveal delay={0.45}>
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <motion.button
                  id="about-view-works-btn"
                  onClick={onExploreProjects}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="cyber-btn px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-colors duration-200 shadow-lg shadow-amber-500/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>View Selected Works</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.a
                  id="about-github-link"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="cyber-btn px-5 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 font-semibold text-sm transition-colors inline-flex items-center gap-2 border border-stone-700 hover:border-teal-500/50 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </motion.a>

                <motion.button
                  id="about-copy-cli-btn"
                  onClick={handleCopyCli}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  className={`cyber-btn px-4 py-3.5 rounded-xl border font-mono text-xs transition-colors inline-flex items-center gap-2 cursor-pointer ${
                    copiedStatus
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-teal-400 hover:border-teal-500/50'
                  }`}
                  title="Copy Terminal Command"
                >
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>{copiedStatus ? 'Copied to CLI!' : 'npx neal'}</span>
                  <span className="terminal-cursor !h-2.5 !w-1 bg-teal-400" />
                </motion.button>
              </div>
            </CodeCompileReveal>
          </div>

          {/* Right Column: Secondary Visual Showcase with Hand-Drawn Qurifolio Accents */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-md">
              {/* Hand-drawn style decorative doodles inspired by Qurifolio */}
              {/* Top Right Sparkle Doodle */}
              <div className="absolute -top-6 -right-4 z-20 text-amber-400 pointer-events-none">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  viewBox="0 0 48 48"
                >
                  <line x1="24" x2="24" y1="4" y2="14" />
                  <line x1="38" x2="31" y1="10" y2="17" />
                  <line x1="44" x2="34" y1="24" y2="24" />
                </svg>
              </div>

              {/* Lower Right Flowing Wave Doodles */}
              <div className="absolute -bottom-4 -right-6 z-20 text-amber-500/90 pointer-events-none">
                <svg
                  className="w-16 h-12"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                  viewBox="0 0 64 32"
                >
                  <path d="M4 10 C 14 4, 20 18, 30 10 C 40 4, 46 16, 56 10" />
                  <path d="M8 22 C 18 16, 24 30, 34 22 C 44 16, 50 28, 60 22" />
                </svg>
              </div>

              {/* Main Portrait Card Container */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden border-2 border-stone-700/60 bg-stone-900 shadow-2xl group"
              >
                {/* Interactive Top code header mockup */}
                <div className="bg-stone-800/95 px-4 py-3 border-b border-stone-700/70 flex items-center justify-between select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/90"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90"></span>
                  </div>

                  {/* Clickable terminal command mode selector */}
                  <div className="flex items-center gap-2 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-700/60 text-[11px] font-mono">
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setTerminalActiveTab('bio')}
                      className={`hover:text-amber-400 transition-colors cursor-pointer ${
                        terminalActiveTab === 'bio' ? 'text-amber-400 font-bold' : 'text-stone-400'
                      }`}
                    >
                      --inspect
                    </motion.button>
                    <span className="text-stone-600">|</span>
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setTerminalActiveTab('stack')}
                      className={`hover:text-amber-400 transition-colors cursor-pointer ${
                        terminalActiveTab === 'stack' ? 'text-amber-400 font-bold' : 'text-stone-400'
                      }`}
                    >
                      --stack
                    </motion.button>
                    <span className="text-stone-600">|</span>
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setTerminalActiveTab('status')}
                      className={`hover:text-amber-400 transition-colors cursor-pointer ${
                        terminalActiveTab === 'status' ? 'text-amber-400 font-bold' : 'text-stone-400'
                      }`}
                    >
                      --status
                    </motion.button>
                  </div>

                  <div className="text-stone-400 text-xs">
                    <Code className="w-4 h-4" />
                  </div>
                </div>

                {/* Portrait Photo & Dynamic Overlay */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-950">
                  <img
                    alt="Neal Kottilingal Portrait"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    src={PORTRAIT_ABOUT_URL}
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>

                  {/* Interactive Terminal Overlay Ribbon if tab changed */}
                  <AnimatePresence mode="wait">
                    {terminalActiveTab !== 'bio' && (
                      <motion.div
                        key={terminalActiveTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-4 bottom-4 bg-stone-900/95 backdrop-blur-md p-4 rounded-xl border border-amber-500/40 text-xs font-mono shadow-xl"
                      >
                        {terminalActiveTab === 'stack' && (
                          <div>
                            <div className="text-amber-400 font-bold mb-1.5 flex items-center gap-1.5">
                              <Terminal className="w-3.5 h-3.5" />
                              <span>ACTIVE_STACK.lock</span>
                            </div>
                            <p className="text-stone-300 text-[11px] leading-relaxed">
                              Python 3.12, FastAPI, PyTeAL, Next.js 14, React 19, TypeScript, PostgreSQL,
                              Docker, WebSockets.
                            </p>
                          </div>
                        )}
                        {terminalActiveTab === 'status' && (
                          <div>
                            <div className="text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>LIVE AVAILABILITY</span>
                            </div>
                            <p className="text-stone-300 text-[11px]">
                              Open for high-impact Full Stack & Web3 contracts or founding engineering
                              roles.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Bottom Terminal Bar */}
                <div className="p-5 bg-stone-900/95 border-t border-stone-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">Neal Kottilingal</h4>
                      <p className="text-xs text-amber-400 font-mono mt-0.5">
                        fullstack_web3_builder.py
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-stone-800/90 px-3 py-1.5 rounded-lg border border-stone-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-mono text-stone-300">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
