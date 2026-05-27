// ============================================================
// adManager.ts — GESTOR DE ANUNCIOS INTERSTICIALES
// ============================================================
// Mantiene una instancia de InterstitialAd en memoria, cargada
// y lista para mostrarse cuando se llame a showInterstitial().
//
// La frecuencia se controla por contador: solo muestra cada N
// llamadas (ver INTERSTITIAL_FREQUENCY en config/ads.ts).
// Después de mostrarse, vuelve a cargar otra para la siguiente.
// ============================================================

import {
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { adIds, INTERSTITIAL_FREQUENCY, INTERSTITIAL_GRACE_CLOSES } from '../config/ads';

let interstitial: InterstitialAd | null = null;
let isLoaded = false;
let counter = 0;
let totalCloses = 0;

function ensureInterstitial(): InterstitialAd {
  if (interstitial) return interstitial;

  const ad = InterstitialAd.createForAdRequest(adIds.interstitial, {
    requestNonPersonalizedAdsOnly: false,
  });

  ad.addAdEventListener(AdEventType.LOADED, () => {
    isLoaded = true;
  });

  ad.addAdEventListener(AdEventType.CLOSED, () => {
    isLoaded = false;
    // Recargar para la próxima
    ad.load();
  });

  ad.addAdEventListener(AdEventType.ERROR, () => {
    isLoaded = false;
  });

  interstitial = ad;
  return ad;
}

/**
 * Inicializa el intersticial. Llamar una vez al arrancar la app.
 */
export function initAds(): void {
  const ad = ensureInterstitial();
  ad.load();
}

/**
 * Llamar cuando el usuario cierra cualquier modal de detalle
 * (evento, lugar). El intersticial se muestra cada N cierres
 * después de un período de gracia inicial.
 */
export function onModalClosed(): void {
  totalCloses += 1;

  // Período de gracia: las primeras N veces no enseñamos intersticial
  if (totalCloses <= INTERSTITIAL_GRACE_CLOSES) {
    return;
  }

  counter += 1;
  if (counter >= INTERSTITIAL_FREQUENCY) {
    counter = 0;
    if (interstitial && isLoaded) {
      try {
        interstitial.show();
      } catch {
        // Silenciar errores de show; no romper la UX
      }
    }
  }
}

/**
 * Alias retrocompatible. Se usa desde AgendaScreen.
 */
export const onEventModalClosed = onModalClosed;
