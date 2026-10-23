import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUpDown, ArrowUpRight, Clock3, ShieldCheck } from 'lucide-react';
import { SmartImage } from '@/components/SmartImage';
import { site, directionsUrl } from '@/content/site';
import { bookingWhatsAppLink } from '@/lib/links';

export function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 34]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.25]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      {/* Ambient lamp light */}
      <div
        aria-hidden="true"
        className="lamp left-[-10%] top-[-8%] h-[520px] w-[520px] sm:h-[720px] sm:w-[720px]"
      />
      <div
        aria-hidden="true"
        className="lamp lamp-sage right-[-14%] top-[28%] h-[420px] w-[420px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10">
          <motion.p
            className="eyebrow flex items-center gap-3 font-bold text-accent"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {t('hero.eyebrow')}
          </motion.p>

          <motion.h1
            id="hero-title"
            className="display mt-6 text-balance text-[clamp(3rem,8.4vw,6.6rem)]"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('hero.titleLine1')}
          </motion.h1>

          <motion.p
            className="section-intro hero-tagline mt-7 max-w-xl text-balance"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
          >
            {t('hero.sub')}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
          >
            <a
              href={bookingWhatsAppLink() ?? '/contact'}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-on-accent shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:w-auto"
            >
              {t('hero.ctaPrimary')}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent-soft/40 sm:w-auto"
            >
              {t('hero.ctaSecondary')}
              <ArrowDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-2 text-sm font-bold text-ink backdrop-blur-sm sm:px-4">
              <ArrowUpDown className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {t('trust.lift')}
            </span>
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-2 text-sm font-bold text-ink backdrop-blur-sm sm:px-4">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {t('trust.cctv')}
            </span>
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-2 text-sm font-bold text-ink backdrop-blur-sm sm:px-4">
              <Clock3 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {t('trust.rooms')}
            </span>
          </motion.div>
        </motion.div>

        {/* Photograph in an arch */}
        <div className="relative">
          <motion.figure
            className="relative mx-auto w-full max-w-[430px] lg:ml-auto lg:mr-0"
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div style={{ y: imageY }}>
              <SmartImage
                src="/images/exterior.webp"
                alt="Exterior of Shri Datta Niwas 2 showing the building and entrance."
                width={768}
                height={1024}
                eager
                placeholder="#8f8f8a"
                className="aspect-[3/4] rounded-t-[999px] rounded-b-[2rem] border border-line-strong shadow-lift"
                sizes="(min-width: 1024px) 430px, 90vw"
              />
            </motion.div>

            <div className="absolute -left-4 top-8 hidden rotate-[-4deg] rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-soft backdrop-blur-md sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink">
                {site.familyName}
              </p>
              <p className="mt-1 font-display text-lg font-bold leading-none text-ink">{site.name}</p>
            </div>

            <figcaption className="mt-4 flex flex-col items-start gap-2 text-sm font-semibold text-ink sm:flex-row sm:items-center sm:justify-between">
              <span>{t('hero.trust')}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {t('hero.scroll')}
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
