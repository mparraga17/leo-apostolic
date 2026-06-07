// ============================================================
// TrafficScreen.tsx — CORTES DE TRÁFICO POR LA VISITA DEL PAPA
// ============================================================
// Selector de ciudad (Madrid, Barcelona, Gran Canaria, Tenerife)
// y, para la ciudad elegida: cortes activos ahora, próximos (48h),
// listado por día, fuentes oficiales propias y aviso legal.
// ============================================================

import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrafficClosureCard from '../components/TrafficClosureCard';
import {
  getActiveClosures, getUpcomingClosures, getClosuresByDay, getClosuresForCity,
} from '../utils/trafficStatus';
import { CITIES_ORDERED, getCityInfo, getActiveCity } from '../data/cities';
import { City } from '../models/types';
import { colors, typography, spacing, radius } from '../theme/theme';
import { useI18n } from '../i18n';
import AdBanner from '../components/AdBanner';

function formatDayHeader(iso: string, locale: 'es' | 'en' | 'ca'): string {
  const d = new Date(`${iso}T00:00:00`);
  const tag = locale === 'en' ? 'en-GB' : locale === 'ca' ? 'ca-ES' : 'es-ES';
  return d.toLocaleDateString(tag, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

export default function TrafficScreen() {
  const { t, locale } = useI18n();
  const [selectedCity, setSelectedCity] = useState<City>(() => getActiveCity());
  // Recalcula cada minuto para que "activos ahora" se mantenga al día
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const cityInfo = getCityInfo(selectedCity);
  const active = getActiveClosures(now, selectedCity);
  const upcoming = getUpcomingClosures(48, now, selectedCity);
  const byDay = getClosuresByDay(selectedCity);
  const cityHasClosures = useMemo(
    () => getClosuresForCity(selectedCity).length > 0,
    [selectedCity],
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{t('traffic.headerSubtitle')}</Text>
          <Text style={styles.headerTitle}>{t('traffic.headerTitle')}</Text>
        </View>

        {/* Selector de ciudad */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cityTabs}
        >
          {CITIES_ORDERED.map(city => {
            const selected = city.id === selectedCity;
            return (
              <TouchableOpacity
                key={city.id}
                style={[styles.cityTab, selected && styles.cityTabActive]}
                onPress={() => setSelectedCity(city.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.cityTabText, selected && styles.cityTabTextActive]}>
                  {locale === 'en' ? city.nameEn : city.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {!cityHasClosures ? (
          <View style={styles.emptyCard}>
            <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.emptyText}>{t('traffic.noneCity')}</Text>
          </View>
        ) : (
          <>
            {/* Cortes activos ahora */}
            <Text style={styles.sectionLabel}>{t('traffic.activeSection')}</Text>
            <View style={styles.sectionBody}>
              {active.length > 0 ? (
                active.map(c => <TrafficClosureCard key={c.id} closure={c} />)
              ) : (
                <View style={styles.emptyCard}>
                  <Ionicons name="checkmark-circle-outline" size={20} color={colors.success} />
                  <Text style={styles.emptyText}>{t('traffic.noneActive')}</Text>
                </View>
              )}
            </View>

            {/* Próximos cortes (48h) */}
            {upcoming.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>{t('traffic.upcomingSection')}</Text>
                <View style={styles.sectionBody}>
                  {upcoming.map(c => <TrafficClosureCard key={c.id} closure={c} />)}
                </View>
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
          </>
        )}

        {/* Fuentes oficiales de la ciudad */}
        <Text style={styles.sectionLabel}>{t('traffic.officialSourcesTitle')}</Text>
        {cityInfo.trafficSources.map(source => (
          <TouchableOpacity
            key={source.url}
            style={styles.officialButton}
            onPress={() => Linking.openURL(source.url)}
            activeOpacity={0.7}
          >
            <Ionicons name={source.icon} size={18} color={colors.primary} />
            <Text style={styles.officialButtonText}>{t(source.labelKey)}</Text>
            <Ionicons name="open-outline" size={15} color={colors.textTertiary} />
          </TouchableOpacity>
        ))}

        {/* Aviso legal */}
        <Text style={styles.disclaimer}>
          {t('traffic.disclaimer', { date: cityInfo.trafficLastUpdated })}
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

  cityTabs: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  cityTab: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.backgroundElevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  cityTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cityTabText: { ...typography.subhead, color: colors.textSecondary, fontWeight: '600' },
  cityTabTextActive: { color: colors.textInverse },

  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  sectionBody: {
    marginHorizontal: spacing.base,
  },

  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    padding: spacing.base,
    marginHorizontal: spacing.base,
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
