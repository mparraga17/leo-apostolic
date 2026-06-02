// ============================================================
// ActiveTrafficWidget.tsx — CORTES ACTIVOS EN "HOY"
// ============================================================
// Muestra, debajo de "dónde está el Papa", los cortes de tráfico
// activos en este momento. Si no hay ninguno, no renderiza nada.
// Incluye un botón para ir a la pantalla completa de Tráfico.
// ============================================================

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TrafficClosureCard from './TrafficClosureCard';
import { getActiveClosures } from '../utils/trafficStatus';
import { colors, typography, spacing } from '../theme/theme';
import { useI18n } from '../i18n';

export default function ActiveTrafficWidget({ onSeeAll }: { onSeeAll?: () => void }) {
  const { t } = useI18n();
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const active = getActiveClosures(now);
  if (active.length === 0) return null;

  // En Hoy mostramos como máximo los 2 cortes más graves (ya vienen ordenados)
  const shown = active.slice(0, 2);

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Ionicons name="warning" size={13} color={colors.liveRed} />
        <Text style={styles.label}>{t('traffic.inTodayTitle')}</Text>
      </View>
      {shown.map(c => <TrafficClosureCard key={c.id} closure={c} compact />)}
      <TouchableOpacity style={styles.seeAll} onPress={onSeeAll} activeOpacity={0.7}>
        <Text style={styles.seeAllText}>{t('traffic.seeAll')}</Text>
        <Ionicons name="chevron-forward" size={14} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.base,
    marginTop: spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  label: {
    ...typography.sectionHeader,
    color: colors.liveRed,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: spacing.sm,
  },
  seeAllText: {
    ...typography.footnote,
    color: colors.primary,
    fontWeight: '600',
  },
});
