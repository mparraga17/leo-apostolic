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
import { useI18n } from '../i18n';

function groupEventsByDate(events: PapalEvent[]) {
  const groups: Record<string, PapalEvent[]> = {};
  events.forEach(event => {
    if (!groups[event.date]) groups[event.date] = [];
    groups[event.date].push(event);
  });
  return Object.entries(groups);
}

// Fila expandible para "Para visitar cerca". Al tocar muestra el texto completo
// y un botón para abrir Google Maps con la dirección.
function NearbyRow({
  place,
  isLast,
}: {
  place: ReturnType<typeof getNearbyPlaces>[number];
  isLast: boolean;
}) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const openInMaps = () => {
    const query = encodeURIComponent(place.address ?? place.name);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      onPress={() => setExpanded(prev => !prev)}
      activeOpacity={0.6}
    >
      <View style={styles.eventContent}>
        <Text style={styles.rowTitle}>{place.name}</Text>
        <Text
          style={styles.rowMeta}
          numberOfLines={expanded ? undefined : 2}
        >
          {place.description}
        </Text>
        {expanded && (
          <TouchableOpacity
            onPress={openInMaps}
            style={styles.nearbyDirections}
            activeOpacity={0.7}
          >
            <Ionicons name="navigate-outline" size={14} color={colors.primary} />
            <Text style={styles.nearbyDirectionsText}>{t('agenda.nearbyDirections')}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Ionicons
        name={expanded ? 'chevron-up' : 'chevron-down'}
        size={16}
        color={colors.textTertiary}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

function formatDate(isoDate: string): string {
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const d = new Date(isoDate + 'T12:00:00');
  return `${days[d.getDay()]}, ${d.getDate()} de ${months[d.getMonth()]}`;
}

export default function AgendaScreen({ initialEventId }: { initialEventId?: string | null }) {
  const { t } = useI18n();
  const [selectedEvent, setSelectedEvent] = useState<PapalEvent | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const grouped = groupEventsByDate(papalEvents);

  // Si nos llega un eventId desde fuera (notificación, deep link), abrimos el modal
  useEffect(() => {
    if (!initialEventId) return;
    const event = papalEvents.find(e => e.id === initialEventId);
    if (event) setSelectedEvent(event);
  }, [initialEventId]);

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
          <Text style={styles.headerSubtitle}>{t('agenda.headerSubtitle')}</Text>
          <Text style={styles.headerTitle}>{t('agenda.headerTitle')}</Text>
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
                        <View style={styles.publicBadge}>
                          <Text style={styles.publicBadgeText}>{t('agenda.publicBadge')}</Text>
                        </View>
                      )}
                      {isCurrent && (
                        <Text style={styles.liveBadge}>{t('agenda.liveBadge')}</Text>
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
                    {t('agenda.publicNotice')}
                  </Text>
                </View>
              )}

              {selectedEvent.registrationRequired && (
                <View style={styles.registrationCard}>
                  <View style={styles.registrationHeader}>
                    <Ionicons name="ticket-outline" size={16} color={colors.primary} />
                    <Text style={styles.registrationTitle}>{t('agenda.registrationTitle')}</Text>
                  </View>
                  {selectedEvent.registrationNote && (
                    <Text style={styles.registrationNote}>
                      {selectedEvent.registrationNote}
                    </Text>
                  )}
                  {selectedEvent.registrationUrl && (
                    <TouchableOpacity
                      style={styles.registrationBtn}
                      onPress={() => Linking.openURL(selectedEvent.registrationUrl!)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="open-outline" size={16} color={colors.textInverse} />
                      <Text style={styles.registrationBtnText}>{t('agenda.registrationButton')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <TouchableOpacity
                style={styles.directionsBtn}
                onPress={() => openInMaps(selectedEvent)}
                accessibilityLabel={t('agenda.directionsButton')}
                activeOpacity={0.8}
              >
                <Ionicons name="navigate" size={18} color={colors.textInverse} />
                <Text style={styles.directionsBtnText}>{t('agenda.directionsButton')}</Text>
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
                          <Text style={styles.timeFreeLabel}>{t('agenda.timeFreeLabel')}</Text>
                        </View>
                        <Text style={styles.timeFreeValue}>
                          {t('agenda.timeFreeValue', { time: timeWindow.freeText })}
                        </Text>
                        <Text style={styles.timeFreeHint}>
                          {t('agenda.timeFreeNext', { title: timeWindow.nextEvent.title, time: timeWindow.nextEvent.startTime })}
                        </Text>
                      </View>
                    )}

                    {nearby.length > 0 && (
                      <>
                        <Text style={styles.suggestionsTitle}>{t('agenda.nearbyTitle')}</Text>
                        <View style={styles.list}>
                          {nearby.map((place, i) => (
                            <NearbyRow
                              key={place.id}
                              place={place}
                              isLast={i === nearby.length - 1}
                            />
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
  eventLocation: { ...typography.subhead, color: colors.textSecondary, marginTop: 4 },
  textLight: { color: '#fff' },
  textLightOpaque: { color: 'rgba(255,255,255,0.85)' },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },

  publicBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  publicBadgeText: {
    ...typography.caption,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.8,
    fontSize: 10,
  },
  liveBadge: {
    ...typography.caption,
    color: '#fff',
    letterSpacing: 1.5,
    marginTop: 4,
  },

  rowTitle: { ...typography.bodyEmphasized, color: colors.text },
  rowMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },
  chevron: { marginLeft: spacing.sm },
  nearbyDirections: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    paddingVertical: 4,
  },
  nearbyDirectionsText: {
    ...typography.footnote,
    color: colors.primary,
    fontWeight: '600',
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

  registrationCard: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  registrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  registrationTitle: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  registrationNote: {
    ...typography.footnote,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  registrationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.sm,
  },
  registrationBtnText: {
    ...typography.footnote,
    color: colors.textInverse,
    fontWeight: '700',
  },

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
