// ============================================================
// trafficStatus.ts — LÓGICA DE CORTES DE TRÁFICO
// ============================================================
// Calcula qué cortes están activos AHORA, cuáles son próximos,
// y cuáles afectan a un evento concreto del Papa.
// ============================================================

import { trafficClosures } from '../data/trafficClosures';
import { TrafficClosure, City } from '../models/types';
import { getCityName, cityDateTime } from '../data/cities';

// Construye el instante absoluto de inicio/fin de un corte, anclado a
// la zona horaria de su ciudad (no a la del dispositivo). Así los
// cortes "activos ahora" se calculan bien aunque el móvil esté en otro huso.
function closureStart(c: TrafficClosure): Date {
  return cityDateTime(c.startDate, c.startTime ?? '00:00', c.city);
}

function closureEnd(c: TrafficClosure): Date {
  return cityDateTime(c.endDate, c.endTime ?? '23:59', c.city);
}

/** ¿Está activo este corte en el momento dado? */
export function isClosureActive(c: TrafficClosure, now: Date = new Date()): boolean {
  return now >= closureStart(c) && now <= closureEnd(c);
}

/** Cortes activos AHORA, ordenados por gravedad (Total primero). Opcionalmente filtra por ciudad. */
export function getActiveClosures(now: Date = new Date(), city?: City): TrafficClosure[] {
  const severityOrder: Record<string, number> = { Total: 0, Parcial: 1, Afectado: 2 };
  return trafficClosures
    .filter(c => (city ? c.city === city : true) && isClosureActive(c, now))
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

/** Cortes que empezarán en las próximas `hours` horas (aún no activos). Opcionalmente filtra por ciudad. */
export function getUpcomingClosures(hours: number = 48, now: Date = new Date(), city?: City): TrafficClosure[] {
  const horizon = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return trafficClosures
    .filter(c => {
      if (city && c.city !== city) return false;
      const start = closureStart(c);
      return start > now && start <= horizon;
    })
    .sort((a, b) => closureStart(a).getTime() - closureStart(b).getTime());
}

/** Todos los cortes de una ciudad concreta. */
export function getClosuresForCity(city: City): TrafficClosure[] {
  return trafficClosures.filter(c => c.city === city);
}

/** Todos los cortes que afectan a un evento concreto. */
export function getClosuresForEvent(eventId: string): TrafficClosure[] {
  return trafficClosures.filter(c => c.relatedEventIds?.includes(eventId));
}

/**
 * Cortes de una ciudad agrupados por día (clave ISO "2026-06-06"), ordenados.
 * Útil para la pantalla de tráfico con secciones por jornada.
 */
export function getClosuresByDay(city?: City): { date: string; closures: TrafficClosure[] }[] {
  const byDay: Record<string, TrafficClosure[]> = {};
  for (const c of trafficClosures) {
    if (city && c.city !== city) continue;
    if (!byDay[c.startDate]) byDay[c.startDate] = [];
    byDay[c.startDate].push(c);
  }
  return Object.keys(byDay)
    .sort()
    .map(date => ({ date, closures: byDay[date] }));
}


/**
 * Construye una URL de Google Maps para visualizar la zona de un corte.
 * Google resalta en el mapa los lugares/calles con nombre reconocible.
 * Prioridad: mapQuery explícito > coordenadas > nombre de la zona + ciudad.
 * El formato universal abre la app nativa de Maps en iOS/Android.
 */
export function buildClosureMapUrl(c: TrafficClosure): string {
  if (c.mapQuery) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`;
  }
  if (c.latitude != null && c.longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${c.latitude},${c.longitude}`;
  }
  const cityName = getCityName(c.city, 'es');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.zone + ', ' + cityName)}`;
}
