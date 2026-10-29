import { motion } from 'motion/react';
import {
  Award,
  Sparkles,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import React from 'react';
import { ChapterEvent, ThemeMode } from '../../types';

interface ChapterCardProps {
  key?: React.Key;
  event: ChapterEvent;
  theme: ThemeMode;
  onOpen: (event: ChapterEvent) => void;
  index: number;
}

export function ChapterCard({ event, theme, onOpen, index }: ChapterCardProps) {
  const isAchievement = event.category === 'achievement';

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={() => onOpen(event)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(event);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View certificate for ${event.title}`}
      className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col focus:outline-none focus:ring-2 focus:ring-amber-500 ${
        isAchievement
          ? theme === 'dark'
            ? 'bg-stone-900/90 border-stone-800 hover:border-amber-500/70 shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-amber-500/10'
            : 'bg-white border-stone-200/90 hover:border-amber-500/70 shadow-md hover:shadow-xl hover:shadow-amber-500/15'
          : theme === 'dark'
          ? 'bg-stone-900/60 border-stone-800/80 hover:border-teal-500/50 shadow-md shadow-black/30 hover:shadow-xl'
          : 'bg-white border-stone-200/80 hover:border-teal-500/50 shadow-sm hover:shadow-lg'
      }`}
    >
      {/* Visual Accent Top Bar for Achievements */}
      {isAchievement && (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 z-10"></div>
      )}

      {/* Prominent Certificate / Event Image Preview Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950 flex items-center justify-center">
        <img
          src={event.coverImage}
          alt={`${event.title} Preview`}
          loading="lazy"
          className="w-full h-full object-contain filter contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
        />

        {/* Inner Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

        {/* Floating Category Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
              isAchievement
                ? 'bg-black/75 text-amber-400 border border-amber-500/40'
                : 'bg-black/75 text-teal-300 border border-teal-500/40'
            }`}
          >
            {isAchievement ? (
              <Award className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            )}
            <span>{event.badge}</span>
          </span>

          {event.achievementRank && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-black bg-amber-500 text-stone-950 shadow-md">
              {event.achievementRank}
            </span>
          )}
        </div>

        {/* Hover Inspect Indicator */}
        <div className="absolute bottom-3 right-3 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
          <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-400 transition-colors">
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Verified Credential Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Archived</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Date & Location */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono mb-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>{event.displayDate || `${event.year}`}</span>
            </span>
            {event.location && (
              <span className="truncate max-w-[150px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{event.location}</span>
              </span>
            )}
          </div>

          {/* Event Title */}
          <h4
            className={`text-lg sm:text-xl font-bold tracking-tight line-clamp-2 transition-colors ${
              theme === 'dark'
                ? 'text-white group-hover:text-amber-400'
                : 'text-stone-900 group-hover:text-amber-600'
            }`}
          >
            {event.title}
          </h4>

          {/* Issuer */}
          {event.issuer && (
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium line-clamp-1">
              Issued by {event.issuer}
            </p>
          )}

          {/* Skill Pills (if present) */}
          {event.skills && event.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-stone-200/60 dark:border-stone-800/60">
              {event.skills.slice(0, 3).map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                >
                  {skill}
                </span>
              ))}
              {event.skills.length > 3 && (
                <span className="text-[11px] font-mono text-stone-400 px-1 py-0.5">
                  +{event.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Click prompt bar */}
        <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-between text-xs font-semibold">
          <span className="text-stone-500 dark:text-stone-400 group-hover:text-amber-500 transition-colors">
            Click to view credential details
          </span>
          <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </motion.article>
  );
}
