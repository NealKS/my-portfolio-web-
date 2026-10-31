import { ArrowDown, GitBranch, ShieldCheck, Terminal } from 'lucide-react';

export function AxiomArchitecture() {
  return <div className="axiom-case-study mb-6">
    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold mb-3">Architecture & trust boundaries</h4>
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-4">
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-600 dark:text-stone-400 mb-3"><GitBranch size={14} className="text-teal-500" />Optional Vyper Guard report → correlation input</div>
      <ol className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        {['Access Snapshot', 'Axiom Analysis Engine', 'Risk Evidence & Correlation', 'Reports & Review Plan'].map((label, i) => <li key={label} className="relative flex items-center sm:flex-col sm:items-start gap-2 border border-stone-200 dark:border-stone-700/60 rounded-xl bg-white dark:bg-stone-950 p-3 text-xs font-semibold"><span className="text-amber-600 dark:text-amber-400 font-mono">0{i + 1}</span><span className="flex-1">{label}</span>{i < 3 && <ArrowDown size={13} className="text-stone-400 shrink-0 sm:absolute sm:top-3 sm:right-2 sm:-rotate-90" />}</li>)}
      </ol>
      <p className="font-mono text-[10px] text-stone-600 dark:text-stone-400 leading-relaxed mt-3">Optional AWS pipeline: S3 input → Lambda → S3 reports + SNS aggregate alerts.</p>
    </div>
    <div className="flex gap-3 p-4 mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
      <ShieldCheck size={18} className="text-amber-500 shrink-0 mt-0.5" /><p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300">Rules, severity, and risk scores are deterministic. AI explanations are advisory and fall back to templates. Plans are dry-run proposals for human review; Axiom never automatically revokes access. Contract correlation raises review priority, not proof of exploitability.</p>
    </div>
  </div>;
}

export function AxiomCommand() {
  return <div className="axiom-case-study mb-6 p-4 rounded-xl bg-stone-950 text-stone-200 font-mono text-xs border border-stone-800">
    <div className="flex flex-wrap justify-between gap-2 pb-2 mb-3 border-b border-stone-800 text-[10px]"><span className="flex items-center gap-1.5 text-amber-400"><Terminal size={14} />access-risk · local CLI</span><span className="text-stone-400">SYNTHETIC EXAMPLE</span></div>
    <pre className="whitespace-pre-wrap break-words text-[11px] leading-6"><code><span className="text-amber-400">axiom access-risk</span>{' '}<span className="text-stone-200">examples/access_risk_demo.json</span>{' '}<span className="text-teal-300">--format</span>{' cli '}<span className="text-teal-300">--contract-report</span>{' '}<span className="text-stone-200">examples/access_risk_contract_report.json</span></code></pre>
  </div>;
}
