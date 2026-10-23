import { useTranslation } from 'react-i18next';
import { ExternalLink, Navigation, Phone } from 'lucide-react';
import { site, mapEmbedSrc, directionsUrl } from '@/content/site';
import { bookingWhatsAppLink, displayPhone } from '@/lib/links';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export function LocationSection() {
  const { t } = useTranslation();
  const address = site.contact.address;
  const wa = bookingWhatsAppLink();
  const contacts = [
    {
      name: site.contact.primaryName,
      phone: site.contact.phone,
      descriptor: site.contact.primaryDescriptor,
    },
    ...site.contact.additionalContacts,
  ];

  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="relative scroll-mt-24 border-y border-line bg-bg-soft/40"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-accent">{t('location.eyebrow')}</p>
            <h2 id="location-title" className="display mt-4 text-[clamp(2.2rem,4.6vw,3.6rem)]">
              {t('location.title')} <em>{t('location.titleEm')}</em>
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink">
                  {t('location.addressLabel')}
                </p>
                {address ? (
                  <address className="mt-2 not-italic text-base font-semibold leading-relaxed text-ink">
                    {address.line1}
                    <br />
                    {address.line2}
                    <br />
                    {address.city}, {address.state} {address.pin}
                  </address>
                ) : (
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                    {t('location.addressPending')}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink">
                  {t('location.contactLabel')}
                </p>
                <ul className="mt-3 space-y-2">
                  {contacts.map((contact) => (
                    <li key={contact.phone}>
                      <a
                        href={`tel:+${contact.phone}`}
                        aria-label={`Call ${contact.name} at ${displayPhone(contact.phone)}`}
                        className="flex min-h-14 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-bold text-accent">{contact.name}</span>
                          {contact.descriptor && (
                            <span className="block text-sm font-semibold text-ink">{contact.descriptor}</span>
                          )}
                        </span>
                        <span className="shrink-0 text-sm font-bold text-ink">
                          {displayPhone(contact.phone)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-between gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:w-auto sm:justify-center"
                >
                  {t('location.openMaps')}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-between gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:bg-accent-soft/40 sm:w-auto sm:justify-center"
                >
                  {t('location.getDirections')}
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                </a>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-between gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:bg-accent-soft/40 sm:w-auto sm:justify-center"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {t('common.whatsapp')}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[2rem] border border-line"
            />
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
              <iframe
                title={t('location.mapTitle')}
                src={mapEmbedSrc}
                width="100%"
                height="460"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[360px] w-full grayscale-[0.15] sm:h-[460px]"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-right text-sm font-semibold text-ink">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 hover:text-accent"
              >
                {site.name}
              </a>{' '}
              · Google Maps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
