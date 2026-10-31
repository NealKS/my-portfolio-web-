import { useEffect, useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function YearNavigator({ year, min, max, onChange }: { year: number; min: number; max: number; onChange: (year: number) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const first = useRef(true);
  const programmaticTarget = useRef<number | null>(null);
  const yearRef = useRef(year);
  yearRef.current = year;
  const changeRef = useRef(onChange);
  changeRef.current = onChange;
  const reduced = useReducedMotion();
  const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  useLayoutEffect(() => {
    programmaticTarget.current = (year - min) * 88;
    rail.current?.scrollTo({ left: programmaticTarget.current, behavior: first.current || reduced ? 'instant' : 'smooth' });
    first.current = false;
  }, [year, min, reduced]);
  useEffect(() => {
    const el = rail.current!;
    let lastStep = 0;
    let amount = 0;
    const wheel = (event: WheelEvent) => {
      // Ordinary vertical page scrolling stays untouched unless the visitor focuses this control.
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (!horizontal && !event.shiftKey && !el.contains(document.activeElement)) return;
      if (event.ctrlKey) return; // Preserve pinch-to-zoom.
      event.preventDefault();
      event.stopPropagation();
      if (Date.now() - lastStep < 350) return;
      amount += (horizontal ? event.deltaX : event.deltaY) * (event.deltaMode === 1 ? 16 : 1);
      if (Math.abs(amount) < 35) return;
      const next = yearRef.current - min + Math.sign(amount);
      changeRef.current(Math.max(min, Math.min(max, min + next)));
      amount = 0;
      lastStep = Date.now();
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => { el.removeEventListener('wheel', wheel); clearTimeout(timer.current); };
  }, [min, max]);
  return <div className="max-w-md mx-auto mb-8 sm:mb-10">
    <div className="flex items-center gap-1 sm:gap-3">
      <button aria-label="Previous year" disabled={year <= min} onClick={() => onChange(year - 1)} className="year-arrow"><ChevronLeft size={19} /></button>
      <div className="relative flex-1 min-w-0">
        <div ref={rail} role="group" aria-label="Chapter year" tabIndex={0} aria-describedby="year-help"
          className="year-rail flex overflow-x-auto snap-x snap-mandatory py-3 outline-offset-4 focus-visible:outline-amber-500"
          onKeyDown={event => {
            const target = event.key === 'ArrowRight' ? year + 1 : event.key === 'ArrowLeft' ? year - 1 : event.key === 'Home' ? min : event.key === 'End' ? max : null;
            if (target === null) return;
            event.preventDefault(); event.stopPropagation(); onChange(Math.max(min, Math.min(max, target)));
          }}
          onPointerDown={() => { programmaticTarget.current = null; }}
          onTouchStart={() => { programmaticTarget.current = null; }}
          onScroll={() => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
              if (!rail.current) return;
              const left = rail.current.scrollLeft;
              if (programmaticTarget.current !== null && Math.abs(left - programmaticTarget.current) > 1) return;
              programmaticTarget.current = null;
              changeRef.current(Math.max(min, Math.min(max, min + Math.round(left / 88))));
            }, 150);
          }}>
          {years.map(item => <motion.button key={item} tabIndex={-1} aria-pressed={item === year} onClick={() => onChange(item)}
            animate={{ opacity: item === year ? 1 : .38, scale: item === year ? 1 : .8 }} transition={{ duration: reduced ? 0 : .25 }}
            className={`w-[88px] shrink-0 snap-center min-h-12 font-mono text-2xl sm:text-3xl font-bold ${item === year ? 'text-amber-600 dark:text-amber-400' : ''}`}>{item}</motion.button>)}
        </div>
        <div className="mx-auto w-20 h-px bg-amber-500/20 overflow-hidden">
          <motion.div key={year} className="h-full bg-amber-500 origin-left" initial={{ scaleX: reduced ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: .4 }} />
        </div>
      </div>
      <button aria-label="Next year" disabled={year >= max} onClick={() => onChange(year + 1)} className="year-arrow"><ChevronRight size={19} /></button>
    </div>
    <p id="year-help" className="mt-3 text-center text-[10px] font-mono tracking-wide text-stone-500 dark:text-stone-400">Swipe, use arrows, or focus to scroll through years</p>
    <span className="sr-only" role="status">Selected year: {year}</span>
  </div>;
}
