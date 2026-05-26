// ============================================================
// eventSuggestions.ts — RECOMENDACIONES POR EVENTO
// ============================================================
// Para cada evento del Papa, calcula:
// - Cuánto tiempo libre hay hasta el siguiente
// - Qué lugares culturales-religiosos hay cerca
// - Sugerencias específicas según la zona
// ============================================================

import { papalEvents } from '../data/agenda';
import { places, CulturalPlace } from '../data/places';
import { PapalEvent } from '../models/types';

export interface EventTimeWindow {
  hasFreeTime: boolean;
  nextEvent?: PapalEvent;
  freeMinutes?: number;       // Minutos libres hasta el siguiente evento
  freeText?: string;          // "3h 45min" formateado
}

// Distancia en km entre dos coordenadas (Haversine simple)
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function eventDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

function eventEndDateTime(event: PapalEvent): Date {
  if (event.endTime) return eventDateTime(event.date, event.endTime);
  const start = eventDateTime(event.date, event.startTime);
  return new Date(start.getTime() + 60 * 60 * 1000);
}

// Calcula la ventana de tiempo libre tras un evento
export function getTimeWindowAfter(event: PapalEvent): EventTimeWindow {
  const sortedEvents = [...papalEvents].sort((a, b) =>
    eventDateTime(a.date, a.startTime).getTime() - eventDateTime(b.date, b.startTime).getTime()
  );

  const idx = sortedEvents.findIndex(e => e.id === event.id);
  if (idx === -1 || idx === sortedEvents.length - 1) {
    return { hasFreeTime: false };
  }

  const thisEnd = eventEndDateTime(event);
  const nextEvent = sortedEvents[idx + 1];
  const nextStart = eventDateTime(nextEvent.date, nextEvent.startTime);

  // Si el siguiente evento es otro día, no calculamos hueco
  if (event.date !== nextEvent.date) {
    return { hasFreeTime: false };
  }

  const freeMinutes = Math.round((nextStart.getTime() - thisEnd.getTime()) / 60000);

  // Solo merece la pena si hay al menos 1h libre
  if (freeMinutes < 60) {
    return { hasFreeTime: false, nextEvent, freeMinutes };
  }

  const h = Math.floor(freeMinutes / 60);
  const m = freeMinutes % 60;
  const freeText = m === 0 ? `${h}h` : `${h}h ${m}min`;

  return { hasFreeTime: true, nextEvent, freeMinutes, freeText };
}

// Devuelve los lugares culturales más cercanos a un evento
export function getNearbyPlaces(event: PapalEvent, maxKm: number = 3, limit: number = 4): CulturalPlace[] {
  return places
    .map(place => ({
      place,
      distance: distanceKm(event.latitude, event.longitude, place.latitude, place.longitude),
    }))
    .filter(({ distance }) => distance <= maxKm)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ place }) => place);
}
