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

import { TrafficClosure, TrafficSeverity, City } from '../models/types';

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
    city: City.Madrid,
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
    city: City.Madrid,
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
    city: City.Madrid,
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
    city: City.Madrid,
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
    city: City.Madrid,
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
    city: City.Madrid,
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
    city: City.Madrid,
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
    city: City.Madrid,
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
    city: City.Madrid,
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

  // ============================================================
  // BARCELONA — Fuentes: Ayuntamiento de Barcelona + TMB
  // ============================================================
  // MARTES 9 — Vigilia en el Estadi Olímpic (Montjuïc)
  {
    id: 'trf_bcn_montjuic',
    city: City.Barcelona,
    zone: 'Montaña de Montjuïc (Anella Olímpica)',
    zoneEn: 'Montjuïc hill (Olympic Ring)',
    streets: 'Cierre de circulación en la montaña de Montjuïc desde las 12:00; solo acceso acreditado al entorno del Estadi Olímpic. Controles en Av. Reina Maria Cristina/Pl. Espanya, Lleida/Paral·lel, Pl. Carlos Ibáñez y Foc/Zona Franca. Sin aparcar desde el lun 8 a las 7:00 en Pg. Olímpic, Av. Estadi y Jocs del 92. Bus lanzadera Pl. Espanya–Estadi (9 articulados) y más funicular. Líneas afectadas: 13, 55, 125, 150, X3, 23 y Bus Turístic (ruta sur).',
    streetsEn: 'Montjuïc hill closed to traffic from 12:00; accredited access only around the Olympic Stadium. Checkpoints at Av. Reina Maria Cristina/Pl. Espanya, Lleida/Paral·lel, Pl. Carlos Ibáñez and Foc/Zona Franca. No parking from Mon 8 at 7:00 on Pg. Olímpic, Av. Estadi and Jocs del 92. Shuttle bus Pl. Espanya–Stadium (9 articulated) and extra funicular. Affected lines: 13, 55, 125, 150, X3, 23 and Bus Turístic (south route).',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-09',
    startTime: '12:00',
    endDate: '2026-06-09',
    endTime: '23:59',
    note: 'Vigilia de oración en el Estadi Olímpic Lluís Companys a las 20:00. Vehículos privados sin acceso al perímetro. TMB refuerza el metro un 30-50% por la tarde-noche y activa 26 estaciones con personal extra. Usa transporte público.',
    noteEn: 'Prayer vigil at the Lluís Companys Olympic Stadium at 20:00. No private vehicle access to the perimeter. TMB boosts metro 30-50% in the evening and staffs 26 stations. Use public transport.',
    relatedEventIds: ['evt_020'],
    latitude: 41.3647,
    longitude: 2.1556,
    mapQuery: "Estadi Olímpic Lluís Companys, Barcelona",
  },
  // MIÉRCOLES 10 — Misa en la Sagrada Família (L'Eixample)
  {
    id: 'trf_bcn_sagrada_familia',
    city: City.Barcelona,
    zone: 'Entorno de la Sagrada Família (L\'Eixample)',
    zoneEn: 'Sagrada Família area (Eixample)',
    streets: 'Amplio perímetro cortado desde las 7:00 del día 10 hasta las 2:00 del día 11, entre Pl. Cinc d\'Oros y c/ Lepant y entre Provença y Còrsega: Av. Diagonal, Rosselló, Pau Claris, Roger de Llúria, Bruc, Girona, Bailèn, Pg. Sant Joan, Roger de Flor, Nàpols, Sicília, Sardenya, Marina, Lepant, Provença, Mallorca y València. Hasta 15 líneas de bus desviadas (H8, H10, V17, V19, V21, D50, 6, 19, 33, 34, 39, 47, 114, Bus Turístic).',
    streetsEn: "Wide perimeter closed from 07:00 on the 10th until 02:00 on the 11th, between Pl. Cinc d'Oros and Lepant and between Provença and Còrsega: Av. Diagonal, Rosselló, Pau Claris, Roger de Llúria, Bruc, Girona, Bailèn, Pg. Sant Joan, Roger de Flor, Nàpols, Sicília, Sardenya, Marina, Lepant, Provença, Mallorca and València. Up to 15 bus lines diverted.",
    severity: TrafficSeverity.Total,
    startDate: '2026-06-10',
    startTime: '07:00',
    endDate: '2026-06-11',
    endTime: '02:00',
    note: 'Santa Misa en la Sagrada Família a las 19:30 (acto central). Metro Sagrada Família (L2 y L5) CERRADO todo el día, los trenes no paran; en Verdaguer (L4) solo se permite salir en hora punta. Usa Verdaguer (L4/L5) o Sant Pau | Dos de Maig (L5). Metro reforzado 30-65% por la tarde.',
    noteEn: 'Holy Mass at the Sagrada Família at 19:30 (central event). Sagrada Família metro (L2 and L5) CLOSED all day, trains do not stop; at Verdaguer (L4) exit only at peak times. Use Verdaguer (L4/L5) or Sant Pau | Dos de Maig (L5). Metro boosted 30-65% in the afternoon.',
    relatedEventIds: ['evt_024'],
    latitude: 41.4036,
    longitude: 2.1744,
    mapQuery: "Sagrada Família, Barcelona",
  },
  // MIÉRCOLES 10 — Encuentro caritativo en Sant Agustí (Raval)
  {
    id: 'trf_bcn_raval',
    city: City.Barcelona,
    zone: 'El Raval (entorno de Sant Agustí y Pl. Gardunya)',
    zoneEn: 'El Raval (Sant Agustí and Pl. Gardunya area)',
    streets: 'Cortes totales el día 10 (con primera fase desde las 7:00 y corte total desde las 12:00): c/ Hospital (de La Rambla a Rambla del Raval), Pl. Gardunya, Jerusalem, Pl. Sant Agustí y Arc de Sant Agustí. Línea de bus 59 desviada o limitada.',
    streetsEn: 'Full closures on the 10th (first phase from 07:00, full closure from 12:00): Hospital St (from La Rambla to Rambla del Raval), Pl. Gardunya, Jerusalem, Pl. Sant Agustí and Arc de Sant Agustí. Bus line 59 diverted or limited.',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-10',
    startTime: '07:00',
    endDate: '2026-06-10',
    endTime: '23:59',
    note: 'Encuentro del Papa con entidades caritativas en la iglesia de Sant Agustí a las 16:30. Controles de acceso y regulación de peatones en los momentos de máxima afluencia.',
    noteEn: "Pope's meeting with charity organizations at the church of Sant Agustí at 16:30. Access control and pedestrian regulation at peak times.",
    relatedEventIds: ['evt_023'],
    latitude: 41.3795,
    longitude: 2.1690,
    mapQuery: "Església de Sant Agustí, Barcelona",
  },
  // LUNES 8 → JUEVES 11 — Catedral / Ciutat Vella (oración mediodía día 9)
  {
    id: 'trf_bcn_ciutat_vella',
    city: City.Barcelona,
    zone: 'Catedral y Ciutat Vella (Barrio Gótico)',
    zoneEn: 'Cathedral and Ciutat Vella (Gothic Quarter)',
    streets: 'Restricciones de tráfico y estacionamiento en el entorno de la Catedral y el Palacio Episcopal desde las 7:00 del lun 8 hasta las 10:00 del jue 11, en la Avinguda de la Catedral, entre Pl. Antoni Maura y Pl. Nova (incluidas motos y bicis en la acera).',
    streetsEn: 'Traffic and parking restrictions around the Cathedral and Episcopal Palace from 07:00 Mon 8 to 10:00 Thu 11, on Avinguda de la Catedral, between Pl. Antoni Maura and Pl. Nova (including motorbikes and bikes on the pavement).',
    severity: TrafficSeverity.Parcial,
    startDate: '2026-06-08',
    startTime: '07:00',
    endDate: '2026-06-11',
    endTime: '10:00',
    note: 'Oración del mediodía del Papa en la Catedral el martes 9 a las 13:00. Zona peatonal del Barrio Gótico con accesos regulados.',
    noteEn: "Pope's midday prayer at the Cathedral on Tuesday 9 at 13:00. Gothic Quarter pedestrian area with regulated access.",
    relatedEventIds: ['evt_019'],
    latitude: 41.3839,
    longitude: 2.1762,
    mapQuery: "Catedral de Barcelona",
  },

  // ============================================================
  // GRAN CANARIA — Fuentes: Ayto. Las Palmas + Guaguas + Ayto. Mogán
  // ============================================================
  // JUEVES 11 — Misa en el Estadio de Gran Canaria (Siete Palmas)
  {
    id: 'trf_gc_siete_palmas',
    city: City.GranCanaria,
    zone: 'Siete Palmas (Estadio de Gran Canaria y Gran Canaria Arena)',
    zoneEn: 'Siete Palmas (Gran Canaria Stadium and Arena)',
    streets: 'Cierre casi total del entorno del Estadio desde las 9:00 del día 11 (algunos tramos desde las 20:00 del día 10): Av. Pintor Felo Monzón, Av. Hoya de la Gallina, Pasarela, Lomo San Lázaro, Las Borreras, Ctra. de Los Tarahales, Fondos de Segura y Manzanilla. Guaguas refuerza el acceso desde las 12:00: líneas 26 (cada ~10 min), 91 (cada ~5 min) y Especial Auditorio (cada ~20 min).',
    streetsEn: 'Near-total closure around the Stadium from 09:00 on the 11th (some sections from 20:00 on the 10th): Av. Pintor Felo Monzón, Av. Hoya de la Gallina, Pasarela, Lomo San Lázaro, Las Borreras, Ctra. de Los Tarahales, Fondos de Segura and Manzanilla. Guaguas reinforces access from 12:00: lines 26 (~10 min), 91 (~5 min) and Special Auditorio (~20 min).',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-11',
    startTime: '09:00',
    endDate: '2026-06-11',
    endTime: '23:59',
    note: 'Santa Misa en el Estadio de Gran Canaria a las 18:30, el acto más multitudinario. Servicios especiales de regreso al finalizar (líneas Especial Teatro, Santa Catalina–Puerto y Auditorio). Usa transporte público.',
    noteEn: 'Holy Mass at the Gran Canaria Stadium at 18:30, the largest event. Special return services afterwards (Special Teatro, Santa Catalina–Puerto and Auditorio lines). Use public transport.',
    relatedEventIds: ['evt_028'],
    latitude: 28.1000,
    longitude: -15.4566,
    mapQuery: 'Estadio de Gran Canaria',
  },
  // JUEVES 11 — Catedral de Santa Ana (Triana-Vegueta)
  {
    id: 'trf_gc_vegueta',
    city: City.GranCanaria,
    zone: 'Triana-Vegueta (Catedral de Santa Ana)',
    zoneEn: 'Triana-Vegueta (Cathedral of Saint Anne)',
    streets: 'Entorno de la Plaza de Santa Ana prácticamente cerrado desde las 7:00 del día 11. Cortes en Av. Rafael Cabrera, Francisco Gourié, Doctor Verneau, Reyes Católicos, Juan de Quesada, Obispo Codina, Reloj y entorno. Corte en la GC-1 (Av. Marítima) sentido norte desde las 12:00. Prohibido aparcar desde la mañana del día 10 en varias calles de Vegueta.',
    streetsEn: 'Plaza de Santa Ana area almost closed from 07:00 on the 11th. Closures on Av. Rafael Cabrera, Francisco Gourié, Doctor Verneau, Reyes Católicos, Juan de Quesada, Obispo Codina, Reloj and surroundings. GC-1 (Av. Marítima) northbound closed from 12:00. No parking from the morning of the 10th on several Vegueta streets.',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-11',
    startTime: '07:00',
    endDate: '2026-06-11',
    endTime: '20:00',
    note: 'Encuentro del Papa con la Iglesia diocesana en la Catedral de Santa Ana a las 13:30. La terminal de guaguas del Teatro permanece cerrada; consulta las paradas de referencia (San Telmo, Juzgados, etc.).',
    noteEn: "Pope's meeting with the diocesan Church at the Cathedral of Saint Anne at 13:30. The Teatro bus terminal is closed; check reference stops (San Telmo, Juzgados, etc.).",
    relatedEventIds: ['evt_027'],
    latitude: 28.1010,
    longitude: -15.4154,
    mapQuery: 'Catedral de Santa Ana, Las Palmas de Gran Canaria',
  },
  // JUEVES 11 — Encuentro con migrantes en Arguineguín (Mogán)
  {
    id: 'trf_gc_arguineguin',
    city: City.GranCanaria,
    zone: 'Arguineguín (Mogán)',
    zoneEn: 'Arguineguín (Mogán)',
    streets: 'Acceso a Arguineguín por la GC-1 y GC-500 permitido hasta las 9:30 del día 11; después solo vehículos acreditados. Tres filtros en la GC-1 (km 52, el puente y El Pajar) desde las 7:00. Av. Manuel Álamo Suárez cerrada desde el 9 de junio. Calles cerradas 9:30-13:30: Miguel Marrero Rodríguez, Graciliano Afonso, Tomás Iriarte, Viera y Clavijo, Av. Los Pescadores, Alonso Quesada y Litoral de Tauro. Aparcar en la parte alta (Damasco, Ithaisa, Av. Mencey, Av. Aly).',
    streetsEn: 'Access to Arguineguín via GC-1 and GC-500 allowed until 09:30 on the 11th; afterwards accredited vehicles only. Three checkpoints on the GC-1 (km 52, the bridge and El Pajar) from 07:00. Av. Manuel Álamo Suárez closed from June 9. Streets closed 09:30-13:30. Park in the upper area (Damasco, Ithaisa, Av. Mencey, Av. Aly).',
    severity: TrafficSeverity.Total,
    startDate: '2026-06-11',
    startTime: '07:00',
    endDate: '2026-06-11',
    endTime: '15:00',
    note: 'Encuentro del Papa con organizaciones de migrantes en el muelle a las 11:40. Más de 300 efectivos; jornada lectiva suspendida. Planifica con antelación y usa los aparcamientos de la parte alta.',
    noteEn: "Pope's meeting with migrant organizations at the pier at 11:40. Over 300 officers; school suspended. Plan ahead and use the upper-area car parks.",
    relatedEventIds: ['evt_026'],
    latitude: 27.7594,
    longitude: -15.6856,
    mapQuery: 'Puerto de Arguineguín, Mogán',
  },
];
