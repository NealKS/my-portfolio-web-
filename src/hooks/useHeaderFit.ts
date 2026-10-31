import { useLayoutEffect, useRef, useState } from 'react';

/** Measure the actual labels, fonts and controls instead of assuming a device breakpoint. */
export function useHeaderFit() {
  const row = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const modes = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ full: false, required: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      if (!row.current || !brand.current || !navigation.current || !modes.current || !actions.current) return;
      const style = getComputedStyle(row.current);
      const available = row.current.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      // Measure the fluid CSS spacing too, so compact desktop sizing is used before the drawer.
      const required = Math.ceil(brand.current.getBoundingClientRect().width + navigation.current.scrollWidth + modes.current.getBoundingClientRect().width + actions.current.getBoundingClientRect().width + 3 * parseFloat(style.columnGap));
      setFit(previous => previous.full === (available >= required) && previous.required === required ? previous : { full: available >= required, required });
    };
    const observer = new ResizeObserver(measure);
    [row, brand, navigation, modes, actions].forEach(ref => { if (ref.current) observer.observe(ref.current); });
    let alive = true;
    document.fonts.ready.then(() => { if (alive) measure(); });
    document.fonts.addEventListener('loadingdone', measure);
    measure();
    return () => { alive = false; observer.disconnect(); document.fonts.removeEventListener('loadingdone', measure); };
  }, []);
  return { ...fit, row, brand, navigation, modes, actions };
}
