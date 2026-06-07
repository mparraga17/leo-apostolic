// ============================================================
// cities.ts — ETAPAS DEL VIAJE APOSTÓLICO (METADATOS)
// ============================================================
// Centraliza la información de cada ciudad/etapa del viaje del
// Papa León XIV a España (6-12 junio 2026): nombre localizado,
// orden en el itinerario, rango de fechas y las fuentes oficiales
// de tráfico/transporte público propias de cada ciudad.
//
// Tener esto en un solo sitio evita "shortcuts": cualquier pantalla
// que necesite mostrar una ciudad o sus fuentes oficiales lo lee de aquí.
// ============================================================

import { City } from '../models/types';

export interface OfficialSource {
  // Etiqueta i18n-friendly: usamos un id que la UI traduce.
  // labelKey apunta a traffic.sources.* en los i18n.
  labelKey: string;
  url: string;
  icon: 'globe-outline' | 'bus-outline' | 'train-outline' | 'subway-outline';
}

export interface CityInfo {
  id: City;
  order: number;            // Orden en el itinerario (1 = primera etapa)
  name: string;             // Nombre visible en español
  nameEn: string;           // Nombre visible en inglés
  region: string;           // Comunidad/isla (ES)
  regionEn: string;
  // Rango de fechas en que el Papa está en esta etapa (ISO)
  startDate: string;
  endDate: string;
  timezone: string;         // IANA tz (Canarias difiere de península)
  utcLabel: string;         // "UTC+2" / "UTC+1" para mostrar
  utcOffset: string;        // Offset ISO fijo para junio 2026 ("+02:00" / "+01:00").
                            // Permite construir instantes absolutos independientes
                            // de la zona horaria del dispositivo.
  // Fuentes oficiales de tráfico y transporte de la ciudad
  trafficSources: OfficialSource[];
  // Última revisión manual de los datos de tráfico de esta ciudad
  trafficLastUpdated: string;
}

export const CITIES: Record<City, CityInfo> = {
  [City.Madrid]: {
    id: City.Madrid,
    order: 1,
    name: 'Madrid',
    nameEn: 'Madrid',
    region: 'Comunidad de Madrid',
    regionEn: 'Madrid',
    startDate: '2026-06-06',
    endDate: '2026-06-09',
    timezone: 'Europe/Madrid',
    utcLabel: 'UTC+2',
    utcOffset: '+02:00',
    trafficLastUpdated: '2026-06-02',
    trafficSources: [
      {
        labelKey: 'traffic.sources.madridCityCouncil',
        url: 'https://www.madrid.es/portales/munimadrid/es/Inicio/Movilidad-y-transportes/Incidencias-de-Trafico/Principales-incidencias-en-la-ciudad/Cortes-de-trafico-con-motivo-de-los-preparativos-de-la-Visita-del-Papa-Leon-XIV-a-Madrid-2026-/?vgnextfmt=default&vgnextoid=d7c18423fc44e910VgnVCM100000891ecb1aRCRD&vgnextchannel=cbe0aa2dedcb1610VgnVCM2000001f4a900aRCRD',
        icon: 'globe-outline',
      },
      {
        labelKey: 'traffic.sources.emt',
        url: 'https://www.emtmadrid.es/Bloques-EMT-Contenido/EMT-BUS/Incidencias/2026/06-Junio/Visita-del-Papa-Leon-XIV-a-Madrid.aspx',
        icon: 'bus-outline',
      },
    ],
  },

  [City.Barcelona]: {
    id: City.Barcelona,
    order: 2,
    name: 'Barcelona',
    nameEn: 'Barcelona',
    region: 'Cataluña',
    regionEn: 'Catalonia',
    startDate: '2026-06-09',
    endDate: '2026-06-11',
    timezone: 'Europe/Madrid',
    utcLabel: 'UTC+2',
    utcOffset: '+02:00',
    trafficLastUpdated: '2026-06-07',
    trafficSources: [
      {
        labelKey: 'traffic.sources.barcelonaCityCouncil',
        url: 'https://ajuntament.barcelona.cat/gracia/es/noticias/cambios-en-la-movilidad-por-la-visita-del-papa-leon-xiv-1639910',
        icon: 'globe-outline',
      },
      {
        labelKey: 'traffic.sources.tmb',
        url: 'https://www.tmb.cat/es/-/avis-visita-papa-lleo-xiv',
        icon: 'subway-outline',
      },
    ],
  },

  [City.GranCanaria]: {
    id: City.GranCanaria,
    order: 3,
    name: 'Las Palmas de Gran Canaria',
    nameEn: 'Las Palmas de Gran Canaria',
    region: 'Gran Canaria',
    regionEn: 'Gran Canaria',
    startDate: '2026-06-11',
    endDate: '2026-06-12',
    timezone: 'Atlantic/Canary',
    utcLabel: 'UTC+1',
    utcOffset: '+01:00',
    trafficLastUpdated: '2026-06-07',
    trafficSources: [
      {
        labelKey: 'traffic.sources.lpgcCityCouncil',
        url: 'https://www.laspalmasgc.es/es/ayuntamiento/prensa-y-comunicacion/notas-de-prensa/nota-de-prensa/Cortes-de-trafico-con-motivo-de-la-visita-de-Leon-XIV-a-Las-Palmas-de-Gran-Canaria/',
        icon: 'globe-outline',
      },
      {
        labelKey: 'traffic.sources.guaguas',
        url: 'https://www.guaguas.com/lineas/estado-del-servicio',
        icon: 'bus-outline',
      },
    ],
  },

  [City.Tenerife]: {
    id: City.Tenerife,
    order: 4,
    name: 'Santa Cruz de Tenerife',
    nameEn: 'Santa Cruz de Tenerife',
    region: 'Tenerife',
    regionEn: 'Tenerife',
    startDate: '2026-06-12',
    endDate: '2026-06-12',
    timezone: 'Atlantic/Canary',
    utcLabel: 'UTC+1',
    utcOffset: '+01:00',
    trafficLastUpdated: '2026-06-07',
    trafficSources: [
      {
        labelKey: 'traffic.sources.tenerifeCityCouncil',
        url: 'https://www.santacruzdetenerife.es',
        icon: 'globe-outline',
      },
    ],
  },
};

// Lista ordenada por itinerario (Madrid → Barcelona → Gran Canaria → Tenerife)
export const CITIES_ORDERED: CityInfo[] = Object.values(CITIES).sort(
  (a, b) => a.order - b.order,
);

export function getCityInfo(city: City): CityInfo {
  return CITIES[city];
}

export function getCityName(city: City, locale: 'es' | 'en' | 'ca'): string {
  const info = CITIES[city];
  return locale === 'en' ? info.nameEn : info.name;
}

export function getCityRegion(city: City, locale: 'es' | 'en' | 'ca'): string {
  const info = CITIES[city];
  return locale === 'en' ? info.regionEn : info.region;
}

// ============================================================
// Helpers de fecha/hora ANCLADOS A LA ZONA HORARIA DE LA CIUDAD
// ============================================================
// Problema: `new Date("2026-06-07T10:00:00")` se interpreta en la
// hora LOCAL del dispositivo. Si el usuario está en EE.UU., un acto
// de Madrid se desfasa varias horas. Solución: construir el instante
// con el offset fijo de la ciudad (junio 2026: península +02:00,
// Canarias +01:00), obteniendo el momento ABSOLUTO correcto en
// cualquier dispositivo del mundo.

/**
 * Construye el instante absoluto (Date) de una fecha+hora de evento
 * en la zona horaria de su ciudad.
 * @param date "2026-06-07"
 * @param time "10:00" (admite "24:00" = medianoche del día siguiente)
 * @param city  ciudad cuyo offset se aplica
 */
export function cityDateTime(date: string, time: string, city: City): Date {
  const offset = CITIES[city].utcOffset;
  if (time === '24:00') {
    // Medianoche del día siguiente, en la zona de la ciudad
    const base = new Date(`${date}T00:00:00${offset}`);
    base.setUTCDate(base.getUTCDate() + 1);
    return base;
  }
  return new Date(`${date}T${time}:00${offset}`);
}

/**
 * Formatea la hora "HH:mm" de un evento TAL Y COMO es en la ciudad
 * del evento, independientemente de la zona del dispositivo.
 * Como las horas de los datos ya están expresadas en hora local de
 * la ciudad, basta con devolver el propio string (no se reconvierte).
 * Este helper existe para dejar explícito en el código que la hora
 * mostrada es la LOCAL DE LA CIUDAD, no la del teléfono.
 */
export function formatCityTime(time: string): string {
  return time;
}

/**
 * Indica si el dispositivo está en una zona horaria con un offset
 * distinto al de la ciudad dada (para junio 2026). Si lo está, la UI
 * puede avisar de que las horas mostradas son las de la ciudad y no
 * las del teléfono.
 */
export function deviceDiffersFromCity(city: City, now: Date = new Date()): boolean {
  // Offset del dispositivo en minutos respecto a UTC (getTimezoneOffset
  // devuelve minutos a restar, con signo invertido).
  const deviceOffsetMin = -now.getTimezoneOffset();
  // Offset de la ciudad en minutos: "+02:00" -> 120, "+01:00" -> 60
  const raw = CITIES[city].utcOffset; // "+02:00"
  const sign = raw.startsWith('-') ? -1 : 1;
  const [h, m] = raw.slice(1).split(':').map(Number);
  const cityOffsetMin = sign * (h * 60 + m);
  return deviceOffsetMin !== cityOffsetMin;
}

/**
 * Devuelve la ciudad "activa" para abrir por defecto las pantallas
 * (Eventos, Tráfico, Lugares): aquella donde el Papa está o estará
 * en función del momento actual.
 * - Si estamos dentro del rango de una etapa, esa ciudad.
 * - Si estamos antes del viaje, la primera (Madrid).
 * - Si estamos entre dos etapas, la próxima que empiece.
 * - Si el viaje ya terminó, la última (Tenerife).
 * Se compara con instantes absolutos anclados al offset de cada ciudad.
 */
export function getActiveCity(now: Date = new Date()): City {
  const t = now.getTime();
  // Inicio/fin absolutos de cada etapa (00:00 del primer día → 23:59 del último)
  const stages = CITIES_ORDERED.map(c => ({
    id: c.id,
    start: new Date(`${c.startDate}T00:00:00${c.utcOffset}`).getTime(),
    end: new Date(`${c.endDate}T23:59:59${c.utcOffset}`).getTime(),
  }));

  // ¿Dentro de alguna etapa?
  for (const s of stages) {
    if (t >= s.start && t <= s.end) return s.id;
  }
  // Antes del viaje → primera etapa
  if (t < stages[0].start) return stages[0].id;
  // Entre etapas → la próxima que empiece
  for (const s of stages) {
    if (t < s.start) return s.id;
  }
  // Después del viaje → última etapa
  return stages[stages.length - 1].id;
}
