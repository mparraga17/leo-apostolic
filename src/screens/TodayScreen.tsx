// ============================================================
// TodayScreen.tsx — PANTALLA "HOY" (rediseño iOS premium)
// ============================================================

import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSaintOfTheDay } from '../data/saints';
import { prayers } from '../data/prayers';
import { getQuoteOfTheDay } from '../data/popeQuotes';
import PapalLocationCard from '../components/PapalLocationCard';
import LanguageToggle from '../components/LanguageToggle';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';
import { useI18n } from '../i18n';

const VISIT_START = new Date('2026-06-06T10:30:00');
const VISIT_END = new Date('2026-06-09T11:10:00');

function pickByDayOfYear<T>(items: T[], date: Date = new Date()): T {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return items[dayOfYear % items.length];
}

type VisitStatus =
  | { phase: 'before'; days: number; hours: number; minutes: number; seconds: number }
  | { phase: 'during' }
  | { phase: 'after' };

function getVisitStatus(now: Date = new Date()): VisitStatus {
  if (now < VISIT_START) {
    const diffMs = VISIT_START.getTime() - now.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    return { phase: 'before', days, hours, minutes, seconds };
  }
  if (now >= VISIT_START && now <= VISIT_END) {
    return { phase: 'during' };
  }
  return { phase: 'after' };
}

export default function TodayScreen() {
  const { t } = useI18n();
  const today = useMemo(() => new Date(), []);
  const saint = useMemo(() => getSaintOfTheDay(today), [today]);
  const prayerOfTheDay = useMemo(() => pickByDayOfYear(prayers, today), [today]);
  const popeQuote = useMemo(() => getQuoteOfTheDay(today), [today]);

  const [visitStatus, setVisitStatus] = useState<VisitStatus>(() => getVisitStatus());

  useEffect(() => {
    const interval = setInterval(() => setVisitStatus(getVisitStatus()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header — estilo iOS, no banner colorido */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Leo Apostolic</Text>
        <LanguageToggle />
      </View>

      {/* Cuenta atrás — card oscura premium */}
      {visitStatus.phase === 'before' && (
        <View style={styles.countdownCard}>
          <Text style={styles.countdownLabel}>{t('today.countdownLabel')}</Text>
          <View style={styles.countdownRow}>
            <CountdownBlock value={visitStatus.days} unit={t('today.days')} />
            <Divider />
            <CountdownBlock value={visitStatus.hours} unit={t('today.hours')} pad />
            <Divider />
            <CountdownBlock value={visitStatus.minutes} unit={t('today.minutes')} pad />
            <Divider />
            <CountdownBlock value={visitStatus.seconds} unit={t('today.seconds')} pad />
          </View>
          <Text style={styles.countdownSubtext}>
            {t('today.countdownDates')}
          </Text>
        </View>
      )}

      {visitStatus.phase === 'during' && <PapalLocationCard />}

      {/* Santo del día */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('today.saintOfTheDay')}</Text>
        <View style={styles.card}>
          {saint.isFeast && (
            <View style={styles.feastBadge}>
              <Ionicons name="star" size={11} color={colors.primary} />
              <Text style={styles.feastBadgeText}>{t('today.feastBadge')}</Text>
            </View>
          )}
          <Text style={styles.saintName}>{saint.name}</Text>
          <Text style={styles.saintDescription}>{saint.description}</Text>
        </View>
      </View>

      {/* Frase del Papa */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('today.popeQuote')}</Text>
        <View style={[styles.card, styles.cardQuote]}>
          <Ionicons name="chatbubble-outline" size={22} color={colors.primary} style={{ marginBottom: spacing.sm }} />
          <Text style={styles.quoteText} numberOfLines={8}>{popeQuote.text}</Text>
          <Text style={styles.quoteSource}>— {popeQuote.source}</Text>
        </View>
      </View>

      {/* Oración del día */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('today.prayerOfTheDay')}</Text>
        <View style={styles.card}>
          <Text style={styles.prayerTitle}>{prayerOfTheDay.title}</Text>
          <Text style={styles.prayerText} numberOfLines={6}>{prayerOfTheDay.text}</Text>
          <View style={styles.prayerHintRow}>
            <Text style={styles.prayerHint}>Más oraciones</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          </View>
        </View>
      </View>

      {/* Cita pastoral */}
      <View style={styles.blessing}>
        <Text style={styles.blessingText}>
          Que el Señor te bendiga y te guarde,{'\n'}
          que su luz brille sobre ti.
        </Text>
      </View>
    </ScrollView>
  );
}

// ---- Sub-componentes ----

function CountdownBlock({ value, unit, pad }: { value: number; unit: string; pad?: boolean }) {
  const display = pad ? String(value).padStart(2, '0') : String(value);
  return (
    <View style={styles.countdownBlock}>
      <Text style={styles.countdownNumber}>{display}</Text>
      <Text style={styles.countdownUnit}>{unit}</Text>
    </View>
  );
}

function Divider() {
  return <Text style={styles.countdownDivider}>:</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },

  // ---- Header ----
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appTitle: {
    ...typography.display,
    color: colors.text,
  },

  // ---- Cuenta atrás ----
  countdownCard: {
    marginHorizontal: spacing.base,
    marginVertical: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.base,
    backgroundColor: colors.text,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...shadows.card,
  },
  countdownLabel: {
    ...typography.caption,
    color: colors.primarySoft,
    letterSpacing: 1.5,
    marginBottom: spacing.base,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  countdownBlock: {
    alignItems: 'center',
    minWidth: 48,
  },
  countdownNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textInverse,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  countdownUnit: {
    ...typography.caption,
    color: colors.primarySoft,
    marginTop: 2,
  },
  countdownDivider: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.primarySoft,
    opacity: 0.4,
    marginTop: -10,
  },
  countdownSubtext: {
    ...typography.subhead,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.base,
  },

  // ---- Sección genérica ----
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.base,
  },
  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },

  // ---- Card base ----
  card: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    padding: spacing.base + 2,
    ...shadows.card,
  },

  // ---- Santo del día ----
  feastBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    gap: 4,
    marginBottom: spacing.sm,
  },
  feastBadgeText: {
    ...typography.caption,
    color: colors.primary,
    letterSpacing: 1,
  },
  saintName: {
    ...typography.title3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  saintDescription: {
    ...typography.body,
    color: colors.textSecondary,
  },

  // ---- Cita del Papa ----
  cardQuote: {
    backgroundColor: colors.primaryMuted,
  },
  quoteText: {
    ...typography.quote,
    color: colors.text,
    fontStyle: 'italic',
  },
  quoteSource: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },

  // ---- Oración del día ----
  prayerTitle: {
    ...typography.title3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  prayerText: {
    ...typography.quote,
    color: colors.textSecondary,
  },
  prayerHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.md,
  },
  prayerHint: {
    ...typography.footnote,
    color: colors.primary,
    fontWeight: '600',
  },

  // ---- Bendición final ----
  blessing: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  blessingText: {
    ...typography.quote,
    color: colors.textTertiary,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 22,
  },
});
