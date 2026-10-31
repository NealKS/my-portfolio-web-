import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../data/navigation';
import type { ScreenView } from '../types';

export function useActiveSection(screen: ScreenView) {
  const [visible, setVisible] = useState<ScreenView>('hero');
  useEffect(() => {
    if (screen !== 'all') return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (document.querySelector('dialog[open]')) return;
      const threshold = Math.min(window.innerHeight * .3, 200);
      let current: ScreenView = 'hero';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.screen);
        if (el && el.getBoundingClientRect().top <= threshold) current = item.screen;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = 'contact';
      setVisible(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.querySelector('main')!);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [screen]);
  return screen === 'all' ? visible : screen;
}
