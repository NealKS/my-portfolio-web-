import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ShieldCheck, Fingerprint, GitBranch, ArrowUpRight } from 'lucide-react';
import { AXIOM_DEMO as demo } from '../../data/axiomDemo';
import type { ThemeMode } from '../../types';
import './AxiomShowcase.css';

const bands = [
  { label: 'Critical', count: demo.severity.CRITICAL, color: '#f97316' },
  { label: 'High', count: demo.severity.HIGH, color: '#f59e0b' },
  { label: 'Medium', count: demo.severity.MEDIUM, color: '#d6a550' },
  { label: 'Info', count: demo.severity.INFO, color: '#14b8a6' },
];
export function AxiomPreview({ theme }: { theme: ThemeMode }) {
  const [selected, setSelected] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { once: true, amount: .15 });
  const reduced = useReducedMotion();
  const signal = demo.signals[selected];
  return <div ref={root} className="axiom-preview lg:col-span-7 min-w-0 rounded-2xl border p-5 sm:p-6 shadow-inner relative overflow-hidden" data-theme={theme}>
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-500/20">
      <div className="flex items-center gap-2 min-w-0"><ShieldCheck size={17} className="text-amber-500 shrink-0" /><span className="font-mono text-[10px] font-bold tracking-wider">AXIOM / ACCESS INTELLIGENCE</span></div>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono axiom-muted"><span className="axiom-status h-1.5 w-1.5 bg-teal-500 rounded-full" />SNAPSHOT ANALYZED</span>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 mb-3">
      <h4 className="text-sm font-bold">Access Risk Overview</h4><span className="axiom-demo-label text-[9px] font-mono uppercase tracking-wider rounded px-2 py-1">Synthetic demo · not live</span>
    </div>
    <motion.div initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: reduced ? 0 : .45 }} className="axiom-panel p-4 rounded-xl border">
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-end">
        <div><span className="font-mono text-3xl font-bold tracking-tight">{demo.total}</span><span className="text-xs axiom-muted ml-2">demo findings</span></div>
        <span className="text-[11px] axiom-muted pb-1">{demo.identityCount} synthetic identities</span>
      </div>
      <div role="img" aria-label="Synthetic findings: 4 critical, 10 high, 1 medium, 0 low, 6 informational" className="flex gap-1 h-2 overflow-hidden rounded-full mt-4">
        {bands.map((band, i) => <motion.span key={band.label} className="origin-left rounded-sm" style={{ width: `${band.count / demo.total * 100}%`, backgroundColor: band.color }} initial={{ scaleX: reduced ? 1 : 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : .1 + i * .07 }} />)}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[9px] axiom-muted font-mono">{bands.map(band => <span key={band.label} className="inline-flex items-center gap-1"><i className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: band.color }} />{band.label} {band.count}</span>)}</div>
      <div className="mt-4 pt-3 border-t border-stone-500/15">
        <div className="flex items-center justify-between gap-2 text-[10px] mb-2"><span className="font-semibold flex items-center gap-1"><Fingerprint size={12} />Identity risk</span><span className="axiom-muted">Heuristic · higher = more risk</span></div>
        {demo.identities.map((identity, i) => <div key={identity.id} className="flex items-center gap-2 mt-2 font-mono text-[10px]">
          <span className="axiom-muted shrink-0">{identity.id}</span><div className="h-1 flex-1 bg-stone-500/15 rounded-full overflow-hidden"><motion.div className="h-full bg-amber-500/80 origin-left" style={{ width: `${identity.score}%` }} initial={{ scaleX: reduced ? 1 : 0 }} animate={visible ? { scaleX: 1 } : {}} transition={{ duration: reduced ? 0 : .7, delay: reduced ? 0 : .2 + i * .08 }} /></div><span className="w-9 text-right">{identity.score}/100</span>
        </div>)}
      </div>
    </motion.div>
    <p className="text-[9px] font-mono axiom-muted mt-3">INSPECT RISK SIGNALS · FINDING COUNTS</p>
    <div className="grid grid-cols-2 gap-2 mt-2" aria-label="Inspect synthetic risk signals">{demo.signals.map((item, i) => <button key={item.rule} aria-pressed={selected === i} onClick={() => setSelected(i)} className="axiom-signal rounded-lg border p-2.5 min-h-11 text-left flex items-center justify-between gap-2 transition-colors">
      <span className="text-[10px] font-semibold">{item.label}</span><span className="font-mono text-xs text-amber-600 dark:text-amber-400">{item.count}</span>
    </button>)}</div>
    <div className="axiom-evidence axiom-panel border rounded-xl p-3 mt-3" aria-live="polite" aria-atomic="true">
      <div className="text-[9px] font-mono uppercase tracking-wider axiom-muted mb-1">Evidence-backed finding · {signal.identity}</div>
      <p className="text-[11px] font-semibold leading-relaxed">{signal.title}</p>
      <p className="text-[10px] axiom-muted leading-relaxed mt-1">{signal.recommendation}</p>
      <p className="text-[9px] font-mono axiom-muted mt-2 break-words">Evidence: {signal.evidence.join(' · ')}</p>
    </div>
    <div className="flex flex-wrap justify-between gap-2 mt-3 text-[9px] font-mono">
      <span className="inline-flex items-center gap-1 axiom-muted"><GitBranch size={12} />{demo.correlations} contract correlation</span><span className="text-amber-700 dark:text-amber-400">HUMAN REVIEW REQUIRED</span>
    </div>
    <div className="mt-3 rounded-lg border border-stone-800 bg-stone-950 p-2.5 text-[10px] text-teal-300 font-mono overflow-hidden">
      <motion.code className="block break-words" initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 100% 0 0)' }} animate={visible ? { clipPath: 'inset(0)' } : {}} transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : .2, ease: progress => Math.floor(progress * 56) / 56 }}>$ axiom access-risk snapshot.json --format html</motion.code>
    </div>
    <p className="text-[9px] axiom-muted leading-relaxed mt-3">Illustrative dashboard using results from the repository’s synthetic examples. No live access is analyzed or changed. <a className="underline underline-offset-2 inline-flex items-center gap-0.5 hover:text-amber-600" href={`https://github.com/NealKS/axiom2/tree/${demo.commit}/examples`} target="_blank" rel="noopener noreferrer">Demo source<ArrowUpRight size={10} /></a></p>
  </div>;
}
