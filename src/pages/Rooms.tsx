import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BedDouble, Snowflake } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { site } from '@/content/site';
import type { Room, RoomTag } from '@/content/site';
import { RoomCard } from '@/components/RoomCard';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/cn';

type Filter = 'all' | 'single' | 'double' | 'dormitory' | 'ac';

const FILTERS: { id: Filter; key: string; icon?: typeof BedDouble }[] = [
  { id: 'all', key: 'rooms.filters.all' },
  { id: 'single', key: 'rooms.filters.single', icon: BedDouble },
  { id: 'double', key: 'rooms.filters.double', icon: BedDouble },
  { id: 'dormitory', key: 'rooms.filters.dormitory', icon: BedDouble },
  { id: 'ac', key: 'rooms.filters.ac', icon: Snowflake },
];

const hasRoomTag = (room: Room, tag: RoomTag) => room.tags.includes(tag);

export default function Rooms() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');

  const rooms = useMemo(() => {
    if (filter === 'single') return site.rooms.filter((room) => hasRoomTag(room, 'single-bed'));
    if (filter === 'double') return site.rooms.filter((room) => hasRoomTag(room, 'double-bed'));
    if (filter === 'dormitory') return site.rooms.filter((room) => hasRoomTag(room, 'dormitory'));
    if (filter === 'ac') return site.rooms.filter((room) => hasRoomTag(room, 'premium-ac'));
    return site.rooms;
  }, [filter]);

  return (
    <>
      <Seo title={t('seo.rooms.title')} description={t('seo.rooms.description')} path="/rooms" />

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="lamp left-[-8%] top-0 h-[420px] w-[420px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
          <Link
            to="/"
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('rooms.backHome')}
          </Link>
          <p className="eyebrow text-accent">{t('rooms.eyebrow')}</p>
          <h1 className="display mt-4 max-w-3xl text-balance text-[clamp(2.8rem,6.4vw,5rem)]">
            {t('rooms.title')} <em>{t('rooms.titleEm')}</em>
          </h1>
          <p className="section-intro mt-6 max-w-2xl">{t('rooms.intro')}</p>

          <div
            role="group"
            aria-label={t('rooms.eyebrow')}
            className="mt-10 flex flex-wrap gap-2"
          >
            {FILTERS.map(({ id, key, icon: Icon }) => {
              const active = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(id)}
                  className={cn(
                    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2 text-center text-sm leading-tight transition-colors',
                    active
                      ? 'border-accent bg-accent text-on-accent'
                      : 'border-line text-muted hover:border-line-strong hover:text-ink',
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {t(key)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {rooms.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room, index) => (
              <Reveal key={room.slug} delay={index * 0.06}>
                <RoomCard
                  room={room}
                  index={site.rooms.findIndex((r) => r.slug === room.slug)}
                  className="h-full"
                  headingLevel="h2"
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line-strong p-10 text-center text-muted">
            {t('rooms.empty')}
          </p>
        )}
      </section>
    </>
  );
}
