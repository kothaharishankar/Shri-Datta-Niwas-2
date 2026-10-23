import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import mr from './mr.json';

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'mr', label: 'मराठी', short: 'म' },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

const STORAGE_KEY = 'sdn-lang';
const SUPPORTED = LANGUAGES.map((l) => l.code);

function initialLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (SUPPORTED as string[]).includes(stored)) return stored as LanguageCode;
  } catch {
    /* localStorage can be unavailable in private modes */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : 'en';
  if (nav === 'mr') return nav;
  return 'en';
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mr: { translation: mr },
  },
  lng: initialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = lng;
});

document.documentElement.lang = i18n.language;

export default i18n;
