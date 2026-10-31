import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useInView } from 'motion/react';
import { ThemeMode } from '../types';

interface MatrixRainCanvasProps {
  theme: ThemeMode;
}

export function MatrixRainCanvas({ theme }: MatrixRainCanvasProps) {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const visible = useInView(canvasRef);
  const [foreground, setForeground] = useState(!document.hidden);
  useEffect(() => {
    const sync = () => setForeground(!document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  useEffect(() => {
    if (reduced || !visible || !foreground) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 700;
    };

    window.addEventListener('resize', handleResize);

    // Characters for futuristic code texture: binary, operators, hex, and technical symbols
    const chars = '010101<>{}/*=;+-_#λπ::0xNK4F';
    const fontSize = 13;
    const columns = Math.floor(width / 24); // Generous column spacing to keep it faint and clean
    const drops: number[] = [];

    // Initialize drop positions with random heights for an organic distribution
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    let lastDrawTime = 0;
    const fps = 24; // Subtle 24fps render cadence for low CPU usage & gentle texture
    const interval = 1000 / fps;

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const delta = currentTime - lastDrawTime;
      if (delta < interval) return;
      lastDrawTime = currentTime - (delta % interval);

      // Semi-transparent clearing to produce soft fading trails
      ctx.clearRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 24 + 10;
        const y = drops[i] * fontSize;

        // Faint teal (#4FD1C5) accent with low opacity (0.07 to 0.12)
        // High readability without any contrast conflict
        if (theme === 'dark') {
          // Leading glyph slightly brighter teal
          ctx.fillStyle = 'rgba(79, 209, 197, 0.14)';
          ctx.fillText(char, x, y);

          // Second glyph tail
          if (drops[i] > 1) {
            const tailChar = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = 'rgba(79, 209, 197, 0.06)';
            ctx.fillText(tailChar, x, y - fontSize);
          }
        } else {
          // Off-white light mode: subtle slate-teal texture
          ctx.fillStyle = 'rgba(45, 149, 150, 0.08)';
          ctx.fillText(char, x, y);
        }

        // Reset drop to top with randomized delay once it leaves screen
        if (y > height && Math.random() > 0.982) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, reduced, visible, foreground]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
