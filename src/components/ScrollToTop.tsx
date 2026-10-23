import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroller } from '@/components/useSmoothScroller';

/** Restore scroll on navigation — but honour in-page anchors. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const scrollTo = useSmoothScroller();

  useEffect(() => {
    if (hash) {
      scrollTo(hash.slice(1));
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash, scrollTo]);

  return null;
}
