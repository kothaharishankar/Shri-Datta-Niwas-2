import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Languages } from 'lucide-react';
import { LANGUAGES } from '@/i18n';
import type { LanguageCode } from '@/i18n';
import { cn } from '@/lib/cn';

export function LanguageSwitcher({
  compact = false,
  align = 'right',
}: {
  compact?: boolean;
  align?: 'left' | 'right';
}) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t('nav.language')}
        className={cn(
          'inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-line-strong hover:bg-accent-soft/40',
          compact && 'px-2.5',
        )}
      >
        <Languages className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="font-medium">{t('nav.changeLanguage')}</span>
      </button>

      {open && (
        <ul
          aria-label={t('nav.language')}
          className={cn(
            'absolute top-[calc(100%+0.5rem)] z-50 w-44 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-lift',
            align === 'left' ? 'left-0' : 'right-0',
          )}
        >
          {LANGUAGES.map((language) => {
            const selected = language.code === i18n.language;
            return (
              <li key={language.code}>
                <button
                  type="button"
                  lang={language.code}
                  aria-pressed={selected}
                  onClick={() => {
                    void i18n.changeLanguage(language.code as LanguageCode);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent-soft',
                    selected ? 'text-ink' : 'text-muted',
                  )}
                >
                  <span>{language.label}</span>
                  {selected && <Check className="h-4 w-4 text-accent" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
