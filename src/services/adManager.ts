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
import { Platform, StatusBar } from 'react-native';
import { adIds, INTERSTITIAL_FREQUENCY, INTERSTITIAL_GRACE_CLOSES, INTERSTITIALS_ENABLED } from '../config/ads';

let interstitial: InterstitialAd | null = null;
let counter = 0;
let totalCloses = 0;

function log(...args: any[]) {
  if (__DEV__) {
    console.log('[adManager]', ...args);
  }
}

// ============================================================
// Workaround (iOS): ocultar la barra de estado mientras se
// muestra el intersticial.
// ------------------------------------------------------------
// El SDK de Google Mobile Ads intenta ocultar la status bar al
// presentar un anuncio a pantalla completa para que su botón de
// cerrar (X), dibujado arriba a la derecha, quede visible. En
// algunas configuraciones de view controller (y especialmente en
// iPhones con Dynamic Island) el SDK NO consigue ocultarla y la X
// queda tapada e inaccesible -> el usuario no puede cerrar el
// anuncio. Error nativo: "Status bar could not be hidden for full
// screen ad".
// Solución oficial recomendada por los mantenedores: ocultar
// nosotros la status bar justo antes de mostrar el anuncio y
// restaurarla al cerrarse.
// ============================================================
function setStatusBarHiddenForAd(hidden: boolean): void {
  if (Platform.OS !== 'ios') return;
  try {
    StatusBar.setHidden(hidden, 'fade');
  } catch {
    /* noop */
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
    // Ocultar la status bar para garantizar que la X de cerrar quede visible
    setStatusBarHiddenForAd(true);
  });

  ad.addAdEventListener(AdEventType.CLOSED, () => {
    log('Interstitial CLOSED — preloading next');
    // Restaurar la status bar de la app
    setStatusBarHiddenForAd(false);
    // Recargar para la próxima vez
    try { ad.load(); } catch { /* noop */ }
  });

  ad.addAdEventListener(AdEventType.ERROR, (error) => {
    log('Interstitial ERROR:', error);
    // Por seguridad, asegurar que la status bar vuelve a su sitio
    setStatusBarHiddenForAd(false);
  });

  interstitial = ad;
  return ad;
}

/**
 * Inicializa el intersticial. Llamar una vez al arrancar la app.
 */
export function initAds(): void {
  if (!INTERSTITIALS_ENABLED) {
    log('Interstitials disabled — skipping init');
    return;
  }
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
  // Intersticiales desactivados temporalmente (ver config/ads.ts).
  if (!INTERSTITIALS_ENABLED) return;

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
    // Si el show falla, asegurar que la status bar no quede oculta
    setStatusBarHiddenForAd(false);
  }
}

/**
 * Alias retrocompatible. Se usa desde AgendaScreen.
 */
export const onEventModalClosed = onModalClosed;
