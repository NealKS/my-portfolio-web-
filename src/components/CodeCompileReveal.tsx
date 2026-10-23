import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CodeCompileRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  prefix?: string;
  tag?: string;
}

export function CodeCompileReveal({
  children,
  delay = 0,
  className = '',
  prefix,
  tag,
}: CodeCompileRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`relative group/compile ${className}`}
    >
      {/* Optional terminal line prefix cue e.g. [0x01] or > */}
      {(prefix || tag) && (
        <div className="flex items-center gap-2 mb-1 select-none font-mono text-[10px] tracking-wider text-teal-500/70 dark:text-teal-400/60 uppercase">
          {tag && (
            <span className="px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 font-semibold">
              {tag}
            </span>
          )}
          {prefix && <span className="opacity-75">{prefix}</span>}
        </div>
      )}

      {children}
    </motion.div>
  );
}

interface StaggerCompileContainerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerCompileContainer({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  key?: React.Key;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerCompileItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  key?: React.Key;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.45, ease: 'easeOut' },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
