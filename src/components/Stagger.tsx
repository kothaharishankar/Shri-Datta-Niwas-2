import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Staggered children — pair with `Reveal`-style items. */
export function Stagger({
  children,
  className,
  step = 0.07,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {children}
    </motion.div>
  );
}
