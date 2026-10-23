import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 1.2, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<string>('0');

  useEffect(() => {
    if (!isInView) return;

    const valStr = String(value).trim();
    // Match prefix, numeric portion (including decimals), suffix
    const match = valStr.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (!match) {
      setDisplayValue(valStr);
      return;
    }

    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isFloat = match[2].includes('.');
    const decimalPlaces = isFloat ? match[2].split('.')[1].length : 0;

    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easeProgress;

      const formattedNum = isFloat
        ? currentNum.toFixed(decimalPlaces)
        : Math.floor(currentNum).toString();

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(valStr);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
