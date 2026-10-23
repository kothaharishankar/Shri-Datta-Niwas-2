import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '@/content/site';

interface LightboxProps {
  items: readonly GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isOpen = index !== null;
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowRight' && index !== null) {
        onNavigate((index + 1) % items.length);
      }
      if (event.key === 'ArrowLeft' && index !== null) {
        onNavigate((index - 1 + items.length) % items.length);
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, index, items.length, onNavigate, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b0a16]/94 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={t('gallery.lightbox')}
          ref={dialogRef}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => index !== null && onNavigate((index - 1 + items.length) % items.length)}
            aria-label={t('gallery.prev')}
            className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="max-h-full w-full max-w-5xl">
            <motion.img
              key={item.id}
              src={item.src}
              alt={t(`gallery.items.${item.captionKey}`)}
              width={item.width}
              height={item.height}
              className="mx-auto max-h-[76vh] w-auto rounded-2xl object-contain shadow-lift"
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="mx-auto mt-5 flex max-w-3xl items-start justify-between gap-6 text-white/85">
              <p className="text-sm leading-relaxed">
                {t(`gallery.items.${item.captionKey}`)}
              </p>
              <p className="shrink-0 font-mono text-xs text-white/55">
                {t('gallery.counter', {
                  index: String((index ?? 0) + 1).padStart(2, '0'),
                  total: String(items.length).padStart(2, '0'),
                })}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => index !== null && onNavigate((index + 1) % items.length)}
            aria-label={t('gallery.next')}
            className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
