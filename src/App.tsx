import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StickyActionBar } from '@/components/StickyActionBar';
import { ScrollToTop } from '@/components/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));
const Rooms = lazy(() => import('@/pages/Rooms'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** A quiet skeleton so route transitions never flash an empty page. */
function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36" aria-busy="true">
      <div className="h-3 w-28 animate-pulse rounded-full bg-line" />
      <div className="mt-6 h-14 w-3/4 animate-pulse rounded-2xl bg-line/70" />
      <div className="mt-4 h-14 w-1/2 animate-pulse rounded-2xl bg-line/50" />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <div key={key} className="h-52 animate-pulse rounded-2xl bg-line/60" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        id="main"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<PageSkeleton />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Navbar />
      <ScrollToTop />
      <AnimatedRoutes />
      <Footer />
      <div className="h-16 md:hidden" aria-hidden="true" />
      <StickyActionBar />
    </>
  );
}
