import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Compass,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  Milestone,
} from 'lucide-react';
import { ThemeMode, ChapterEvent } from '../types';
import { CodeCompileReveal } from './CodeCompileReveal';
import { ChapterCard } from './chapters/ChapterCard';
import { ChapterModal } from './chapters/ChapterModal';
import {
  CHAPTER_EVENTS,
  getAvailableYears,
  getLatestYear,
  getAchievementsForYear,
  getExperiencesForYear,
} from '../data/chaptersData';

interface ChaptersSectionProps {
  theme: ThemeMode;
  onContactClick?: () => void;
}

export function ChaptersSection({ theme, onContactClick }: ChaptersSectionProps) {
  // Dynamically extract all years with entries (sorted newest first)
  const availableYears = useMemo(() => getAvailableYears(CHAPTER_EVENTS), []);
  const initialYear = useMemo(() => getLatestYear(CHAPTER_EVENTS), []);

  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [selectedEvent, setSelectedEvent] = useState<ChapterEvent | null>(null);

  // Filter events for the currently active year
  const achievements = useMemo(
    () => getAchievementsForYear(CHAPTER_EVENTS, selectedYear),
    [selectedYear]
  );

  const experiences = useMemo(
    () => getExperiencesForYear(CHAPTER_EVENTS, selectedYear),
    [selectedYear]
  );

  const totalEntriesForYear = achievements.length + experiences.length;

  return (
    <section
      id="chapters"
      className={`py-24 sm:py-32 border-b transition-colors duration-300 relative ${
        theme === 'dark'
          ? 'bg-[#0A0D12] border-stone-800 text-stone-100'
          : 'bg-[#F7F5F0] border-stone-200 text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ================= HEADER TITLE ================= */}
        <div className="text-center mb-14 sm:mb-18 max-w-3xl mx-auto">
          <CodeCompileReveal delay={0.05} tag="ARCHIVE:CHAPTERS" prefix="[0x25]">
            <span className="text-teal-500 dark:text-teal-400 font-mono font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2">
              <Milestone className="w-3.5 h-3.5" />
              <span>// Lifelong Milestones & Recognitions</span>
            </span>
          </CodeCompileReveal>

          <CodeCompileReveal delay={0.15} prefix="[0x26]">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-2 ${
                theme === 'dark' ? 'text-white' : 'text-stone-950'
              }`}
            >
              CHAPTERS<span className="text-amber-500">.</span>
            </h2>
            <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </CodeCompileReveal>

          <CodeCompileReveal delay={0.25} prefix="[0x27]">
            <p
              className={`text-base sm:text-lg mt-4 font-medium italic ${
                theme === 'dark' ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              &ldquo;Every year, a new chapter. Every milestone, a story.&rdquo;
            </p>
            <p
              className={`text-xs sm:text-sm mt-1.5 max-w-xl mx-auto ${
                theme === 'dark' ? 'text-stone-500' : 'text-stone-500'
              }`}
            >
              An interactive life archive of hackathons, verified certifications, technical leadership,
              and professional experiences.
            </p>
          </CodeCompileReveal>
        </div>

        {/* ================= HORIZONTAL YEAR SELECTOR ================= */}
        <div className="mb-14 flex items-center justify-center">
          <div
            className={`p-1.5 rounded-2xl border flex items-center gap-1.5 max-w-full overflow-x-auto shadow-sm ${
              theme === 'dark'
                ? 'bg-stone-900/90 border-stone-800'
                : 'bg-white border-stone-200'
            }`}
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 px-3 hidden sm:inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Year:</span>
            </span>

            {availableYears.map((yr) => {
              const isActive = selectedYear === yr;
              return (
                <motion.button
                  key={yr}
                  id={`year-selector-${yr}`}
                  onClick={() => setSelectedYear(yr)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/25 font-black'
                      : theme === 'dark'
                      ? 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{yr}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeYearDot"
                      className="w-1.5 h-1.5 rounded-full bg-stone-950"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ================= CONTENT FOR SELECTED YEAR ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="space-y-16 sm:space-y-20"
          >
            {/* If no entries at all for this year */}
            {totalEntriesForYear === 0 && (
              <div
                className={`text-center py-20 rounded-3xl border ${
                  theme === 'dark'
                    ? 'bg-stone-900/40 border-stone-800'
                    : 'bg-white border-stone-200'
                }`}
              >
                <BookOpen className="w-12 h-12 text-stone-500 mx-auto mb-3 opacity-60" />
                <h3 className="text-lg font-bold text-stone-400">
                  No Recorded Chapters for {selectedYear} Yet
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  New verified certifications, hackathons, and event achievements will appear here as they are archived.
                </p>
              </div>
            )}

            {/* ================= CATEGORY A: ACHIEVEMENTS & RECOGNITION ================= */}
            {achievements.length > 0 && (
              <section aria-labelledby={`achievements-heading-${selectedYear}`}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3
                      id={`achievements-heading-${selectedYear}`}
                      className={`text-xl sm:text-2xl font-black tracking-tight ${
                        theme === 'dark' ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      Achievements & Recognition
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-medium">
                      Hackathon victories, verified blockchain credentials, and top competition rankings
                    </p>
                  </div>
                  <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <span>{achievements.length} Verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {achievements.map((item, idx) => (
                    <ChapterCard
                      key={item.id}
                      event={item}
                      theme={theme}
                      onOpen={(e) => setSelectedEvent(e)}
                      index={idx}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ================= CATEGORY B: EXPERIENCES & PARTICIPATION ================= */}
            {experiences.length > 0 && (
              <section aria-labelledby={`experiences-heading-${selectedYear}`}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3
                      id={`experiences-heading-${selectedYear}`}
                      className={`text-xl sm:text-2xl font-black tracking-tight ${
                        theme === 'dark' ? 'text-white' : 'text-stone-900'
                      }`}
                    >
                      Experiences & Participation
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-medium">
                      Technical summits, architectural masterclasses, and hands-on developer workshops
                    </p>
                  </div>
                  <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <span>{experiences.length} Records</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {experiences.map((item, idx) => (
                    <ChapterCard
                      key={item.id}
                      event={item}
                      theme={theme}
                      onOpen={(e) => setSelectedEvent(e)}
                      index={idx}
                    />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ================= SECTION BOTTOM CTA ================= */}
        <div className="mt-16 sm:mt-20 text-center">
          <div
            className={`p-6 sm:p-8 rounded-3xl border max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 ${
              theme === 'dark'
                ? 'bg-stone-900/50 border-stone-800'
                : 'bg-white border-stone-200'
            }`}
          >
            <div className="text-left">
              <h4 className="font-bold text-sm sm:text-base">Have an event or competition in mind?</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Always open to high-impact hackathons, speaking engagements, and technical collaborations.
              </p>
            </div>
            {onContactClick && (
              <motion.button
                onClick={onContactClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* ================= EVENT DETAIL MODAL ================= */}
      <ChapterModal
        event={selectedEvent}
        theme={theme}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
