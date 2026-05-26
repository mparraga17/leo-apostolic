// ============================================================
// modernMusic.ts — MÚSICA CRISTIANA MODERNA (enlaces externos)
// ============================================================
// IMPORTANTE: La app NO almacena ni reproduce las letras ni
// el audio de estas canciones. Solo enlaza a Spotify, donde
// el usuario puede escucharlas legalmente.
//
// Esto evita problemas de copyright que tendríamos si
// incluyéramos las letras en la app.
//
// URLs verificadas en Spotify (mayo 2026).
// ============================================================

export interface ModernSong {
  id: string;
  title: string;
  artist: string;
  spotifyUrl: string;
  category: 'alabanza' | 'eucaristico' | 'mariano' | 'jovenes';
}

export interface ArtistPlaylist {
  id: string;
  name: string;
  description: string;
  spotifyUrl: string;
}

// ---- CANCIONES INDIVIDUALES (Hakuna Group Music y otros) ----
export const modernSongs: ModernSong[] = [
  // Himno oficial de la visita del Papa a España (mayo 2026)
  {
    id: 'mod_000',
    title: 'Alza la mirada',
    artist: 'Himno oficial — Visita del Papa León XIV',
    spotifyUrl: 'https://open.spotify.com/track/03QgYgZ0JZ5usst2UxT3oy',
    category: 'alabanza',
  },
  // tuyo (banda católica española)
  {
    id: 'mod_010',
    title: 'Primero el cielo',
    artist: 'tuyo',
    spotifyUrl: 'https://open.spotify.com/track/0pNdZHNZHvNpZ8uPTHeYVr',
    category: 'alabanza',
  },
  {
    id: 'mod_011',
    title: 'Quiero quererte (Acústico)',
    artist: 'tuyo',
    spotifyUrl: 'https://open.spotify.com/track/6zF2P6DHVjqeLVJ5rHNQ0f',
    category: 'alabanza',
  },
  // Eduardo Meana (compositor) — versión Coro Laraland
  {
    id: 'mod_012',
    title: 'En mi Getsemaní',
    artist: 'Coro Laraland (composición de Eduardo Meana)',
    spotifyUrl: 'https://open.spotify.com/track/5sW6yptaox1tEDslGuxwcI',
    category: 'alabanza',
  },
  // Hakuna Group Music — top tracks verificados
  {
    id: 'mod_001',
    title: 'Huracán',
    artist: 'Hakuna Group Music',
    spotifyUrl: 'https://open.spotify.com/track/4QgQabkpEzVvTflLhiYtun',
    category: 'alabanza',
  },
  {
    id: 'mod_002',
    title: 'La Fila',
    artist: 'Hakuna Group Music',
    spotifyUrl: 'https://open.spotify.com/track/2Fwhtw2BXjcg846WNAXOKD',
    category: 'alabanza',
  },
  {
    id: 'mod_003',
    title: '(Tú) El único rey',
    artist: 'Tuyo, Hakuna Group Music',
    spotifyUrl: 'https://open.spotify.com/track/7pJPgTTyrec9ldDMkeqEEN',
    category: 'alabanza',
  },
  {
    id: 'mod_004',
    title: 'A Ti te alabo',
    artist: 'Hakuna Group Music',
    spotifyUrl: 'https://open.spotify.com/track/6XLPxmYdva9RIwEDYL2YHt',
    category: 'alabanza',
  },
  {
    id: 'mod_005',
    title: 'Sencillamente',
    artist: 'Hakuna Group Music',
    spotifyUrl: 'https://open.spotify.com/track/1t7i3ZQgjhU341Il43ijW8',
    category: 'alabanza',
  },
];

// ---- PLAYLISTS Y ARTISTAS COMPLETOS ----
export const playlists: ArtistPlaylist[] = [
  {
    id: 'pl_001',
    name: 'This Is Hakuna Group Music',
    description: 'Playlist oficial de Spotify con lo mejor del grupo',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DZ06evO4B5moO',
  },
  {
    id: 'pl_002',
    name: 'Hakuna Group Music — Artista',
    description: 'Discografía completa de Hakuna Group Music',
    spotifyUrl: 'https://open.spotify.com/artist/7Lemn0MD6Cb2QfmeZJ5BwS',
  },
  {
    id: 'pl_003',
    name: 'Athenas — Artista',
    description: 'Música cristiana contemporánea',
    spotifyUrl: 'https://open.spotify.com/artist/71IIrUaZMShJKwuwIZVVwu',
  },
];

// ---- BÚSQUEDAS PREDEFINIDAS ----
// Para que el usuario explore más por su cuenta
export const musicSearches = [
  {
    id: 'srch_001',
    label: '🎶 Música cristiana en español',
    spotifyUrl: 'https://open.spotify.com/search/musica%20cristiana%20espa%C3%B1ol',
  },
  {
    id: 'srch_002',
    label: '🙏 Música para la oración',
    spotifyUrl: 'https://open.spotify.com/search/musica%20cristiana%20oracion',
  },
  {
    id: 'srch_003',
    label: '✨ Adoración eucarística',
    spotifyUrl: 'https://open.spotify.com/search/adoracion%20eucaristica',
  },
  {
    id: 'srch_004',
    label: '⛪ Cantos de misa',
    spotifyUrl: 'https://open.spotify.com/search/cantos%20misa%20catolica',
  },
];
