// ============================================================
// trafficClosures.ts — CORTES DE TRÁFICO POR LA VISITA DEL PAPA
// ============================================================
// Fuente oficial:
// - Ayuntamiento de Madrid (madrid.es) — "Cortes de tráfico con
//   motivo de los preparativos de la Visita del Papa León XIV"
// - EMT Madrid (emtmadrid.es) — líneas afectadas por evento
//
// IMPORTANTE: estos datos son ORIENTATIVOS y pueden cambiar de un
// día para otro. El dispositivo municipal "se irá adaptando a las
// necesidades que puedan surgir". Por eso SIEMPRE mostramos un
// aviso y un enlace a la fuente oficial.
//
// Última actualización manual: 2026-06-02 (verificado recorrido Corpus)
// ============================================================

import { TrafficClosure, TrafficSeverity } from '../models/types';

// URL oficial del Ayuntamiento con la información de cortes en vivo
export const OFFICIAL_TRAFFIC_URL =
  'https://www.madrid.es/portales/munimadrid/es/Inicio/Movilidad-y-transportes/Incidencias-de-Trafico/Principales-incidencias-en-la-ciudad/Cortes-de-trafico-con-motivo-de-los-preparativos-de-la-Visita-del-Papa-Leon-XIV-a-Madrid-2026-/?vgnextfmt=default&vgnextoid=d7c18423fc44e910VgnVCM100000891ecb1aRCRD&vgnextchannel=cbe0aa2dedcb1610VgnVCM2000001f4a900aRCRD';

// URL oficial de la EMT con las líneas de autobús afectadas
export const OFFICIAL_EMT_URL =
  'https://www.emtmadrid.es/Bloques-EMT-Contenido/EMT-BUS/Incidencias/2026/06-Junio/Visita-del-Papa-Leon-XIV-a-Madrid.aspx';

// Fecha de la última revisión manual de estos datos (se muestra en la UI)
export const TRAFFIC_LAST_UPDATED = '2026-06-02';

export const trafficClosures: TrafficClosure[] = [
  // ============================================================
  // PREPARATIVOS (antes de la visita)
  // ============================================================
  {
    id: 'trf_lima_preparativos',
    zone: 'Plaza de Lima y entorno',
    zoneEn: 'Plaza de Lima and surroundings',
    streets: 'Plaza de Lima, Paseo de la Castellana (carriles centrales entre Pza. de Cuzco y Pza. de San Juan de la Cruz)',
    streetsEn: 'Plaza de Lima, Paseo de la Castellana (central lanes between Plaza de Cuzco and Plaza de San Juan de la Cruz)',
    severity: TrafficSeverity.Parcial,
    startDate: '2026-05-25',
    endDate: '2026-06-03',
    note: 'Montaje de torres de iluminación, vídeo, audio y escenarios. Ocupaciones de carriles, principalmente en horario nocturno. General Perón y Concha Espina con circulación restringida.',
    noteEn: 'Assembly of lighting, video, audio towers and stages. Lane occupations, mainly at night. General Perón and Concha Espina with restricted circulation.',
    relatedEventIds: ['evt_006'],
    latitude: 40.4528,
    longitude: -3.6883,
    mapQuery: 'Plaza de Lima, Madrid',
  },
  {
    id: 'trf_cibeles_preparativos',
    zone: 'Plaza de Cibeles y Paseo del Prado-Recoletos',
    zoneEn: 'Plaza de Cibeles and Paseo del Prado-Recoletos',
    streets: 'Plaza de Cibeles, Plaza de Cánovas del Castillo, Plaza de la Independencia, calle Alcalá (hasta Gran Vía), Paseo de Recoletos, Paseo del Prado',
    streetsEn: 'Plaza de Cibeles, Plaza de Cánovas del Castillo, Plaza de la Independencia, Calle Alcalá (up to Gran Vía), Paseo de Recoletos, Paseo del Prado',
    severity: TrafficSeverity.Parcial,
    startDate: '2026-05-21',
    endDate: '2026-06-06',
    note: 'Ocupaciones puntuales de carriles para descarga y acopio de materiales de la Misa y Procesión del Corpus.',
    noteEn: 'Occasional lane occupations for unloading and storing materials for the Corpus Christi Mass and Procession.',
    relatedEventIds: ['evt_007'],
    latitude: 40.4196,
    longitude: -3.6929,
    mapQuery: 'Plaza de Cibeles, Madrid',
  },

  // ============================================================
  // CIERRE CASI TOTAL PLAZA DE LIMA (noche 3-4 junio)
  // ============================================================
  {
    id: 'trf_lima_cierre_total',
    zone: 'Plaza de Lima (cierre casi total)',
    zoneEn: 'Plaza de Lima (near-total closure)',
    streets: 'Plaza de Lima, carriles centrales del Paseo de la Castellana (Pza. de Cuzco ↔ Pza. de San Juan de la Cruz). General Perón en fondo de saco. Concha Espina cortada salvo tráfico local.',
    streetsEn: 'Plaza de Lima, central lanes of Paseo de la Castellana (Plaza de Cuzco ↔ Plaza de San Juan de la Cruz). General Perón as a dead end. Concha Espina closed except local traffic.',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-03',
    startTime: '24:00',
    endDate: '2026-06-07',
    note: 'Cierre prácticamente total al tráfico desde la noche del 3 al 4 de junio. Se mantienen accesos puntuales para residentes y servicios hasta el 4-5 de junio. Afecta a la Vigilia con jóvenes (sáb 6) y al encuentro del Bernabéu (lun 8).',
    noteEn: 'Near-total traffic closure from the night of June 3-4. Limited access for residents and services kept until June 4-5. Affects the Youth Vigil (Sat 6) and the Bernabéu encounter (Mon 8).',
    relatedEventIds: ['evt_006', 'evt_015'],
    latitude: 40.4528,
    longitude: -3.6883,
    mapQuery: 'Plaza de Lima, Madrid',
  },

  // ============================================================
  // SÁBADO 6 — VIGILIA EN PLAZA DE LIMA (20:30)
  // ============================================================
  {
    id: 'trf_evt006_vigilia',
    zone: 'Plaza de Lima y Paseo de la Castellana',
    zoneEn: 'Plaza de Lima and Paseo de la Castellana',
    streets: 'Plaza de Lima, Paseo de la Castellana (entorno), General Perón, Concha Espina. Líneas EMT afectadas: 1, 3, 5, 7, 11, 12, 14, 16, 19, 27, 40, 43, 45, 51, 52, C1, C2, 120, 126, 147, 149, 150 y nocturnas.',
    streetsEn: 'Plaza de Lima, Paseo de la Castellana (area), General Perón, Concha Espina. Affected EMT lines: 1, 3, 5, 7, 11, 12, 14, 16, 19, 27, 40, 43, 45, 51, 52, C1, C2, 120, 126, 147, 149, 150 and night lines.',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-06',
    startTime: '14:00',
    endDate: '2026-06-06',
    endTime: '23:59',
    note: 'Vigilia de oración con jóvenes a las 20:30. Cierres reforzados durante la tarde y noche. Se recomienda transporte público y llegar con antelación.',
    noteEn: 'Youth prayer vigil at 20:30. Reinforced closures during the afternoon and evening. Public transport recommended; arrive early.',
    relatedEventIds: ['evt_006'],
    latitude: 40.4528,
    longitude: -3.6883,
    mapQuery: 'Plaza de Lima, Madrid',
  },

  // ============================================================
  // DOMINGO 7 — MISA Y PROCESIÓN CORPUS EN CIBELES (10:00)
  // ============================================================
  {
    id: 'trf_evt007_cibeles',
    zone: 'Plaza de Cibeles y recorrido del Corpus',
    zoneEn: 'Plaza de Cibeles and Corpus route',
    streets: 'Plaza de Cibeles, calle Alcalá (recorrido de la procesión entre Cibeles y la iglesia de San José, hacia Gran Vía), Paseo del Prado, Paseo de Recoletos. Más de 50 líneas EMT afectadas.',
    streetsEn: 'Plaza de Cibeles, Calle Alcalá (procession route between Cibeles and the church of San José, towards Gran Vía), Paseo del Prado, Paseo de Recoletos. Over 50 EMT lines affected.',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-07',
    startTime: '06:00',
    endDate: '2026-06-07',
    endTime: '15:00',
    note: 'Santa Misa (10:00, accesos desde las 07:00) y Procesión del Corpus. La procesión recorre la calle Alcalá desde Cibeles hasta la iglesia de San José y regresa. Es el acto con mayor afectación al tráfico; todo el entorno de Cibeles afectado durante la mañana.',
    noteEn: 'Holy Mass (10:00, access from 07:00) and Corpus Procession. The procession runs along Calle Alcalá from Cibeles to the church of San José and back. The event with the greatest traffic impact; the entire Cibeles area is affected during the morning.',
    relatedEventIds: ['evt_007'],
    latitude: 40.4196,
    longitude: -3.6929,
    mapQuery: 'Calle de Alcalá, Madrid',
  },

  // ============================================================
  // DOMINGO 7 — MOVISTAR ARENA (18:00)
  // ============================================================
  {
    id: 'trf_evt009_arena',
    zone: 'Movistar Arena (Palacio de los Deportes)',
    zoneEn: 'Movistar Arena',
    streets: 'Avenida de Felipe II, calle Goya, calle O\'Donnell y entorno del recinto. Líneas EMT afectadas: 1, 2, 9, 12, 15, 19, 20, 21, 26, 28, 29, 30, 43, 51, 52, 53, 61, 63, 71, 72, 73, 74, 110, 143, 146, 152, C1, C2.',
    streetsEn: 'Avenida de Felipe II, Calle Goya, Calle O\'Donnell and venue surroundings. Affected EMT lines: 1, 2, 9, 12, 15, 19, 20, 21, 26, 28, 29, 30, 43, 51, 52, 53, 61, 63, 71, 72, 73, 74, 110, 143, 146, 152, C1, C2.',
    severity: TrafficSeverity.Parcial,
    startDate: '2026-06-07',
    startTime: '15:00',
    endDate: '2026-06-07',
    endTime: '21:00',
    note: 'Encuentro "Construyendo redes" a las 18:00. Cortes puntuales por el paso de la comitiva.',
    noteEn: 'Encounter "Building Bridges" at 18:00. Occasional closures for the motorcade.',
    relatedEventIds: ['evt_009'],
    latitude: 40.4232,
    longitude: -3.6716,
    mapQuery: 'Movistar Arena, Madrid',
  },

  // ============================================================
  // LUNES 8 — ALMUDENA (18:00)
  // ============================================================
  {
    id: 'trf_evt014_almudena',
    zone: 'Catedral de la Almudena y entorno Palacio Real',
    zoneEn: 'Almudena Cathedral and Royal Palace area',
    streets: 'Calle de Bailén, calle Mayor, Cuesta de la Vega, Plaza de la Almudena y entorno. Líneas EMT afectadas: 3, 148, y accesos al entorno del Palacio Real.',
    streetsEn: 'Calle de Bailén, Calle Mayor, Cuesta de la Vega, Plaza de la Almudena and surroundings. Affected EMT lines: 3, 148, and access to the Royal Palace area.',
    severity: TrafficSeverity.Parcial,
    startDate: '2026-06-08',
    startTime: '15:00',
    endDate: '2026-06-08',
    endTime: '20:00',
    note: 'Oración y ofrenda floral a la Virgen de la Almudena a las 18:00.',
    noteEn: 'Prayer and floral offering to Our Lady of Almudena at 18:00.',
    relatedEventIds: ['evt_014'],
    latitude: 40.4156,
    longitude: -3.7144,
    mapQuery: 'Catedral de la Almudena, Madrid',
  },

  // ============================================================
  // LUNES 8 — BERNABÉU (19:00)
  // ============================================================
  {
    id: 'trf_evt015_bernabeu',
    zone: 'Estadio Santiago Bernabéu y Plaza de Lima',
    zoneEn: 'Santiago Bernabéu Stadium and Plaza de Lima',
    streets: 'Paseo de la Castellana (entorno Bernabéu), Concha Espina, Avenida de Concha Espina, General Perón. Líneas EMT afectadas: 1, 3, 5, 7, 11, 12, 14, 16, 19, 27, 40, 43, 45, 51, 52, 120, 126, 147, 149, 150, C1, C2 y nocturnas.',
    streetsEn: 'Paseo de la Castellana (Bernabéu area), Concha Espina, Avenida de Concha Espina, General Perón. Affected EMT lines: 1, 3, 5, 7, 11, 12, 14, 16, 19, 27, 40, 43, 45, 51, 52, 120, 126, 147, 149, 150, C1, C2 and night lines.',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-08',
    startTime: '15:00',
    endDate: '2026-06-08',
    endTime: '23:59',
    note: 'Encuentro en el Bernabéu a las 19:00. Uno de los actos más multitudinarios. Zona de Plaza de Lima nuevamente muy afectada.',
    noteEn: 'Encounter at the Bernabéu at 19:00. One of the most crowded events. Plaza de Lima area heavily affected again.',
    relatedEventIds: ['evt_015'],
    latitude: 40.4530,
    longitude: -3.6883,
    mapQuery: 'Estadio Santiago Bernabéu, Madrid',
  },

  // ============================================================
  // MARTES 9 — IFEMA (10:20)
  // ============================================================
  {
    id: 'trf_evt016_ifema',
    zone: 'IFEMA y entorno (Campo de las Naciones)',
    zoneEn: 'IFEMA and surroundings',
    streets: 'Avenida del Partenón, Avenida de Capital de España, accesos a IFEMA. Líneas EMT afectadas: 73, 104, 112, 120, 122, 153, 165, 166, 171, T11.',
    streetsEn: 'Avenida del Partenón, Avenida de Capital de España, IFEMA access roads. Affected EMT lines: 73, 104, 112, 120, 122, 153, 165, 166, 171, T11.',
    severity: TrafficSeverity.Afectado,
    startDate: '2026-06-09',
    startTime: '08:00',
    endDate: '2026-06-09',
    endTime: '13:00',
    note: 'Encuentro con voluntarios a las 10:20. Afectación menor, principalmente en accesos a IFEMA.',
    noteEn: 'Meeting with volunteers at 10:20. Minor impact, mainly on IFEMA access roads.',
    relatedEventIds: ['evt_016'],
    latitude: 40.4636,
    longitude: -3.6160,
    mapQuery: 'IFEMA Madrid',
  },
];
