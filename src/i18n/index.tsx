// ============================================================
// i18n/index.tsx — INTERNACIONALIZACIÓN
// ============================================================
// Detecta el idioma del sistema (iOS/Android) y permite al
// usuario cambiarlo manualmente. Solo soporta ES (por defecto)
// y EN. Cualquier otro idioma del sistema cae a EN.
// ============================================================

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import es from './es';
import en from './en';

export type Locale = 'es' | 'en';

const i18n = new I18n({ es, en });
i18n.enableFallback = true;
i18n.defaultLocale = 'es';

// Detecta el idioma del sistema. Si es español, español. Cualquier otro, inglés.
function detectInitialLocale(): Locale {
  const tags = Localization.getLocales();
  const primary = tags?.[0]?.languageCode ?? 'es';
  return primary === 'es' ? 'es' : 'en';
}

i18n.locale = detectInitialLocale();

// Tipo para extraer las claves anidadas de la traducción.
// Usamos string para no complicarnos con tipos profundos.
type TranslateKey = string;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslateKey, options?: Record<string, any>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(i18n.locale as Locale);

  const setLocale = useCallback((newLocale: Locale) => {
    i18n.locale = newLocale;
    setLocaleState(newLocale);
  }, []);

  const t = useCallback((key: string, options?: Record<string, any>) => {
    return i18n.t(key, options);
  }, [locale]); // dependencia en locale para forzar re-render al cambiar

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
