// ============================================================
// TrafficScreen.tsx — CORTES DE TRÁFICO POR LA VISITA DEL PAPA
// ============================================================
// Muestra: cortes activos ahora, próximos cortes (48h) y el
// listado completo agrupado por día. Incluye aviso legal y
// enlaces a las fuentes oficiales (Ayuntamiento y EMT).
// ============================================================

import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrafficClosureCard from '../components/TrafficClosureCard';
import {
  getActiveClosures, getUpcomingClosures, getClosuresByDay,
} from '../utils/trafficStatus';
import {
  OFFICIAL_TRAFFIC_URL, OFFICIAL_EMT_URL, TRAFFIC_LAST_UPDATED,
} from '../data/trafficClosures';
import { colors, typography, spacing, radius } from '../theme/theme';
import { useI18n } from '../i18n';
import AdBanner from '../components/AdBanner';

function formatDayHeader(iso: string, locale: 'es' | 'en'): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export default function TrafficScreen() {
  const { t, locale } = useI18n();
  // Recalcula cada minuto para que "activos ahora" se mantenga al día
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const active = getActiveClosures(now);
  const upcoming = getUpcomingClosures(48, now);
  const byDay = getClosuresByDay();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{t('traffic.headerSubtitle')}</Text>
          <Text style={styles.headerTitle}>{t('traffic.headerTitle')}</Text>
        </View>

        {/* Cortes activos ahora */}
        <Text style={styles.sectionLabel}>{t('traffic.activeSection')}</Text>
        {active.length > 0 ? (
          active.map(c => <TrafficClosureCard key={c.id} closure={c} />)
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-circle-outline" size={20} color={colors.success} />
            <Text style={styles.emptyText}>{t('traffic.noneActive')}</Text>
          </View>
        )}

        {/* Próximos cortes (48h) */}
        {upcoming.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>{t('traffic.upcomingSection')}</Text>
            {upcoming.map(c => <TrafficClosureCard key={c.id} closure={c} />)}
          </>
        )}

        {/* Todos por día */}
        <Text style={styles.sectionLabel}>{t('traffic.byDaySection')}</Text>
        {byDay.map(({ date, closures }) => (
          <View key={date} style={styles.daySection}>
            <Text style={styles.dayHeader}>{formatDayHeader(date, locale)}</Text>
            {closures.map(c => <TrafficClosureCard key={c.id} closure={c} />)}
          </View>
        ))}

        {/* Enlaces oficiales */}
        <TouchableOpacity
          style={styles.officialButton}
          onPress={() => Linking.openURL(OFFICIAL_TRAFFIC_URL)}
          activeOpacity={0.7}
        >
          <Ionicons name="globe-outline" size={18} color={colors.primary} />
          <Text style={styles.officialButtonText}>{t('traffic.officialButton')}</Text>
          <Ionicons name="open-outline" size={15} color={colors.textTertiary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.officialButton}
          onPress={() => Linking.openURL(OFFICIAL_EMT_URL)}
          activeOpacity={0.7}
        >
          <Ionicons name="bus-outline" size={18} color={colors.primary} />
          <Text style={styles.officialButtonText}>{t('traffic.emtButton')}</Text>
          <Ionicons name="open-outline" size={15} color={colors.textTertiary} />
        </TouchableOpacity>

        {/* Aviso legal */}
        <Text style={styles.disclaimer}>
          {t('traffic.disclaimer', { date: TRAFFIC_LAST_UPDATED })}
        </Text>
      </ScrollView>
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

  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    marginHorizontal: spacing.base,
    padding: spacing.base,
    borderRadius: radius.md,
  },
  emptyText: {
    ...typography.subhead,
    color: colors.textSecondary,
    flex: 1,
  },

  daySection: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.sm,
  },
  dayHeader: {
    ...typography.headline,
    color: colors.brand,
    textTransform: 'capitalize',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },

  officialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    marginHorizontal: spacing.base,
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderRadius: radius.md,
  },
  officialButtonText: {
    ...typography.bodyEmphasized,
    color: colors.primary,
    flex: 1,
  },

  disclaimer: {
    ...typography.footnote,
    color: colors.textTertiary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    fontStyle: 'italic',
    lineHeight: 17,
    textAlign: 'center',
  },
});
