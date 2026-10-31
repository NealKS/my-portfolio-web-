import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sun, Moon, FileDown, Monitor, Layers } from 'lucide-react';
import { ScreenView, ThemeMode } from '../types';
import { MobileNavigation } from './MobileNavigation';
import { NAV_ITEMS } from '../data/navigation';
import { useHeaderFit } from '../hooks/useHeaderFit';
import { USER_AVATAR_URL } from '../data/portfolioData';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeScreen: ScreenView;
  activeSection: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  onSelectScreen: (screen: ScreenView) => void;
  onOpenResume: () => void;
}

export function Header({ theme, onToggleTheme, activeScreen, activeSection, onNavigate, onSelectScreen, onOpenResume }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fit = useHeaderFit();
  const reduced = useReducedMotion();
  const pendingAction = useRef<(() => void) | null>(null);
  useEffect(() => {
    const update = () => { if (!document.querySelector('dialog[open]')) setIsScrolled(window.scrollY > 20); };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const dismissThen = (action: () => void) => {
    pendingAction.current = action;
    setMobileMenuOpen(false);
  };
  const navigate = (screen: ScreenView) => {
    if (mobileMenuOpen) dismissThen(() => onNavigate(screen));
    else onNavigate(screen);
  };
  const control = theme === 'dark' ? 'bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-800' : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100';
  return <header id="main-header" data-layout={fit.full ? 'full' : 'compact'} data-required-width={fit.required}
    className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0A0D12]/95 border-stone-800 text-stone-100' : 'bg-[#F7F5F0]/95 border-stone-200/80 text-stone-900'} ${isScrolled ? 'backdrop-blur-md shadow-md' : 'backdrop-blur-sm'}`}>
    <div ref={fit.row} className="portfolio-header-row relative max-w-[1536px] mx-auto h-20 flex items-center justify-between">
      <button ref={fit.brand} id="brand-logo-btn" onClick={() => navigate('hero')} className="header-brand flex shrink-0 items-center text-left rounded-xl">
        <span className="header-portrait rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 shadow-sm shrink-0">
          <img src={USER_AVATAR_URL} alt="Neal Kottilingal" className="w-full h-full rounded-full object-cover object-top" />
        </span>
        <span className="flex flex-col">
          <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none">Neal<span className="text-amber-500">.</span></span>
          <span className="header-identity mt-1 flex items-center gap-1 font-semibold uppercase tracking-wide whitespace-nowrap text-stone-500 dark:text-stone-400">Full Stack<span className="text-amber-500" aria-hidden="true">•</span>Blockchain</span>
        </span>
      </button>
      {/* The same element is measured off-flow when compact; it is inert and hidden from assistive technology. */}
      <nav ref={fit.navigation} aria-label="Desktop navigation" aria-hidden={!fit.full} inert={!fit.full}
        className={`header-section-links flex shrink-0 items-center w-max font-semibold ${fit.full ? '' : 'header-measure-only'}`}>
        {NAV_ITEMS.map(item => {
          const active = activeSection === item.screen;
          return <button key={item.screen} id={`nav-${item.screen}`} aria-current={active ? 'location' : undefined} onClick={() => navigate(item.screen)}
            className={`relative whitespace-nowrap py-3 rounded-lg transition-colors duration-200 active:bg-amber-500/20 ${active ? 'text-amber-700 dark:text-amber-400 bg-amber-500/10' : 'text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-amber-500/5'}`}>
            {item.label}
            {active && <motion.span aria-hidden="true" layoutId="headerNavIndicator" className="absolute bottom-1 inset-x-2 h-0.5 rounded-full bg-amber-500"
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 34 }} />}
          </button>;
        })}
      </nav>
      <div ref={fit.modes} id="screen-view-selector" aria-label="Navigation mode" aria-hidden={!fit.full} inert={!fit.full}
        className={`flex shrink-0 items-center p-1 rounded-full border border-stone-500/20 ${fit.full ? '' : 'header-measure-only'}`}>
        {([{ id: 'all', label: 'Full Feed', icon: Layers }, { id: 'screens', label: 'Screens', icon: Monitor }] as const).map(mode => {
          const Icon = mode.icon;
          return <button key={mode.id} id={`view-mode-${mode.id}`} aria-label={mode.label} title={mode.label} aria-pressed={(mode.id === 'all') === (activeScreen === 'all')}
            onClick={() => onSelectScreen(mode.id === 'all' ? 'all' : activeSection)}
            className={`w-9 h-9 rounded-full grid place-items-center transition-colors ${(mode.id === 'all') === (activeScreen === 'all') ? 'bg-amber-500 text-stone-950' : 'text-stone-500 hover:bg-amber-500/10'}`}><Icon size={15} /></button>;
        })}
      </div>
      <div ref={fit.actions} className="flex shrink-0 items-center gap-1 sm:gap-2">
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button id="theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle dark and light mode" className={`header-control rounded-full border grid place-items-center transition-colors ${control}`}>
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>
          <button id="cv-download-btn" onClick={onOpenResume} aria-label="View CV" title="View CV"
            className="header-control header-cv rounded-full bg-stone-950 dark:bg-amber-500 text-white dark:text-stone-950 flex items-center justify-center gap-1.5 text-xs font-bold transition-colors hover:bg-amber-600 dark:hover:bg-amber-400 active:bg-amber-600">
            <FileDown size={15} className="hidden sm:block" /><span>CV</span>
          </button>
        </div>
        <motion.button id="mobile-menu-btn" onPointerDown={event => { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileTap={reduced ? undefined : { scale: .96 }}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-haspopup="dialog"
          className={`header-control rounded-xl border grid place-items-center transition-colors ${control}`}>
          <span className="relative block w-5 h-5" aria-hidden="true">
            {[0, 1, 2].map(line => <motion.span key={line} className="absolute left-0 top-[9px] w-5 h-0.5 bg-current rounded-full"
              animate={{ y: mobileMenuOpen ? 0 : (line - 1) * 6, rotate: mobileMenuOpen ? (line === 0 ? 45 : -45) : 0, opacity: mobileMenuOpen && line === 1 ? 0 : 1 }} transition={{ duration: reduced ? 0 : .2 }} />)}
          </span>
        </motion.button>
      </div>
    </div>
    <AnimatePresence onExitComplete={() => {
      const action = pendingAction.current; pendingAction.current = null;
      requestAnimationFrame(() => action?.());
    }}>
      {mobileMenuOpen && <MobileNavigation key="mobile-nav" theme={theme} activeSection={activeSection} activeScreen={activeScreen}
        onClose={() => setMobileMenuOpen(false)} onNavigate={navigate} onMode={screen => dismissThen(() => onSelectScreen(screen))} onResume={() => dismissThen(onOpenResume)} />}
    </AnimatePresence>
  </header>;
}
