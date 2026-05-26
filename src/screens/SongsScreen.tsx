// ============================================================
// SongsScreen.tsx — Cancionero (estilo iOS premium)
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { songs } from '../data/songs';
import { Song, SongCategory } from '../models/types';
import { modernSongs, playlists, musicSearches } from '../data/modernMusic';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';

type Tab = 'traditional' | 'modern';

function groupByCategory(items: Song[]) {
  const groups: Record<string, Song[]> = {};
  items.forEach(s => {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  });
  return Object.entries(groups) as [SongCategory, Song[]][];
}

export default function SongsScreen() {
  const [tab, setTab] = useState<Tab>('traditional');
  const [selected, setSelected] = useState<Song | null>(null);
  const [showLatin, setShowLatin] = useState(true);
  const grouped = groupByCategory(songs);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Tradicionales y modernos</Text>
          <Text style={styles.headerTitle}>Cantos</Text>
        </View>

        {/* Segmented control */}
        <View style={styles.segmented}>
          {(['traditional', 'modern'] as Tab[]).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.segment, tab === t && styles.segmentActive]}
              onPress={() => setTab(t)}
              activeOpacity={0.7}
            >
              <Text style={[styles.segmentText, tab === t && styles.segmentTextActive]}>
                {t === 'traditional' ? 'Tradicionales' : 'Modernos'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'traditional' && (
          <>
            {grouped.map(([category, items]) => (
              <View key={category} style={styles.section}>
                <Text style={styles.sectionLabel}>{category.toUpperCase()}</Text>
                <View style={styles.list}>
                  {items.map((song, i) => (
                    <TouchableOpacity
                      key={song.id}
                      style={[styles.row, i < items.length - 1 && styles.rowBorder]}
                      onPress={() => { setSelected(song); setShowLatin(true); }}
                      activeOpacity={0.5}
                    >
                      <View style={styles.rowContent}>
                        <Text style={styles.rowTitle}>{song.title}</Text>
                        {song.author && (
                          <Text style={styles.rowMeta}>
                            {song.author}{song.century ? ` · ${song.century}` : ''}
                          </Text>
                        )}
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
            <Text style={styles.disclaimer}>
              Cantos del repertorio gregoriano y litúrgico, en dominio público.
            </Text>
          </>
        )}

        {tab === 'modern' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>HAKUNA GROUP MUSIC</Text>
              <View style={styles.list}>
                {modernSongs.map((song, i) => (
                  <TouchableOpacity
                    key={song.id}
                    style={[styles.row, i < modernSongs.length - 1 && styles.rowBorder]}
                    onPress={() => Linking.openURL(song.spotifyUrl)}
                    activeOpacity={0.5}
                  >
                    <View style={styles.spotifyDot}>
                      <Ionicons name="play" size={12} color="#fff" />
                    </View>
                    <View style={styles.rowContent}>
                      <Text style={styles.rowTitle}>{song.title}</Text>
                      <Text style={styles.rowMeta}>{song.artist}</Text>
                    </View>
                    <Ionicons name="open-outline" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>PLAYLISTS</Text>
              <View style={styles.list}>
                {playlists.map((pl, i) => (
                  <TouchableOpacity
                    key={pl.id}
                    style={[styles.row, i < playlists.length - 1 && styles.rowBorder]}
                    onPress={() => Linking.openURL(pl.spotifyUrl)}
                    activeOpacity={0.5}
                  >
                    <View style={styles.spotifyDot}>
                      <Ionicons name="albums" size={12} color="#fff" />
                    </View>
                    <View style={styles.rowContent}>
                      <Text style={styles.rowTitle}>{pl.name}</Text>
                      <Text style={styles.rowMeta} numberOfLines={1}>{pl.description}</Text>
                    </View>
                    <Ionicons name="open-outline" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>EXPLORAR EN SPOTIFY</Text>
              <View style={styles.list}>
                {musicSearches.map((s, i) => (
                  <TouchableOpacity
                    key={s.id}
                    style={[styles.row, i < musicSearches.length - 1 && styles.rowBorder]}
                    onPress={() => Linking.openURL(s.spotifyUrl)}
                    activeOpacity={0.5}
                  >
                    <View style={styles.rowContent}>
                      <Text style={styles.rowTitle}>{s.label}</Text>
                    </View>
                    <Ionicons name="open-outline" size={16} color={colors.textTertiary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={styles.disclaimer}>
              Las canciones modernas se reproducen desde Spotify para respetar los derechos de autor.
            </Text>
          </>
        )}
      </ScrollView>

      {/* Modal canto tradicional */}
      <Modal
        visible={selected !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() => setSelected(null)}
                hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
                accessibilityLabel="Cerrar"
              >
                <Ionicons name="close-circle" size={28} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalCategory}>{selected.category.toUpperCase()}</Text>
              <Text style={styles.modalTitle}>{selected.title}</Text>
              {selected.author && (
                <Text style={styles.modalAuthor}>
                  {selected.author}{selected.century ? ` · ${selected.century}` : ''}
                </Text>
              )}
              {selected.textLatin && (
                <View style={styles.toggleRow}>
                  <TouchableOpacity
                    style={[styles.toggle, showLatin && styles.toggleActive]}
                    onPress={() => setShowLatin(true)}
                  >
                    <Text style={[styles.toggleText, showLatin && styles.toggleTextActive]}>Latín</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggle, !showLatin && styles.toggleActive]}
                    onPress={() => setShowLatin(false)}
                  >
                    <Text style={[styles.toggleText, !showLatin && styles.toggleTextActive]}>Español</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.modalText}>
                {showLatin && selected.textLatin ? selected.textLatin : selected.textSpanish}
              </Text>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
  },
  headerSubtitle: { ...typography.subhead, color: colors.textSecondary, marginBottom: 4 },
  headerTitle: { ...typography.display, color: colors.text },

  segmented: {
    flexDirection: 'row',
    marginHorizontal: spacing.base,
    marginVertical: spacing.sm,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    padding: 3,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: radius.sm,
  },
  segmentActive: {
    backgroundColor: colors.backgroundElevated,
    ...shadows.card,
  },
  segmentText: { ...typography.subhead, color: colors.textSecondary, fontWeight: '600' },
  segmentTextActive: { color: colors.text },

  section: { marginTop: spacing.lg },
  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  list: {
    backgroundColor: colors.backgroundElevated,
    marginHorizontal: spacing.base,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  rowContent: { flex: 1 },
  rowTitle: { ...typography.bodyEmphasized, color: colors.text },
  rowMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },

  spotifyDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disclaimer: {
    ...typography.footnote,
    color: colors.textTertiary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },

  // Modal
  modalContainer: { flex: 1, backgroundColor: colors.background },
  modalHeader: {
    flexDirection: 'row',
    paddingTop: spacing.base,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.sm,
  },
  modalContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  modalCategory: { ...typography.sectionHeader, color: colors.primary, marginBottom: 4 },
  modalTitle: { ...typography.title1, color: colors.text },
  modalAuthor: {
    ...typography.subhead,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.pill,
    padding: 3,
    marginBottom: spacing.lg,
    alignSelf: 'flex-start',
  },
  toggle: { paddingHorizontal: spacing.base, paddingVertical: 6, borderRadius: radius.pill },
  toggleActive: { backgroundColor: colors.text },
  toggleText: { ...typography.footnote, color: colors.textSecondary, fontWeight: '600' },
  toggleTextActive: { color: colors.textInverse },
  modalText: { ...typography.quote, color: colors.text, fontSize: 18, lineHeight: 30 },
});
