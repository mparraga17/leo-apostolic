// ============================================================
// adManager.web.ts — STUB WEB (sin AdMob)
// ============================================================
// Mismas funciones que adManager.ts pero sin SDK nativo, para que
// las pantallas (que llaman a onModalClosed / onEventModalClosed)
// funcionen en web sin intersticiales. La versión nativa real vive
// en adManager.ts.
// ============================================================

export function initAds(): void {
  // no-op en web
}

export function onModalClosed(): void {
  // no-op en web
}

export const onEventModalClosed = onModalClosed;
