import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';

/** Native modal semantics provide focus trapping, inert background and Escape handling. */
export function OverlayDialog({ children, onClose, titleId, panelClassName, drawer = false }: {
  children: ReactNode;
  onClose: () => void;
  titleId: string;
  panelClassName: string;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const dialog = ref.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`;
    dialog.showModal();
    (dialog.querySelector('[data-autofocus]') as HTMLElement | null)?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;
      window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog ref={ref} aria-labelledby={titleId} onCancel={e => { e.preventDefault(); onClose(); }}
      className={`portfolio-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 open:flex ${drawer ? 'justify-end' : 'items-center justify-center p-3 sm:p-6'}`}>
      <motion.div aria-hidden="true" className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .22 }} />
      <motion.div className={`relative ${panelClassName}`}
        initial={reduced ? { opacity: 0 } : drawer ? { opacity: 0, x: 36 } : { opacity: 0, scale: .97, y: 12 }}
        animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : drawer ? { opacity: 0, x: 36 } : { opacity: 0, scale: .97, y: 12 }}
        transition={{ duration: reduced ? 0 : .28, ease: [.22, 1, .36, 1] }}>
        {children}
      </motion.div>
    </dialog>, document.body,
  );
}
