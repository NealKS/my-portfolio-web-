import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Trophy, Compass, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { ThemeMode, ChapterEvent } from '../types';
import { CodeCompileReveal } from './CodeCompileReveal';
import { ChapterCard } from './chapters/ChapterCard';
import { ChapterPhotoLightbox } from './chapters/ChapterPhotoLightbox';
import { ChapterModal } from './chapters/ChapterModal';
import { YearNavigator } from './chapters/YearNavigator';
import { CHAPTER_EVENTS, getLatestYear, getEventsForYear, chapterRecordCount } from '../data/chaptersData';

const categories = [
  { id: 'achievement', number: '01', title: 'Achievements & Recognition', line: 'Accomplishments, certifications, and moments of recognition.', icon: Trophy },
  { id: 'experience', number: '02', title: 'Experiences & Participation', line: 'New perspectives, shared ideas, and hands-on experiences.', icon: Compass },
] as const;
type View = 'landing' | ChapterEvent['category'];

export function ChaptersSection({ theme, onContactClick }: { theme: ThemeMode; onContactClick?: () => void }) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(() => getLatestYear());
  const [view, setView] = useState<View>('landing');
  const [selectedEvent, setSelectedEvent] = useState<ChapterEvent | null>(null);
  const [photoEvent, setPhotoEvent] = useState<ChapterEvent | null>(null);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const galleryHeading = useRef<HTMLHeadingElement>(null);
  const landingOffset = useRef(0);
  const categoryTrigger = useRef<ChapterEvent['category'] | null>(null);
  const pendingFocus = useRef(false);
  const bounds = useMemo(() => ({ min: Math.min(currentYear, ...CHAPTER_EVENTS.map(e => e.year)) - 1, max: Math.max(currentYear, ...CHAPTER_EVENTS.map(e => e.year)) + 1 }), [currentYear]);
  const entries = useMemo(() => getEventsForYear(CHAPTER_EVENTS, year), [year]);
  const records = entries.filter(e => e.category === view);
  const category = categories.find(c => c.id === view);
  const surface = theme === 'dark' ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200';
  const changeYear = (next: number) => {
    if (next === year) return;
    setYear(next); setView('landing'); pendingFocus.current = false;
  };
  const reveal = { initial: { opacity: 0, y: reduced ? 0 : 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: reduced ? 0 : -8 }, transition: { duration: reduced ? 0 : .24 } };
  return <section id="chapters" ref={sectionRef} className={`relative py-16 sm:py-20 border-b ${theme === 'dark' ? 'bg-[#0A0D12] border-stone-800 text-stone-100' : 'bg-[#F7F5F0] border-stone-200 text-stone-900'}`}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="text-center mb-6 max-w-3xl mx-auto">
        <CodeCompileReveal>
          <p className="text-teal-600 dark:text-teal-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-2">A lifelong archive</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">CHAPTERS<span className="text-amber-500">.</span></h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm sm:text-base mt-4 text-stone-600 dark:text-stone-400">Every year, a new chapter. Every milestone, a story.</p>
        </CodeCompileReveal>
      </div>
      {view === 'landing' && <motion.div initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .35 }} className="max-w-2xl mx-auto text-center mb-8 px-1">
        <p className="text-lg sm:text-xl font-bold leading-snug tracking-tight">A few wins, a lot of learning, and several sleepless nights.</p>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">These are just the highlights. The complete story?{' '}<a className="chapter-receipts-link font-semibold text-amber-700 dark:text-amber-400" href="https://www.linkedin.com/in/neal-kottilingal-aa9bbb320/" target="_blank" rel="noopener noreferrer">LinkedIn has the receipts</a>.</p>
      </motion.div>}
      <YearNavigator year={year} min={bounds.min} max={bounds.max} onChange={changeYear} />
      <div className="min-h-[320px]" style={{ overflowAnchor: 'none' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${year}-${view}`} {...reveal} onAnimationComplete={definition => {
            if ((definition as { opacity?: number }).opacity !== 1) return;
            if (!pendingFocus.current) return;
            pendingFocus.current = false;
            if (view === 'landing') {
              window.scrollTo({ top: window.scrollY + (sectionRef.current?.getBoundingClientRect().top ?? 0) - landingOffset.current, behavior: 'instant' });
              document.getElementById(`chapter-category-${categoryTrigger.current}`)?.focus({ preventScroll: true });
            } else galleryHeading.current?.focus({ preventScroll: true });
          }}>
            {view === 'landing' ? entries.length ? <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {categories.map((item, index) => {
                const Icon = item.icon;
                const count = entries.filter(e => e.category === item.id).length;
                const achievement = item.id === 'achievement';
                return <motion.button id={`chapter-category-${item.id}`} key={item.id} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : index * .07, duration: .3 }}
                  whileHover={reduced ? undefined : { y: -4 }} whileTap={reduced ? undefined : { scale: .985 }}
                  onClick={event => { landingOffset.current = sectionRef.current?.getBoundingClientRect().top ?? 0; categoryTrigger.current = item.id; pendingFocus.current = true; setView(item.id); }}
                  className={`group relative overflow-hidden p-6 sm:p-8 rounded-3xl border text-left flex flex-col min-h-[270px] transition-colors ${surface} ${achievement ? 'shadow-lg shadow-amber-500/5 hover:border-amber-500/50' : 'hover:border-teal-500/50'}`}>
                  <div aria-hidden="true" className={`absolute top-0 inset-x-8 h-px ${achievement ? 'bg-gradient-to-r from-transparent via-amber-500/70 to-transparent' : 'bg-gradient-to-r from-transparent via-teal-500/40 to-transparent'}`} />
                  <div className="flex items-center justify-between mb-6">
                    <span className={`w-11 h-11 rounded-xl border grid place-items-center ${achievement ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400'}`}><Icon size={22} /></span>
                    <span className="font-mono text-xs text-stone-400">{item.number}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight max-w-xs">{item.title}</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-3 leading-relaxed">{item.line}</p>
                  <div className="flex justify-between items-center mt-auto pt-6 text-xs">
                    <span className="font-mono text-stone-500 dark:text-stone-400">{chapterRecordCount(item.id, count)} · {year}</span>
                    <span className={`inline-flex items-center gap-2 font-bold ${achievement ? 'text-amber-700 dark:text-amber-400' : 'text-teal-700 dark:text-teal-400'}`}>Explore<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </motion.button>;
              })}
            </div> : <div className={`max-w-4xl mx-auto rounded-3xl border text-center px-5 py-10 sm:py-12 ${surface}`}>
              <motion.p {...reveal} className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">{year > currentYear ? `${year} — The Next Chapter` : `${year} — The Archive`}</motion.p>
              <div aria-hidden="true" className="flex items-center justify-center gap-3 my-6 text-amber-500">
                <span className="w-2 h-2 rounded-full bg-current" /><motion.span initial={{ scaleX: reduced ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: .7 }} className="w-20 border-t border-dashed border-amber-500/50 origin-left" /><BookOpen size={24} /><span className="w-20 border-t border-dashed border-amber-500/30" /><ArrowRight size={15} />
              </div>
              <motion.h3 {...reveal} transition={{ delay: reduced ? 0 : .08 }} className="text-xl sm:text-2xl font-bold tracking-tight">{year > currentYear ? 'The next chapter is still being written.' : 'No milestones archived for this year.'}{year > currentYear && <span className="terminal-cursor !bg-amber-500" aria-hidden="true" />}</motion.h3>
              {year > currentYear && <>
                <motion.p {...reveal} transition={{ delay: reduced ? 0 : .16 }} className="text-sm text-stone-500 dark:text-stone-400 mt-3 max-w-sm mx-auto leading-relaxed">No spoilers yet. The best stories take a little time to build.</motion.p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-8">Stay tuned. More milestones ahead.</p>
              </>}
            </div> : <div>
              <button onClick={() => { pendingFocus.current = true; setView('landing'); }} className="inline-flex min-h-11 items-center gap-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-amber-600 mb-4"><ArrowLeft size={16} />Back to Chapters</button>
              <div className="mb-6">
                <h3 ref={galleryHeading} tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold tracking-tight outline-none">{category?.title}</h3>
                <p className="mt-2 text-xs font-mono text-stone-500 dark:text-stone-400">{year} · {chapterRecordCount(view, records.length)}</p>
              </div>
              {records.length ? <div className={records.length === 1 ? "max-w-4xl mx-auto" : "grid md:grid-cols-2 xl:grid-cols-3 gap-6"}>
                {records.map((event, i) => <ChapterCard key={event.id} event={event} theme={theme} onOpen={setSelectedEvent} onViewPhoto={setPhotoEvent} index={i} />)}
              </div> : <p className="py-12 text-center text-stone-500">No records in this category for {year}.</p>}
            </div>}
          </motion.div>
        </AnimatePresence>
      </div>
      {onContactClick && <div className="mt-8 text-center"><button onClick={onContactClick} className="text-xs min-h-11 flex-wrap justify-center text-stone-500 dark:text-stone-400 hover:text-amber-600 inline-flex items-center gap-2">Have something worth building together?<span className="font-bold text-amber-700 dark:text-amber-400">Let’s connect</span><ArrowRight size={13} /></button></div>}
    </div>
    <ChapterPhotoLightbox event={photoEvent} onClose={() => setPhotoEvent(null)} />
    <ChapterModal event={selectedEvent} theme={theme} onClose={() => setSelectedEvent(null)} />
  </section>;
}
