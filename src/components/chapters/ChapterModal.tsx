import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { X, Linkedin, ArrowUpRight } from 'lucide-react';
import { ChapterEvent, ThemeMode } from '../../types';
import { OverlayDialog } from '../OverlayDialog';
import { chapterMetadata, linkedinPostUrl } from '../../data/chaptersData';
import { ChapterMedia } from './ChapterMedia';
import { ChapterPhotoLightbox } from './ChapterPhotoLightbox';

function ChapterDetail({ event, theme, onClose }: { event: ChapterEvent; theme: ThemeMode; onClose: () => void }) {
  const [photoOpen, setPhotoOpen] = useState(false);
  const link = linkedinPostUrl(event.linkedinUrl);
  return <>
    <OverlayDialog titleId="chapter-modal-title" onClose={onClose}
      panelClassName={`w-full max-w-4xl max-h-[92dvh] overflow-y-auto overscroll-contain rounded-3xl border shadow-2xl ${theme === 'dark' ? 'bg-[#0E1318] border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'}`}>
      <div className={`sticky top-0 z-10 flex items-start gap-3 p-4 sm:p-6 border-b ${theme === 'dark' ? 'bg-[#0E1318] border-stone-800' : 'bg-white border-stone-200'}`}>
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] font-mono uppercase tracking-wider mb-2 ${event.category === 'achievement' ? 'text-amber-700 dark:text-amber-400' : 'text-teal-700 dark:text-teal-400'}`}>{event.category === 'achievement' ? 'Achievements & Recognition' : 'Experiences & Participation'}</p>
          <h3 id="chapter-modal-title" className="text-lg sm:text-2xl font-extrabold leading-tight">{event.detailTitle ?? event.title}</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">{chapterMetadata(event)}</p>
        </div>
        <button data-autofocus onClick={onClose} aria-label="Close details" className="year-arrow"><X size={20} /></button>
      </div>
      <div className="chapter-media-detail p-3 sm:p-6" data-theme={theme}>
        <button onClick={() => setPhotoOpen(true)} aria-label={`Expand ${event.mediaType === 'video' ? 'video' : event.mediaType === 'graphic' ? 'graphic' : 'photograph'}: ${event.title}`} className="block mx-auto max-w-full rounded-xl cursor-zoom-in focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-4">
          <div className="chapter-detail-media"><ChapterMedia event={event} /></div>
        </button>
        <div className="mt-5 space-y-4">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 text-sm">
            {Object.entries({ Event: event.eventName, Category: event.badge, Recognition: event.recognition, Team: event.team, Project: event.project, Duration: event.duration, Technologies: event.technologies?.join(' · '), 'Local test result': event.localTestResult, 'Organizers & mentors': event.organizer }).filter(([, value]) => value).map(([label, value]) => <div key={label}><dt className="text-[10px] font-mono uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}
          </dl>
          {(event.detailParagraphs ?? [event.description]).map(paragraph => <p key={paragraph} className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">{paragraph}</p>)}
          {!!event.teamMembers?.length && <p className="text-sm leading-relaxed"><span className="font-semibold">Team acknowledgments:</span> {event.teamMembers.join(', ')}.</p>}
        </div>
        {link && <a href={link} target="_blank" rel="noopener noreferrer" className="chapter-card-linkedin mt-4 inline-flex min-h-11 items-center gap-2 px-5 rounded-xl text-xs font-bold"><Linkedin size={15} className="chapter-linkedin-icon" />View on LinkedIn<ArrowUpRight size={14} className="chapter-external-arrow" /></a>}
      </div>
    </OverlayDialog>
    <ChapterPhotoLightbox event={photoOpen ? event : null} onClose={() => setPhotoOpen(false)} />
  </>;
}

export function ChapterModal({ event, theme, onClose }: { event: ChapterEvent | null; theme: ThemeMode; onClose: () => void }) {
  return <AnimatePresence>{event && <ChapterDetail key={event.id} event={event} theme={theme} onClose={onClose} />}</AnimatePresence>;
}
