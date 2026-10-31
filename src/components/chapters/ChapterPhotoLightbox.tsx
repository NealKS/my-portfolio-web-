import { AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ChapterEvent } from '../../types';
import { ChapterMedia } from './ChapterMedia';
import { OverlayDialog } from '../OverlayDialog';

export function ChapterPhotoLightbox({ event, onClose }: { event: ChapterEvent | null; onClose: () => void }) {
  return <AnimatePresence>{event && <OverlayDialog titleId="chapter-photo-title" onClose={onClose} panelClassName="chapter-lightbox-media max-w-full max-h-full">
    <h2 id="chapter-photo-title" className="sr-only">{event.title} — {event.mediaType === 'video' ? 'video' : 'image'}</h2>
    <ChapterMedia event={event} viewer />
    <button data-autofocus onClick={onClose} aria-label={event.mediaType === 'video' ? 'Close fullscreen video' : 'Close fullscreen photo'} className="absolute -top-12 right-0 grid place-items-center w-11 h-11 rounded-full bg-black/80 text-white border border-white/30 hover:bg-black focus-visible:outline-2 focus-visible:outline-amber-400"><X size={22} /></button>
  </OverlayDialog>}</AnimatePresence>;
}
