import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '@/lib/seo';

const SECTIONS = ['forms', 'analytics', 'maps', 'contact'] as const;

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const updated = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date('2026-10-01'));

  return (
    <>
      <Seo title={t('seo.privacy.title')} description={t('seo.privacy.description')} path="/privacy" />

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <p className="eyebrow text-accent">{t('footer.privacy')}</p>
        <h1 className="display mt-4 text-[clamp(2.6rem,5.6vw,4.2rem)]">{t('privacy.title')}</h1>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">
          {t('privacy.updated', { date: updated })}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-ink">{t('privacy.intro')}</p>

        <div className="mt-10 space-y-9">
          {SECTIONS.map((section, index) => (
            <section key={section} aria-labelledby={`privacy-${section}`}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-accent/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2
                  id={`privacy-${section}`}
                  className="font-display text-2xl tracking-tight text-ink"
                >
                  {t(`privacy.sections.${section}.title`)}
                </h2>
              </div>
              <p className="mt-3 pl-8 text-sm leading-relaxed text-muted">
                {t(`privacy.sections.${section}.body`)}
              </p>
            </section>
          ))}
        </div>

        <Link
          to="/"
          className="mt-14 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-ink transition-colors hover:border-accent hover:bg-accent-soft/40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t('privacy.back')}
        </Link>
      </article>
    </>
  );
}
