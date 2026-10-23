import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { site } from '@/content/site';
import type { GalleryItem } from '@/content/site';
import { SmartImage } from '@/components/SmartImage';
import { Lightbox } from '@/components/Lightbox';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/cn';

type Category = 'all' | GalleryItem['category'];

const CATEGORIES: Category[] = ['all', 'building', 'rooms', 'bathroom'];

// A deterministic rhythm for the masonry columns — varied but stable.
const TALL = new Set([
  'exterior',
  'single-room',
  'terracotta',
  'balcony',
  'lift',
  'room-gallery-1',
  'room-gallery-2',
]);

export default function Gallery() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<Category>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (category === 'all' ? site.gallery : site.gallery.filter((i) => i.category === category)),
    [category],
  );

  return (
    <>
      <Seo
        title={t('seo.gallery.title')}
        description={t('seo.gallery.description')}
        path="/gallery"
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="lamp lamp-sage right-[-10%] top-10 h-[400px] w-[400px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-32 sm:px-8 sm:pt-36">
          <Link
            to="/rooms"
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('rooms.backToRooms')}
          </Link>
          <p className="eyebrow text-accent">{t('gallery.eyebrow')}</p>
          <h1 className="display mt-4 max-w-3xl text-balance text-[clamp(2.8rem,6.4vw,5rem)]">
            {t('gallery.title')} <em>{t('gallery.titleEm')}</em>
          </h1>
          <p className="section-intro mt-6 max-w-2xl">{t('gallery.intro')}</p>

          <div role="group" aria-label={t('gallery.eyebrow')} className="mt-9 flex flex-wrap gap-2">
            {CATEGORIES.filter(
              (id) => id === 'all' || site.gallery.some((item) => item.category === id),
            ).map((id) => {
              const active = category === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(id)}
                  className={cn(
                    'inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2 text-center text-sm leading-tight transition-colors',
                    active
                      ? 'border-accent bg-accent text-on-accent'
                      : 'border-line text-muted hover:border-line-strong hover:text-ink',
                  )}
                >
                  {id === 'all' ? t('gallery.categories.all') : t(`gallery.categories.${id}`)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((item) => {
            const index = items.findIndex((i) => i.id === item.id);
            return (
              <Reveal key={item.id} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-line text-left"
                  aria-label={t(`gallery.items.${item.captionKey}`)}
                >
                  <SmartImage
                    src={item.src}
                    alt={t(`gallery.items.${item.captionKey}`)}
                    width={item.width}
                    height={item.height}
                    className={TALL.has(item.id) ? 'aspect-[3/4]' : 'aspect-[4/3]'}
                    imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {t(`gallery.items.${item.captionKey}`)}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
