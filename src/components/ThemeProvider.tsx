import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from '@/components/themeContext';
import type { Theme } from '@/components/themeContext';

const STORAGE_KEY = 'sdn-theme';
const USER_THEME_KEY = 'sdn-theme-user-choice-v2';

function initialTheme(): Theme {
  try {
    const explicit = localStorage.getItem(USER_THEME_KEY);
    if (explicit === 'light' || explicit === 'dark') return explicit;
  } catch {
    /* ignore */
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0c0b19' : '#FBF6EA');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(USER_THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
