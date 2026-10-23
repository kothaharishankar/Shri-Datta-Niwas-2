import { useCallback, useContext } from 'react';
import { LenisContext } from '@/components/smoothScrollContext';

export function useSmoothScroller() {
  const lenis = useContext(LenisContext);
  return useCallback(
    (target: number | string) => {
      if (lenis) {
        lenis.scrollTo(target, { offset: -88, duration: 1.2 });
        return;
      }
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (typeof target === 'string') {
        const el = document.getElementById(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
        }
        return;
      }
      window.scrollTo({ top: target, behavior: prefersReduced ? 'auto' : 'smooth' });
    },
    [lenis],
  );
}
