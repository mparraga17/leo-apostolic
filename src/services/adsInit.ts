// ============================================================
// adsInit.ts — INICIALIZACIÓN DE ADMOB
// ============================================================
// Pide permiso de App Tracking Transparency (iOS) y arranca
// el SDK de Google Mobile Ads. Llamar una vez al inicio.
//
// IMPORTANTE (App Review): el diálogo de ATT SOLO se muestra
// cuando la app está en estado "active" (foreground). Si se
// solicita mientras la app está "inactive" (p.ej. durante el
// splash o una transición), iOS lo descarta silenciosamente y
// el revisor de Apple no lo ve → rechazo Guideline 2.1.
// Por eso esperamos explícitamente a AppState === 'active'.
// ============================================================

import { Platform, AppState, AppStateStatus } from 'react-native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
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
 * Pide ATT al usuario en iOS, configura SDK y precarga el
 * primer intersticial. Idempotente: solo hace algo la primera vez.
 */
export async function initializeAds(): Promise<void> {
  if (initialized) return;
  initialized = true;

  // En iOS hay que pedir ATT (App Tracking Transparency)
  // antes de inicializar el SDK para anuncios personalizados.
  // Importamos dinámicamente para evitar errores en Android/web.
  if (Platform.OS === 'ios') {
    try {
      const tt = await import('expo-tracking-transparency');

      // 1) Esperar a que la app esté realmente en primer plano.
      //    Sin esto, iOS descarta el prompt y nunca aparece.
      await waitUntilActive();

      // 2) Margen extra para que el splash/transición acabe y la
      //    ventana esté lista para presentar el diálogo del sistema.
      await delay(600);

      // 3) Solo pedimos si el estado aún es "no determinado".
      const current = await tt.getTrackingPermissionsAsync();
      if (current.status === 'undetermined') {
        await tt.requestTrackingPermissionsAsync();
      }
    } catch {
      // expo-tracking-transparency no disponible en este build, OK
    }
  }

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
