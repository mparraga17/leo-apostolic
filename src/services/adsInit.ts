// ============================================================
// adsInit.ts — INICIALIZACIÓN DE ADMOB
// ============================================================
// Flujo de arranque de anuncios, en el orden que exige Google:
//   1) Consentimiento GDPR (UMP / User Messaging Platform) para
//      usuarios del EEE/UK/Suiza. Sin esto, Google restringe la
//      personalización ("Consent requirement: No CMP") y el relleno
//      de anuncios se desploma.
//   2) App Tracking Transparency (ATT) en iOS.
//   3) Inicializar el SDK de Google Mobile Ads.
//
// IMPORTANTE (App Review): el diálogo de ATT SOLO se muestra
// cuando la app está en estado "active" (foreground). Si se
// solicita mientras la app está "inactive" (p.ej. durante el
// splash o una transición), iOS lo descarta silenciosamente y
// el revisor de Apple no lo ve → rechazo Guideline 2.1.
// Por eso esperamos explícitamente a AppState === 'active'.
// ============================================================

import { Platform, AppState, AppStateStatus } from 'react-native';
import mobileAds, {
  MaxAdContentRating,
  AdsConsent,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';
import { initAds } from './adManager';

let initialized = false;

/**
 * Resuelve cuando la app está en primer plano (estado "active").
 * Si ya lo está, resuelve de inmediato. Si no, se suscribe a los
 * cambios de AppState y resuelve en cuanto pase a "active".
 */
function waitUntilActive(): Promise<void> {
  return new Promise(resolve => {
    if (AppState.currentState === 'active') {
      resolve();
      return;
    }
    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (next === 'active') {
        sub.remove();
        resolve();
      }
    });
  });
}

/** Pequeña espera para que la UI termine de asentarse tras el splash. */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Solicita y, si procede, muestra el formulario de consentimiento
 * GDPR (UMP). Solo aparece para usuarios del EEE/UK/Suiza y solo si
 * Google determina que hace falta. Para el resto de usuarios no se
 * muestra nada. Si algo falla, la app continúa (servirá anuncios no
 * personalizados, que es lo correcto sin consentimiento).
 */
async function requestConsentIfNeeded(): Promise<void> {
  try {
    // Esperar a primer plano para poder presentar el formulario.
    await waitUntilActive();

    // Pide a Google el estado de consentimiento del usuario.
    // (La app NO está dirigida a menores.)
    const info = await AdsConsent.requestInfoUpdate({
      tagForUnderAgeOfConsent: false,
    });

    // Muestra el formulario solo si Google indica que es necesario.
    if (
      info.status === AdsConsentStatus.REQUIRED &&
      info.isConsentFormAvailable
    ) {
      await AdsConsent.loadAndShowConsentFormIfRequired();
    }
  } catch {
    // Sin consentimiento -> anuncios no personalizados. La app sigue.
  }
}

/**
 * Pide consentimiento GDPR, luego ATT (iOS), configura el SDK e
 * inicializa AdMob. Idempotente: solo hace algo la primera vez.
 */
export async function initializeAds(): Promise<void> {
  if (initialized) return;
  initialized = true;

  // 1) Consentimiento GDPR (UMP) — antes que nada.
  await requestConsentIfNeeded();

  // 2) En iOS, pedir ATT (App Tracking Transparency).
  // Importamos dinámicamente para evitar errores en Android/web.
  if (Platform.OS === 'ios') {
    try {
      const tt = await import('expo-tracking-transparency');

      // Esperar a que la app esté realmente en primer plano.
      await waitUntilActive();

      // Margen extra para que el splash/transición acabe y la
      // ventana esté lista para presentar el diálogo del sistema.
      await delay(600);

      // Solo pedimos si el estado aún es "no determinado".
      const current = await tt.getTrackingPermissionsAsync();
      if (current.status === 'undetermined') {
        await tt.requestTrackingPermissionsAsync();
      }
    } catch {
      // expo-tracking-transparency no disponible en este build, OK
    }
  }

  // 3) Configurar e inicializar el SDK de anuncios.
  try {
    await mobileAds()
      .setRequestConfiguration({
        // Apta para todos los públicos: app devocional
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      });
    await mobileAds().initialize();
    initAds();
  } catch {
    // Si AdMob no inicializa (sin red, etc.) la app sigue funcionando
  }
}
