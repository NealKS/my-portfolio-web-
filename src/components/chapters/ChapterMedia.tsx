import { useEffect, useRef, useState, useId } from 'react';
import { useInView } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { ChapterEvent } from '../../types';

function ChapterVideo({ event, viewer }: { event: ChapterEvent; viewer: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const visible = useInView(video, { amount: .2 });
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { setReduced(preference.matches); setRequested(null); };
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  const [requested, setRequested] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = video.current!;
    const sync = () => {
      if (visible && !document.hidden && (requested ?? !reduced)) {
        el.muted = true;
        void el.play().catch(() => setPlaying(false));
      } else el.pause();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => { document.removeEventListener('visibilitychange', sync); el.pause(); };
  }, [visible, reduced, requested]);
  return <div className={`chapter-video ${viewer ? 'chapter-video-viewer' : ''}`}>
    <video ref={video} src={event.videoUrl} poster={event.coverImage} muted playsInline loop preload="metadata" controls={false} controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback
      aria-label={event.imageAlt ?? event.title} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onContextMenu={e => e.preventDefault()} />
    {!viewer && <span aria-hidden="true" className="chapter-video-scan" />}
    {viewer && <button onClick={() => setRequested(!playing)} aria-label={playing ? 'Pause video' : 'Play video'} className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/85 text-white px-4 min-h-11 border border-white/30 focus-visible:outline-amber-400">
      {playing ? <Pause size={16} /> : <Play size={16} />}<span className="text-xs">{playing ? 'Pause' : 'Play'}</span>
    </button>}
  </div>;
}

function ChapterGraphic() {
  const id = useId().replace(/:/g, '');
  return <svg className="chapter-original-graphic" viewBox="0 0 640 400" role="img" aria-label="Impulse ’26 — Axiom. Original portfolio graphic, not an official certificate or event photograph.">
    <defs>
      <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#2dd4bf" strokeOpacity=".09" /></pattern>
    </defs>
    <rect width="640" height="400" fill="#0a1017" /><rect width="640" height="400" fill={`url(#${id})`} />
    <path d="M0 300H52V275H94M640 90H590V125H550M400 400V360H570" fill="none" stroke="#f59e0b" strokeOpacity=".35" />
    <text x="36" y="42" fill="#2dd4bf" fontSize="12" fontFamily="monospace" letterSpacing="2">CYBERSECURITY / BUILD LOG</text>
    <text x="36" y="108" fill="#f5f5f4" fontSize="46" fontWeight="800" fontFamily="sans-serif">IMPULSE ’26</text>
    <text x="36" y="151" fill="#f59e0b" fontSize="28" fontWeight="700" fontFamily="sans-serif">AXIOM</text>
    <text x="36" y="185" fill="#a8a29e" fontSize="15" fontFamily="sans-serif">SaaS access risk &amp; permission drift</text>
    <g transform="translate(470 216)" fill="none" stroke="#2dd4bf">
      <path d="M0-55 48-27 48 28 0 56-48 28-48-27Z" strokeOpacity=".65" />
      <path d="M0-85 74-43 74 43 0 86-74 43-74-43Z" strokeOpacity=".2" />
      <path d="M-48-27 0 0 48-27M0 0V56" strokeOpacity=".5" />
      <circle className="chapter-graphic-node" r="5" fill="#f59e0b" stroke="none" />
    </g>
    <g fontFamily="monospace" fontSize="12"><text x="36" y="246" fill="#a8a29e">01 / IDENTIFY ACCESS</text><text x="36" y="273" fill="#a8a29e">02 / EXPLAIN RISK</text><text x="36" y="300" fill="#a8a29e">03 / HUMAN REVIEW</text></g>
    <path d="M36 334H604" stroke="#f59e0b" strokeOpacity=".3" />
    <text x="36" y="367" fill="#a8a29e" fontSize="11" fontFamily="monospace">ORIGINAL PORTFOLIO GRAPHIC · NOT AN OFFICIAL CERTIFICATE</text>
  </svg>;
}

export function ChapterMedia({ event, viewer = false, preview = false }: { event: ChapterEvent; viewer?: boolean; preview?: boolean }) {
  if (event.mediaType === 'video') return <ChapterVideo event={event} viewer={viewer} />;
  if (event.mediaType === 'graphic') return <ChapterGraphic />;
  return <img style={preview && event.previewPosition ? { objectPosition: event.previewPosition } : undefined} src={event.coverImage} alt={event.imageAlt ?? event.title} loading={preview ? 'lazy' : 'eager'} className={preview ? 'w-full h-full object-contain' : 'block w-auto h-auto max-w-full object-contain rounded-xl bg-stone-950 mx-auto'} />;
}
