import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { ThemeMode } from '../types';
import './HeroPortraitEffects.css';

// Deliberately sparse constellations around the portrait, rather than across its face.
const nodes = [[24, 100], [95, 54], [190, 88], [244, 164], [140, 210], [48, 272], [110, 356], [220, 398], [258, 290],
  [658, 90], [762, 48], [865, 112], [810, 202], [680, 230], [866, 300], [772, 394], [660, 358]];
const connections = [[0, 1], [1, 2], [2, 3], [0, 4], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [4, 8],
  [9, 10], [10, 11], [11, 12], [9, 13], [12, 13], [12, 14], [14, 15], [15, 16], [13, 16]];
const routes = ['M24 100 L95 54 L190 88 L244 164', 'M48 272 L110 356 L220 398', 'M658 90 L762 48 L865 112 L810 202', 'M866 300 L772 394 L660 358'];

export function PortraitNetwork({ theme }: { theme: ThemeMode }) {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const reduced = useReducedMotion();
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const update = () => setForeground(document.visibilityState === 'visible');
    update(); document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return <div ref={root} aria-hidden="true" className="portrait-network" data-theme={theme} data-running={visible && foreground && !reduced}>
    <svg className="portrait-network-desktop" viewBox="0 0 900 460" preserveAspectRatio="none" focusable="false">
      <g className="portrait-network-lines">
        {connections.map(([from, to]) => <line key={`${from}-${to}`} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} vectorEffect="non-scaling-stroke" />)}
      </g>
      {nodes.map(([cx, cy], i) => <g key={i} className={i % 4 === 0 ? 'portrait-network-node portrait-network-accent' : 'portrait-network-node'}>
        {i % 3 === 0 && <circle cx={cx} cy={cy} r="8" className="portrait-network-ring" />}
        <circle cx={cx} cy={cy} r={i % 3 === 0 ? 3 : 2} />
      </g>)}
      {routes.map((d, i) => <path key={d} d={d} pathLength="100" className="portrait-network-pulse" style={{ animationDelay: `${i * -2.8}s` }} vectorEffect="non-scaling-stroke" />)}
    </svg>
    {/* Mobile keeps just six nodes and four connections, without traveling pulses. */}
    <svg className="portrait-network-mobile" viewBox="0 0 320 320" preserveAspectRatio="none" focusable="false">
      <path className="portrait-network-lines" d="M9 44 L28 126 L7 254 M311 72 L292 188 L312 282" vectorEffect="non-scaling-stroke" />
      {[[9, 44], [28, 126], [7, 254], [311, 72], [292, 188], [312, 282]].map(([cx, cy], i) => <g key={i} className={`portrait-network-node ${i % 2 ? 'portrait-network-accent' : ''}`}>
        <circle className="portrait-network-ring" cx={cx} cy={cy} r="6" /><circle cx={cx} cy={cy} r="2.5" />
      </g>)}
    </svg>
  </div>;
}

/** All pointer transforms live outside the original portrait's entrance animation. */
export function PortraitTilt({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lift = useMotionValue(0);
  const spring = { stiffness: 125, damping: 24, mass: .8 };
  const rotateX = useSpring(x, spring);
  const rotateY = useSpring(y, spring);
  const translateY = useSpring(lift, spring);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!enabled || !visible) {
      x.set(0); y.set(0); lift.set(0);
      rotateX.jump(0); rotateY.jump(0); translateY.jump(0);
    }
  }, [enabled, visible, x, y, lift, rotateX, rotateY, translateY]);
  const reset = () => { x.set(0); y.set(0); lift.set(0); };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled || event.pointerType !== 'mouse' || !root.current) return;
    const bounds = root.current.getBoundingClientRect();
    const px = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
    const py = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
    x.set(-py * 5); y.set(px * 7); lift.set(-3);
  };
  return <div ref={root} className="portrait-depth-stage" data-tilt-enabled={enabled} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <motion.div className="portrait-tilt-layer" style={{ rotateX, rotateY, y: translateY }}>
      {children}
    </motion.div>
  </div>;
}
