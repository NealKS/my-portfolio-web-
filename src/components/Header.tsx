import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, FileDown, Menu, X, Monitor, Layers } from 'lucide-react';
import { ScreenView, ThemeMode } from '../types';
import { USER_AVATAR_URL } from '../data/portfolioData';

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

  const navItems: { label: string; screen: ScreenView; href: string }[] = [
    { label: 'Home', screen: 'hero', href: '#hero' },
    { label: 'About Me', screen: 'about', href: '#about' },
    { label: 'Stack & Skills', screen: 'skills', href: '#skills' },
    { label: 'LeetCode', screen: 'leetcode', href: '#leetcode' },
    { label: 'GitHub Activity', screen: 'github', href: '#github' },
    { label: 'Featured Projects', screen: 'projects', href: '#projects' },
    { label: 'Contact', screen: 'contact', href: '#contact' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.button
          id="brand-logo-btn"
          onClick={() => handleNavClick('hero', '#hero')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-3.5 group text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1 transition-all cursor-pointer"
        >
          <div className="relative">
            <motion.div
              whileHover={{ rotate: 4, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 shadow-lg shadow-amber-500/25 flex items-center justify-center overflow-hidden"
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
              className={`text-xl font-extrabold tracking-tight leading-none ${
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold tracking-normal">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <motion.button
                key={item.screen}
                id={`nav-${item.screen}`}
                onClick={() => handleNavClick(item.screen, item.href)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.94 }}
                className={`py-1.5 relative group transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-500 font-bold'
                    : theme === 'dark'
                    ? 'text-stone-300 hover:text-amber-400'
                    : 'text-stone-700 hover:text-amber-600'
                }`}
              >
                <span>{item.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="headerNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 h-0.5 bg-amber-500/60 w-0 group-hover:w-full transition-all duration-300 rounded-full"></span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* View Mode & Theme Switcher & CV Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Screen Mode Switcher: Single Screen vs All Screens */}
          <div
            id="screen-view-selector"
            className={`hidden lg:flex items-center p-1 rounded-full text-xs font-semibold border ${
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
            whileHover={{ scale: 1.1 }}
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
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-xs uppercase tracking-widest font-bold text-white bg-stone-950 dark:bg-amber-500 dark:text-stone-950 rounded-full hover:bg-amber-600 dark:hover:bg-amber-400 shadow-sm hover:shadow-lg hover:shadow-amber-600/20 transition-colors duration-200 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 mr-1.5" />
            <span>CV</span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Open mobile menu"
            className={`md:hidden p-2 rounded-lg border cursor-pointer ${
              theme === 'dark'
                ? 'bg-stone-900 border-stone-800 text-stone-200'
                : 'bg-white border-stone-200 text-stone-800'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`md:hidden px-6 py-6 border-b overflow-hidden ${
              theme === 'dark'
                ? 'bg-[#0E1318] border-stone-800 text-stone-200'
                : 'bg-[#F7F5F0] border-stone-200 text-stone-900'
            }`}
          >
            {/* Screen mode switcher on mobile */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-300 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">View Layout:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectScreen('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    activeScreen === 'all'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => onSelectScreen(activeScreen === 'all' ? 'hero' : activeScreen)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    activeScreen !== 'all'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  Single Screen
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-3 font-semibold text-sm">
              {navItems.map((item) => (
                <motion.button
                  key={item.screen}
                  onClick={() => handleNavClick(item.screen, item.href)}
                  whileTap={{ scale: 0.96 }}
                  className={`text-left py-2 px-3 rounded-lg transition-colors ${
                    activeScreen === item.screen
                      ? 'bg-amber-500/10 text-amber-500 font-bold'
                      : 'hover:text-amber-500'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                whileTap={{ scale: 0.96 }}
                className="mt-3 w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
              >
                <FileDown className="w-4 h-4" />
                <span>Download / View Resume</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
