import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Calendar,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { ChapterEvent, ThemeMode } from '../../types';

interface ChapterModalProps {
  event: ChapterEvent | null;
  theme: ThemeMode;
  onClose: () => void;
}

export function ChapterModal({ event, theme, onClose }: ChapterModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset image index when event changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsFullscreen(false);
  }, [event]);

  // Lock background body scroll when open
  useEffect(() => {
    if (!event) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [event]);

  const imagesList = event?.images && event.images.length > 0
    ? event.images
    : event?.coverImage
    ? [event.coverImage]
    : [];

  const handleNextImage = useCallback(() => {
    if (imagesList.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
  }, [imagesList.length]);

  const handlePrevImage = useCallback(() => {
    if (imagesList.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  }, [imagesList.length]);

  // Keyboard navigation: Escape to close, Left/Right for gallery
  useEffect(() => {
    if (!event) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event, isFullscreen, handleNextImage, handlePrevImage, onClose]);

  if (!event) return null;

  const isAchievement = event.category === 'achievement';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8">
        {/* Backdrop Dimming with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col z-10 border shadow-2xl ${
            theme === 'dark'
              ? 'bg-[#0E1318] border-stone-800 text-stone-100 shadow-black/80'
              : 'bg-white border-stone-200 text-stone-900 shadow-stone-400/40'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chapter-modal-title"
        >
          {/* ================= TOP AREA ================= */}
          <div
            className={`px-5 sm:px-7 py-4.5 border-b flex items-center justify-between shrink-0 gap-4 ${
              theme === 'dark'
                ? 'bg-stone-950/60 border-stone-800'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {/* Category Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                    isAchievement
                      ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                      : 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                  }`}
                >
                  {isAchievement ? (
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  )}
                  <span>{event.badge}</span>
                </span>

                {/* Optional Rank Badge */}
                {event.achievementRank && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500 text-stone-950 shadow-sm">
                    <span>{event.achievementRank}</span>
                  </span>
                )}

                {/* Date / Year */}
                <span className="text-xs text-stone-400 dark:text-stone-400 flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>{event.displayDate || `${event.year}`}</span>
                </span>
              </div>

              {/* Event Title */}
              <h3
                id="chapter-modal-title"
                className="text-lg sm:text-2xl font-black tracking-tight truncate leading-tight"
              >
                {event.title}
              </h3>

              {/* Issuer & Location */}
              {(event.issuer || event.location) && (
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {event.issuer && <span className="font-medium text-stone-600 dark:text-stone-300">{event.issuer}</span>}
                  {event.issuer && event.location && <span>•</span>}
                  {event.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{event.location}</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actions: Fullscreen & Close */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800'
                    : 'border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enlarge Certificate'}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enlarge Certificate'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800'
                    : 'border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
                title="Close modal (Esc)"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ================= MAIN IMAGE & GALLERY AREA ================= */}
          <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center bg-stone-950/40">
            <div className="relative w-full flex items-center justify-center">
              {/* Certificate / Event Image (Preserving Aspect Ratio, No cropping) */}
              <div
                className={`relative w-full max-h-[55vh] flex items-center justify-center rounded-2xl overflow-hidden border shadow-lg ${
                  theme === 'dark'
                    ? 'bg-[#080B0F] border-stone-800/80'
                    : 'bg-stone-900 border-stone-800'
                } ${isFullscreen ? 'max-h-[75vh]' : 'max-h-[55vh]'}`}
              >
                <img
                  src={imagesList[currentImageIndex] || event.coverImage}
                  alt={`${event.title} Certificate / Milestone Document`}
                  className="max-h-[55vh] w-auto max-w-full object-contain filter contrast-[1.02]"
                  loading="eager"
                />

                {/* Watermark security indicator */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-400 inline-flex items-center gap-1.5 pointer-events-none">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified Credential</span>
                </div>

                {/* Multiple Images Counter */}
                {imagesList.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-stone-300">
                    {currentImageIndex + 1} / {imagesList.length}
                  </div>
                )}
              </div>

              {/* Previous Image Arrow */}
              {imagesList.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-4 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Image Arrow */}
              {imagesList.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Thumbnail Strip (if multiple images) */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 max-w-full">
                {imagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      currentImageIndex === idx
                        ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Essential Highlights (if present) */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="w-full mt-4 pt-3 border-t border-stone-800/80">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-500 font-bold mb-1.5">
                  // Milestone Highlights
                </div>
                <ul className="space-y-1.5 text-xs text-stone-300 dark:text-stone-300">
                  {event.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ================= BOTTOM AREA ================= */}
          <div
            className={`px-5 sm:px-7 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
              theme === 'dark'
                ? 'bg-stone-950/80 border-stone-800'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            {/* Verification ID / Credential Code */}
            <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              Credential Ref: <span className="text-amber-500 font-semibold">{event.id}</span> • Archived in Chapters
            </div>

            {/* Clean LinkedIn Action Button */}
            {event.linkedinUrl && (
              <motion.a
                href={event.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.94 }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>View LinkedIn Post</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
