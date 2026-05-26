// ============================================================
// notifications.ts — SERVICIO DE NOTIFICACIONES LOCALES
// ============================================================
// Programa notificaciones locales 15 minutos antes de cada
// evento público del Papa en Madrid.
// Las notificaciones se programan en el iPhone, no requieren
// servidor ni recopilan datos del usuario.
// ============================================================

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { papalEvents, localizeEvent } from '../data/agenda';
import { PapalEvent } from '../models/types';

type Locale = 'es' | 'en';

// Cómo se muestran las notificaciones cuando la app está abierta
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Minutos antes del evento para enviar la notificación
const MINUTES_BEFORE = 15;

// Identificador del canal Android (iOS lo ignora)
const CHANNEL_ID = 'papal-events';

const channelNames: Record<Locale, string> = {
  es: 'Eventos del Papa',
  en: 'Papal events',
};

const titlePrefixes: Record<Locale, string> = {
  es: `🦁 En ${MINUTES_BEFORE} min`,
  en: `🦁 In ${MINUTES_BEFORE} min`,
};

/**
 * Pide permiso al usuario para enviar notificaciones.
 * Devuelve true si se concedió el permiso.
 */
export async function requestNotificationPermissions(locale: Locale = 'es'): Promise<boolean> {
  // En Android necesitamos un canal antes de pedir permisos
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: channelNames[locale],
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#C9A55A',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * Construye un objeto Date a partir de la fecha (YYYY-MM-DD) y la hora (HH:MM)
 * de un evento, restando los minutos de antelación.
 */
function buildNotificationDate(event: PapalEvent): Date {
  const [year, month, day] = event.date.split('-').map(Number);
  const [hour, minute] = event.startTime.split(':').map(Number);
  const eventDate = new Date(year, month - 1, day, hour, minute);
  eventDate.setMinutes(eventDate.getMinutes() - MINUTES_BEFORE);
  return eventDate;
}

/**
 * Programa las notificaciones para todos los eventos públicos
 * que aún no hayan ocurrido. Borra las anteriores antes para
 * evitar duplicados.
 */
export async function schedulePapalEventNotifications(locale: Locale = 'es'): Promise<number> {
  const granted = await requestNotificationPermissions(locale);
  if (!granted) return 0;

  // Limpiar notificaciones programadas previamente
  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = new Date();
  let scheduledCount = 0;

  for (const event of papalEvents) {
    if (!event.isPublic) continue;

    const triggerDate = buildNotificationDate(event);
    if (triggerDate <= now) continue; // ya pasó

    const localized = localizeEvent(event, locale);

    await Notifications.scheduleNotificationAsync({
      identifier: `papal-event-${event.id}`,
      content: {
        title: `${titlePrefixes[locale]}: ${localized.title}`,
        body: localized.location,
        sound: 'default',
        data: { eventId: event.id },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
        channelId: CHANNEL_ID,
      },
    });
    scheduledCount++;
  }

  return scheduledCount;
}

/**
 * Cancela todas las notificaciones programadas. Útil si el
 * usuario decide desactivar las notificaciones desde la app
 * en el futuro.
 */
export async function cancelAllPapalNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
