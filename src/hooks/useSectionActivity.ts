import { useEffect, useRef } from 'react';

/** Keeps background polling out of hidden tabs and offscreen sections without re-rendering them. */
export function useSectionActivity(id: string) {
  const active = useRef(false);
  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;
    let inView = false;
    const update = () => { active.current = inView && !document.hidden; };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); active.current = false; };
  }, [id]);
  return active;
}
