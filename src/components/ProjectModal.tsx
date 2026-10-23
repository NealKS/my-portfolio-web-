import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Check, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { ProjectItem, ThemeMode } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  theme: ThemeMode;
  onClose: () => void;
}

export function ProjectModal({ project, theme, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border max-h-[90vh] overflow-y-auto ${
            theme === 'dark'
              ? 'bg-[#0E1318] border-stone-800 text-stone-200'
              : 'bg-white border-stone-200 text-stone-900'
          }`}
        >
          {/* Close button */}
          <motion.button
            id="close-project-modal-btn"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Badge & Title */}
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-amber-500/10 text-amber-500 border border-amber-500/20">
            {project.badge}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-stone-100 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {m.label}
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Key Architecture Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold mb-3">
              Engineering Milestones & Highlights
            </h4>
            <div className="space-y-2.5">
              {project.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-stone-700 dark:text-stone-300 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Code Preview Box */}
          <div className="mb-6 p-4 rounded-xl bg-stone-950 text-stone-200 font-mono text-xs border border-stone-800">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 text-[11px] text-stone-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>
                  {project.id === 'algorand-telemetry' ? 'contract_audit.py' : 'gesture_pipeline.ts'}
                </span>
              </span>
              <span className="text-emerald-400">COMPILATION_PASSED</span>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed text-stone-300">
              {project.id === 'algorand-telemetry'
                ? `def verify_smart_contract(app_id: int):\n    client = AlgorandIndexer(algod_token, algod_address)\n    teal_bytecode = client.get_application_teal(app_id)\n    analyzer = TeALBytecodeAuditor(zero_reentrancy=True)\n    report = analyzer.run_deep_opcode_audit(teal_bytecode)\n    return {"app_id": app_id, "score": report.security_score, "status": "VERIFIED"}`
                : `export async function initializeGestureStream(wsUrl: string) {\n  const camera = new MediaPipeVisionCamera({ maxFaces: 1, minDetectionConfidence: 0.98 });\n  const ws = new WebSocket(wsUrl);\n  camera.onResults((landmarks) => {\n    const smoothed = kalmanFilter(landmarks.coordinates);\n    ws.send(JSON.stringify({ x: smoothed.x, y: smoothed.y, fps: 60 }));\n  });\n}`}
            </pre>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Close
            </motion.button>
            <motion.a
              href={project.githubUrl || "https://github.com/NealKS"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
