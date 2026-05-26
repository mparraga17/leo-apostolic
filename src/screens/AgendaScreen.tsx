// ============================================================
// AgendaScreen.tsx — Agenda del Papa (estilo iOS premium)
// ============================================================

import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { papalEvents } from '../data/agenda';
import { PapalEvent } from '../models/types';
import PapalLocationCard from '../components/PapalLocationCard';
import { getPapalLocationStatus } from '../utils/papalLocation';
import { getTimeWindowAfter, getNearbyPlaces } from '../utils/eventSuggestions';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';

function groupEventsByDate(events: PapalEvent[]) {
  const groups: Record<string, PapalEvent[]> = {};
  events.forEach(event => {
    if (!groups[event.date]) groups[event.date] = [];
    groups[event.date].push(event);
  });
  return Object.entries(groups);
}

function formatDate(isoDate: string): string {
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const d = new Date(isoDate + 'T12:00:00');
  return `${days[d.getDay()]}, ${d.getDate()} de ${months[d.getMonth()]}`;
}

export default function AgendaScreen() {
  const [selectedEvent, setSelectedEvent] = useState<PapalEvent | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const grouped = groupEventsByDate(papalEvents);

  useEffect(() => {
    const update = () => {
      const status = getPapalLocationStatus();
      setCurrentEventId(status.phase === 'now' ? status.event.id : null);
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  const openInMaps = (event: PapalEvent) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Visita apostólica · 6-9 junio 2026</Text>
          <Text style={styles.headerTitle}>Eventos</Text>
        </View>

        <PapalLocationCard />

        {grouped.map(([date, events]) => (
          <View key={date} style={styles.section}>
            <Text style={styles.sectionLabel}>{formatDate(date).toUpperCase()}</Text>
            <View style={styles.list}>
              {events.map((event, i) => {
                const isCurrent = event.id === currentEventId;
                return (
                  <TouchableOpacity
                    key={event.id}
                    style={[
                      styles.row,
                      i < events.length - 1 && styles.rowBorder,
                      isCurrent && styles.rowCurrent,
                    ]}
                    onPress={() => setSelectedEvent(event)}
                    activeOpacity={0.5}
                  >
                    <View style={styles.timeColumn}>
                      <Text style={[styles.eventTime, isCurrent && styles.textLight]}>
                        {event.startTime}
                      </Text>
                    </View>
                    <View style={styles.eventContent}>
                      <View style={styles.eventTitleRow}>
                        {isCurrent && <View style={styles.liveDot} />}
                        <Text style={[styles.eventTitle, isCurrent && styles.textLight]} numberOfLines={1}>
                          {event.title}
                        </Text>
                      </View>
                      <Text style={[styles.eventLocation, isCurrent && styles.textLightOpaque]} numberOfLines={1}>
                        {event.location}
                      </Text>
                      {event.isPublic && !isCurrent && (
                        <Text style={styles.publicBadge}>ACTO PÚBLICO</Text>
                      )}
                      {isCurrent && (
                        <Text style={styles.liveBadge}>EN DIRECTO</Text>
                      )}
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={isCurrent ? 'rgba(255,255,255,0.85)' : colors.textTertiary}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal detalle de evento */}
      <Modal
        visible={selectedEvent !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() => setSelectedEvent(null)}
                hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
                accessibilityLabel="Cerrar"
              >
                <Ionicons name="close-circle" size={28} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTime}>
                {formatDate(selectedEvent.date).toUpperCase()} · {selectedEvent.startTime}
                {selectedEvent.endTime ? ` — ${selectedEvent.endTime}` : ''}
              </Text>
              <Text style={styles.modalTitle}>{selectedEvent.title}</Text>

              <View style={styles.detailCard}>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={18} color={colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.detailValue}>{selectedEvent.location}</Text>
                    <Text style={styles.detailSubvalue}>{selectedEvent.address}</Text>
                  </View>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailRow}>
                  <Ionicons name="bookmark-outline" size={18} color={colors.primary} />
                  <Text style={styles.detailValue}>{selectedEvent.category}</Text>
                </View>
              </View>

              <Text style={styles.detailDescription}>{selectedEvent.description}</Text>

              {selectedEvent.isPublic && (
                <View style={styles.publicNotice}>
                  <Ionicons name="people-outline" size={18} color={colors.success} />
                  <Text style={styles.publicNoticeText}>
                    Acto público al que pueden asistir los fieles
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.directionsBtn}
                onPress={() => openInMaps(selectedEvent)}
                accessibilityLabel="Cómo llegar"
                activeOpacity={0.8}
              >
                <Ionicons name="navigate" size={18} color={colors.textInverse} />
                <Text style={styles.directionsBtnText}>Cómo llegar</Text>
              </TouchableOpacity>

              {/* Sugerencias contextuales */}
              {(() => {
                const timeWindow = getTimeWindowAfter(selectedEvent);
                const nearby = getNearbyPlaces(selectedEvent);
                if (!timeWindow.hasFreeTime && nearby.length === 0) return null;

                return (
                  <View style={styles.suggestionsBlock}>
                    {timeWindow.hasFreeTime && timeWindow.nextEvent && (
                      <View style={styles.timeFreeCard}>
                        <View style={styles.timeFreeHeader}>
                          <Ionicons name="time-outline" size={16} color={colors.primary} />
                          <Text style={styles.timeFreeLabel}>TIEMPO LIBRE</Text>
                        </View>
                        <Text style={styles.timeFreeValue}>
                          {timeWindow.freeText} hasta el siguiente acto
                        </Text>
                        <Text style={styles.timeFreeHint}>
                          Próximo: {timeWindow.nextEvent.title} · {timeWindow.nextEvent.startTime}
                        </Text>
                      </View>
                    )}

                    {nearby.length > 0 && (
                      <>
                        <Text style={styles.suggestionsTitle}>PARA VISITAR CERCA</Text>
                        <View style={styles.list}>
                          {nearby.map((place, i) => (
                            <View
                              key={place.id}
                              style={[
                                styles.row,
                                i < nearby.length - 1 && styles.rowBorder,
                              ]}
                            >
                              <View style={styles.eventContent}>
                                <Text style={styles.rowTitle}>{place.name}</Text>
                                <Text style={styles.rowMeta} numberOfLines={2}>{place.description}</Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </>
                    )}
                  </View>
                );
              })()}
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
  rowCurrent: { backgroundColor: colors.liveRed },

  timeColumn: { width: 50 },
  eventTime: {
    ...typography.bodyEmphasized,
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  eventContent: { flex: 1 },
  eventTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eventTitle: { ...typography.bodyEmphasized, color: colors.text },
  eventLocation: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },
  textLight: { color: '#fff' },
  textLightOpaque: { color: 'rgba(255,255,255,0.85)' },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },

  publicBadge: {
    ...typography.caption,
    color: colors.success,
    letterSpacing: 1,
    marginTop: 4,
  },
  liveBadge: {
    ...typography.caption,
    color: '#fff',
    letterSpacing: 1.5,
    marginTop: 4,
  },

  rowTitle: { ...typography.bodyEmphasized, color: colors.text },
  rowMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },

  // Modal
  modalContainer: { flex: 1, backgroundColor: colors.background },
  modalHeader: {
    flexDirection: 'row',
    paddingTop: spacing.base,
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.sm,
  },
  modalContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  modalTime: {
    ...typography.sectionHeader,
    color: colors.primary,
    marginBottom: 4,
  },
  modalTitle: {
    ...typography.title1,
    color: colors.text,
    marginBottom: spacing.lg,
  },

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

  publicNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(61, 139, 90, 0.1)',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.base,
  },
  publicNoticeText: { ...typography.subhead, color: colors.success, flex: 1 },

  directionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.text,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.md,
    marginTop: spacing.sm,
  },
  directionsBtnText: { ...typography.bodyEmphasized, color: colors.textInverse },

  suggestionsBlock: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  timeFreeCard: {
    backgroundColor: colors.primaryMuted,
    padding: spacing.base,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  timeFreeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  timeFreeLabel: {
    ...typography.caption,
    color: colors.primary,
    letterSpacing: 1.5,
  },
  timeFreeValue: { ...typography.bodyEmphasized, color: colors.text, marginBottom: 4 },
  timeFreeHint: { ...typography.footnote, color: colors.textSecondary, fontStyle: 'italic' },
  suggestionsTitle: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
});
