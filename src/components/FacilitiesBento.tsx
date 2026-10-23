import { useTranslation } from 'react-i18next';
import {
  ArrowUpDown,
  Bath,
  Car,
  Clock,
  Compass,
  CupSoda,
  Flame,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Sparkles,
  Users,
  UtensilsCrossed,
  Wifi,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/content/site';
import type { Facility } from '@/content/site';
import { cn } from '@/lib/cn';

const ICONS: Record<Facility['icon'], LucideIcon> = {
  lift: ArrowUpDown,
  cctv: ShieldCheck,
  snowflake: Snowflake,
  bath: Bath,
  shower: ShowerHead,
  wifi: Wifi,
  car: Car,
  zap: Zap,
  cup: CupSoda,
  sparkles: Sparkles,
  clock: Clock,
  fire: Flame,
  users: Users,
  utensils: UtensilsCrossed,
  compass: Compass,
};

const SPAN: Record<Facility['size'], string> = {
  wide: 'sm:col-span-2',
  tall: 'sm:row-span-2',
  normal: '',
};

export function FacilitiesBento() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <section
      id="facilities"
      aria-labelledby="facilities-title"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-5 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="eyebrow text-accent">{t('facilities.eyebrow')}</p>
          <h2 id="facilities-title" className="display mt-4 text-[clamp(2.2rem,4.6vw,3.6rem)]">
            {t('facilities.title')} <em>{t('facilities.titleEm')}</em>
          </h2>
        </div>
        <div className="lg:pb-2">
          <p className="section-intro max-w-xl">{t('facilities.intro')}</p>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-ink">
            {t('facilities.note')}
          </p>
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {site.facilities.map((facility, index) => {
          const Icon = ICONS[facility.icon];

          return (
            <motion.li
              key={facility.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.035, 0.4) }}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border border-accent/40 bg-surface p-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-5',
                SPAN[facility.size],
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,var(--glow-warm),transparent_70%)] opacity-70"
              />

              <div className="relative flex items-start">
                <Icon
                  className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                  aria-hidden="true"
                />
              </div>

              <p className="relative mt-4 min-h-10 text-sm font-semibold leading-snug text-ink sm:mt-8 sm:text-[0.95rem]">
                {t(`facilities.items.${facility.id}.name`)}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
