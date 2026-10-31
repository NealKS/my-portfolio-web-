import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Printer, Download, Check, Mail, MapPin, Globe, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeMode } from '../types';

import { OverlayDialog } from './OverlayDialog';

interface ResumeModalProps {
  isOpen: boolean;
  theme: ThemeMode;
  onClose: () => void;
}

function ResumeContent({ theme, onClose }: Omit<ResumeModalProps, 'isOpen'>) {
  const reduced = useReducedMotion();
  const handlePrint = () => {
    window.print();
  };

  return (
    <OverlayDialog titleId="resume-modal-title" onClose={onClose} panelClassName={`resume-print-sheet w-full max-w-4xl rounded-3xl p-4 sm:p-10 shadow-2xl border max-h-[90dvh] overflow-y-auto ${theme === 'dark' ? 'bg-[#0E1318] border-stone-800 text-stone-200' : 'bg-white border-stone-200 text-stone-900'}`}>
          {/* Close & Action Bar */}
          <div className="resume-action-bar flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm shadow-md">
                NK
              </div>
              <div>
                <h3 id="resume-modal-title" className="text-lg font-bold">Curriculum Vitae</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Neal Kottilingal • Verified Engineering Profile
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                aria-label="Print or save CV as PDF" onClick={handlePrint}
                whileHover={reduced ? undefined : { scale: 1.05 }}
                whileTap={reduced ? undefined : { scale: .94 }}
                className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </motion.button>
              <motion.button
                data-autofocus aria-label="Close CV" onClick={onClose}
                whileHover={reduced ? undefined : { scale: 1.1, rotate: 90 }}
                whileTap={reduced ? undefined : { scale: .9 }}
                className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Resume Content Sheet */}
          <div className="space-y-8 text-xs sm:text-sm">
            {/* Header Identity */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Neal Kottilingal
                </h1>
                <p className="text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold mt-1">
                  Full Stack Engineer & Web3 Smart Contract Specialist
                </p>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1 text-[11px] text-stone-500 dark:text-stone-400">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">github.com/NealKS</a>
                  <span>•</span>
                  <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">leetcode.com/u/NealSK</a>
                  <span>•</span>
                  <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">@i.am.nealsk</a>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2">
                Executive Summary
              </h2>
              <p className="leading-relaxed text-stone-700 dark:text-stone-300">
                Full-stack developer with 3+ years of hands-on experience building resilient web applications,
                high-throughput REST/WebSocket APIs, and audited Web3 smart contracts on Algorand. Strong
                foundation in Python, Node.js, React, and distributed ledgers with an emphasis on code
                integrity, zero-vulnerability architectures, and frictionless UX.
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-3">
                Core Competencies & Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-stone-900 dark:text-white">Languages & Core:</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Python (FastAPI, Django), JavaScript/TypeScript (ES6+), Node.js, PyTeAL, SQL
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-stone-900 dark:text-white">Frontend & UI:</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    React 19, Next.js, Tailwind CSS, Motion animations, Responsive Ergonomics
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-stone-900 dark:text-white">Web3 & Ledger:</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    Algorand SDK, TEAL Bytecode Analysis, Smart Contracts, Distributed Ledgers
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-stone-900 dark:text-white">Databases & DevOps:</span>
                  <p className="text-stone-600 dark:text-stone-400 mt-1">
                    PostgreSQL, MongoDB, Redis, Docker, Git, CI/CD pipelines, WebSockets
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-4">
                Selected Experience & Protocols
              </h2>

              <div className="space-y-5">
                <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-sm sm:text-base">Full Stack & Web3 Engineer</h3>
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      2022 — Present
                    </span>
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Independent Protocol Contributor & Client Systems • Mumbai, India
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-300 text-xs pt-1">
                    <li>
                      Architected on-chain Algorand smart contract telemetry pipeline processing 1,800+
                      blocks per minute with sub-second indexing.
                    </li>
                    <li>
                      Constructed contactless gesture telemetry driver utilizing MediaPipe and WebSockets,
                      reducing latency to 8.4ms at 60 FPS.
                    </li>
                    <li>
                      Delivered 25+ production-grade web applications, microservices, and smart contracts
                      with 100% test coverage and formal bytecode auditing.
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-stone-400 dark:border-stone-700 pl-4 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-sm sm:text-base">Backend & Systems Developer</h3>
                    <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      2021 — 2022
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-semibold">
                    Distributed Applications Lab
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-300 text-xs pt-1">
                    <li>
                      Engineered high-throughput REST and GraphQL endpoints backed by PostgreSQL and Redis
                      caching layers.
                    </li>
                    <li>
                      Implemented automated CI/CD container build workflows using Docker and GitHub Actions.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
    </OverlayDialog>
  );
}

export function ResumeModal({ isOpen, theme, onClose }: ResumeModalProps) {
  return <AnimatePresence>{isOpen && <ResumeContent theme={theme} onClose={onClose} />}</AnimatePresence>;
}
