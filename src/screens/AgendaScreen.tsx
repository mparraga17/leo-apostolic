// ============================================================
// AgendaScreen.tsx — Agenda del Papa (estilo iOS premium)
// ============================================================

import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { papalEvents, localizeEvent } from '../data/agenda';
import { PapalEvent, City, EventCategory } from '../models/types';
import { CITIES_ORDERED, getCityInfo, getCityName, deviceDiffersFromCity, cityDateTime, getActiveCity } from '../data/cities';
import PapalLocationCard from '../components/PapalLocationCard';
import AdBanner from '../components/AdBanner';
import TrafficClosureCard from '../components/TrafficClosureCard';
import { getPapalLocationStatus } from '../utils/papalLocation';
import { getTimeWindowAfter, getNearbyPlaces } from '../utils/eventSuggestions';
import { getClosuresForEvent } from '../utils/trafficStatus';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';
import { useI18n } from '../i18n';
import { shareText } from '../utils/share';
import { onEventModalClosed } from '../services/adManager';

// Color por categoría de acto (el COLOR es un DATO: indica de un
// vistazo el tipo de acto). Acompañado siempre de icono, así también
// funciona para personas con daltonismo (accesibilidad).
function categoryColor(cat: EventCategory): string {
  switch (cat) {
    case EventCategory.Misa: return '#7C4DA0';        // morado litúrgico
    case EventCategory.Vigilia: return '#2E6DB4';     // azul noche
    case EventCategory.Encuentro: return '#C9A55A';   // dorado
    case EventCategory.Visita: return '#3D8B5A';      // verde
    case EventCategory.Audiencia: return '#B06A28';   // ámbar
    case EventCategory.Traslado: return '#6B6760';    // gris (logística)
    case EventCategory.Privado: return '#A09B91';     // gris claro
    default: return '#6B6760';
  }
}

function categoryIcon(cat: EventCategory): keyof typeof Ionicons.glyphMap {
  switch (cat) {
    case EventCategory.Misa: return 'flower-outline';
    case EventCategory.Vigilia: return 'moon-outline';
    case EventCategory.Encuentro: return 'people-outline';
    case EventCategory.Visita: return 'walk-outline';
    case EventCategory.Audiencia: return 'mic-outline';
    case EventCategory.Traslado: return 'airplane-outline';
    case EventCategory.Privado: return 'lock-closed-outline';
    default: return 'ellipse-outline';
  }
}

function groupEventsByDate(events: PapalEvent[]) {
  const groups: Record<string, PapalEvent[]> = {};
  events.forEach(event => {
    if (!groups[event.date]) groups[event.date] = [];
    groups[event.date].push(event);
  });
  return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
}

// Instante absoluto de fin de un evento (con la zona de su ciudad).
// Si no tiene endTime, asumimos 1h de duración.
function eventEndInstant(event: PapalEvent): Date {
  if (event.endTime) return cityDateTime(event.date, event.endTime, event.city);
  const start = cityDateTime(event.date, event.startTime, event.city);
  return new Date(start.getTime() + 60 * 60 * 1000);
}

// Un día se considera "pasado" cuando TODOS sus eventos ya terminaron.
function dayIsPast(events: PapalEvent[], now: Date): boolean {
  return events.every(e => eventEndInstant(e).getTime() < now.getTime());
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
      style={[styles.nearbyRow, !isLast && styles.nearbyRowBorder]}
      onPress={() => setExpanded(prev => !prev)}
      activeOpacity={0.6}
    >
      <View style={styles.nearbyContent}>
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
  const { t, locale } = useI18n();
  const [selectedEvent, setSelectedEvent] = useState<PapalEvent | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City>(() => getActiveCity());
  const [now, setNow] = useState<Date>(() => new Date());
  const grouped = groupEventsByDate(papalEvents.filter(e => e.city === selectedCity));
  // Separar días en próximos/hoy y pasados (según instante real)
  const upcomingDays = grouped.filter(([, evs]) => !dayIsPast(evs, now));
  const pastDays = grouped.filter(([, evs]) => dayIsPast(evs, now));

  // Si nos llega un eventId desde fuera (notificación, deep link), abrimos el modal
  // y nos posicionamos en la ciudad de ese evento.
  useEffect(() => {
    if (!initialEventId) return;
    const event = papalEvents.find(e => e.id === initialEventId);
    if (event) {
      setSelectedCity(event.city);
      setSelectedEvent(event);
    }
  }, [initialEventId]);

  useEffect(() => {
    const update = () => {
      const status = getPapalLocationStatus();
      setCurrentEventId(status.phase === 'now' ? status.event.id : null);
      setNow(new Date());
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  const openInMaps = (event: PapalEvent) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`;
    Linking.openURL(url);
  };

  // Cierra el modal y notifica al adManager para contar y, cada N
  // cierres, mostrar un intersticial.
  const closeEventModal = () => {
    setSelectedEvent(null);
    onEventModalClosed();
  };

  // Render de un día de eventos. `isPast` atenúa visualmente los días ya pasados.
  const renderDay = (date: string, events: PapalEvent[], isPast = false) => (
    <View key={date} style={[styles.section, isPast && styles.sectionPast]}>
      <Text style={styles.sectionLabel}>{formatDate(date).toUpperCase()}</Text>
      <View style={styles.timeline}>
        {events.map((event, i) => {
          const isCurrent = event.id === currentEventId;
          const isLast = i === events.length - 1;
          const cat = event.category;
          const accent = categoryColor(cat);
          // Tiempo libre hasta el siguiente acto (solo en días no pasados)
          const window = !isPast ? getTimeWindowAfter(event) : { hasFreeTime: false };
          return (
            <View key={event.id}>
              <View style={styles.tlRow}>
                {/* Columna hora */}
                <Text style={[styles.tlTime, isCurrent && styles.tlTimeLive]}>
                  {event.startTime}
                </Text>

                {/* Columna raíl: línea + nodo */}
                <View style={styles.tlRail}>
                  {!isLast && <View style={styles.tlLine} />}
                  <View style={[styles.tlNode, { backgroundColor: accent }]}>
                    {isCurrent
                      ? <View style={styles.tlNodeLiveDot} />
                      : <Ionicons name={categoryIcon(cat)} size={15} color="#fff" />}
                  </View>
                </View>

                {/* Tarjeta clicable */}
                <TouchableOpacity
                  style={[styles.tlCard, isCurrent && styles.tlCardLive]}
                  onPress={() => setSelectedEvent(event)}
                  activeOpacity={0.6}
                  accessibilityRole="button"
                  accessibilityLabel={localizeEvent(event, locale).title}
                >
                  <View style={styles.tlCardBody}>
                    {isCurrent && <Text style={styles.tlLiveLabel}>{t('agenda.liveBadge')}</Text>}
                    <Text style={styles.tlTitle} numberOfLines={2}>
                      {localizeEvent(event, locale).title}
                    </Text>
                    <Text style={styles.tlLoc} numberOfLines={1}>
                      {localizeEvent(event, locale).location}
                    </Text>
                    <View style={styles.tlBadges}>
                      {event.isPublic && (
                        <View style={styles.tlBadgePublic}>
                          <View style={styles.tlBadgeDot} />
                          <Text style={styles.tlBadgePublicText}>{t('agenda.publicBadge')}</Text>
                        </View>
                      )}
                      <Text style={[styles.tlBadgeCat, { color: accent }]}>{cat}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>

              {/* Hueco de tiempo libre, integrado en la línea */}
              {window.hasFreeTime && (
                <View style={styles.tlFreeRow}>
                  <View style={styles.tlFreeRailCol}><View style={styles.tlFreeDashes} /></View>
                  <View style={styles.tlFreeContent}>
                    <Ionicons name="time-outline" size={13} color={colors.primary} />
                    <Text style={styles.tlFreeText}>
                      {t('agenda.timeFreeValue', { time: window.freeText })}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{t('agenda.headerSubtitle')}</Text>
          <Text style={styles.headerTitle}>{t('agenda.headerTitle')}</Text>
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

        {/* Aviso de zona horaria: el dispositivo está en otro huso */}
        {deviceDiffersFromCity(selectedCity) && (
          <View style={styles.tzNotice}>
            <Ionicons name="time-outline" size={15} color={colors.primary} />
            <Text style={styles.tzNoticeText}>
              {t('agenda.deviceTimeDiff', { city: getCityName(selectedCity, locale) })}
            </Text>
          </View>
        )}

        <PapalLocationCard city={selectedCity} />

        {upcomingDays.map(([date, events]) => renderDay(date, events))}

        {pastDays.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, styles.pastHeader]}>{t('agenda.pastSection')}</Text>
            {pastDays.map(([date, events]) => renderDay(date, events, true))}
          </>
        )}
      </ScrollView>

      {/* Modal detalle de evento */}
      <Modal
        visible={selectedEvent !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeEventModal}
      >
        {selectedEvent && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={closeEventModal}
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
              <Text style={styles.modalTzNote}>
                {t('agenda.localTimeNote', {
                  city: getCityName(selectedEvent.city, locale),
                  utc: getCityInfo(selectedEvent.city).utcLabel,
                })}
              </Text>
              <Text style={styles.modalTitle}>{localizeEvent(selectedEvent, locale).title}</Text>

              <View style={styles.detailCard}>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={18} color={colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.detailValue}>{localizeEvent(selectedEvent, locale).location}</Text>
                    <Text style={styles.detailSubvalue}>{selectedEvent.address}</Text>
                  </View>
                </View>
                <View style={styles.detailDivider} />
                <View style={styles.detailRow}>
                  <Ionicons name="bookmark-outline" size={18} color={colors.primary} />
                  <Text style={styles.detailValue}>{selectedEvent.category}</Text>
                </View>
              </View>

              <Text style={styles.detailDescription}>{localizeEvent(selectedEvent, locale).description}</Text>

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
                  {localizeEvent(selectedEvent, locale).registrationNote && (
                    <Text style={styles.registrationNote}>
                      {localizeEvent(selectedEvent, locale).registrationNote}
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

              {/* Afectación al tráfico para este evento */}
              {(() => {
                const closures = getClosuresForEvent(selectedEvent.id);
                if (closures.length === 0) return null;
                return (
                  <View style={styles.trafficBlock}>
                    <View style={styles.trafficHeader}>
                      <Ionicons name="warning-outline" size={15} color={colors.liveRed} />
                      <Text style={styles.trafficTitle}>{t('traffic.inEventTitle')}</Text>
                    </View>
                    {closures.map(c => <TrafficClosureCard key={c.id} closure={c} compact />)}
                  </View>
                );
              })()}

              <View style={styles.modalActionsRow}>
                <TouchableOpacity
                  style={[styles.directionsBtn, styles.actionFlex]}
                  onPress={() => openInMaps(selectedEvent)}
                  accessibilityLabel={t('agenda.directionsButton')}
                  activeOpacity={0.8}
                >
                  <Ionicons name="navigate" size={18} color={colors.textInverse} />
                  <Text style={styles.directionsBtnText}>{t('agenda.directionsButton')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareIconBtn}
                  onPress={() => {
                    const localized = localizeEvent(selectedEvent, locale);
                    const dateLine = `${selectedEvent.date} · ${selectedEvent.startTime}`;
                    shareText({
                      title: localized.title,
                      message: `${localized.title}\n${dateLine}\n${localized.location}\n\n${localized.description}`,
                    });
                  }}
                  accessibilityLabel={t('common.share')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="share-outline" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>

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
                          {t('agenda.timeFreeNext', { title: localizeEvent(timeWindow.nextEvent, locale).title, time: timeWindow.nextEvent.startTime })}
                        </Text>
                      </View>
                    )}

                    {nearby.length > 0 && (
                      <>
                        <Text style={styles.suggestionsTitle}>{t('agenda.nearbyTitle')}</Text>
                        <View style={styles.nearbyList}>
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
    paddingTop: spacing.xs,
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

  tzNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryMuted,
    marginHorizontal: spacing.base,
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  tzNoticeText: {
    ...typography.footnote,
    color: colors.text,
    flex: 1,
    lineHeight: 17,
  },

  section: { marginTop: spacing.lg },
  sectionPast: { opacity: 0.55 },
  pastHeader: {
    marginTop: spacing.xl,
    color: colors.textTertiary,
  },
  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  // ===== Timeline =====
  timeline: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xs,
  },
  tlRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tlTime: {
    width: 44,
    ...typography.footnote,
    fontWeight: '600',
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
    paddingTop: 16,
  },
  tlTimeLive: { color: colors.liveRed, fontWeight: '700' },

  // raíl: línea vertical + nodo
  tlRail: {
    width: 34,
    alignItems: 'center',
    position: 'relative',
  },
  tlLine: {
    position: 'absolute',
    top: 14,
    bottom: -6,
    width: 2,
    backgroundColor: colors.separator,
  },
  tlNode: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
    zIndex: 1,
  },
  tlNodeLiveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#fff' },

  // tarjeta clicable
  tlCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    marginTop: 8,
    marginBottom: spacing.sm,
    marginLeft: 6,
    ...shadows.card,
  },
  tlCardLive: {
    backgroundColor: 'rgba(184,51,51,0.06)',
    borderColor: 'rgba(184,51,51,0.18)',
  },
  tlCardBody: { flex: 1 },
  tlLiveLabel: {
    ...typography.caption,
    color: colors.liveRed,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  tlTitle: { ...typography.headline, color: colors.text, letterSpacing: -0.2 },
  tlLoc: { ...typography.subhead, color: colors.textSecondary, marginTop: 2 },
  tlBadges: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  tlBadgePublic: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(61,139,90,0.12)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  tlBadgeDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.success },
  tlBadgePublicText: { ...typography.caption, color: colors.success, fontWeight: '700', letterSpacing: 0.3 },
  tlBadgeCat: { ...typography.caption, fontWeight: '700', letterSpacing: 0.3 },

  // hueco de tiempo libre
  tlFreeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  tlFreeRailCol: { width: 44 + 34, alignItems: 'center' },
  tlFreeDashes: {
    width: 2,
    height: 22,
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderColor: colors.textTertiary,
    borderStyle: 'dashed',
    opacity: 0.5,
  },
  tlFreeContent: { flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 6 },
  tlFreeText: { ...typography.footnote, color: colors.primary, fontWeight: '600' },

  rowTitle: { ...typography.bodyEmphasized, color: colors.text },
  nearbyList: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  nearbyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  nearbyRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  nearbyContent: { flex: 1 },
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
  modalTzNote: {
    ...typography.caption,
    color: colors.textTertiary,
    marginBottom: spacing.sm,
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
    backgroundColor: 'rgba(201,165,90,0.05)',
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(201,165,90,0.18)',
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
  modalActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionFlex: {
    flex: 1,
    marginTop: 0,
  },
  shareIconBtn: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.backgroundElevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },

  suggestionsBlock: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
  },
  trafficBlock: {
    marginBottom: spacing.base,
  },
  trafficHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  trafficTitle: {
    ...typography.caption,
    color: colors.liveRed,
    fontWeight: '700',
    letterSpacing: 0.6,
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
