import { TICKER_ITEMS } from '../data/portfolioData';
import { ThemeMode } from '../types';

interface TickerMarqueeProps {
  theme: ThemeMode;
}

export function TickerMarquee({ theme }: TickerMarqueeProps) {
  return (
    <section
      aria-label="Skills Marquee"
      className={`relative border-y py-4 overflow-hidden z-30 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#0E1318] border-stone-800 text-stone-300'
          : 'bg-stone-900 border-stone-800 text-stone-200'
      }`}
    >
      <div className="animate-ticker flex items-center text-xs sm:text-sm font-bold uppercase tracking-widest select-none">
        {/* Strip 1 */}
        <div className="flex items-center space-x-8 shrink-0 px-4">
          {TICKER_ITEMS.map((item, index) => (
            <span key={`ticker-1-${index}`} className="flex items-center space-x-8">
              <span className="hover:text-amber-400 transition-colors cursor-default whitespace-nowrap">
                {item}
              </span>
              <span className="text-amber-500 text-xs">●</span>
            </span>
          ))}
        </div>

        {/* Strip 2 (Duplicates for continuous loop) */}
        <div className="flex items-center space-x-8 shrink-0 px-4">
          {TICKER_ITEMS.map((item, index) => (
            <span key={`ticker-2-${index}`} className="flex items-center space-x-8">
              <span className="hover:text-amber-400 transition-colors cursor-default whitespace-nowrap">
                {item}
              </span>
              <span className="text-amber-500 text-xs">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
