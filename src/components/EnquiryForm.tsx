import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { enquirySchema } from '@/lib/validators';
import type { EnquiryValues } from '@/lib/validators';
import { whatsappLink } from '@/lib/links';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

type SendResult = 'sent' | 'whatsapp' | 'unconfigured';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

function buildMessage(
  values: EnquiryValues,
  roomLabel: string | null,
  lang: string,
  t: TFunction,
) {
  return [
    `${t('contact.bookingMessage.title')} — ${site.name} (${site.familyName})`,
    roomLabel ? `${t('contact.bookingMessage.room')}: ${roomLabel}` : null,
    `${t('contact.bookingMessage.name')}: ${values.name}`,
    `${t('contact.bookingMessage.phone')}: ${values.phone}`,
    `${t('contact.bookingMessage.guests')}: ${values.guests}`,
    values.message ? `${t('contact.bookingMessage.notes')}: ${values.message}` : null,
    `${t('contact.bookingMessage.language')}: ${lang}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function EnquiryForm({ roomLabel = null }: { roomLabel?: string | null }) {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const presetRoom = searchParams.get('room');
  const room = site.rooms.find((item) => item.slug === presetRoom) ?? null;
  const formSchema = useMemo(
    () =>
      room
        ? enquirySchema.refine((values) => Number(values.guests) <= room.capacity, {
            message: 'capacity',
            path: ['guests'],
          })
        : enquirySchema,
    [room],
  );
  const [result, setResult] = useState<SendResult | null>(null);
  const [whatsappHref, setWhatsappHref] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      guests: '',
      message: '',
      company: '',
    },
  });

  const onSubmit = async (values: EnquiryValues) => {
    setFailed(false);
    const message = buildMessage(values, roomLabel, i18n.language, t);

    const link = whatsappLink(message);
    if (link) {
      setWhatsappHref(link);
      setResult('whatsapp');
      return;
    }

    if (FORMSPREE_ID) {
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name,
            phone: values.phone,
            guests: values.guests,
            message: values.message,
            room: roomLabel,
            language: i18n.language,
            _subject: `Enquiry from ${values.name} — ${site.name}`,
          }),
        });

        if (response.ok) {
          setResult('sent');
          reset();
          return;
        }
        setFailed(true);
        return;
      } catch {
        setFailed(true);
        return;
      }
    }

    setResult('unconfigured');
  };

  const labelClass = 'text-[0.7rem] uppercase tracking-[0.16em] text-muted';
  const fieldClass =
    'mt-2 w-full rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25';

  if (result === 'sent' || result === 'whatsapp') {
    return (
      <div className="rounded-3xl border border-accent/35 bg-surface p-8 shadow-soft sm:p-10">
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden="true" />
        <h3 className="mt-5 font-display text-3xl tracking-tight text-ink">
          {result === 'whatsapp' ? t('contact.whatsappReadyTitle') : t('contact.successTitle')}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
          {result === 'whatsapp' ? t('contact.whatsappReadyBody') : t('contact.successBody')}
        </p>
        {result === 'whatsapp' && whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-colors hover:bg-accent/90"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t('contact.openWhatsApp')}
          </a>
        )}
        <button
          type="button"
          onClick={() => setResult(null)}
          className={cn(
            'text-sm text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent',
            result === 'whatsapp' ? 'mt-4 block' : 'mt-6',
          )}
        >
          {t('contact.eyebrow')}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8"
      aria-describedby={failed ? 'form-error' : undefined}
    >
      {roomLabel && (
        <p className="mb-5 inline-flex items-center rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs text-accent">
          {roomLabel}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="enquiry-name" className={labelClass}>
            {t('contact.form.name')}
          </label>
          <input
            id="enquiry-name"
            type="text"
            autoComplete="name"
            placeholder={t('contact.form.namePlaceholder')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={fieldClass}
            {...register('name')}
          />
          {errors.name && (
            <p id="error-name" role="alert" className="mt-1.5 text-xs text-saffron">
              {t('contact.form.errors.name')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-phone" className={labelClass}>
            {t('contact.form.phone')}
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t('contact.form.phonePlaceholder')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            className={fieldClass}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="error-phone" role="alert" className="mt-1.5 text-xs text-saffron">
              {t('contact.form.errors.phone')}
            </p>
          )}
        </div>

        <div className="sm:col-span-2 sm:max-w-[12rem]">
          <label htmlFor="enquiry-guests" className={labelClass}>
            {t('contact.form.guests')}
          </label>
          <input
            id="enquiry-guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={room?.capacity ?? 20}
            placeholder={
              room
                ? t('contact.form.guestsMaxPlaceholder', { count: room.capacity })
                : t('contact.form.guestsPlaceholder')
            }
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'error-guests' : undefined}
            className={fieldClass}
            {...register('guests')}
          />
          {errors.guests && (
            <p id="error-guests" role="alert" className="mt-1.5 text-xs text-saffron">
              {errors.guests.message === 'capacity'
                ? t('contact.form.errors.capacity', { count: room?.capacity })
                : t('contact.form.errors.guests')}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className={labelClass}>
            {t('contact.form.message')}
          </label>
          <textarea
            id="enquiry-message"
            rows={4}
            placeholder={t('contact.form.messagePlaceholder')}
            className={cn(fieldClass, 'resize-y')}
            {...register('message')}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="enquiry-company">{t('contact.form.honeypot')}</label>
        <input id="enquiry-company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      {failed && (
        <p id="form-error" role="alert" className="mt-5 flex items-start gap-2 text-sm text-saffron">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t('contact.form.errors.send')}
        </p>
      )}

      {result === 'unconfigured' && (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-line bg-bg-soft/70 p-4 text-sm leading-relaxed text-muted">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {t('contact.missingForm')}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-on-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t('contact.form.sending')}
            </>
          ) : (
            <>
              {t('contact.form.submit')}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </button>

        {whatsappLink() && (
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {t('contact.whatsappFallback')}
          </p>
        )}
      </div>
    </form>
  );
}
