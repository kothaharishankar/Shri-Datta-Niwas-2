import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('nav.theme')}
      aria-pressed={isDark}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-accent-soft/40"
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
