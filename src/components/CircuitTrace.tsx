import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ThemeMode } from '../types';

interface CircuitTraceProps {
  theme: ThemeMode;
}

export function CircuitTrace({ theme }: CircuitTraceProps) {
  const { scrollYProgress } = useScroll();

  // Smooth out progress tracking with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate position on the vertical trace
  const glowY = useTransform(smoothProgress, [0, 1], ['2%', '98%']);

  // Continuous opacity / scale values driven by motion values for smooth reactive rendering
  const node1Opacity = useTransform(smoothProgress, [0.08, 0.14], [0.3, 1]);
  const node1Scale = useTransform(smoothProgress, [0.08, 0.14], [1, 1.35]);

  const node2Opacity = useTransform(smoothProgress, [0.22, 0.28], [0.3, 1]);
  const node2Scale = useTransform(smoothProgress, [0.22, 0.28], [1, 1.35]);

  const node3Opacity = useTransform(smoothProgress, [0.38, 0.45], [0.3, 1]);
  const node3Scale = useTransform(smoothProgress, [0.38, 0.45], [1, 1.35]);

  const nodeGitHubOpacity = useTransform(smoothProgress, [0.52, 0.58], [0.3, 1]);
  const nodeGitHubScale = useTransform(smoothProgress, [0.52, 0.58], [1, 1.35]);

  const node4Opacity = useTransform(smoothProgress, [0.68, 0.74], [0.3, 1]);
  const node4Scale = useTransform(smoothProgress, [0.68, 0.74], [1, 1.35]);

  const node5Opacity = useTransform(smoothProgress, [0.86, 0.92], [0.3, 1]);
  const node5Scale = useTransform(smoothProgress, [0.86, 0.92], [1, 1.4]);

  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-y-0 left-2 sm:left-4 lg:left-6 w-8 sm:w-10 pointer-events-none z-30 select-none overflow-visible hidden md:block"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 48 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* PCB Circuit Gradients */}
          <linearGradient id="pcbUnlit" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDark ? '#1E293B' : '#E2E8F0'}
              stopOpacity={isDark ? 0.4 : 0.65}
            />
            <stop
              offset="100%"
              stopColor={isDark ? '#0F172A' : '#CBD5E1'}
              stopOpacity={isDark ? 0.35 : 0.5}
            />
          </linearGradient>

          <linearGradient id="pcbLit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4FD1C5" />
            <stop offset="45%" stopColor="#4FD1C5" />
            <stop offset="65%" stopColor="#F2A93B" />
            <stop offset="100%" stopColor="#F2A93B" />
          </linearGradient>

          {/* Neon Glow Filters */}
          <filter id="circuitGlowTeal" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="circuitGlowAmber" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Base Unlit PCB Circuit Pattern Background */}
        <g stroke="url(#pcbUnlit)" strokeWidth="1.5" fill="none" strokeLinecap="round">
          {/* Main vertical bus line */}
          <line x1="24" y1="20" x2="24" y2="980" />

          {/* PCB angled branch traces */}
          <path d="M 24 140 L 40 156 L 40 190" />
          <path d="M 24 290 L 8 306 L 8 340" />
          <path d="M 24 460 L 40 476 L 40 510" />
          <path d="M 24 600 L 8 616 L 8 650" />
          <path d="M 24 740 L 40 756 L 40 790" />
          <path d="M 24 890 L 38 904 L 38 930" />

          {/* Unlit micro-vias */}
          <circle cx="24" cy="20" r="3" />
          <circle cx="40" cy="190" r="2.5" />
          <circle cx="8" cy="340" r="2.5" />
          <circle cx="40" cy="510" r="2.5" />
          <circle cx="8" cy="650" r="2.5" />
          <circle cx="40" cy="790" r="2.5" />
          <circle cx="38" cy="930" r="2.5" />
          <circle cx="24" cy="980" r="3" />
        </g>

        {/* 2. Progressively Lighted PCB Trace with Path Length Animation */}
        <motion.path
          d="M 24 20 L 24 140 L 40 156 L 40 190 M 24 140 L 24 290 L 8 306 L 8 340 M 24 290 L 24 460 L 40 476 L 40 510 M 24 460 L 24 600 L 8 616 L 8 650 M 24 600 L 24 740 L 40 756 L 40 790 M 24 740 L 24 890 L 38 904 L 38 930 M 24 890 L 24 980"
          fill="none"
          stroke="url(#pcbLit)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: smoothProgress }}
          filter={isDark ? 'url(#circuitGlowTeal)' : undefined}
        />

        {/* 3. PCB Node Vias (Milestones that light up as user scrolls) */}
        {/* Via 1: Hero entry point */}
        <circle
          cx="24"
          cy="20"
          r="3.5"
          fill="#4FD1C5"
          className="transition-all duration-300"
        />
        <circle
          cx="24"
          cy="20"
          r="1.5"
          fill={isDark ? '#0A0D12' : '#FFFFFF'}
        />

        {/* Via 2: About / Experience */}
        <motion.circle
          cx="40"
          cy="190"
          r="3"
          fill="#4FD1C5"
          style={{
            scale: node1Scale,
            opacity: node1Opacity,
          }}
        />

        {/* Via 3: Technical Skills */}
        <motion.circle
          cx="8"
          cy="340"
          r="3"
          fill="#4FD1C5"
          style={{
            scale: node2Scale,
            opacity: node2Opacity,
          }}
        />

        {/* Via 4: LeetCode Verification */}
        <motion.circle
          cx="40"
          cy="510"
          r="3"
          fill="#4FD1C5"
          style={{
            scale: node3Scale,
            opacity: node3Opacity,
          }}
        />

        {/* Via 5: GitHub Codebase Telemetry */}
        <motion.circle
          cx="8"
          cy="650"
          r="3"
          fill="#F2A93B"
          style={{
            scale: nodeGitHubScale,
            opacity: nodeGitHubOpacity,
          }}
        />

        {/* Via 6: Featured Projects */}
        <motion.circle
          cx="40"
          cy="790"
          r="3"
          fill="#F2A93B"
          style={{
            scale: node4Scale,
            opacity: node4Opacity,
          }}
        />

        {/* Via 7: Contact Transmission */}
        <motion.circle
          cx="24"
          cy="980"
          r="3.5"
          fill="#F2A93B"
          style={{
            scale: node5Scale,
            opacity: node5Opacity,
          }}
        />
      </svg>

      {/* 4. Glowing PCB Signal Electron Head (Moves smoothly down with scroll) */}
      <motion.div
        className="absolute left-[24px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ top: glowY }}
      >
        {/* Core glowing spark */}
        <div className="relative flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-teal-400 animate-ping opacity-75 absolute"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#F2A93B] relative z-10 border border-white"></div>
        </div>
      </motion.div>
    </div>
  );
}
