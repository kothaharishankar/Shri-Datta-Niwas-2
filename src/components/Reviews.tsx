import { useTranslation } from 'react-i18next';
import { ExternalLink, Quote, Star } from 'lucide-react';
import { site } from '@/content/site';
import { Reveal } from '@/components/Reveal';

/**
 * Show submitted testimonials only when real ones are configured. Otherwise,
 * display the verified Google rating and link visitors to the original reviews.
 */
export function Reviews() {
  const { t } = useTranslation();
  const hasReviews = site.reviews.length > 0;
  const { rating, count } = site.googleReviewSummary;

  return (
    <section aria-labelledby="reviews-title" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow text-accent">{t('reviews.eyebrow')}</p>
        <h2 id="reviews-title" className="display mt-4 text-[clamp(2.2rem,4.6vw,3.6rem)]">
          {t('reviews.title')} <em>{t('reviews.titleEm')}</em>
        </h2>
      </div>

      {hasReviews ? (
        <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {site.reviews.map((review) => (
            <Reveal as="li" key={review.id} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-soft">
                <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm font-semibold text-ink">
                  <span>{review.name}</span>
                  {review.url ? (
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-accent"
                    >
                      {review.source}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <span>{review.source}</span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-soft sm:p-12">
            <div
              aria-hidden="true"
              className="lamp -right-16 -top-16 h-64 w-64 opacity-80"
            />
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink">
                  {t('reviews.ratingLabel')}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Star className="h-7 w-7 fill-current text-accent" aria-hidden="true" />
                  <p
                    className="font-display text-4xl tracking-tight text-ink"
                    aria-label={t('reviews.ratingAria', { rating })}
                  >
                    {rating.toFixed(1)} <span className="text-xl font-bold text-ink">/ 5</span>
                  </p>
                </div>
                <p className="mt-2 text-base font-semibold text-ink">
                  {t('reviews.ratingCount', { count })}
                </p>
              </div>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                {t('reviews.emptyCta')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
