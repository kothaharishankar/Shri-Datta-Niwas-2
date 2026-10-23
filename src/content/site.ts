/**
 * ─────────────────────────────────────────────────────────────
 *  Shri Datta Niwas 2 (Satarkar)
 *  SINGLE SOURCE OF TRUTH for business facts.
 *
 *  Anything the client still has to confirm is `null`. The UI renders those
 *  honestly — it never invents a phone number, price or distance.
 *  See CLIENT_HANDOVER.md for the checklist.
 * ─────────────────────────────────────────────────────────────
 */

export type FacilityStatus = 'confirmed' | 'unconfirmed';

export interface Facility {
  id: string;
  status: FacilityStatus;
  /** lucide-react icon name, resolved in the component. */
  icon:
    | 'lift'
    | 'cctv'
    | 'snowflake'
    | 'bath'
    | 'shower'
    | 'wifi'
    | 'car'
    | 'zap'
    | 'cup'
    | 'sparkles'
    | 'clock'
    | 'fire'
    | 'users'
    | 'utensils'
    | 'compass';
  /** How much space this tile takes in the bento grid. */
  size: 'wide' | 'tall' | 'normal';
}

export type RoomTag = 'single-bed' | 'double-bed' | 'dormitory' | 'premium-ac';

export interface Room {
  slug: string;
  /** i18n key under `rooms.names` and `rooms.descriptions`. */
  key: 'sage' | 'terracotta' | 'ochre';
  photo: string;
  tags: readonly RoomTag[];
  capacity: number;
  tariffInr: number | null; // TODO: client — never guess a price
}

export interface GalleryItem {
  id: string;
  src: string;
  /** i18n key under `gallery.items` */
  captionKey: string;
  category: 'building' | 'rooms' | 'bathroom';
  width: number;
  height: number;
}

export interface Review {
  id: string;
  name: string;
  quote: string;
  source: string;
  url: string | null;
}

const env = import.meta.env;

export const site = {
  name: 'Shri Datta Niwas 2',
  shortName: 'Shri Datta Niwas',
  familyName: 'Satarkar',
  foundedNote: null as string | null, // TODO: client, if relevant

  mapsUrl: 'https://maps.app.goo.gl/HHKCbCSwYKPsct2U9',
  coords: {
    lat: 17.1127267,
    lng: 82.2537455,
  },

  contact: {
    phone: '919885669812',
    whatsapp: '919885669812',
    primaryName: 'Sanjay Garale',
    primaryDescriptor: 'Maharashtrian (Satarkar)',
    additionalContacts: [
      {
        name: 'Sujatha Garale',
        descriptor: 'Maharashtrian (Satarkar)',
        phone: '917095616242',
      },
    ],
    /** TODO: client */
    email: null as string | null,
    address: {
      line1: 'Sri Padavallabha Temple',
      line2: 'near Venu Gopala Swamy Temple, Kalyanamandapam',
      city: 'Pithapuram',
      state: 'Andhra Pradesh',
      pin: '533450',
    },
  },

  googleReviewSummary: {
    rating: 4.8,
    count: 22,
  },

  /** Confirmed. Do not add here until the client says yes. */
  verifiedFacts: [
    'lift',
    'cctv',
    'ac',
    'bathroom',
    'hotwater',
    'wifi',
    'parking',
    'backup',
    'water',
    'housekeeping',
    'firesafety',
    'family',
    'groups',
    'food',
  ] as const,

  facilities: [
    { id: 'lift', status: 'confirmed', icon: 'lift', size: 'wide' },
    { id: 'cctv', status: 'confirmed', icon: 'cctv', size: 'normal' },
    { id: 'ac', status: 'confirmed', icon: 'snowflake', size: 'normal' },
    { id: 'bathroom', status: 'confirmed', icon: 'bath', size: 'normal' },
    { id: 'hotwater', status: 'confirmed', icon: 'shower', size: 'normal' },
    { id: 'wifi', status: 'confirmed', icon: 'wifi', size: 'normal' },
    { id: 'parking', status: 'confirmed', icon: 'car', size: 'normal' },
    { id: 'backup', status: 'confirmed', icon: 'zap', size: 'normal' },
    { id: 'water', status: 'confirmed', icon: 'cup', size: 'normal' },
    { id: 'housekeeping', status: 'confirmed', icon: 'sparkles', size: 'normal' },
    { id: 'firesafety', status: 'confirmed', icon: 'fire', size: 'normal' },
    { id: 'family', status: 'confirmed', icon: 'users', size: 'normal' },
    { id: 'groups', status: 'confirmed', icon: 'users', size: 'normal' },
    { id: 'food', status: 'confirmed', icon: 'utensils', size: 'wide' },
  ] satisfies Facility[],

  rooms: [
    { slug: 'sage', key: 'sage', photo: '/images/room-single.webp', tags: ['single-bed', 'premium-ac'], capacity: 3, tariffInr: null },
    { slug: 'terracotta', key: 'terracotta', photo: '/images/room-double.webp', tags: ['double-bed', 'premium-ac'], capacity: 6, tariffInr: null },
    { slug: 'ochre', key: 'ochre', photo: '/images/room-gallery-2.webp', tags: ['dormitory', 'premium-ac'], capacity: 20, tariffInr: null },
  ] satisfies Room[],

  /** Real photographs supplied by the family. */
  gallery: [
    { id: 'exterior', src: '/images/exterior.webp', captionKey: 'exterior', category: 'building', width: 768, height: 1024 },
    { id: 'single-room', src: '/images/room-single.webp', captionKey: 'singleRoom', category: 'rooms', width: 768, height: 1024 },
    { id: 'terracotta', src: '/images/room-double.webp', captionKey: 'terracotta', category: 'rooms', width: 768, height: 1024 },
    { id: 'balcony', src: '/images/balcony.webp', captionKey: 'balcony', category: 'building', width: 768, height: 1024 },
    { id: 'lift', src: '/images/lift.webp', captionKey: 'lift', category: 'building', width: 768, height: 1024 },
    { id: 'room-gallery-1', src: '/images/room-gallery-1.webp', captionKey: 'roomGalleryOne', category: 'rooms', width: 768, height: 1024 },
    { id: 'room-gallery-2', src: '/images/room-gallery-2.webp', captionKey: 'roomGalleryTwo', category: 'rooms', width: 768, height: 1024 },
  ] satisfies GalleryItem[],

  /** Add testimonials only when the family supplies approved review text. */
  reviews: [] as Review[],

  social: {
    /** TODO: client — add profiles only if they exist. */
    instagram: null as string | null,
    facebook: null as string | null,
  },

  hoursNote: null as string | null, // TODO: client — office/reception hours

} as const;

export const siteUrl = (env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export const mapEmbedSrc = `https://www.google.com/maps?q=${site.coords.lat},${site.coords.lng}&z=16&output=embed`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.coords.lat},${site.coords.lng}`;
