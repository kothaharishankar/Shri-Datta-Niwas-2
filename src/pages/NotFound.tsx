import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { LogoMark } from '@/components/LogoMark';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t('seo.notFound.title')}
        description={t('seo.notFound.description')}
        path="/404"
        indexable={false}
      />

      <section className="relative flex min-h-[86vh] items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="lamp left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2"
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
          <LogoMark className="mx-auto h-14 w-14" />
          <p className="mt-8 font-mono text-sm tracking-[0.4em] text-accent">{t('notFound.code')}</p>
          <h1 className="display mt-5 text-balance text-[clamp(2.6rem,7vw,4.8rem)]">
            {t('notFound.title')}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-muted">{t('notFound.body')}</p>
          <Link
            to="/"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-on-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('notFound.home')}
          </Link>
        </div>
      </section>
    </>
  );
}
