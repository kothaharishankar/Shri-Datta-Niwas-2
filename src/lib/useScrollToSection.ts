import { useCallback } from 'react';

/** Stable scroll helper used by CTAs and in-page anchors. */
export function useScrollToSection() {
  return useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);
}
