import { useTranslation } from 'react-i18next';
import { Building2, ShieldCheck, Users } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const ITEMS = [
  { icon: Building2, key: 'trust.lift' },
  { icon: ShieldCheck, key: 'trust.cctv' },
  { icon: Users, key: 'trust.family' },
] as const;

export function TrustStrip() {
  const { t } = useTranslation();

  return (
    <section aria-label={t('trust.family')} className="relative border-y border-line bg-bg-soft/60">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-line px-5 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
        {ITEMS.map(({ icon: Icon, key }) => (
          <div key={key} className="flex items-center justify-center gap-3 py-5 sm:py-6">
            <Icon className="h-[18px] w-[18px] shrink-0 text-accent" aria-hidden="true" />
            <span className="text-base font-bold text-ink">{t(key)}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
