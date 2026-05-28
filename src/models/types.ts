// ============================================================
// types.ts — DEFINICIÓN DE TIPOS DE DATOS
// ============================================================
// Tipos centrales de la app Leo Look Up.
// ============================================================

// ---- AGENDA DEL PAPA ----

export enum EventCategory {
  Misa = 'Misa',
  Vigilia = 'Vigilia',
  Audiencia = 'Audiencia',
  Encuentro = 'Encuentro',
  Visita = 'Visita',
  Traslado = 'Traslado',
  Privado = 'Privado',
}

export interface PapalEvent {
  id: string;
  date: string;           // ISO date "2026-06-06"
  startTime: string;      // "11:30"
  endTime?: string;       // "12:30" (opcional)
  title: string;          // "Ceremonia de bienvenida"
  description: string;
  location: string;       // "Palacio Real de Madrid"
  address: string;
  latitude: number;
  longitude: number;
  category: EventCategory;
  isPublic: boolean;      // Si el público puede asistir
  highlight: boolean;     // Si es uno de los actos principales
  // Versiones en inglés (opcionales)
  titleEn?: string;
  descriptionEn?: string;
  locationEn?: string;
  registrationNoteEn?: string;
  // Si requiere inscripción previa, info de cómo hacerlo
  registrationRequired?: boolean;
  registrationUrl?: string;
  registrationNote?: string;
}

// ---- ORACIONES ----

export enum PrayerCategory {
  Esenciales = 'Esenciales',
  Marianas = 'Marianas',
  PorElPapa = 'Por el Papa',
  Eucaristicas = 'Eucarísticas',
}

export interface Prayer {
  id: string;
  title: string;
  category: PrayerCategory;
  text: string;           // Texto en español
  textLatin?: string;     // Texto en latín (opcional)
  description?: string;   // Breve contexto histórico
}

// ---- CANCIONERO ----

export enum SongCategory {
  Eucaristicos = 'Eucarísticos',
  Marianos = 'Marianos',
  Alabanza = 'Alabanza',
}

export interface Song {
  id: string;
  title: string;
  category: SongCategory;
  author?: string;        // "Santo Tomás de Aquino"
  century?: string;       // "s. XIII"
  textLatin?: string;
  textSpanish: string;
  publicDomain: boolean;  // Siempre true en nuestro caso
}

// ---- TIENDA ----

export enum ProductCategory {
  Libros = 'Libros',
  Religiosos = 'Religiosos',
  Ninos = 'Niños',
  Banderas = 'Banderas',
  Souvenirs = 'Souvenirs',
}

export interface Product {
  id: string;
  category: ProductCategory;
  title: string;
  author?: string;
  price: number;
  currency: 'EUR';
  rating?: number;
  totalRatings?: number;
  imageUrl?: string;
  amazonAsin: string;     // El identificador de Amazon (ej: "841021475X")
  description: string;
  featured: boolean;
}
