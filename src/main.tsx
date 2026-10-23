import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import './styles/globals.css';
import App from './App';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <SmoothScrollProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </BrowserRouter>
        </SmoothScrollProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);

/** Optional analytics — only when explicitly configured, cookie-free by default. */
const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
if (plausibleDomain) {
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = plausibleDomain;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
}
