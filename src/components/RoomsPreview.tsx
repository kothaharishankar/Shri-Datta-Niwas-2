import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { RoomCard } from '@/components/RoomCard';
import { Reveal } from '@/components/Reveal';
import { site } from '@/content/site';

export function RoomsPreview() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="rooms-preview-title" className="relative">
      <div
        aria-hidden="true"
        className="lamp right-0 top-10 h-[min(420px,100vw)] w-[min(420px,100vw)] opacity-70 md:right-[-12%] md:h-[420px] md:w-[420px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-accent">{t('rooms.eyebrow')}</p>
            <h2
              id="rooms-preview-title"
              className="display mt-4 max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)]"
            >
              {t('rooms.title')} <em>{t('rooms.titleEm')}</em>
            </h2>
          </div>
          <Link
            to="/rooms"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:bg-accent-soft/40"
          >
            {t('common.viewAll')}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <p className="section-intro mt-5 max-w-2xl">{t('rooms.intro')}</p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {site.rooms.map((room, index) => (
            <Reveal key={room.slug} delay={index * 0.08}>
              <RoomCard room={room} index={index} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
