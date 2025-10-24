import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

const locales = { en, fr, es };

type Locale = keyof typeof locales;
type TranslationKey = string;

let currentLocale: Locale = 'en';

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

export const t = (key: TranslationKey): string => {
  const keys = key.split('.');
  let value: any = locales[currentLocale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};

export const getAvailableLocales = (): Locale[] => Object.keys(locales) as Locale[];