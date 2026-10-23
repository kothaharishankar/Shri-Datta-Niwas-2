import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Render as a section-level wrapper without changing semantics. */
  as?: 'div' | 'li' | 'section';
}

/** Quiet entrance: opacity + a short lift. Skipped when motion is reduced. */
export function Reveal({ children, delay = 0, y = 22, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const tags = { div: motion.div, li: motion.li, section: motion.section };
  const Tag = tags[as];

  if (reduce) {
    return as === 'li' ? (
      <li className={className}>{children}</li>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
