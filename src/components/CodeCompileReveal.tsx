import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface CodeCompileRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function CodeCompileReveal({
  children,
  delay = 0,
  className = '',
}: CodeCompileRevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`relative group/compile ${className}`}
    >
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
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : 0.12,
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
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 20, filter: 'none' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'none',
          transition: { duration: reduced ? 0 : 0.45, ease: 'easeOut' },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
