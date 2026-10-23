import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Instagram, Facebook, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { LogoMark } from '@/components/LogoMark';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { site, directionsUrl } from '@/content/site';
import { bookingWhatsAppLink, displayPhone, mailLink } from '@/lib/links';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const wa = bookingWhatsAppLink();
  const mail = mailLink(site.contact.email);
  const address = site.contact.address;
  const contacts = [
    {
      name: site.contact.primaryName,
      descriptor: site.contact.primaryDescriptor,
      phone: site.contact.phone,
    },
    ...site.contact.additionalContacts,
  ];

  return (
    <footer className="border-t border-line bg-bg-soft/50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3 text-ink">
              <LogoMark className="h-10 w-10" />
              <Link to="/" className="flex flex-col leading-none" aria-label={`${site.name} — home`}>
                <span className="font-display text-xl font-bold tracking-tight text-black">
                  {site.name}
                </span>
                <span className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  {site.familyName}
                </span>
              </Link>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{t('footer.tagline')}</p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[0.68rem] text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {t('hero.trust')}
            </p>
          </div>

          <nav aria-label={t('footer.explore')}>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {t('footer.explore')}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/rooms', label: t('nav.rooms') },
                { to: '/gallery', label: t('nav.gallery') },
                { to: '/contact', label: t('nav.contact') },
                { to: '/privacy', label: t('footer.privacy') },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              {t('footer.reach')}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-muted transition-colors hover:text-accent"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    {address
                      ? `${address.line1}, ${address.line2}, ${address.city}, ${address.state} ${address.pin}`
                      : t('footer.addressPending')}
                  </span>
                </a>
              </li>
              {contacts.map((contact) => (
                <li key={contact.phone}>
                  <a
                    href={`tel:+${contact.phone}`}
                    aria-label={`Call ${contact.name} at ${displayPhone(contact.phone)}`}
                    className="flex items-start gap-2.5 text-muted transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      <span className="block">
                        <span className="font-semibold text-accent">{contact.name}</span>:{' '}
                        {displayPhone(contact.phone)}
                      </span>
                      <span className="block text-xs">{contact.descriptor}</span>
                    </span>
                  </a>
                </li>
              ))}
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0" />
                    {t('common.whatsapp')}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              )}
              {mail && (
                <li>
                  <a
                    href={mail}
                    className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {site.contact.email}
                  </a>
                </li>
              )}
              {site.social.instagram && (
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                  >
                    <Instagram className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    Instagram
                  </a>
                </li>
              )}
              {site.social.facebook && (
                <li>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                  >
                    <Facebook className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    Facebook
                  </a>
                </li>
              )}
              <li>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                >
                  <NavigationIcon />
                  {t('location.getDirections')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.rights', { year })}</p>
          <Link to="/privacy" className="transition-colors hover:text-accent">
            {t('footer.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function NavigationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
