// ============================================================
// PlacesScreen.tsx — Lugares (estilo iOS premium)
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { places, PlaceCategory, CulturalPlace } from '../data/places';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';
import { useI18n } from '../i18n';
import AdBanner from '../components/AdBanner';

function groupByCategory(items: CulturalPlace[]) {
  const groups: Record<string, CulturalPlace[]> = {};
  items.forEach(p => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  return Object.entries(groups) as [PlaceCategory, CulturalPlace[]][];
}

function categoryIcon(category: PlaceCategory): keyof typeof Ionicons.glyphMap {
  switch (category) {
    case PlaceCategory.Iglesias: return 'business';
    case PlaceCategory.Museos: return 'image';
    case PlaceCategory.Monasterios: return 'home';
    case PlaceCategory.Rutas: return 'walk';
  }
}

export default function PlacesScreen() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<CulturalPlace | null>(null);
  const grouped = groupByCategory(places);
  const featured = places.filter(p => p.highlight);

  const openInMaps = (place: CulturalPlace) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{t('places.headerSubtitle')}</Text>
          <Text style={styles.headerTitle}>{t('places.headerTitle')}</Text>
        </View>

        {/* Imprescindibles */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('places.featuredSection')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {featured.map(place => (
              <TouchableOpacity
                key={place.id}
                style={styles.featuredCard}
                onPress={() => setSelected(place)}
                activeOpacity={0.85}
              >
                <View style={styles.featuredHeader}>
                  <Ionicons name={categoryIcon(place.category)} size={14} color={colors.primary} />
                  <Text style={styles.featuredCategory} numberOfLines={1}>
                    {place.category}
                  </Text>
                </View>
                <Text style={styles.featuredName} numberOfLines={2}>{place.name}</Text>
                <Text style={styles.featuredHood} numberOfLines={1}>{place.neighborhood}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Por categoría */}
        {grouped.map(([category, items]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionLabel}>{category.toUpperCase()}</Text>
            <View style={styles.list}>
              {items.map((place, i) => (
                <TouchableOpacity
                  key={place.id}
                  style={[styles.row, i < items.length - 1 && styles.rowBorder]}
                  onPress={() => setSelected(place)}
                  activeOpacity={0.5}
                >
                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{place.name}</Text>
                    <Text style={styles.rowMeta}>{place.neighborhood}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal detalle */}
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
              <Text style={styles.modalTitle}>{selected.name}</Text>

              <View style={styles.detailCard}>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={18} color={colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.detailValue}>{selected.address}</Text>
                    <Text style={styles.detailSubvalue}>{selected.neighborhood}</Text>
                  </View>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={18} color={colors.primary} />
                  <Text style={styles.detailValue}>{selected.visitInfo}</Text>
                </View>
              </View>

              <Text style={styles.detailDescription}>{selected.description}</Text>

              {selected.massSchedule && selected.massSchedule.length > 0 && (
                <View style={styles.scheduleCard}>
                  <View style={styles.scheduleHeader}>
                    <Ionicons name="book-outline" size={16} color={colors.primary} />
                    <Text style={styles.scheduleTitle}>{t('places.massScheduleTitle')}</Text>
                  </View>
                  {selected.massSchedule.map((line, i) => (
                    <Text key={i} style={styles.scheduleLine}>{line}</Text>
                  ))}
                </View>
              )}

              {selected.confessionSchedule && (
                <View style={styles.scheduleCard}>
                  <View style={styles.scheduleHeader}>
                    <Ionicons name="hand-left-outline" size={16} color={colors.primary} />
                    <Text style={styles.scheduleTitle}>{t('places.confessionsTitle')}</Text>
                  </View>
                  <Text style={styles.scheduleLine}>{selected.confessionSchedule}</Text>
                </View>
              )}

              <Text style={styles.scheduleDisclaimer}>
                {t('places.scheduleDisclaimer')}
              </Text>

              <TouchableOpacity
                style={styles.directionsBtn}
                onPress={() => openInMaps(selected)}
                accessibilityLabel={t('places.directionsButton')}
                activeOpacity={0.8}
              >
                <Ionicons name="navigate" size={18} color={colors.textInverse} />
                <Text style={styles.directionsBtnText}>{t('places.directionsButton')}</Text>
              </TouchableOpacity>

              {selected.website && (
                <TouchableOpacity
                  style={styles.websiteBtn}
                  onPress={() => Linking.openURL(selected.website!)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="globe-outline" size={18} color={colors.primary} />
                  <Text style={styles.websiteBtnText}>{t('places.websiteButton')}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}
      </Modal>
      <AdBanner />
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

  section: { marginTop: spacing.lg },
  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },

  horizontalList: { paddingHorizontal: spacing.base },
  featuredCard: {
    width: 180,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    ...shadows.card,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  featuredCategory: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  featuredName: { ...typography.subhead, fontWeight: '600', color: colors.text, minHeight: 38 },
  featuredHood: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },

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
  modalTitle: { ...typography.title1, color: colors.text, marginBottom: spacing.lg },

  detailCard: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...shadows.card,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailValue: { ...typography.body, color: colors.text },
  detailSubvalue: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },
  detailDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginVertical: spacing.md,
    marginLeft: spacing.lg + 4,
  },
  detailDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },

  scheduleCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  scheduleTitle: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  scheduleLine: {
    ...typography.footnote,
    color: colors.text,
    lineHeight: 22,
  },
  scheduleDisclaimer: {
    ...typography.caption,
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
    lineHeight: 16,
  },

  directionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.text,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  directionsBtnText: { ...typography.bodyEmphasized, color: colors.textInverse },
  websiteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  websiteBtnText: { ...typography.bodyEmphasized, color: colors.primary },
});
