import { useTranslation } from 'react-i18next';
import { ArrowUpRight, BedDouble, Snowflake, Users } from 'lucide-react';
import { SmartImage } from '@/components/SmartImage';
import { bookingWhatsAppLink } from '@/lib/links';
import type { Room } from '@/content/site';
import { cn } from '@/lib/cn';

const PLACEHOLDER: Record<Room['key'], string> = {
  sage: '#8a9a7f',
  terracotta: '#c98a62',
  ochre: '#c4a24a',
};

interface RoomCardProps {
  room: Room;
  index?: number;
  className?: string;
  headingLevel?: 'h2' | 'h3';
}

export function RoomCard({ room, index = 0, className, headingLevel = 'h3' }: RoomCardProps) {
  const { t } = useTranslation();
  const Heading = headingLevel;

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <SmartImage
          src={room.photo}
          alt={t(`rooms.desc${room.key.charAt(0).toUpperCase()}${room.key.slice(1)}`)}
          width={1500}
          height={1000}
          placeholder={PLACEHOLDER[room.key]}
          className="aspect-[4/3]"
          imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/55 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md">
          0{index + 1} · {t('rooms.name')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <Heading className="font-display text-2xl tracking-tight text-ink">
            {t(`rooms.name${room.key.charAt(0).toUpperCase()}${room.key.slice(1)}`)}
          </Heading>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t(`rooms.desc${room.key.charAt(0).toUpperCase()}${room.key.slice(1)}`)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          <li className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.7rem] text-ink">
            <BedDouble className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {t(
              room.tags.includes('single-bed')
                ? 'rooms.singleBed'
                : room.tags.includes('dormitory')
                  ? 'rooms.dormitory'
                  : 'rooms.doubleBed',
            )}
          </li>
          <li className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.7rem] text-muted">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {t('rooms.capacityMax', { count: room.capacity })}
          </li>
          {room.tags.includes('premium-ac') && (
            <li className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.7rem] text-muted">
              <Snowflake className="h-3.5 w-3.5" aria-hidden="true" />
              {t('rooms.premiumAc')}
            </li>
          )}
        </ul>

        <a
          href={
            bookingWhatsAppLink(
              room.key === 'sage'
                ? 'Single Bed Room'
                : room.key === 'terracotta'
                  ? 'Double Bed Room'
                  : 'Dormitory',
            ) ?? `/contact?room=${room.slug}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-1.5 self-start border-b border-line-strong pb-1 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {t('rooms.cta')}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
