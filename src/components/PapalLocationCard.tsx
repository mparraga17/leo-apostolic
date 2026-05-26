// ============================================================
// PapalLocationCard.tsx — WIDGET "DÓNDE ESTÁ EL PAPA" (premium)
// ============================================================

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPapalLocationStatus, formatMinutesUntil, LocationStatus } from '../utils/papalLocation';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';

export default function PapalLocationCard() {
  const [status, setStatus] = useState<LocationStatus>(() => getPapalLocationStatus());

  useEffect(() => {
    const interval = setInterval(() => setStatus(getPapalLocationStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (status.phase === 'before' || status.phase === 'finished') return null;

  if (status.phase === 'now') {
    return (
      <View style={[styles.card, styles.cardLive]}>
        <View style={styles.row}>
          <View style={styles.liveDot} />
          <Text style={styles.liveLabel}>EL PAPA AHORA</Text>
        </View>
        <Text style={[styles.title, styles.titleLight]}>{status.event.title}</Text>
        <View style={styles.row}>
          <Ionicons name="location" size={14} color="rgba(255,255,255,0.85)" />
          <Text style={[styles.location, styles.locationLight]}>{status.event.location}</Text>
        </View>
        <Text style={styles.timeLight}>
          Desde las {status.event.startTime}
          {status.event.endTime ? ` hasta ${status.event.endTime}` : ''}
        </Text>
      </View>
    );
  }

  if (status.phase === 'next') {
    return (
      <View style={[styles.card, styles.cardNext]}>
        <Text style={styles.nextLabel}>PRÓXIMO ACTO</Text>
        <Text style={styles.title}>{status.event.title}</Text>
        <View style={styles.row}>
          <Ionicons name="location" size={14} color={colors.textSecondary} />
          <Text style={styles.location}>{status.event.location}</Text>
        </View>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={14} color={colors.primary} />
          <Text style={styles.timerText}>En {formatMinutesUntil(status.minutesUntil)}</Text>
          <Text style={styles.timeMuted}>· {status.event.startTime}</Text>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.base,
    marginVertical: spacing.sm,
    padding: spacing.base + 2,
    borderRadius: radius.lg,
    ...shadows.card,
  },
  cardLive: {
    backgroundColor: colors.liveRed,
  },
  cardNext: {
    backgroundColor: colors.backgroundElevated,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  liveLabel: {
    ...typography.caption,
    color: '#fff',
    letterSpacing: 1.5,
  },
  nextLabel: {
    ...typography.caption,
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: spacing.xs,
  },

  title: {
    ...typography.title3,
    color: colors.text,
    marginVertical: 4,
  },
  titleLight: {
    color: '#fff',
  },
  location: {
    ...typography.subhead,
    color: colors.textSecondary,
    flex: 1,
  },
  locationLight: {
    color: 'rgba(255,255,255,0.85)',
  },
  timeLight: {
    ...typography.footnote,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
  timerText: {
    ...typography.bodyEmphasized,
    color: colors.primary,
  },
  timeMuted: {
    ...typography.subhead,
    color: colors.textTertiary,
  },
});
