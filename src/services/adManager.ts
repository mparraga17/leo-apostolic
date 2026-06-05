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
  TestIds,
} from 'react-native-google-mobile-ads';
import { adIds, INTERSTITIAL_FREQUENCY, INTERSTITIAL_GRACE_CLOSES } from '../config/ads';

let interstitial: InterstitialAd | null = null;
let counter = 0;
let totalCloses = 0;

function log(...args: any[]) {
  if (__DEV__) {
    console.log('[adManager]', ...args);
  }
}

function ensureInterstitial(): InterstitialAd {
  if (interstitial) return interstitial;

  const ad = InterstitialAd.createForAdRequest(adIds.interstitial, {
    requestNonPersonalizedAdsOnly: false,
  });

  ad.addAdEventListener(AdEventType.LOADED, () => {
    log('Interstitial LOADED');
  });

  ad.addAdEventListener(AdEventType.OPENED, () => {
    log('Interstitial OPENED');
  });

  ad.addAdEventListener(AdEventType.CLOSED, () => {
    log('Interstitial CLOSED — preloading next');
    // Recargar para la próxima vez
    try { ad.load(); } catch { /* noop */ }
  });

  ad.addAdEventListener(AdEventType.ERROR, (error) => {
    log('Interstitial ERROR:', error);
  });

  interstitial = ad;
  return ad;
}

/**
 * Inicializa el intersticial. Llamar una vez al arrancar la app.
 */
export function initAds(): void {
  const ad = ensureInterstitial();
  log('Starting initial load...');
  try { ad.load(); } catch (err) { log('initial load error', err); }
}

/**
 * Llamar cuando el usuario cierra cualquier modal de detalle
 * (evento, lugar). El intersticial se muestra cada N cierres
 * después de un período de gracia inicial.
 */
export function onModalClosed(): void {
  totalCloses += 1;
  log(`Modal closed (total=${totalCloses}, counter=${counter})`);

  // Período de gracia: las primeras N veces no enseñamos intersticial
  if (totalCloses <= INTERSTITIAL_GRACE_CLOSES) {
    log('Skipping (grace period)');
    return;
  }

  counter += 1;
  if (counter < INTERSTITIAL_FREQUENCY) {
    log(`Not showing yet (counter=${counter}/${INTERSTITIAL_FREQUENCY})`);
    return;
  }

  // Llegamos al umbral. Solo mostramos si REALMENTE hay un anuncio cargado.
  // La SDK expone .loaded como fuente de verdad real.
  const ad = interstitial;
  if (!ad) {
    log('No ad instance, skipping');
    return;
  }

  if (!ad.loaded) {
    log('Ad not yet loaded, will retry on next modal close');
    // No reseteamos counter para que en el siguiente cierre lo intentemos otra vez
    counter = INTERSTITIAL_FREQUENCY - 1;
    // Y mientras tanto, intentamos cargar otro
    try { ad.load(); } catch { /* noop */ }
    return;
  }

  // Tenemos anuncio listo: lo mostramos y reseteamos contador
  log('Showing interstitial');
  counter = 0;
  try {
    ad.show();
  } catch (err) {
    log('Show error', err);
  }
}

/**
 * Alias retrocompatible. Se usa desde AgendaScreen.
 */
export const onEventModalClosed = onModalClosed;
