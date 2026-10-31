import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'motion/react';
import { ArrowUpRight, Maximize2, Linkedin } from 'lucide-react';
import { ChapterEvent, ThemeMode } from '../../types';
import { chapterMetadata, linkedinPostUrl } from '../../data/chaptersData';
import './ChapterCard.css';
import { ChapterMedia } from './ChapterMedia';

export function ChapterCard({ event, theme, onOpen, onViewPhoto, index }: { event: ChapterEvent; theme: ThemeMode; onOpen: (event: ChapterEvent) => void; onViewPhoto: (event: ChapterEvent) => void; index: number }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const visible = useInView(root);
  const photo = event.mediaType !== 'certificate';
  const mediaLabel = event.mediaType === 'video' ? 'video' : event.mediaType === 'graphic' ? 'graphic' : 'photo';
  const link = linkedinPostUrl(event.linkedinUrl);
  return <motion.article ref={root} data-running={visible} data-theme={theme} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }}
    whileInView={{ opacity: 1, y: 0, transition: { duration: reduced ? 0 : .5, delay: reduced ? 0 : Math.min(index, 5) * .09 } }} viewport={{ once: true, amount: .15 }}
    transition={{ duration: reduced ? 0 : .22, ease: 'easeOut' }} whileHover={reduced ? undefined : { y: -5 }}
    className={`chapter-card ${photo ? `chapter-card-photo ${event.category === 'achievement' ? 'chapter-card-featured' : `chapter-card-presentation ${['build-for-bengaluru-2026', 'fhe-development-2026'].includes(event.id) ? 'chapter-card-badge' : ''}`}` : ''} group rounded-3xl overflow-hidden border flex flex-col ${theme === 'dark' ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'}`}>
    <button onClick={() => photo ? onViewPhoto(event) : onOpen(event)} aria-label={`View ${photo ? mediaLabel : 'certificate'}: ${event.title}`} className="chapter-card-preview relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
      <ChapterMedia event={event} preview />
      <span aria-hidden="true" className="chapter-card-sweep" />
      <span className="absolute bottom-3 right-3 flex gap-2 items-center rounded-lg px-2.5 py-2 bg-black/80 text-white text-[11px] opacity-80 group-hover:opacity-100"><Maximize2 size={13} />{photo ? `View ${mediaLabel}` : 'View certificate'}</span>
    </button>
    <div className="p-5 flex flex-col flex-1">
      {event.mediaType === 'graphic' && <p className="text-[11px] text-teal-700 dark:text-teal-400 mb-2">Original portfolio graphic · not an event photograph</p>}
      <h4 className="text-lg font-bold leading-snug tracking-tight">{event.title}</h4>
      {photo && (event.team || event.project) && <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-3 text-amber-700 dark:text-amber-400 font-semibold">{event.team && <span>Team {event.team}</span>}{event.project && <span>Project {event.project}</span>}</div>}
      <p className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-2">{chapterMetadata(event) || event.year}</p>
      <p className={`text-sm text-stone-500 dark:text-stone-400 mt-3 mb-5 ${photo ? 'leading-relaxed' : 'line-clamp-2'}`}>{event.description}</p>
      <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-stone-500/20">
        <button onClick={() => onOpen(event)} className="chapter-card-certificate min-h-11 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-bold hover:bg-amber-500/15">{photo ? 'View Details' : 'View Certificate'}</button>
        {link ? <a href={link} target="_blank" rel="noopener noreferrer" className="chapter-card-linkedin min-h-11 px-3 rounded-xl text-xs font-bold flex items-center gap-1">
          <Linkedin size={15} className="chapter-linkedin-icon" /><span>View on LinkedIn</span><ArrowUpRight size={14} className="chapter-external-arrow" />
        </a> : <button type="button" disabled title="The LinkedIn post URL for this record has not been added yet." className="chapter-card-linkedin chapter-linkedin-pending min-h-11 px-3 rounded-xl text-xs font-bold flex items-center gap-1">
          <Linkedin size={15} className="chapter-linkedin-icon" /><span>LinkedIn Post Pending</span>
        </button>}
      </div>
    </div>
  </motion.article>;
}
