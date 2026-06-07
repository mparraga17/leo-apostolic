// ============================================================
// news.ts — NOTICIAS / DESTACADOS DEL VIAJE APOSTÓLICO
// ============================================================
// Sustituye al "santo del día". Muestra en la pantalla Hoy lo
// más relevante que ha pasado o va a pasar en la visita del Papa
// León XIV a España.
//
// Es contenido CURADO A MANO (no hay backend). Cada noticia tiene
// fecha/hora de publicación y, opcionalmente, la ciudad y el
// evento al que se refiere. La pantalla Hoy muestra la más
// reciente cuya fecha de publicación ya ha pasado, de modo que
// el contenido "avanza" solo a lo largo del viaje sin servidores.
//
// Para actualizar: añade entradas nuevas con su publishedAt. El
// hook "actualizar-cortes-trafico" puede recordar revisarlo.
// ============================================================

import { City } from '../models/types';

export enum NewsKind {
  Upcoming = 'upcoming',   // Algo que va a pasar (previa)
  Recap = 'recap',         // Algo que ya ha ocurrido (crónica)
  Practical = 'practical', // Aviso práctico (tráfico, accesos)
}

export interface NewsItem {
  id: string;
  publishedAt: string;     // ISO datetime "2026-06-06T12:00:00"
  kind: NewsKind;
  city?: City;             // Ciudad a la que se refiere (si aplica)
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  // Evento relacionado (para futura navegación, opcional)
  relatedEventId?: string;
}

// Orden cronológico ascendente por publishedAt. La pantalla elige
// la más reciente ya publicada.
export const news: NewsItem[] = [
  {
    id: 'news_000',
    publishedAt: '2026-06-01T09:00:00',
    kind: NewsKind.Upcoming,
    title: 'Cuenta atrás para la visita del Papa a España',
    titleEn: 'Countdown to the Pope\'s visit to Spain',
    body: 'El Papa León XIV visita España del 6 al 12 de junio: Madrid, Barcelona, Montserrat, Gran Canaria y Tenerife. Aquí tendrás la agenda, los cortes de tráfico y los lugares de interés de cada etapa.',
    bodyEn: 'Pope Leo XIV visits Spain from June 6 to 12: Madrid, Barcelona, Montserrat, Gran Canaria and Tenerife. Here you will find the schedule, road closures and points of interest for each stage.',
  },
  {
    id: 'news_madrid_start',
    publishedAt: '2026-06-06T08:00:00',
    kind: NewsKind.Upcoming,
    city: City.Madrid,
    title: 'Hoy llega el Papa a Madrid',
    titleEn: 'The Pope arrives in Madrid today',
    body: 'León XIV aterriza en Barajas a las 10:30 y por la noche presidirá la vigilia con los jóvenes en la Plaza de Lima (20:30). Consulta los cortes de tráfico antes de salir.',
    bodyEn: 'Leo XIV lands at Barajas at 10:30 and tonight he will lead the youth vigil at Plaza de Lima (20:30). Check the road closures before heading out.',
    relatedEventId: 'evt_006',
  },
  {
    id: 'news_madrid_corpus',
    publishedAt: '2026-06-07T07:00:00',
    kind: NewsKind.Upcoming,
    city: City.Madrid,
    title: 'Misa y procesión del Corpus en Cibeles',
    titleEn: 'Corpus Christi Mass and procession at Cibeles',
    body: 'El acto más multitudinario en Madrid: Santa Misa a las 10:00 (accesos desde las 07:00) y procesión por la calle Alcalá. Todo el entorno de Cibeles está cortado al tráfico durante la mañana.',
    bodyEn: 'The largest event in Madrid: Holy Mass at 10:00 (access from 07:00) and a procession along Calle Alcalá. The entire Cibeles area is closed to traffic during the morning.',
    relatedEventId: 'evt_007',
  },
  {
    id: 'news_madrid_bernabeu',
    publishedAt: '2026-06-08T09:00:00',
    kind: NewsKind.Upcoming,
    city: City.Madrid,
    title: 'El Papa, en el Congreso y en el Bernabéu',
    titleEn: 'The Pope at Parliament and the Bernabéu',
    body: 'Hoy León XIV se dirige al Congreso de los Diputados (10:30) y por la tarde llena el Santiago Bernabéu (19:00). Plaza de Lima y el entorno del estadio vuelven a estar muy afectados.',
    bodyEn: 'Today Leo XIV addresses the Congress of Deputies (10:30) and in the evening fills the Santiago Bernabéu (19:00). Plaza de Lima and the stadium area are heavily affected again.',
    relatedEventId: 'evt_015',
  },
  {
    id: 'news_bcn_start',
    publishedAt: '2026-06-09T11:30:00',
    kind: NewsKind.Upcoming,
    city: City.Barcelona,
    title: 'El Papa viaja a Barcelona',
    titleEn: 'The Pope travels to Barcelona',
    body: 'Tras despedirse de Madrid, León XIV llega a Barcelona (12:25). Esta noche, vigilia de oración en el Estadi Olímpic de Montjuïc (20:00). La montaña queda restringida al tráfico desde las 12:00.',
    bodyEn: 'After leaving Madrid, Leo XIV arrives in Barcelona (12:25). Tonight, a prayer vigil at the Olympic Stadium on Montjuïc (20:00). The hill is closed to traffic from 12:00.',
    relatedEventId: 'evt_020',
  },
  {
    id: 'news_bcn_sagrada',
    publishedAt: '2026-06-10T08:00:00',
    kind: NewsKind.Upcoming,
    city: City.Barcelona,
    title: 'Misa en la Sagrada Família y Rosario en Montserrat',
    titleEn: 'Mass at the Sagrada Família and Rosary at Montserrat',
    body: 'Día central en Barcelona: Rosario en Montserrat (12:00) y Santa Misa en la Sagrada Família (19:30), con la torre de Jesucristo culminada. El metro de Sagrada Família estará cerrado todo el día.',
    bodyEn: 'Central day in Barcelona: Rosary at Montserrat (12:00) and Holy Mass at the Sagrada Família (19:30), with the tower of Jesus Christ completed. The Sagrada Família metro station is closed all day.',
    relatedEventId: 'evt_024',
  },
  {
    id: 'news_gc_start',
    publishedAt: '2026-06-11T08:00:00',
    kind: NewsKind.Upcoming,
    city: City.GranCanaria,
    title: 'El Papa, en Gran Canaria',
    titleEn: 'The Pope in Gran Canaria',
    body: 'León XIV visita el puerto de Arguineguín para encontrarse con migrantes (11:40), la Catedral de Santa Ana (13:30) y celebra la Misa en el Estadio de Gran Canaria (18:30). Recuerda: horario canario (UTC+1).',
    bodyEn: 'Leo XIV visits the port of Arguineguín to meet migrants (11:40), the Cathedral of Saint Anne (13:30) and celebrates Mass at the Gran Canaria Stadium (18:30). Note: Canary time (UTC+1).',
    relatedEventId: 'evt_028',
  },
  {
    id: 'news_tf_end',
    publishedAt: '2026-06-12T08:00:00',
    kind: NewsKind.Upcoming,
    city: City.Tenerife,
    title: 'Última etapa: Tenerife y despedida',
    titleEn: 'Final stage: Tenerife and farewell',
    body: 'El viaje termina en Tenerife: encuentros con migrantes en La Laguna y Misa de despedida en el puerto de Santa Cruz (12:15). Por la tarde, el Papa regresa a Roma.',
    bodyEn: 'The journey ends in Tenerife: meetings with migrants in La Laguna and a farewell Mass at the port of Santa Cruz (12:15). In the evening, the Pope returns to Rome.',
    relatedEventId: 'evt_031',
  },
];

/**
 * Devuelve la noticia destacada para mostrar en la pantalla Hoy:
 * la más reciente cuya fecha de publicación ya ha pasado. Si aún
 * no se ha publicado ninguna (antes del viaje), devuelve la primera.
 */
export function getCurrentNews(now: Date = new Date()): NewsItem {
  const published = news
    .filter(n => new Date(n.publishedAt).getTime() <= now.getTime())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return published[0] ?? news[0];
}

/**
 * Devuelve las últimas `limit` noticias ya publicadas, de más
 * reciente a más antigua (para un futuro listado/feed).
 */
export function getRecentNews(limit: number = 5, now: Date = new Date()): NewsItem[] {
  return news
    .filter(n => new Date(n.publishedAt).getTime() <= now.getTime())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function localizeNews(item: NewsItem, locale: 'es' | 'en' | 'ca') {
  return {
    title: locale === 'en' ? item.titleEn : item.title,
    body: locale === 'en' ? item.bodyEn : item.body,
  };
}
