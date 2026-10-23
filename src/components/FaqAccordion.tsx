import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

const ITEMS = ['checkin', 'id', 'lift', 'security', 'parking', 'groups'] as const;

export function FaqAccordion() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>('checkin');

  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="text-center">
        <p className="eyebrow text-accent">{t('faq.eyebrow')}</p>
        <h2 id="faq-title" className="display mt-4 text-[clamp(2.2rem,4.6vw,3.4rem)]">
          {t('faq.title')} <em>{t('faq.titleEm')}</em>
        </h2>
      </div>

      <div className="mt-12 border-t border-line">
        {ITEMS.map((id, index) => {
          const isOpen = open === id;
          const panelId = `faq-panel-${id}`;
          const buttonId = `faq-button-${id}`;

          return (
            <div key={id} className="border-b border-line">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : id)}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-start gap-4">
                    <span className="mt-1 font-mono text-[0.68rem] text-accent/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'font-display text-xl tracking-tight transition-colors sm:text-2xl',
                        isOpen ? 'text-accent' : 'text-ink group-hover:text-accent',
                      )}
                    >
                      {t(`faq.items.${id}.q`)}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors',
                      isOpen
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-line text-muted group-hover:border-accent',
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 pl-9 pr-12 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                      {t(`faq.items.${id}.a`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
