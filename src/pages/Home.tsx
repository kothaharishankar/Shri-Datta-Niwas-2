import { useTranslation } from 'react-i18next';
import { Seo } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { SectionDivider } from '@/components/SectionDivider';
import { FacilitiesBento } from '@/components/FacilitiesBento';
import { RoomsPreview } from '@/components/RoomsPreview';
import { GalleryTeaser } from '@/components/GalleryTeaser';
import { LocationSection } from '@/components/LocationSection';
import { Reviews } from '@/components/Reviews';
import { FaqAccordion } from '@/components/FaqAccordion';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-page-background">
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        path="/"
      />
      <Hero />
      <TrustStrip />
      <FacilitiesBento />
      <SectionDivider />
      <RoomsPreview />
      <GalleryTeaser />
      <SectionDivider flip />
      <LocationSection />
      <Reviews />
      <FaqAccordion />
    </div>
  );
}
