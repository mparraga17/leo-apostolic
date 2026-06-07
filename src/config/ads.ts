// ============================================================
// ads.ts — CONFIGURACIÓN CENTRAL DE GOOGLE ADMOB
// ============================================================
// IDs de los anuncios separados por entorno y plataforma.
// En desarrollo (__DEV__) usamos los Test IDs oficiales de
// Google que NO cuentan como impresiones reales y NO pueden
// generar bloqueos por click fraud.
//
// IMPORTANTE: cuando publiquemos en App Store, cambiamos
// USE_PRODUCTION_ADS a true en el código real (a través de la
// constante de Expo Constants podríamos diferenciar build
// preview vs production en el futuro).
// ============================================================

import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

// Cambiar a true cuando vayamos a publicar v1.1 con anuncios reales.
// IMPORTANTE: AdMob necesita que la app esté publicada en App Store
// para servir anuncios reales. Hasta entonces, en TestFlight pueden
// verse en blanco porque AdMob aún no ha aprobado la app.
const USE_PRODUCTION_ADS = true;

// IDs reales de la cuenta AdMob de Pizco Deploy
const PRODUCTION_IDS = {
  ios: {
    banner: 'ca-app-pub-5368247261960193/6798922223',
    interstitial: 'ca-app-pub-5368247261960193/5485840553',
  },
  android: {
    banner: 'ca-app-pub-5368247261960193/4773421896',
    interstitial: 'ca-app-pub-5368247261960193/7241775353',
  },
};

function getAdId(type: 'banner' | 'interstitial'): string {
  if (!USE_PRODUCTION_ADS || __DEV__) {
    return type === 'banner' ? TestIds.BANNER : TestIds.INTERSTITIAL;
  }
  const platformIds = Platform.OS === 'ios' ? PRODUCTION_IDS.ios : PRODUCTION_IDS.android;
  return platformIds[type];
}

export const adIds = {
  banner: getAdId('banner'),
  interstitial: getAdId('interstitial'),
};

// ===========================================================
// INTERSTICIALES DESACTIVADOS TEMPORALMENTE (v1.2.1)
// -----------------------------------------------------------
// Desactivados por un fallo en el que el anuncio a pantalla
// completa podía quedarse sin botón de cerrar (X fuera del área
// visible / safe-area), dejando al usuario atrapado. Es un
// problema del formato a pantalla completa (regresión de Google
// + integración del SDK en iOS). Mantenemos SOLO los banners,
// que no tienen este problema. Reactivar (poner true) cuando se
// haya verificado en dispositivo real que el intersticial vuelve
// a cerrarse correctamente.
// ===========================================================
export const INTERSTITIALS_ENABLED = false;

// Frecuencia: cada cuántos cierres de modal mostrar intersticial.
// Cada 2 cierres da un buen equilibrio entre ingresos y UX.
export const INTERSTITIAL_FREQUENCY = 2;

// Cuántos cierres iniciales pasamos sin mostrar intersticiales.
// Da una primera experiencia limpia al usuario nuevo y evita
// que vea anuncio si solo entra a ver 1-2 eventos por sesión.
export const INTERSTITIAL_GRACE_CLOSES = 2;
