import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  FileDown,
  Menu,
  X,
  Monitor,
  Layers,
  Home,
  User,
  Cpu,
  Code2,
  FolderGit2,
  Mail,
  ChevronRight,
  Sparkles,
  Instagram,
  Github,
  BookOpen,
} from 'lucide-react';
import { ScreenView, ThemeMode } from '../types';
import { USER_AVATAR_URL, PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  activeScreen: ScreenView;
  onSelectScreen: (screen: ScreenView) => void;
  onOpenResume: () => void;
}

export function Header({
  theme,
  onToggleTheme,
  activeScreen,
  onSelectScreen,
  onOpenResume,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: {
    label: string;
    fullLabel: string;
    screen: ScreenView;
    href: string;
    icon: any;
  }[] = [
    { label: 'Home', fullLabel: 'Home', screen: 'hero', href: '#hero', icon: Home },
    { label: 'About', fullLabel: 'About Me', screen: 'about', href: '#about', icon: User },
    { label: 'Skills', fullLabel: 'Stack & Skills', screen: 'skills', href: '#skills', icon: Cpu },
    { label: 'LeetCode', fullLabel: 'LeetCode', screen: 'leetcode', href: '#leetcode', icon: Code2 },
    { label: 'GitHub', fullLabel: 'GitHub Activity', screen: 'github', href: '#github', icon: FolderGit2 },
    { label: 'Projects', fullLabel: 'Featured Projects', screen: 'projects', href: '#projects', icon: Layers },
    { label: 'Chapters', fullLabel: 'Chapters', screen: 'chapters', href: '#chapters', icon: BookOpen },
    { label: 'Contact', fullLabel: 'Contact', screen: 'contact', href: '#contact', icon: Mail },
  ];

  const handleNavClick = (screen: ScreenView, href: string) => {
    onSelectScreen(screen);
    setMobileMenuOpen(false);
    if (activeScreen === 'all') {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-[#0A0D12]/95 backdrop-blur-md border-b border-stone-800 shadow-xl'
            : 'bg-[#F7F5F0]/95 backdrop-blur-md border-b border-stone-200/80 shadow-md'
          : theme === 'dark'
          ? 'bg-[#0A0D12]/80 backdrop-blur-sm border-b border-stone-850'
          : 'bg-[#F7F5F0]/90 backdrop-blur-sm border-b border-stone-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with portrait mark and availability badge */}
        <motion.button
          id="brand-logo-btn"
          onClick={() => handleNavClick('hero', '#hero')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1 transition-all cursor-pointer shrink-0 mr-3 lg:mr-6"
        >
          <div className="relative">
            <motion.div
              whileHover={{ rotate: 4, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 shadow-md shadow-amber-500/25 flex items-center justify-center overflow-hidden"
            >
              <img
                src={USER_AVATAR_URL}
                alt="Neal Kottilingal Logo"
                className="w-full h-full object-cover object-top rounded-full"
              />
            </motion.div>
            {/* Active Live Indicator */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0A0D12] shadow-sm flex items-center justify-center"
              title="Online / Ready to Collaborate"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <span
              className={`text-lg sm:text-xl font-extrabold tracking-tight leading-none ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Neal<span className="text-amber-500">.</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-1.5">
              <span>Full Stack</span>
              <span className="w-1 h-1 rounded-full bg-amber-500"></span>
              <span>Web3</span>
            </span>
          </div>
        </motion.button>

        {/* Desktop Navigation Links:
            - On lg screens (1024px-1279px, preview pane), uses concise labels (Home, About, Skills, LeetCode, GitHub, Projects, Contact) so nothing overflows.
            - On 2xl screens (1536px+), uses full labels with explicit word spacing so words like "Featured Projects" never stick together. */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold tracking-normal flex-1">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <motion.button
                key={item.screen}
                id={`nav-${item.screen}`}
                onClick={() => handleNavClick(item.screen, item.href)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.94 }}
                className={`py-1.5 px-2.5 xl:px-3 rounded-lg relative group transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-amber-500 font-bold bg-amber-500/10'
                    : theme === 'dark'
                    ? 'text-stone-300 hover:text-amber-400 hover:bg-stone-800/60'
                    : 'text-stone-700 hover:text-amber-600 hover:bg-stone-100'
                }`}
              >
                {/* Full label on widescreen with explicit word separation */}
                <span className="hidden 2xl:inline-flex items-center gap-1">
                  {item.fullLabel.split(' ').map((word, wIdx) => (
                    <span key={wIdx}>{word}</span>
                  ))}
                </span>
                {/* Concise clean label on standard desktop / preview pane */}
                <span className="inline 2xl:hidden">{item.label}</span>

                {isActive && (
                  <motion.span
                    layoutId="headerNavIndicator"
                    className="absolute bottom-0 inset-x-2 h-0.5 bg-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* View Mode & Theme Switcher & CV Action */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-3 lg:ml-6">
          {/* Continuous Scroll View vs Screen View (Available on widescreen & inside mobile drawer) */}
          <div
            id="screen-view-selector"
            className={`hidden 2xl:flex items-center p-1 rounded-full text-xs font-semibold border ${
              theme === 'dark'
                ? 'bg-stone-900/90 border-stone-800 text-stone-300'
                : 'bg-stone-200/70 border-stone-300/80 text-stone-700'
            }`}
          >
            <motion.button
              id="view-mode-all"
              onClick={() => onSelectScreen('all')}
              whileTap={{ scale: 0.92 }}
              title="Continuous Scroll View"
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                activeScreen === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'hover:text-amber-500'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Feed</span>
            </motion.button>
            <motion.button
              id="view-mode-screens"
              onClick={() => onSelectScreen(activeScreen === 'all' ? 'hero' : activeScreen)}
              whileTap={{ scale: 0.92 }}
              title="Individual Focused Screen View"
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                activeScreen !== 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'hover:text-amber-500'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Screens</span>
            </motion.button>
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88, rotate: 180 }}
            aria-label="Toggle dark and light mode"
            className={`p-2.5 rounded-full border transition-colors duration-200 cursor-pointer ${
              theme === 'dark'
                ? 'bg-stone-900 border-stone-800 text-amber-400 hover:bg-stone-800 shadow-md shadow-black/40'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100 shadow-sm'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-800" />
            )}
          </motion.button>

          {/* Download / View CV Button */}
          <motion.button
            id="cv-download-btn"
            onClick={onOpenResume}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.94 }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-wider font-bold text-white bg-stone-950 dark:bg-amber-500 dark:text-stone-950 rounded-full hover:bg-amber-600 dark:hover:bg-amber-400 shadow-sm hover:shadow-md hover:shadow-amber-500/20 transition-all duration-200 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 mr-1.5" />
            <span>CV</span>
          </motion.button>

          {/* Mobile & Tablet Menu Toggle (visible below lg: 1024px) */}
          <motion.button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Open mobile menu"
            className={`lg:hidden p-2 rounded-xl border cursor-pointer transition-colors ${
              theme === 'dark'
                ? 'bg-stone-900 border-stone-800 text-stone-200 hover:bg-stone-800'
                : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer (visible on mobile phones & tablets below lg: 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`lg:hidden border-b overflow-hidden shadow-2xl ${
              theme === 'dark'
                ? 'bg-[#0E1318]/98 backdrop-blur-xl border-stone-800 text-stone-200'
                : 'bg-[#F7F5F0]/98 backdrop-blur-xl border-stone-200 text-stone-900'
            }`}
          >
            <div className="px-5 py-6 space-y-5 max-w-lg mx-auto">
              {/* Profile Card Header in Mobile Menu */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center gap-3.5 ${
                  theme === 'dark'
                    ? 'bg-stone-900/80 border-stone-800'
                    : 'bg-white/80 border-stone-200'
                }`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-amber-500 to-orange-500 shrink-0">
                  <img
                    src={USER_AVATAR_URL}
                    alt="Neal"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    <span>{PERSONAL_INFO.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="text-xs text-amber-500 font-medium truncate">
                    Full Stack & Web3 Developer
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    Mumbai, Maharashtra, India
                  </div>
                </div>
              </div>

              {/* View Layout Switcher (Mobile) */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                  theme === 'dark'
                    ? 'bg-stone-900/50 border-stone-800 text-stone-300'
                    : 'bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                <span className="text-stone-500 dark:text-stone-400">View Layout:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectScreen('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeScreen === 'all'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'hover:text-amber-500'
                    }`}
                  >
                    All Continuous
                  </button>
                  <button
                    onClick={() => onSelectScreen(activeScreen === 'all' ? 'hero' : activeScreen)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeScreen !== 'all'
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'hover:text-amber-500'
                    }`}
                  >
                    Focused Screen
                  </button>
                </div>
              </div>

              {/* Nav Links with Icons & Active Indicators */}
              <div className="space-y-1">
                {navItems.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = activeScreen === item.screen;
                  return (
                    <motion.button
                      key={item.screen}
                      onClick={() => handleNavClick(item.screen, item.href)}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full text-left py-3 px-3.5 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                          : theme === 'dark'
                          ? 'text-stone-300 hover:bg-stone-800/60'
                          : 'text-stone-800 hover:bg-stone-200/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ItemIcon
                          className={`w-4 h-4 ${
                            isActive ? 'text-stone-950' : 'text-amber-500'
                          }`}
                        />
                        <span className="text-sm">
                          {/* Explicit word separation for multi-word labels */}
                          {item.fullLabel.split(' ').map((word, wIdx) => (
                            <span key={wIdx} className={wIdx > 0 ? 'ml-1' : ''}>
                              {word}
                            </span>
                          ))}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isActive ? 'text-stone-950' : 'text-stone-400 opacity-60'
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Download Resume / CV CTA in Mobile Menu */}
              <motion.button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:bg-amber-400 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>Download / View Resume</span>
              </motion.button>

              {/* Quick Social Links in Mobile Menu */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-amber-400 transition-colors"
                  title="LeetCode @NealSK"
                >
                  <Code2 className="w-4 h-4 text-amber-500" />
                </a>
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-pink-400 transition-colors"
                  title="Instagram @i.am.nealsk"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                </a>
              </div>

              {/* Contact Email Pill in Mobile Menu */}
              <div className="text-center text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
