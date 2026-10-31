import { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TickerMarquee } from './components/TickerMarquee';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { LeetCodeSection } from './components/LeetCodeSection';
import { GitHubSection } from './components/GitHubSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ChaptersSection } from './components/ChaptersSection';
import { ContactSection } from './components/ContactSection';
const ProjectModal = lazy(() => import('./components/ProjectModal').then(m => ({ default: m.ProjectModal })));
const ResumeModal = lazy(() => import('./components/ResumeModal').then(m => ({ default: m.ResumeModal })));
import { ScrollProgress } from './components/ScrollProgress';
import { CircuitTrace } from './components/CircuitTrace';
import { ScreenView, ThemeMode, ProjectItem } from './types';
import { NAV_ITEMS } from './data/navigation';
import { usePortfolioNavigation } from './hooks/usePortfolioNavigation';
import { ArrowLeft, ArrowRight, Layers, LayoutGrid } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('nk_theme');
    return saved === 'light' ? 'light' : 'dark';
  });
  const { activeScreen, activeSection, navigate, selectScreen: setActiveScreen } = usePortfolioNavigation();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nk_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToAbout = () => navigate('about');
  const scrollToProjects = () => navigate('projects');
  const scrollToTop = () => navigate('hero');
  const handleNavClick = (id: string) => {
    const item = NAV_ITEMS.find(item => item.screen === id);
    if (item) navigate(item.screen);
  };
  const screensList: ScreenView[] = NAV_ITEMS.map(item => item.screen);
  const currentScreenIndex = screensList.indexOf(activeScreen);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'dark bg-[#0A0D12] text-stone-100' : 'bg-[#F7F5F0] text-stone-900'
      }`}
    >
      {/* Dynamic Scroll Progress Bar & Floating Back-To-Top */}
      <ScrollProgress theme={theme} />

      {/* PCB Circuit Trace progressing down page on continuous scroll */}
      {activeScreen === 'all' && <CircuitTrace theme={theme} />}

      {/* Sticky Primary Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        activeScreen={activeScreen}
        activeSection={activeSection}
        onNavigate={navigate}
        onSelectScreen={setActiveScreen}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Screen Mode Indicator / Breadcrumb when in Single Screen View */}
      {activeScreen !== 'all' && (
        <div
          className={`sticky top-20 z-40 px-3 sm:px-6 py-2.5 border-b backdrop-blur-md flex items-center justify-between text-xs font-semibold ${
            theme === 'dark'
              ? 'bg-stone-950/80 border-stone-800 text-stone-300'
              : 'bg-stone-100/90 border-stone-200 text-stone-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="hidden sm:inline uppercase tracking-wider font-mono text-[11px] text-amber-500 font-bold">
              Screen View:
            </span>
            <span className="capitalize font-bold text-stone-900 dark:text-white">
              {activeScreen === 'hero'
                ? 'Hero & Intro'
                : activeScreen === 'about'
                ? 'About & Experience'
                : activeScreen === 'skills'
                ? 'Stack & Capabilities'
                : activeScreen === 'leetcode'
                ? 'LeetCode & Consistency'
                : activeScreen === 'github'
                ? 'GitHub Repos & Activity'
                : activeScreen === 'projects'
                ? 'Featured Projects'
                : activeScreen === 'chapters'
                ? 'Chapters & Milestones'
                : 'Contact & Collaboration'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentScreenIndex > 0 && (
              <button
                aria-label="Previous screen"
                onClick={() => navigate(screensList[currentScreenIndex - 1])}
                className="min-h-11 min-w-11 px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="hidden sm:inline">Previous</span>
              </button>
            )}

            {currentScreenIndex < screensList.length - 1 && (
              <button
                aria-label="Next screen"
                onClick={() => navigate(screensList[currentScreenIndex + 1])}
                className="min-h-11 min-w-11 px-2.5 py-1 rounded bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 flex items-center gap-1 transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}

            <button
              onClick={() => setActiveScreen('all')}
              aria-label="Return to Full Feed" className="ml-1 min-h-11 min-w-11 px-2.5 py-1 rounded text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center gap-1"
              title="Return to full continuous scroll"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Screens</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Render */}
      <main>
        {activeScreen === 'all' ? (
          <>
            <HeroSection
              theme={theme}
              onScrollToAbout={scrollToAbout}
              onExploreProjects={scrollToProjects}
            />
            <TickerMarquee theme={theme} />
            <AboutSection
              theme={theme}
              onExploreProjects={scrollToProjects}
              onContactClick={() => handleNavClick('contact')}
            />
            <SkillsSection theme={theme} />
            <LeetCodeSection theme={theme} />
            <GitHubSection theme={theme} />
            <ProjectsSection
              theme={theme}
              onOpenCaseStudy={(proj) => setSelectedProject(proj)}
              onContactClick={() => handleNavClick('contact')}
            />
            <ChaptersSection
              theme={theme}
              onContactClick={() => handleNavClick('contact')}
            />
            <ContactSection
              theme={theme}
              onScrollToTop={scrollToTop}
              onNavClick={handleNavClick}
            />
          </>
        ) : (
          <div>
            {activeScreen === 'hero' && (
              <>
                <HeroSection
                  theme={theme}
                  onScrollToAbout={() => navigate('about')}
                  onExploreProjects={() => navigate('projects')}
                />
                <TickerMarquee theme={theme} />
              </>
            )}

            {activeScreen === 'about' && (
              <AboutSection
                theme={theme}
                onExploreProjects={() => navigate('projects')}
                onContactClick={() => navigate('contact')}
              />
            )}

            {activeScreen === 'skills' && (
              <>
                <SkillsSection theme={theme} />
                <TickerMarquee theme={theme} />
              </>
            )}

            {activeScreen === 'leetcode' && (
              <LeetCodeSection theme={theme} />
            )}

            {activeScreen === 'github' && (
              <GitHubSection theme={theme} />
            )}

            {activeScreen === 'projects' && (
              <ProjectsSection
                theme={theme}
                onOpenCaseStudy={(proj) => setSelectedProject(proj)}
                onContactClick={() => navigate('contact')}
              />
            )}

            {activeScreen === 'chapters' && (
              <ChaptersSection
                theme={theme}
                onContactClick={() => navigate('contact')}
              />
            )}

            {activeScreen === 'contact' && (
              <ContactSection
                theme={theme}
                onScrollToTop={scrollToTop}
                onNavClick={handleNavClick}
              />
            )}
          </div>
        )}
      </main>

      <Suspense fallback={<span role="status" className="fixed bottom-4 left-4 z-50 rounded-xl bg-stone-900 text-white px-4 py-2">Loading document…</span>}>
      {/* Case Study Modal */}
      {selectedProject && <ProjectModal
        project={selectedProject}
        theme={theme}
        onClose={() => setSelectedProject(null)}
      />}

      {/* Resume / CV Modal */}
      {isResumeOpen && <ResumeModal
        isOpen={isResumeOpen}
        theme={theme}
        onClose={() => setIsResumeOpen(false)}
      />}
      </Suspense>
    </div>
  );
}
