import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Play, RefreshCw, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ThemeMode, ProjectItem } from '../types';
import { CodeCompileReveal } from './CodeCompileReveal';

interface ProjectsSectionProps {
  theme: ThemeMode;
  onOpenCaseStudy: (project: ProjectItem) => void;
  onContactClick: () => void;
}

export function ProjectsSection({
  theme,
  onOpenCaseStudy,
  onContactClick,
}: ProjectsSectionProps) {
  // Interactive state for Project 1: Algorand Audit Simulation
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState<'idle' | 'scanning' | 'passed'>('idle');
  const [tpsMode, setTpsMode] = useState<'normal' | 'peak'>('normal');

  // Interactive state for Project 2: VisionControl Gesture Coordinates
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 382, y: 144 });
  const [confidence, setConfidence] = useState<number>(0.982);
  const gestureAreaRef = useRef<HTMLDivElement>(null);

  const handleMouseMoveVision = (e: MouseEvent<HTMLDivElement>) => {
    if (!gestureAreaRef.current) return;
    const rect = gestureAreaRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
    const dynamicConf = 0.95 + (Math.sin(x + y) * 0.04);
    setConfidence(Number(Math.min(0.999, Math.max(0.92, dynamicConf)).toFixed(3)));
  };

  const handleExecuteAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditStep('scanning');

    setTimeout(() => {
      setAuditStep('passed');
      setIsAuditing(false);
    }, 1800);
  };

  const project1 = PROJECTS[0];
  const project2 = PROJECTS[1];

  return (
    <section
      id="projects"
      className={`py-24 sm:py-32 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0E1318]' : 'bg-[#F7F5F0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Title matching Qurifolio Featured Project header */}
        <div className="text-center mb-16 sm:mb-20">
          <CodeCompileReveal delay={0.05} tag="PROJECTS:EXEC" prefix="[0x20]">
            <span className="text-teal-500 dark:text-teal-400 font-mono font-bold tracking-widest text-xs uppercase">
              // Production Shipments
            </span>
          </CodeCompileReveal>

          <CodeCompileReveal delay={0.15} prefix="[0x21]">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 ${
                theme === 'dark' ? 'text-white' : 'text-stone-950'
              }`}
            >
              Featured Projects
            </h2>
            <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </CodeCompileReveal>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {/* ================= PROJECT 1: ALGORAND TELEMETRY ================= */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className={`rounded-3xl p-6 sm:p-10 border shadow-lg hover:shadow-2xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-stone-900/90 border-stone-800 shadow-black/60'
                : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Side: Rich Interactive UI Mockup Container */}
              <div
                className={`lg:col-span-7 rounded-2xl border p-5 sm:p-6 shadow-inner relative overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-stone-950 border-stone-800'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                {/* Dashboard Mockup Header */}
                <div
                  className={`flex items-center justify-between pb-4 border-b text-xs ${
                    theme === 'dark'
                      ? 'border-stone-800 text-stone-400'
                      : 'border-stone-200 text-stone-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="font-mono ml-2 text-stone-700 dark:text-stone-300 font-semibold">
                      algorand-telemetry-engine v2.4
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      MAINNET CONNECTED
                    </span>
                  </div>
                </div>

                {/* Dashboard Body Preview */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Left chart card */}
                  <div
                    className={`sm:col-span-2 rounded-xl p-4 border shadow-sm ${
                      theme === 'dark'
                        ? 'bg-stone-900 border-stone-800'
                        : 'bg-white border-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-stone-900 dark:text-white">
                        Verification Activity
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setTpsMode(tpsMode === 'normal' ? 'peak' : 'normal')}
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                        title="Toggle TPS mode"
                      >
                        {tpsMode === 'normal' ? '+18.4% TPS' : '+42.8% PEAK'}
                      </motion.button>
                    </div>

                    <div className="text-2xl font-black text-stone-900 dark:text-white mt-2 font-mono">
                      {tpsMode === 'normal' ? '1,894' : '3,410'}{' '}
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-normal">
                        Blocks/min
                      </span>
                    </div>

                    {/* SVG Chart with Dynamic Wave */}
                    <div className="h-24 w-full mt-3">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 80">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d={
                            tpsMode === 'normal'
                              ? 'M 0,60 Q 50,20 100,45 T 200,30 T 300,10'
                              : 'M 0,50 Q 50,10 100,30 T 200,15 T 300,5'
                          }
                          fill="none"
                          stroke="#F59E0B"
                          strokeLinecap="round"
                          strokeWidth="3"
                          className="transition-all duration-500"
                        />
                        <path
                          d={
                            tpsMode === 'normal'
                              ? 'M 0,60 Q 50,20 100,45 T 200,30 T 300,10 L 300,80 L 0,80 Z'
                              : 'M 0,50 Q 50,10 100,30 T 200,15 T 300,5 L 300,80 L 0,80 Z'
                          }
                          fill="url(#chartGradient)"
                          className="transition-all duration-500"
                        />
                        {/* Active pin node */}
                        <circle cx="200" cy={tpsMode === 'normal' ? '30' : '15'} fill="#D97706" r="4" />
                      </svg>
                    </div>
                  </div>

                  {/* Right Side Security Score Mini Card */}
                  <div className="bg-stone-900 rounded-xl p-4 text-white flex flex-col justify-between border border-stone-800 shadow-md">
                    <div>
                      <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wide flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Security Score</span>
                      </div>
                      <div className="text-2xl font-bold font-mono mt-1">
                        {auditStep === 'passed' ? '100%' : '99.8%'}
                      </div>
                      <p className="text-[10px] text-stone-400 mt-2 leading-relaxed">
                        {auditStep === 'scanning'
                          ? 'Checking TEAL bytecode opcodes...'
                          : auditStep === 'passed'
                          ? 'Zero reentrancy vulnerabilities verified.'
                          : 'Zero reentrancy vulnerabilities detected in formal audit.'}
                      </p>
                    </div>

                    <motion.button
                      id="execute-audit-btn"
                      onClick={handleExecuteAudit}
                      disabled={isAuditing}
                      whileHover={{ scale: isAuditing ? 1 : 1.03 }}
                      whileTap={{ scale: isAuditing ? 1 : 0.94 }}
                      className={`cyber-btn w-full py-2 text-xs font-bold rounded-lg transition-colors mt-3 flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAuditing
                          ? 'bg-amber-600/70 text-stone-900 cursor-wait'
                          : 'bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {isAuditing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Auditing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Execute Audit</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Terminal log pill */}
                <div className="mt-3 bg-stone-900 text-emerald-400 font-mono text-[11px] p-2.5 rounded-lg flex items-center justify-between border border-stone-800">
                  <span className="truncate">
                    {auditStep === 'passed'
                      ? '$ tealdbg verify --app-id 784019 --opt-in true --audit-passed [SUCCESS]'
                      : '$ tealdbg verify --app-id 784019 --opt-in true'}
                  </span>
                  <span className="text-stone-400 text-[10px] shrink-0 ml-2">200 OK</span>
                </div>
              </div>

              {/* Right Side: Project Narrative and Metadata */}
              <div className="lg:col-span-5 space-y-4">
                {/* Badge Tag */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${project1.badgeColor}`}
                >
                  {project1.badge}
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl sm:text-3xl font-extrabold leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {project1.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {project1.description}
                </p>

                {/* Tech Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project1.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-stone-800 text-stone-300 border border-stone-700/60 hover:text-amber-400'
                          : 'bg-stone-100 text-stone-700 border border-stone-200 hover:text-amber-600'
                      }`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Interactive Actions */}
                <div className="pt-4 flex items-center gap-4">
                  <motion.button
                    id="case-study-algorand-btn"
                    onClick={() => onOpenCaseStudy(project1)}
                    whileHover={{ scale: 1.04, x: 4 }}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 group cursor-pointer"
                  >
                    <span>Explore Case Study</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ================= PROJECT 2: VISIONCONTROL ================= */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`rounded-3xl p-6 sm:p-10 border shadow-lg hover:shadow-2xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-stone-900/90 border-stone-800 shadow-black/60'
                : 'bg-white border-stone-200/90'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Side: UI Mockup / Interactive Canvas Preview */}
              <div className="lg:col-span-7 bg-stone-900 rounded-2xl border border-stone-800 p-5 sm:p-6 shadow-xl relative overflow-hidden text-white">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
                  <span className="font-mono text-amber-400 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>VISION_DRIVER_LIVE_PIPELINE</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    60 FPS • WEBSOCKET READY
                  </span>
                </div>

                {/* Interactive Tracking Wireframe Visual - responds to hover/drag */}
                <div
                  ref={gestureAreaRef}
                  onMouseMove={handleMouseMoveVision}
                  className="mt-4 relative h-48 sm:h-56 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-center overflow-hidden cursor-crosshair select-none group"
                  title="Move mouse here to simulate live gesture tracking coordinates"
                >
                  {/* Subtle Grid */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>

                  {/* Target Reticle & Landmarks */}
                  <div className="relative flex flex-col items-center pointer-events-none">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-amber-500/70 flex items-center justify-center animate-spin-slow">
                      <div className="w-16 h-16 rounded-full border border-amber-400/40"></div>
                    </div>

                    <div className="absolute -top-3 px-2 py-0.5 bg-amber-500 text-stone-950 font-mono font-bold text-[9px] rounded shadow-md">
                      LANDMARK {confidence} CONFIDENCE
                    </div>

                    <div className="text-xs font-mono text-stone-300 mt-4 text-center px-2">
                      Real-time Gesture Vector Coordinates [X: {coords.x}, Y: {coords.y}]
                    </div>
                  </div>

                  {/* Floating data badges */}
                  <div className="absolute bottom-3 left-3 font-mono text-[10px] text-stone-400 pointer-events-none">
                    Latency: <span className="text-emerald-400 font-bold">8.4ms</span>
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] text-stone-400 pointer-events-none">
                    Model: <span className="text-amber-300">MediaPipe DenseMesh</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Narrative */}
              <div className="lg:col-span-5 space-y-4">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${project2.badgeColor}`}
                >
                  {project2.badge}
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-extrabold leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {project2.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {project2.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project2.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-stone-800 text-stone-300 border border-stone-700/60 hover:text-amber-400'
                          : 'bg-stone-100 text-stone-700 border border-stone-200 hover:text-amber-600'
                      }`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <motion.button
                    id="case-study-vision-btn"
                    onClick={() => onOpenCaseStudy(project2)}
                    whileHover={{ scale: 1.04, x: 4 }}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 group cursor-pointer"
                  >
                    <span>View Demonstration</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
