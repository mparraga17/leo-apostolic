// ============================================================
// adsInit.ts — INICIALIZACIÓN DE ADMOB
// ============================================================
// Pide permiso de App Tracking Transparency (iOS) y arranca
// el SDK de Google Mobile Ads. Llamar una vez al inicio.
// ============================================================

import { Platform } from 'react-native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { initAds } from './adManager';

let initialized = false;

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
      const { status } = await tt.requestTrackingPermissionsAsync();
      // Si dice "denied", igual mostramos anuncios pero no personalizados.
      // No bloquea nada, solo cambia el tipo de anuncio que sirve Google.
      void status;
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
