// ============================================================
// theme.ts — SISTEMA DE DISEÑO CENTRALIZADO
// ============================================================
// Inspirado en las Human Interface Guidelines de Apple.
// Paleta cálida y serena, propia de un devocionario premium.
// ============================================================

// ---- COLORES ----
// Paleta inspirada en el branding "Leo Apostolic":
// navy profundo + dorado vaticano. Elegante y solemne.
export const colors = {
  // Primario: dorado refinado vaticano
  primary: '#C9A55A',           // Dorado del logo
  primarySoft: '#E0C685',       // Dorado claro para acentos
  primaryMuted: '#F5EDD8',      // Crema dorado para fondos sutiles

  // Brand: navy profundo del logo
  brand: '#161B33',             // Navy oscuro del fondo del logo
  brandSoft: '#22284A',         // Navy ligeramente más claro

  // Fondos
  background: '#FBF9F4',        // Crema cálido, casi blanco
  backgroundElevated: '#FFFFFF', // Blanco puro para cards
  backgroundSecondary: '#F4F1EA', // Para secciones hundidas

  // Texto
  text: '#1C1B17',              // Casi negro, cálido
  textSecondary: '#6B6760',     // Gris cálido
  textTertiary: '#A09B91',      // Gris claro
  textInverse: '#FFFFFF',

  // Estados
  success: '#3D8B5A',           // Verde apagado
  liveRed: '#B83333',           // Rojo cardenalicio para "en directo"

  // Separadores y bordes
  separator: 'rgba(0, 0, 0, 0.08)',
  border: 'rgba(0, 0, 0, 0.05)',

  // Sombras
  shadow: 'rgba(22, 27, 51, 0.10)', // Sombra navy sutil
};

// ---- ESPACIADO ----
// Sistema de 4px (4, 8, 12, 16, 24, 32, 48). Apple lo usa así.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ---- RADIOS ----
// Apple usa esquinas suavemente redondeadas, no cuadradas ni muy redondas.
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,            // El radio del icono de iOS
  pill: 999,         // Para chips
};

// ---- TIPOGRAFÍA ----
// Apple usa SF Pro para UI y New York para serif.
// En React Native sin custom fonts, usamos los system defaults
// que mapean a estas fuentes en iOS automáticamente.
export const typography = {
  // Display (títulos grandes hero)
  display: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  // Title 1 (títulos de pantalla)
  title1: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  // Title 2 (cabeceras de modal)
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  // Title 3 (títulos de tarjeta)
  title3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  // Headline (subtítulos)
  headline: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600' as const,
  },
  // Body (texto normal)
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  // Body emphasized
  bodyEmphasized: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500' as const,
  },
  // Subhead (detalles)
  subhead: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400' as const,
  },
  // Footnote (anotaciones)
  footnote: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  // Caption (etiquetas pequeñas)
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500' as const,
  },
  // Section header (UPPERCASE pequeño)
  sectionHeader: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
    letterSpacing: 1,
  },
  // Quote (texto serif para frases del Papa, oraciones)
  quote: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400' as const,
    fontFamily: 'Georgia',  // Serif elegante en iOS
  },
};

// ---- SOMBRAS ----
// Las sombras de Apple son MUY sutiles, casi imperceptibles.
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  card: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHover: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
};
