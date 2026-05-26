// ============================================================
// places.ts — LUGARES CULTURAL-RELIGIOSOS DE MADRID
// ============================================================
// Lugares curados a mano: iglesias, museos, monasterios y
// rutas con valor devocional y cultural.
// Información de fuentes públicas (esmadrid.com, sitios oficiales).
// ============================================================

export enum PlaceCategory {
  Iglesias = 'Iglesias y catedrales',
  Museos = 'Museos religiosos',
  Monasterios = 'Monasterios y conventos',
  Rutas = 'Rutas devocionales',
}

export interface CulturalPlace {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  visitInfo: string;        // Horario y precio resumido
  website?: string;
  highlight?: boolean;      // Si es uno de los imprescindibles
  massSchedule?: string[];      // Horario de misas (líneas estructuradas)
  confessionSchedule?: string;  // Horario de confesiones
}

export const places: CulturalPlace[] = [
  // ==================== IGLESIAS Y CATEDRALES ====================
  {
    id: 'pl_001',
    name: 'Catedral de la Almudena',
    category: PlaceCategory.Iglesias,
    description: 'Catedral de Madrid, dedicada a la Virgen de la Almudena, patrona de la ciudad. Junto al Palacio Real, combina estilos neogótico y neoclásico. Aquí el Papa León XIV celebrará un acto de oración.',
    address: 'Calle de Bailén, 10',
    neighborhood: 'Palacio',
    latitude: 40.4156,
    longitude: -3.7144,
    visitInfo: 'Lunes a domingo 9:00-20:30. Entrada gratuita.',
    website: 'https://catedraldelaalmudena.es',
    highlight: true,
    massSchedule: [
      'Lunes a viernes: 11:00 (Catedral) · 11:00 (Cripta) · 12:00 · 18:30 · 19:00',
      'Sábados: 11:00 (Cripta) · 12:00 · 18:30 · 19:00',
      'Domingos: 11:00 (Cripta) · 12:00 · 13:00 (Cripta) · 18:30 · 19:00',
    ],
    confessionSchedule: 'Todos los días 11:00-13:00 y 19:00-19:30 (antes de cada misa).',
  },
  {
    id: 'pl_002',
    name: 'Real Basílica de San Francisco el Grande',
    category: PlaceCategory.Iglesias,
    description: 'Una de las cúpulas no sostenidas más grandes del mundo. Alberga obras de Goya, Zurbarán y otros maestros. Templo neoclásico del s. XVIII.',
    address: 'Calle de San Buenaventura, 1',
    neighborhood: 'La Latina',
    latitude: 40.4115,
    longitude: -3.7142,
    visitInfo: 'Mar-sáb 10:30-12:30 y 16:00-18:00. Entrada con donativo.',
    highlight: true,
    massSchedule: [
      'Lunes: 10:00',
      'Sábados y vísperas de festivo: 19:00 (en verano 20:00)',
      'Domingos y festivos: 10:30 · 11:30 · 12:30 · 19:00 (en verano 20:00)',
    ],
    confessionSchedule: 'Antes de cada misa, en la sacristía.',
  },
  {
    id: 'pl_003',
    name: 'Iglesia de San Jerónimo el Real',
    category: PlaceCategory.Iglesias,
    description: 'Conocida como "Los Jerónimos", iglesia gótica donde se ha jurado a los Reyes de España. Reformada en el s. XIX, junto al Museo del Prado.',
    address: 'Calle Moreto, 4',
    neighborhood: 'Retiro',
    latitude: 40.4153,
    longitude: -3.6913,
    visitInfo: 'Lunes a domingo 10:00-13:00 y 17:00-20:00. Entrada gratuita.',
    massSchedule: [
      'Lunes a viernes: 12:00 y 20:00 (Capilla del Santísimo)',
      'Vísperas de festivo: 20:00',
      'Domingos y festivos: 10:00 · 12:00 · 13:00 · 14:00 · 19:00',
    ],
    confessionSchedule: 'Antes de las misas y en horario de despacho parroquial.',
  },
  {
    id: 'pl_004',
    name: 'Basílica Pontificia de San Miguel',
    category: PlaceCategory.Iglesias,
    description: 'Obra maestra del barroco italiano en Madrid, junto a la Plaza Mayor. Sede de la Nunciatura. Su fachada cóncava es única en España.',
    address: 'Calle de San Justo, 4',
    neighborhood: 'Sol',
    latitude: 40.4150,
    longitude: -3.7096,
    visitInfo: 'Lunes a sábado 10:00-13:30 y 18:00-20:30. Domingos 11:00-13:00.',
    website: 'https://basilicadesanmiguel.org',
    massSchedule: [
      'Lunes a viernes: 7:25 · 10:30 · 12:30 · 20:30',
      'Sábados y vísperas: 10:30 · 12:30 · 18:30 · 20:30',
      'Domingos y festivos: 10:30 · 12:30 · 13:30 · 18:30 · 20:30',
    ],
    confessionSchedule: 'Hay confesor disponible mientras el templo está abierto.',
  },
  {
    id: 'pl_005',
    name: 'Real Iglesia Colegiata de San Isidro',
    category: PlaceCategory.Iglesias,
    description: 'Catedral provisional de Madrid antes de la Almudena. Custodia las reliquias de San Isidro Labrador y Santa María de la Cabeza, patronos de Madrid.',
    address: 'Calle de Toledo, 37',
    neighborhood: 'La Latina',
    latitude: 40.4115,
    longitude: -3.7079,
    visitInfo: 'Lunes a sábado 7:30-13:00 y 18:00-21:00. Entrada gratuita.',
    highlight: true,
    massSchedule: [
      'Lunes a viernes: 8:00 · 11:00 · 12:00 · 20:00',
      'Sábados y vísperas: 8:00 · 11:00 · 12:00 · 19:30',
      'Domingos: 9:00 · 10:30 · 12:00 · 13:00 · 19:30',
    ],
    confessionSchedule: 'Lunes a sábado durante el horario de apertura del templo.',
  },
  {
    id: 'pl_006',
    name: 'Basílica de Nuestra Señora de Atocha',
    category: PlaceCategory.Iglesias,
    description: 'Santuario dedicado a la Virgen de Atocha, una de las imágenes más antiguas de Madrid. Vinculada históricamente a la Casa Real.',
    address: 'Avenida de la Ciudad de Barcelona, 1',
    neighborhood: 'Atocha',
    latitude: 40.4078,
    longitude: -3.6900,
    visitInfo: 'Lunes a domingo 8:30-13:00 y 17:30-21:00.',
    website: 'https://www.basilicadeatocha.es',
    massSchedule: [
      'Lunes a viernes: 8:00 (conventual) · 12:00 · 20:00',
      'Sábados: 8:00 · 12:00 · 20:00',
      'Domingos y festivos: 10:00 · 12:00 · 13:00 · 20:00',
    ],
    confessionSchedule: 'Antes de cada misa, en el confesonario lateral.',
  },

  // ==================== MUSEOS RELIGIOSOS ====================
  {
    id: 'pl_007',
    name: 'Museo Nacional del Prado — Sala Religiosa',
    category: PlaceCategory.Museos,
    description: 'El Prado alberga la mayor colección de pintura religiosa de España: El Greco, Velázquez, Zurbarán, Murillo, Rubens, Fra Angélico. Imprescindible Las Meninas y El Cristo Crucificado de Velázquez.',
    address: 'Paseo del Prado, s/n',
    neighborhood: 'Retiro',
    latitude: 40.4138,
    longitude: -3.6921,
    visitInfo: 'Lunes a sábado 10:00-20:00, domingos 10:00-19:00. 15€. Gratis 18:00-20:00.',
    website: 'https://museodelprado.es',
    highlight: true,
  },
  {
    id: 'pl_008',
    name: 'Monasterio de las Descalzas Reales',
    category: PlaceCategory.Museos,
    description: 'Convento del s. XVI fundado por Juana de Austria. Contiene una de las colecciones de arte religioso más importantes: tapices flamencos, esculturas, pintura.',
    address: 'Plaza de las Descalzas, 3',
    neighborhood: 'Sol',
    latitude: 40.4181,
    longitude: -3.7068,
    visitInfo: 'Mar-sáb 10:00-14:00 y 16:00-18:30. Domingos 10:00-15:00. 8€.',
    highlight: true,
  },
  {
    id: 'pl_009',
    name: 'Real Monasterio de la Encarnación',
    category: PlaceCategory.Museos,
    description: 'Fundado en 1611. Famoso por su relicario con más de 700 reliquias y por la milagrosa licuefacción anual de la sangre de San Pantaleón cada 27 de julio.',
    address: 'Plaza de la Encarnación, 1',
    neighborhood: 'Palacio',
    latitude: 40.4189,
    longitude: -3.7137,
    visitInfo: 'Mar-sáb 10:00-14:00 y 16:00-18:30. Domingos 10:00-15:00. 6€.',
  },

  // ==================== MONASTERIOS Y CONVENTOS ====================
  {
    id: 'pl_010',
    name: 'Monasterio de El Escorial',
    category: PlaceCategory.Monasterios,
    description: 'Patrimonio de la Humanidad. Monasterio jerónimo del s. XVI mandado construir por Felipe II. Panteón de los Reyes de España. A 1h en tren desde Madrid.',
    address: 'Av. Juan de Borbón y Battemberg, San Lorenzo de El Escorial',
    neighborhood: 'San Lorenzo de El Escorial',
    latitude: 40.5894,
    longitude: -4.1480,
    visitInfo: 'Mar-dom 10:00-18:00. 12€. Tren desde Atocha a El Escorial (1h).',
    website: 'https://patrimonionacional.es',
    highlight: true,
  },
  {
    id: 'pl_011',
    name: 'Valle de los Caídos / Cuelgamuros',
    category: PlaceCategory.Monasterios,
    description: 'Basílica subterránea con la cruz más alta del mundo (152m) y comunidad benedictina. Monumento histórico complejo, junto a El Escorial.',
    address: 'San Lorenzo de El Escorial',
    neighborhood: 'San Lorenzo de El Escorial',
    latitude: 40.6420,
    longitude: -4.1554,
    visitInfo: 'Consultar horarios actualizados. Acceso restringido.',
  },
  {
    id: 'pl_012',
    name: 'Cartuja de Santa María de El Paular',
    category: PlaceCategory.Monasterios,
    description: 'Antiguo monasterio cartujo del s. XIV en plena Sierra de Guadarrama. Combinación perfecta de espiritualidad y naturaleza. A 1h en coche desde Madrid.',
    address: 'Rascafría',
    neighborhood: 'Rascafría',
    latitude: 40.8862,
    longitude: -3.8849,
    visitInfo: 'Visitas guiadas mar-dom. Consultar web del monasterio.',
  },

  // ==================== RUTAS DEVOCIONALES ====================
  {
    id: 'pl_013',
    name: 'Madrid de los Austrias',
    category: PlaceCategory.Rutas,
    description: 'Ruta a pie por el Madrid del s. XVI-XVII: Plaza Mayor, Plaza de la Villa, San Miguel, Plaza Conde de Barajas. 90 minutos.',
    address: 'Punto inicio: Plaza Mayor',
    neighborhood: 'Sol / La Latina',
    latitude: 40.4155,
    longitude: -3.7074,
    visitInfo: 'Ruta libre, gratuita. Mejor por la mañana.',
    highlight: true,
  },
  {
    id: 'pl_014',
    name: 'Lugares de San Isidro Labrador',
    category: PlaceCategory.Rutas,
    description: 'Ruta por los lugares vinculados al patrón de Madrid: Pradera de San Isidro, Ermita, Colegiata, casa natal. Especialmente vivo en mayo.',
    address: 'Pradera de San Isidro',
    neighborhood: 'Carabanchel',
    latitude: 40.4019,
    longitude: -3.7332,
    visitInfo: 'Ruta libre. La Ermita abre 9:00-13:00 y 17:00-20:00.',
  },
  {
    id: 'pl_015',
    name: 'Casa Museo de San Juan de la Cruz',
    category: PlaceCategory.Rutas,
    description: 'En Segovia (a 30 min en AVE). Donde vivió y escribió parte de su obra el místico carmelita, doctor de la Iglesia.',
    address: 'Paseo del Padre Cipriano, Segovia',
    neighborhood: 'Segovia',
    latitude: 40.9405,
    longitude: -4.1138,
    visitInfo: 'Mar-dom 10:00-13:30 y 16:00-19:00. Donativo.',
  },
  // ============================================================
  // Norte de Madrid (Castellana / Chamartín / Chamberí)
  // ============================================================
  {
    id: 'pl_016',
    name: 'Iglesia de la Concepción',
    category: PlaceCategory.Iglesias,
    description: 'Templo neogótico del siglo XIX, conocido por sus vidrieras y por estar entre las parroquias más activas de Salamanca.',
    address: 'Calle de Goya, 26',
    neighborhood: 'Salamanca',
    latitude: 40.4264,
    longitude: -3.6789,
    visitInfo: 'Lunes a domingo 7:30-13:00 y 18:00-21:00. Entrada gratuita.',
    massSchedule: [
      'Lunes a viernes: 8:00 · 11:00 · 12:00 · 20:30',
      'Sábados y vísperas: 11:00 · 12:00 · 20:30',
      'Domingos y festivos: 10:00 · 11:00 · 12:00 · 13:00 · 20:30',
    ],
    confessionSchedule: 'Media hora antes de cada misa.',
  },
  {
    id: 'pl_017',
    name: 'Parroquia de Santa María Magdalena',
    category: PlaceCategory.Iglesias,
    description: 'Iglesia parroquial cercana a Plaza de Lima, frecuentada por feligreses del barrio de Chamartín.',
    address: 'Calle de Drácena, 23',
    neighborhood: 'Chamartín',
    latitude: 40.4561,
    longitude: -3.6766,
    visitInfo: 'Lunes a domingo 8:00-13:00 y 18:00-21:00. Entrada gratuita.',
    massSchedule: [
      'Lunes a sábado: 10:00 · 19:30',
      'Domingos y festivos: 10:00 · 11:00 (misa de niños) · 12:30 · 20:00',
    ],
    confessionSchedule: 'Media hora antes de cada misa.',
  },
  {
    id: 'pl_018',
    name: 'Museo Sorolla',
    category: PlaceCategory.Museos,
    description: 'Casa-museo del pintor Joaquín Sorolla en pleno barrio de Chamberí. Ambiente intimista entre obras y jardín.',
    address: 'Paseo del General Martínez Campos, 37',
    neighborhood: 'Chamberí',
    latitude: 40.4373,
    longitude: -3.6928,
    visitInfo: 'Mar-sáb 9:30-20:00, dom 10:00-15:00. 3€. Gratis sáb 14:00-20:00 y dom.',
  },
  {
    id: 'pl_019',
    name: 'Parroquia de la Virgen del Carmen y San Luis',
    category: PlaceCategory.Iglesias,
    description: 'Templo histórico en plena Gran Vía con culto regular y horario amplio para visitas y oración.',
    address: 'Calle del Carmen, 10',
    neighborhood: 'Sol',
    latitude: 40.4194,
    longitude: -3.7035,
    visitInfo: 'Lunes a domingo 8:00-13:30 y 18:00-21:00. Entrada gratuita.',
    website: 'https://parroquiadelcarmen.es',
    massSchedule: [
      'Lunes a viernes: 8:00 · 9:00 · 10:00 · 13:15 · 20:00',
      'Sábados: 9:00 · 10:00 · 13:15 · 18:00 · 19:00 · 20:00 · 21:00',
      'Domingos y festivos: 9:00 · 10:00 · 11:00 · 12:00 · 13:00 · 13:50 · 18:00 · 19:00 · 20:00 · 21:00',
    ],
    confessionSchedule: 'Durante todo el horario de apertura del templo.',
  },
];
