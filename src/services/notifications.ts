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
import { cityDateTime } from '../data/cities';

type Locale = 'es' | 'en' | 'ca';

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
  ca: 'Esdeveniments del Papa',
};

const titlePrefixes: Record<Locale, string> = {
  es: `🦁 En ${MINUTES_BEFORE} min`,
  en: `🦁 In ${MINUTES_BEFORE} min`,
  ca: `🦁 En ${MINUTES_BEFORE} min`,
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
 * Construye el instante absoluto de la notificación: la hora del
 * evento en la zona horaria de su ciudad, menos los minutos de
 * antelación. Independiente del huso del dispositivo.
 */
function buildNotificationDate(event: PapalEvent): Date {
  const eventInstant = cityDateTime(event.date, event.startTime, event.city);
  return new Date(eventInstant.getTime() - MINUTES_BEFORE * 60 * 1000);
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
