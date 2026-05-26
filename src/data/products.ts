// ============================================================
// products.ts — PRODUCTOS DE AMAZON PARA AFILIADOS
// ============================================================
// El tag de afiliado se añadirá cuando esté disponible.
// Se concatena automáticamente al construir las URLs.
// ============================================================

import { Product, ProductCategory } from '../models/types';

// Tag de afiliado de Amazon (cuando lo tengas, lo cambias aquí)
// Ejemplo: 'tualias-21'
export const AMAZON_AFFILIATE_TAG: string | null = null;

// Construye la URL de Amazon con o sin tag de afiliado
export function buildAmazonUrl(asin: string): string {
  const baseUrl = `https://www.amazon.es/dp/${asin}`;
  if (AMAZON_AFFILIATE_TAG) {
    return `${baseUrl}?tag=${AMAZON_AFFILIATE_TAG}`;
  }
  return baseUrl;
}

// Construye una URL de búsqueda en Amazon
export function buildAmazonSearchUrl(query: string): string {
  const encoded = encodeURIComponent(query);
  const baseUrl = `https://www.amazon.es/s?k=${encoded}`;
  if (AMAZON_AFFILIATE_TAG) {
    return `${baseUrl}&tag=${AMAZON_AFFILIATE_TAG}`;
  }
  return baseUrl;
}

export const products: Product[] = [
  // LIBROS DESTACADOS DEL PAPA
  {
    id: 'prd_001',
    category: ProductCategory.Libros,
    title: 'León XIV: Ciudadano del mundo, misionero del siglo XXI',
    author: 'Elise Ann Allen',
    price: 18.90,
    currency: 'EUR',
    rating: 4.2,
    totalRatings: 57,
    amazonAsin: '841021475X',
    description: 'Biografía oficial autorizada del Papa León XIV.',
    featured: true,
  },
  {
    id: 'prd_002',
    category: ProductCategory.Libros,
    title: 'Biografía de León XIV: El Papa agustino, peregrino hacia Dios',
    author: 'Rafael Lazcano González',
    price: 26.50,
    currency: 'EUR',
    rating: 5.0,
    amazonAsin: '8428574278',
    description: 'Biografía completa centrada en la vocación agustina del Pontífice.',
    featured: true,
  },
  {
    id: 'prd_003',
    category: ProductCategory.Libros,
    title: 'León XIV: el Papa de la nueva era',
    author: 'Juan Vicente Boo',
    price: 21.75,
    currency: 'EUR',
    amazonAsin: '8467081988',
    description: 'Análisis del pontificado por uno de los principales vaticanistas españoles.',
    featured: true,
  },

  // ENCÍCLICAS Y DOCUMENTOS PAPALES
  {
    id: 'prd_004',
    category: ProductCategory.Libros,
    title: 'Magnifica humanitas — Encíclica sobre la persona humana en el tiempo de la IA',
    author: 'Papa León XIV',
    price: 5.20,
    currency: 'EUR',
    amazonAsin: '842857569X',
    description: 'Primera encíclica del Papa León XIV. Texto oficial.',
    featured: true,
  },
  {
    id: 'prd_005',
    category: ProductCategory.Libros,
    title: 'Dilexi te — Te he amado. Sobre el amor hacia los pobres',
    author: 'Papa León XIV',
    price: 3.32,
    currency: 'EUR',
    rating: 4.8,
    totalRatings: 15,
    amazonAsin: '842857457X',
    description: 'Exhortación apostólica del Papa sobre la opción por los pobres.',
    featured: false,
  },
  {
    id: 'prd_006',
    category: ProductCategory.Libros,
    title: '365 días con el Papa León XIV',
    author: 'Rafael Lazcano González',
    price: 17.57,
    currency: 'EUR',
    amazonAsin: '8428575347',
    description: 'Devocional diario con textos del Papa para todo el año.',
    featured: true,
  },

  // SOUVENIRS
  {
    id: 'prd_007',
    category: ProductCategory.Souvenirs,
    title: 'Calendario Papa León XIV 2026',
    author: 'Equipo San Pablo',
    price: 8.13,
    currency: 'EUR',
    rating: 5.0,
    totalRatings: 4,
    amazonAsin: '8428573409',
    description: 'Calendario oficial 2026 con imágenes y textos del Papa.',
    featured: true,
  },
  {
    id: 'prd_010',
    category: ProductCategory.Souvenirs,
    title: 'Estampas del Papa León XIV (pack)',
    author: 'Editorial San Pablo',
    price: 4.95,
    currency: 'EUR',
    amazonAsin: 'B0DXY3K8HR',
    description: 'Pack de estampas con la imagen del Papa León XIV. Ideal para regalar.',
    featured: true,
  },

  // NIÑOS
  {
    id: 'prd_008',
    category: ProductCategory.Ninos,
    title: 'El Papa León XIV explicado para niños',
    author: 'Sueños de Campeón',
    price: 11.99,
    currency: 'EUR',
    amazonAsin: 'B0F92G5ZJ8',
    description: 'Para niños de 6 a 10 años. Incluye dibujos para colorear y actividades.',
    featured: true,
  },
  {
    id: 'prd_009',
    category: ProductCategory.Ninos,
    title: 'Leon XIV: Nuestro Papa — Aprende coloreando',
    author: 'LVG Publishing',
    price: 6.50,
    currency: 'EUR',
    amazonAsin: 'B0F99RL51V',
    description: 'Libro para colorear con la historia del Papa. Edades 4-12.',
    featured: true,
  },
];

// Búsquedas predefinidas en Amazon (para botones de "explorar más")
export const amazonSearches = [
  { id: 'srch_1', label: '📿 Rosarios católicos', query: 'rosario catolico madera olivo' },
  { id: 'srch_2', label: '✝️ Crucifijos', query: 'crucifijo pared catolico' },
  { id: 'srch_3', label: '📖 Biblias católicas', query: 'biblia catolica español' },
  { id: 'srch_4', label: '🕯️ Velas de oración', query: 'vela oracion catolica' },
  { id: 'srch_5', label: '📚 Más libros del Papa', query: 'papa leon xiv libros' },
];
