import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { LogoMark } from '@/components/LogoMark';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { site } from '@/content/site';
import { bookingWhatsAppLink } from '@/lib/links';
import { cn } from '@/lib/cn';

const NAV = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/rooms', key: 'nav.rooms', end: false },
  { to: '/gallery', key: 'nav.gallery', end: false },
  { to: '/contact', key: 'nav.contact', end: false },
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open ? 'glass' : 'bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <div className="group flex items-center gap-3 text-ink">
          <LogoMark className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:-rotate-6" />
          <Link to="/" className="flex flex-col leading-none" aria-label={`${site.name} — home`}>
            <span className="font-display text-lg font-bold tracking-tight text-black sm:text-xl">
              {site.name}
            </span>
            <span className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {site.familyName}
            </span>
          </Link>
        </div>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'group relative rounded-full px-4 py-2 text-sm transition-colors',
                    isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  )
                }
              >
                <span className="relative">
                  {t(item.key)}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-aria-[current=page]:scale-x-100"
                  />
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <a
            href={bookingWhatsAppLink() ?? '/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift md:inline-flex"
          >
            {t('common.book')}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.menu')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass border-t border-line lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-5 pb-6 pt-3 sm:px-8">
              <ul className="flex flex-col">
                {NAV.map((item, index) => (
                  <li key={item.to} className="border-b border-line/60 last:border-0">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          'flex items-baseline justify-between py-4 font-display text-3xl tracking-tight transition-colors',
                          isActive ? 'text-accent' : 'text-ink',
                        )
                      }
                    >
                      {t(item.key)}
                      <span className="font-sans text-xs text-muted">0{index + 1}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <LanguageSwitcher align="left" />
                <ThemeToggle />
                <a
                  href={bookingWhatsAppLink() ?? '/contact'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent"
                >
                  {t('common.book')}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
