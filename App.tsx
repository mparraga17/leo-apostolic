// ============================================================
// App.tsx — PUNTO DE ENTRADA
// ============================================================
// Muestra splash 2s al arrancar, después la app normal.
// Al tocar una notificación de evento del Papa, abre la pestaña
// "Eventos" con el modal del evento desplegado.
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

import TodayScreen from './src/screens/TodayScreen';
import AgendaScreen from './src/screens/AgendaScreen';
import PrayersScreen from './src/screens/PrayersScreen';
import SongsScreen from './src/screens/SongsScreen';
import ShopScreen from './src/screens/ShopScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import SplashScreen from './src/screens/SplashScreen';
import TabBar, { TabId } from './src/components/TabBar';
import { schedulePapalEventNotifications } from './src/services/notifications';
import { I18nProvider } from './src/i18n';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [showSplash, setShowSplash] = useState(true);
  // EventId pendiente de abrir cuando lleguemos a la pestaña Eventos
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);

  // Splash screen durante 2000ms
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Pide permiso y programa notificaciones de los eventos del Papa.
  useEffect(() => {
    schedulePapalEventNotifications().catch(() => {
      // Silenciamos errores: la app no debe romper si las
      // notificaciones no se pueden programar.
    });
  }, []);

  // Si la app se abre tocando una notificación, navega al evento
  useEffect(() => {
    // Caso 1: la app estaba cerrada y el usuario tocó la notificación.
    // getLastNotificationResponseAsync devuelve la última que abrió la app.
    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        const eventId = response?.notification.request.content.data?.eventId;
        if (typeof eventId === 'string') {
          setActiveTab('agenda');
          setPendingEventId(eventId);
        }
      })
      .catch(() => {});

    // Caso 2: la app está abierta cuando llega y se toca la notificación.
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const eventId = response?.notification.request.content.data?.eventId;
      if (typeof eventId === 'string') {
        setActiveTab('agenda');
        setPendingEventId(eventId);
      }
    });

    return () => subscription.remove();
  }, []);

  if (showSplash) {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreen />
      </>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'today': return <TodayScreen />;
      case 'prayers': return <PrayersScreen />;
      case 'songs': return <SongsScreen />;
      case 'agenda': return (
        <AgendaScreen
          initialEventId={pendingEventId}
          // Una vez consumido, lo limpiamos para no reabrirlo
          // si el usuario navega y vuelve a la pestaña.
          // (AgendaScreen lo hace al abrir el modal; aquí solo evitamos persistencia)
        />
      );
      case 'places': return <PlacesScreen />;
      case 'shop': return <ShopScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <TabBar
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          // Si el usuario sale manualmente de "agenda", liberamos el pending
          if (tab !== 'agenda') setPendingEventId(null);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  content: { flex: 1 },
});

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
