import { useTranslation } from 'react-i18next';
import { Navigation, Phone } from 'lucide-react';
import { directionsUrl } from '@/content/site';
import { bookingWhatsAppLink, telLink } from '@/lib/links';
import { cn } from '@/lib/cn';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

/** Mobile-only shortcuts for calling, booking on WhatsApp, and directions. */
export function StickyActionBar() {
  const { t } = useTranslation();
  const tel = telLink();
  const wa = bookingWhatsAppLink();

  const itemClass =
    'flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[0.66rem] font-medium tracking-wide';

  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-stretch divide-x divide-line px-1">
        {tel ? (
          <a href={tel} className={cn(itemClass, 'text-ink')}>
            <Phone className="h-[18px] w-[18px] text-accent" aria-hidden="true" />
            <span className="max-w-full text-center leading-tight">{t('common.call')}</span>
          </a>
        ) : null}

        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(itemClass, 'text-ink')}
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            <span className="max-w-full text-center leading-tight">{t('common.whatsapp')}</span>
          </a>
        ) : null}

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(itemClass, 'text-ink')}
        >
          <Navigation className="h-[18px] w-[18px] text-accent" aria-hidden="true" />
          <span className="max-w-full text-center leading-tight">{t('common.directions')}</span>
        </a>
      </div>
    </div>
  );
}
