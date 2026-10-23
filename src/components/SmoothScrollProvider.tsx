import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '@/components/smoothScrollContext';

/** Smooth scrolling, politely: off for reduced-motion and touch devices. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const instanceRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || touch) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    instanceRef.current = instance;
    setLenis(instance);

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      instanceRef.current = null;
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
