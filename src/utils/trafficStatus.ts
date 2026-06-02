// ============================================================
// trafficStatus.ts — LÓGICA DE CORTES DE TRÁFICO
// ============================================================
// Calcula qué cortes están activos AHORA, cuáles son próximos,
// y cuáles afectan a un evento concreto del Papa.
// ============================================================

import { trafficClosures } from '../data/trafficClosures';
import { TrafficClosure } from '../models/types';

// Construye un Date a partir de fecha ISO + hora opcional.
// Si la hora es "24:00", lo tratamos como medianoche del día siguiente.
function toDate(date: string, time?: string): Date {
  if (!time) return new Date(`${date}T00:00:00`);
  if (time === '24:00') {
    const d = new Date(`${date}T00:00:00`);
    d.setDate(d.getDate() + 1);
    return d;
  }
  return new Date(`${date}T${time}:00`);
}

function closureStart(c: TrafficClosure): Date {
  return toDate(c.startDate, c.startTime ?? '00:00');
}

function closureEnd(c: TrafficClosure): Date {
  return toDate(c.endDate, c.endTime ?? '23:59');
}

/** ¿Está activo este corte en el momento dado? */
export function isClosureActive(c: TrafficClosure, now: Date = new Date()): boolean {
  return now >= closureStart(c) && now <= closureEnd(c);
}

/** Cortes activos AHORA, ordenados por gravedad (Total primero). */
export function getActiveClosures(now: Date = new Date()): TrafficClosure[] {
  const severityOrder: Record<string, number> = { Total: 0, Parcial: 1, Afectado: 2 };
  return trafficClosures
    .filter(c => isClosureActive(c, now))
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

/** Cortes que empezarán en las próximas `hours` horas (aún no activos). */
export function getUpcomingClosures(hours: number = 48, now: Date = new Date()): TrafficClosure[] {
  const horizon = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return trafficClosures
    .filter(c => {
      const start = closureStart(c);
      return start > now && start <= horizon;
    })
    .sort((a, b) => closureStart(a).getTime() - closureStart(b).getTime());
}

/** Todos los cortes que afectan a un evento concreto. */
export function getClosuresForEvent(eventId: string): TrafficClosure[] {
  return trafficClosures.filter(c => c.relatedEventIds?.includes(eventId));
}

/**
 * Cortes agrupados por día (clave ISO "2026-06-06"), ordenados.
 * Útil para la pantalla de tráfico con secciones por jornada.
 */
export function getClosuresByDay(): { date: string; closures: TrafficClosure[] }[] {
  const byDay: Record<string, TrafficClosure[]> = {};
  for (const c of trafficClosures) {
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
 * Prioridad: mapQuery explícito > coordenadas > nombre de la zona.
 * El formato universal abre la app nativa de Maps en iOS/Android.
 */
export function buildClosureMapUrl(c: TrafficClosure): string {
  if (c.mapQuery) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`;
  }
  if (c.latitude != null && c.longitude != null) {
    return `https://www.google.com/maps/search/?api=1&query=${c.latitude},${c.longitude}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.zone + ', Madrid')}`;
}
