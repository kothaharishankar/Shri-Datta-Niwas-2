import { site } from '@/content/site';

const digits = (raw: string) => raw.replace(/\D/g, '');

/** Returns a wa.me link, or null when no number is configured. */
export function whatsappLink(message?: string): string | null {
  const number = site.contact.whatsapp ?? import.meta.env.VITE_WHATSAPP_NUMBER ?? null;
  if (!number) return null;
  const clean = digits(number);
  if (clean.length < 10) return null;
  const base = `https://wa.me/${clean}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function bookingWhatsAppMessage(roomType = ''): string {
  return [
    'Room Availability & Booking',
    '',
    'Welcome to Sri Datta Nivas 2.🙏',
    'For room availability and booking, please provide your details below. Our team will check the availability and contact you shortly through WhatsApp.',
    'Please enter:',
    'Name : ',
    'Mobile/WhatsApp Number : ',
    'No.of Guests : ',
    `Room Type : ${roomType}`,
    '',
    'Thank you for choosing Sri Datta Nivas 2. 🙏',
  ].join('\n');
}

export function bookingWhatsAppLink(roomType = ''): string | null {
  return whatsappLink(bookingWhatsAppMessage(roomType));
}

/** Returns a tel: link, or null when no number is configured. */
export function telLink(): string | null {
  const number = site.contact.phone ?? import.meta.env.VITE_WHATSAPP_NUMBER ?? null;
  if (!number) return null;
  return `tel:+${digits(number)}`;
}

/** Human-readable number, grouped for Indian numbers when possible. */
export function displayPhone(raw: string | null): string | null {
  if (!raw) return null;
  const d = digits(raw);
  if (d.length === 12 && d.startsWith('91')) {
    return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
  }
  return `+${d}`;
}

export function mailLink(email: string | null): string | null {
  return email ? `mailto:${email}` : null;
}
