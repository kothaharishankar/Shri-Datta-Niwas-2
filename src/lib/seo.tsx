import { useId } from 'react';
import { Helmet } from 'react-helmet-async';
import { site, siteUrl } from '@/content/site';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** Set false on the 404 so it is not indexed. */
  indexable?: boolean;
}

const FACILITY_SCHEMA_NAMES: Record<(typeof site.facilities)[number]['id'], string> = {
  lift: 'Lift access',
  cctv: 'CCTV 24/7',
  ac: 'Air-conditioned rooms',
  bathroom: 'Attached bathrooms',
  hotwater: 'Hot water',
  wifi: 'Wi-Fi',
  parking: 'Parking',
  backup: 'Power backup',
  water: 'Drinking water',
  housekeeping: 'Housekeeping',
  firesafety: 'Fire safety',
  family: 'Family rooms',
  groups: 'Group stays',
  food: 'Food nearby',
};

/**
 * Per-page metadata + site-wide JSON-LD. The LodgingBusiness schema only
 * advertises facilities the family has confirmed: lift and 24/7 CCTV.
 */
export function Seo({ title, description, path, indexable = true }: SeoProps) {
  const canonical = siteUrl ? `${siteUrl}${path === '/' ? '' : path}` : undefined;
  const ogImage = siteUrl ? `${siteUrl}/images/exterior.webp` : undefined;
  const schemaId = useId();

  const JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: `${site.name} (${site.familyName})`,
    description:
      'A calm, family-run lodging with lift access to every floor and 24/7 CCTV surveillance.',
    ...(siteUrl ? { url: siteUrl, image: [ogImage] } : {}),
    hasMap: site.mapsUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.coords.lat,
      longitude: site.coords.lng,
    },
    ...(site.contact.phone ? { telephone: `+${site.contact.phone.replace(/\D/g, '')}` } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
            addressLocality: site.contact.address.city,
            addressRegion: site.contact.address.state,
            postalCode: site.contact.address.pin,
            addressCountry: 'IN',
          },
        }
      : {}),
    amenityFeature: site.facilities.map((facility) => ({
      '@type': 'LocationFeatureSpecification',
      name: FACILITY_SCHEMA_NAMES[facility.id],
      value: facility.status === 'confirmed',
    })),
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {!indexable && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${site.name} (${site.familyName})`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <script type="application/ld+json" id={schemaId}>
        {JSON.stringify(JSON_LD)}
      </script>
    </Helmet>
  );
}
