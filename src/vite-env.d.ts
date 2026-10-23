/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
