import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Expand } from 'lucide-react';
import { site } from '@/content/site';
import { SmartImage } from '@/components/SmartImage';
import { Lightbox } from '@/components/Lightbox';

export function GalleryTeaser() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="gallery-teaser-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">{t('gallery.eyebrow')}</p>
            <h2 id="gallery-teaser-title" className="display mt-4 text-[clamp(2.2rem,4.6vw,3.6rem)]">
              {t('gallery.title')} <em>{t('gallery.titleEm')}</em>
            </h2>
            <p className="section-intro mt-5">{t('gallery.intro')}</p>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:bg-accent-soft/40"
          >
            {t('gallery.cta')}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* Scroll-snap strip */}
      <div
        className="no-scrollbar mask-fade-x mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8"
        aria-label={t('gallery.eyebrow')}
        role="region"
      >
        {site.gallery.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative w-[74vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-line text-left sm:w-[46vw] lg:w-[30vw] xl:w-[24rem]"
            aria-label={t(`gallery.items.${item.captionKey}`)}
          >
            <SmartImage
              src={item.src}
              alt={t(`gallery.items.${item.captionKey}`)}
              width={item.width}
              height={item.height}
              className="aspect-[4/5]"
              imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
              sizes="(min-width: 1280px) 384px, (min-width: 640px) 46vw, 74vw"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              <span className="max-w-[80%] text-sm leading-snug text-white">
                {t(`gallery.items.${item.captionKey}`)}
              </span>
              <Expand className="h-4 w-4 shrink-0 text-white/80" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        items={site.gallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
