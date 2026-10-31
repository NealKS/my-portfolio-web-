import { useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X, Github, Linkedin, Instagram, FileDown, ArrowUpRight } from 'lucide-react';
import { OverlayDialog } from './OverlayDialog';
import { NAV_ITEMS } from '../data/navigation';
import { PERSONAL_INFO, USER_AVATAR_URL } from '../data/portfolioData';
import type { ScreenView, ThemeMode } from '../types';
import './MobileNavigation.css';

export function MobileNavigation({ theme, activeSection, activeScreen, onClose, onNavigate, onMode, onResume }: {
  theme: ThemeMode; activeSection: ScreenView; activeScreen: ScreenView;
  onClose: () => void; onNavigate: (screen: ScreenView) => void;
  onMode: (screen: ScreenView) => void; onResume: () => void;
}) {
  const reduced = useReducedMotion();
  const instagramGradient = useId();
  const index = NAV_ITEMS.findIndex(item => item.screen === activeSection);
  return <OverlayDialog drawer titleId="mobile-navigation-title" onClose={onClose}
    panelClassName={`w-full max-w-sm h-dvh overflow-y-auto overscroll-contain border-l p-5 sm:p-6 flex flex-col ${theme === 'dark' ? 'bg-[#0E1318] border-stone-800 text-stone-100' : 'bg-[#F7F5F0] border-stone-200 text-stone-900'}`}>
    <div className="flex gap-3 items-start">
      <img src={USER_AVATAR_URL} alt="Neal" className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-500/40 shrink-0" />
      <div className="min-w-0 flex-1">
        <h2 id="mobile-navigation-title" className="text-xl font-extrabold">Neal<span className="text-amber-500">.</span></h2>
        <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">Full Stack &amp; Blockchain Developer</p>
      </div>
      <button data-autofocus onClick={onClose} aria-label="Close navigation" className="w-11 h-11 grid place-items-center rounded-xl border border-stone-500/25 shrink-0 hover:bg-amber-500/10"><X size={19} /></button>
    </div>
    <div className="mt-6 grid grid-cols-2 gap-1 p-1 rounded-xl border border-stone-500/20" aria-label="Navigation mode">
      {(['all', 'screens'] as const).map(mode => <button key={mode}
        aria-pressed={mode === 'all' ? activeScreen === 'all' : activeScreen !== 'all'}
        onClick={() => onMode(mode === 'all' ? 'all' : activeSection)}
        className={`min-h-11 rounded-lg text-xs font-bold transition-colors ${(mode === 'all') === (activeScreen === 'all') ? 'bg-amber-500 text-stone-950' : 'hover:bg-amber-500/10'}`}>
        {mode === 'all' ? 'Full Feed' : 'Screens'}
      </button>)}
    </div>
    <nav aria-label="Mobile navigation" className="relative my-6 pl-6">
      <div aria-hidden="true" className="absolute left-1 top-6 bottom-6 w-px bg-stone-500/25" />
      <motion.span aria-hidden="true" data-active-section={activeSection} className="absolute left-0 top-5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/15"
        animate={{ y: Math.max(0, index) * 48 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 32 }} />
      {NAV_ITEMS.map((item, i) => {
        const Icon = item.icon;
        return <motion.button key={item.screen} aria-current={activeSection === item.screen ? 'location' : undefined}
          initial={{ opacity: 0, x: reduced ? 0 : 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduced ? 0 : .04 + i * .025 }}
          whileTap={reduced ? undefined : { scale: .98 }} onClick={() => onNavigate(item.screen)}
          className={`h-12 w-full flex items-center gap-3 px-3 rounded-xl text-sm text-left transition-colors ${activeSection === item.screen ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold' : 'hover:bg-stone-500/10'}`}>
          <Icon size={17} className="shrink-0" /><span className="flex-1">{item.label}</span><span className="text-[10px] font-mono opacity-50">0{i + 1}</span>
        </motion.button>;
      })}
    </nav>
    <div className="mt-auto pt-4 border-t border-stone-500/20">
      <div data-theme={theme} className="drawer-socials grid grid-cols-2 gap-2 text-xs font-semibold">
        <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="drawer-social-link drawer-social-github min-h-11 flex items-center justify-center gap-1.5 rounded-xl"><Github size={15} />GitHub</a>
        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="drawer-social-link drawer-social-linkedin min-h-11 flex items-center justify-center gap-1.5 rounded-xl"><Linkedin size={15} />LinkedIn</a>
        <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="drawer-social-link drawer-social-instagram min-h-11 flex items-center justify-center gap-1.5 rounded-xl"><Instagram size={15} stroke={`url(#${instagramGradient})`}>
          <defs><linearGradient id={instagramGradient} gradientUnits="userSpaceOnUse" x1="2" y1="22" x2="22" y2="2">
            <stop offset="0%" stopColor="#FCAF45" /><stop offset="30%" stopColor="#F77737" />
            <stop offset="60%" stopColor="#E1306C" /><stop offset="80%" stopColor="#C13584" /><stop offset="100%" stopColor="#833AB4" />
          </linearGradient></defs>
        </Instagram>Instagram</a>
        <button onClick={onResume} className="min-h-11 flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 text-stone-950"><FileDown size={15} />CV<ArrowUpRight size={12} /></button>
      </div>
    </div>
  </OverlayDialog>;
}
