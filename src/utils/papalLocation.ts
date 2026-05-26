// ============================================================
// papalLocation.ts — DÓNDE ESTÁ EL PAPA EN CADA MOMENTO
// ============================================================
// Calcula, en cualquier momento dado:
// - El evento que el Papa está realizando AHORA (si lo hay)
// - El próximo evento programado
// - El evento que acaba de terminar
//
// Útil para mostrar en la pantalla "Hoy" un widget en directo,
// y en la agenda destacar el evento actual.
// ============================================================

import { papalEvents } from '../data/agenda';
import { PapalEvent } from '../models/types';

// Crea un objeto Date a partir de una fecha ISO ("2026-06-06")
// y una hora en formato "HH:mm" ("11:30")
function eventDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

// Para cada evento estima cuándo termina:
// - Si tiene endTime, ese
// - Si no, asumimos 1 hora de duración por defecto
function eventEndDateTime(event: PapalEvent): Date {
  if (event.endTime) {
    return eventDateTime(event.date, event.endTime);
  }
  const start = eventDateTime(event.date, event.startTime);
  return new Date(start.getTime() + 60 * 60 * 1000); // +1h
}

export type LocationStatus =
  | { phase: 'now'; event: PapalEvent }              // Está ocurriendo
  | { phase: 'next'; event: PapalEvent; minutesUntil: number }  // Próximo
  | { phase: 'finished' }                             // Visita terminada
  | { phase: 'before' };                              // Aún no ha llegado

/**
 * Devuelve qué está haciendo el Papa en este momento.
 * Si no hay evento activo, devuelve el siguiente.
 */
export function getPapalLocationStatus(now: Date = new Date()): LocationStatus {
  // Filtramos solo eventos en Madrid (los días 6-9 junio 2026)
  const madridEvents = papalEvents
    .filter(e => e.date >= '2026-06-06' && e.date <= '2026-06-09')
    .sort((a, b) => {
      const ta = eventDateTime(a.date, a.startTime).getTime();
      const tb = eventDateTime(b.date, b.startTime).getTime();
      return ta - tb;
    });

  if (madridEvents.length === 0) return { phase: 'before' };

  const firstStart = eventDateTime(madridEvents[0].date, madridEvents[0].startTime);
  const lastEnd = eventEndDateTime(madridEvents[madridEvents.length - 1]);

  // Antes de que empiece todo
  if (now < firstStart) return { phase: 'before' };

  // Después del último evento
  if (now > lastEnd) return { phase: 'finished' };

  // Buscar evento en curso
  for (const event of madridEvents) {
    const start = eventDateTime(event.date, event.startTime);
    const end = eventEndDateTime(event);
    if (now >= start && now <= end) {
      return { phase: 'now', event };
    }
  }

  // Si no hay evento ahora, buscar el próximo
  for (const event of madridEvents) {
    const start = eventDateTime(event.date, event.startTime);
    if (now < start) {
      const minutesUntil = Math.round((start.getTime() - now.getTime()) / 60000);
      return { phase: 'next', event, minutesUntil };
    }
  }

  return { phase: 'finished' };
}

// Formatea minutos a "X h Y min" o "Y min"
export function formatMinutesUntil(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}
