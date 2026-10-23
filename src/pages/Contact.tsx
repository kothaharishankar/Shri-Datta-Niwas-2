import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Navigation, Phone } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { site, directionsUrl, mapEmbedSrc } from '@/content/site';
import { EnquiryForm } from '@/components/EnquiryForm';
import { bookingWhatsAppLink, displayPhone, telLink } from '@/lib/links';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export default function Contact() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const roomSlug = params.get('room');
  const room = site.rooms.find((r) => r.slug === roomSlug) ?? null;
  const roomLabel = room
    ? t(`rooms.name${room.key.charAt(0).toUpperCase()}${room.key.slice(1)}`)
    : null;

  const tel = telLink();
  const wa = bookingWhatsAppLink();
  const phone = displayPhone(site.contact.phone);

  return (
    <>
      <Seo title={t('seo.contact.title')} description={t('seo.contact.description')} path="/contact" />

      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="lamp left-[-6%] top-0 h-[460px] w-[460px]" />
        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
          <Link
            to="/rooms"
            className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('rooms.backToRooms')}
          </Link>
          <p className="eyebrow text-accent">{t('contact.eyebrow')}</p>
          <h1 className="display mt-4 max-w-3xl text-balance text-[clamp(2.8rem,6.4vw,5rem)]">
            {t('contact.title')} <em>{t('contact.titleEm')}</em>
          </h1>
          <p className="section-intro mt-6 max-w-2xl">{t('contact.intro')}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-24 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <EnquiryForm roomLabel={roomLabel} />

        <div className="space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
            <h2 className="font-display text-2xl tracking-tight text-ink">
              {t('contact.sideTitle')}
            </h2>
            <p className="section-intro mt-2">{t('contact.sideBody')}</p>

            <div className="mt-6 space-y-3">
              {tel ? (
                <a
                  href={tel}
                  aria-label={`Call ${site.contact.primaryName} at ${phone}`}
                  className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm text-ink transition-colors hover:border-accent"
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block font-semibold text-accent">{site.contact.primaryName}</span>
                    <span className="block text-xs text-muted">{site.contact.primaryDescriptor}</span>
                  </span>
                  <span className="text-xs text-muted">{phone}</span>
                </a>
              ) : (
                <p className="flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  {t('footer.phonePending')}
                </p>
              )}

              {site.contact.additionalContacts.map((contact) => (
                <a
                  key={contact.phone}
                  href={`tel:+${contact.phone}`}
                  aria-label={`Call ${contact.name} at ${displayPhone(contact.phone)}`}
                  className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm text-ink transition-colors hover:border-accent"
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block font-semibold text-accent">{contact.name}</span>
                    <span className="block text-xs text-muted">{contact.descriptor}</span>
                  </span>
                  <span className="text-xs text-muted">{displayPhone(contact.phone)}</span>
                </a>
              ))}

              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm text-ink transition-colors hover:border-accent"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>{t('contact.whatsappPrompt')} · {site.contact.primaryName}</span>
                </a>
              ) : (
                <p className="flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  {t('footer.phonePending')}
                </p>
              )}

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm text-ink transition-colors hover:border-accent"
              >
                <Navigation className="h-4 w-4 text-accent" aria-hidden="true" />
                {t('location.getDirections')}
              </a>
            </div>

            <div className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                    {t('contact.sideAddress')}
                  </p>
                  {site.contact.address ? (
                    <p className="mt-1 text-ink">
                      {site.contact.address.line1}, {site.contact.address.line2},{' '}
                      {site.contact.address.city}, {site.contact.address.state}{' '}
                      {site.contact.address.pin}
                    </p>
                  ) : (
                    <p className="mt-1 text-muted">{t('location.addressPending')}</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
            <iframe
              title={t('location.mapTitle')}
              src={mapEmbedSrc}
              width="100%"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[280px] w-full grayscale-[0.15]"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
