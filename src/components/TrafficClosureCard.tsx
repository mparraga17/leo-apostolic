// ============================================================
// TrafficClosureCard.tsx — TARJETA DE UN CORTE DE TRÁFICO
// ============================================================
// Componente reutilizable que muestra un corte: zona, calles,
// gravedad (color) y vigencia. Se usa en la pantalla de Tráfico,
// en "Hoy" y en el detalle de cada evento.
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TrafficClosure, TrafficSeverity } from '../models/types';
import { colors, typography, spacing, radius } from '../theme/theme';
import { useI18n } from '../i18n';
import { buildClosureMapUrl } from '../utils/trafficStatus';

interface Props {
  closure: TrafficClosure;
  compact?: boolean;   // versión reducida (para Hoy y detalle de evento)
}

// Paleta translúcida por severidad (estilo iOS: superficies tintadas
// muy sutiles + badge tipo "pill" con color suave, en vez de barras
// de color sólido). Cada severidad define: tinte de fondo de la tarjeta,
// fondo del badge y color de texto/acento.
function severityPalette(sev: TrafficSeverity): { surface: string; badgeBg: string; border: string; accent: string } {
  switch (sev) {
    case TrafficSeverity.Total:
      return { surface: 'rgba(184,51,51,0.035)', badgeBg: 'rgba(184,51,51,0.11)', border: 'rgba(184,51,51,0.14)', accent: colors.liveRed };
    case TrafficSeverity.Parcial:
      return { surface: 'rgba(199,122,51,0.035)', badgeBg: 'rgba(199,122,51,0.11)', border: 'rgba(199,122,51,0.14)', accent: '#B06A28' };
    case TrafficSeverity.Afectado:
      return { surface: 'rgba(201,165,90,0.04)', badgeBg: 'rgba(201,165,90,0.14)', border: 'rgba(201,165,90,0.18)', accent: '#9A7B33' };
    default:
      return { surface: colors.backgroundElevated, badgeBg: colors.backgroundSecondary, border: colors.separator, accent: colors.textSecondary };
  }
}

function severityLabel(sev: TrafficSeverity, t: (k: string) => string): string {
  switch (sev) {
    case TrafficSeverity.Total: return t('traffic.severityTotal');
    case TrafficSeverity.Parcial: return t('traffic.severityParcial');
    case TrafficSeverity.Afectado: return t('traffic.severityAfectado');
    default: return '';
  }
}

// Formatea la vigencia de un corte en texto legible.
function formatRange(closure: TrafficClosure, locale: 'es' | 'en' | 'ca'): string {
  const dayFmt = (iso: string) => {
    const d = new Date(`${iso}T00:00:00`);
    const tag = locale === 'en' ? 'en-GB' : locale === 'ca' ? 'ca-ES' : 'es-ES';
    return d.toLocaleDateString(tag, {
      day: 'numeric',
      month: 'short',
    });
  };
  const startDay = dayFmt(closure.startDate);
  const endDay = dayFmt(closure.endDate);
  const startT = closure.startTime && closure.startTime !== '24:00' ? ` ${closure.startTime}` : '';
  const endT = closure.endTime ? ` ${closure.endTime}` : '';

  if (closure.startDate === closure.endDate) {
    if (startT || endT) return `${startDay}${startT}${endT ? ` – ${endT.trim()}` : ''}`;
    return startDay;
  }
  return `${startDay}${startT} → ${endDay}${endT}`;
}

export default function TrafficClosureCard({ closure, compact }: Props) {
  const { t, locale } = useI18n();
  const pal = severityPalette(closure.severity);

  const zone = locale === 'en' ? (closure.zoneEn ?? closure.zone) : closure.zone;
  const streets = locale === 'en' ? (closure.streetsEn ?? closure.streets) : closure.streets;
  const note = locale === 'en' ? (closure.noteEn ?? closure.note) : closure.note;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: pal.surface, borderColor: pal.border },
        compact && styles.cardCompact,
      ]}
    >
      <View style={styles.headerRow}>
        <View style={[styles.severityBadge, { backgroundColor: pal.badgeBg }]}>
          <View style={[styles.severityDot, { backgroundColor: pal.accent }]} />
          <Text style={[styles.severityText, { color: pal.accent }]}>
            {severityLabel(closure.severity, t)}
          </Text>
        </View>
        <Text style={styles.range}>{formatRange(closure, locale)}</Text>
      </View>

      <Text style={styles.zone}>{zone}</Text>
      <View style={styles.streetsRow}>
        <Ionicons name="git-branch-outline" size={13} color={colors.textTertiary} />
        <Text style={styles.streets}>{streets}</Text>
      </View>

      {!compact && note && (
        <Text style={styles.note}>{note}</Text>
      )}

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => Linking.openURL(buildClosureMapUrl(closure))}
        activeOpacity={0.7}
      >
        <Ionicons name="map-outline" size={14} color={colors.primary} />
        <Text style={styles.mapButtonText}>{t('traffic.viewOnMap')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  cardCompact: {
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  severityText: {
    ...typography.caption,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  range: {
    ...typography.caption,
    color: colors.textSecondary,
    flexShrink: 1,
    textAlign: 'right',
  },
  zone: {
    ...typography.headline,
    color: colors.text,
    marginBottom: 4,
  },
  streetsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  streets: {
    ...typography.subhead,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 19,
  },
  note: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    lineHeight: 17,
    fontStyle: 'italic',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingVertical: 4,
  },
  mapButtonText: {
    ...typography.footnote,
    color: colors.primary,
    fontWeight: '600',
  },
});
