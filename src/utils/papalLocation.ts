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
import { PapalEvent, City } from '../models/types';
import { cityDateTime } from '../data/cities';

// Crea el instante absoluto del inicio de un evento, anclado a la
// zona horaria de su ciudad (no a la del dispositivo).
function eventDateTime(event: PapalEvent): Date {
  return cityDateTime(event.date, event.startTime, event.city);
}

// Para cada evento estima cuándo termina:
// - Si tiene endTime, ese (en hora de la ciudad)
// - Si no, asumimos 1 hora de duración por defecto
function eventEndDateTime(event: PapalEvent): Date {
  if (event.endTime) {
    return cityDateTime(event.date, event.endTime, event.city);
  }
  const start = eventDateTime(event);
  return new Date(start.getTime() + 60 * 60 * 1000); // +1h
}

export type LocationStatus =
  | { phase: 'now'; event: PapalEvent }              // Está ocurriendo
  | { phase: 'next'; event: PapalEvent; minutesUntil: number }  // Próximo
  | { phase: 'finished' }                             // Visita terminada
  | { phase: 'before' };                              // Aún no ha llegado

/**
 * Devuelve qué está haciendo el Papa en este momento.
 * Considera TODOS los eventos del viaje (todas las ciudades),
 * ordenados cronológicamente. Si no hay evento activo, devuelve
 * el siguiente programado.
 */
export function getPapalLocationStatus(now: Date = new Date()): LocationStatus {
  // Todos los eventos del viaje, ordenados cronológicamente.
  const allEvents = [...papalEvents].sort((a, b) => {
    const ta = eventDateTime(a).getTime();
    const tb = eventDateTime(b).getTime();
    return ta - tb;
  });

  if (allEvents.length === 0) return { phase: 'before' };

  const firstStart = eventDateTime(allEvents[0]);
  const lastEnd = eventEndDateTime(allEvents[allEvents.length - 1]);

  // Antes de que empiece todo
  if (now < firstStart) return { phase: 'before' };

  // Después del último evento
  if (now > lastEnd) return { phase: 'finished' };

  // Buscar evento en curso
  for (const event of allEvents) {
    const start = eventDateTime(event);
    const end = eventEndDateTime(event);
    if (now >= start && now <= end) {
      return { phase: 'now', event };
    }
  }

  // Si no hay evento ahora, buscar el próximo
  for (const event of allEvents) {
    const start = eventDateTime(event);
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
