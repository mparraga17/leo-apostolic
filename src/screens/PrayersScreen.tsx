// ============================================================
// PrayersScreen.tsx — Oraciones (estilo iOS Settings)
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { prayers } from '../data/prayers';
import { Prayer, PrayerCategory } from '../models/types';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';

function groupByCategory(items: Prayer[]) {
  const groups: Record<string, Prayer[]> = {};
  items.forEach(p => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  return Object.entries(groups) as [PrayerCategory, Prayer[]][];
}

export default function PrayersScreen() {
  const [selected, setSelected] = useState<Prayer | null>(null);
  const [showLatin, setShowLatin] = useState(false);
  const grouped = groupByCategory(prayers);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Las oraciones de siempre</Text>
          <Text style={styles.headerTitle}>Oraciones</Text>
        </View>

        {grouped.map(([category, items]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionLabel}>{category.toUpperCase()}</Text>
            <View style={styles.list}>
              {items.map((prayer, i) => (
                <TouchableOpacity
                  key={prayer.id}
                  style={[
                    styles.row,
                    i < items.length - 1 && styles.rowBorder,
                  ]}
                  onPress={() => {
                    setSelected(prayer);
                    setShowLatin(false);
                  }}
                  activeOpacity={0.5}
                >
                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{prayer.title}</Text>
                    {prayer.description && (
                      <Text style={styles.rowDescription} numberOfLines={1}>
                        {prayer.description}
                      </Text>
                    )}
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal de oración — sheet style iOS */}
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
                accessibilityRole="button"
              >
                <Ionicons name="close-circle" size={28} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalCategory}>{selected.category.toUpperCase()}</Text>
              <Text style={styles.modalTitle}>{selected.title}</Text>
              {selected.description && (
                <Text style={styles.modalDescription}>{selected.description}</Text>
              )}

              {selected.textLatin && (
                <View style={styles.toggleRow}>
                  <TouchableOpacity
                    style={[styles.toggle, !showLatin && styles.toggleActive]}
                    onPress={() => setShowLatin(false)}
                  >
                    <Text style={[styles.toggleText, !showLatin && styles.toggleTextActive]}>
                      Español
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggle, showLatin && styles.toggleActive]}
                    onPress={() => setShowLatin(true)}
                  >
                    <Text style={[styles.toggleText, showLatin && styles.toggleTextActive]}>
                      Latín
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.modalText}>
                {showLatin && selected.textLatin ? selected.textLatin : selected.text}
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
  scroll: { flex: 1 },
  content: { paddingBottom: spacing.xxl },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
  },
  headerSubtitle: {
    ...typography.subhead,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  headerTitle: {
    ...typography.display,
    color: colors.text,
  },

  section: {
    marginTop: spacing.lg,
  },
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
  rowTitle: {
    ...typography.bodyEmphasized,
    color: colors.text,
  },
  rowDescription: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.base,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.sm,
  },
  modalContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  modalCategory: {
    ...typography.sectionHeader,
    color: colors.primary,
    marginBottom: 4,
  },
  modalTitle: {
    ...typography.title1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  modalDescription: {
    ...typography.subhead,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.pill,
    padding: 3,
    marginBottom: spacing.lg,
    alignSelf: 'flex-start',
  },
  toggle: {
    paddingHorizontal: spacing.base,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  toggleActive: { backgroundColor: colors.text },
  toggleText: {
    ...typography.footnote,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  toggleTextActive: { color: colors.textInverse },
  modalText: {
    ...typography.quote,
    color: colors.text,
    fontSize: 18,
    lineHeight: 30,
  },
});
