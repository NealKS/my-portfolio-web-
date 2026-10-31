import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { NAV_ITEMS } from '../data/navigation';
import { ScreenView } from '../types';
import { useActiveSection } from './useActiveSection';

const sectionFromHash = (): ScreenView => {
  const hash = window.location.hash.slice(1);
  return NAV_ITEMS.find(item => item.screen === hash)?.screen ?? 'hero';
};
const modeFromUrl = () => new URLSearchParams(location.search).get('view') === 'screens';

/** Shared navigation state for links, scroll tracking, screen controls and browser history. */
export function usePortfolioNavigation() {
  const reduced = useReducedMotion();
  const [activeScreen, setActiveScreen] = useState<ScreenView>(() => modeFromUrl() ? sectionFromHash() : 'all');
  const activeSection = useActiveSection(activeScreen);
  const [request, setRequest] = useState<{ target: ScreenView; smooth: boolean }>(() => ({ target: sectionFromHash(), smooth: false }));
  const pending = useRef<ScreenView | null>(sectionFromHash());

  const writeUrl = useCallback((target: ScreenView, screens: boolean, push: boolean) => {
    const url = new URL(location.href);
    url.hash = target;
    if (screens) url.searchParams.set('view', 'screens');
    else url.searchParams.delete('view');
    if (url.href !== location.href) {
      if (push) history.pushState(history.state, '', url);
      else history.replaceState(history.state, '', url);
    }
  }, []);

  const navigate = useCallback((target: ScreenView) => {
    if (!NAV_ITEMS.some(item => item.screen === target)) return;
    pending.current = target;
    writeUrl(target, activeScreen !== 'all', true);
    if (activeScreen !== 'all') setActiveScreen(target);
    setRequest({ target, smooth: !reduced });
  }, [activeScreen, reduced, writeUrl]);

  const selectScreen = useCallback((screen: ScreenView) => {
    const target = screen === 'all' ? activeSection : screen;
    pending.current = target;
    writeUrl(target, screen !== 'all', true);
    setActiveScreen(screen);
    setRequest({ target, smooth: false });
  }, [activeSection, writeUrl]);

  useLayoutEffect(() => {
    if (activeScreen === 'all') {
      if (request.target === 'hero') window.scrollTo({ top: 0, behavior: request.smooth ? 'smooth' : 'instant' });
      else document.getElementById(request.target)?.scrollIntoView({ behavior: request.smooth ? 'smooth' : 'instant' });
    } else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [request, activeScreen]);

  useEffect(() => {
    const restoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const restore = () => {
      const target = sectionFromHash();
      pending.current = target;
      setActiveScreen(modeFromUrl() ? target : 'all');
      setRequest({ target, smooth: false });
    };
    // Intentional user scrolling can interrupt a smooth navigation without leaving a stale hash.
    const interrupt = () => { if (!document.querySelector('dialog[open]')) pending.current = null; };
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    return () => {
      history.scrollRestoration = restoration;
      window.removeEventListener('popstate', restore);
      window.removeEventListener('hashchange', restore);
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('touchstart', interrupt);
    };
  }, []);

  useEffect(() => {
    if (pending.current && pending.current !== activeSection) return;
    pending.current = null;
    const timer = setTimeout(() => {
      if (!document.querySelector('dialog[open]')) writeUrl(activeSection, activeScreen !== 'all', false);
    }, 180);
    return () => clearTimeout(timer);
  }, [activeSection, activeScreen, writeUrl, request]);

  return { activeScreen, activeSection, navigate, selectScreen };
}
