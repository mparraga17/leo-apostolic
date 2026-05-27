// ============================================================
// App.tsx — PUNTO DE ENTRADA
// ============================================================
// Muestra splash 2s al arrancar, después la app principal.
// Cross-fade suave del splash a la app.
// Al tocar una notificación de evento del Papa, abre la pestaña
// "Eventos" con el modal del evento desplegado.
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  View, StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar, Animated,
} from 'react-native';
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
import { initializeAds } from './src/services/adsInit';
import { I18nProvider, useI18n } from './src/i18n';

function AppContent() {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [showSplash, setShowSplash] = useState(true);
  // EventId pendiente de abrir cuando lleguemos a la pestaña Eventos
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);
  // Animación de transición splash → app
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const appOpacity = useRef(new Animated.Value(0)).current;
  // Animación de transición entre pestañas (fade + ligero slide)
  const tabAnim = useRef(new Animated.Value(1)).current;

  // Splash visible 2s, luego cross-fade hacia la app
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(appOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => setShowSplash(false));
    }, 2000);
    return () => clearTimeout(timer);
  }, [splashOpacity, appOpacity]);

  // Pide permiso y programa notificaciones de los eventos del Papa.
  // Se reprograman si el usuario cambia de idioma.
  useEffect(() => {
    schedulePapalEventNotifications(locale).catch(() => {
      // Silenciamos errores: la app no debe romper si las
      // notificaciones no se pueden programar.
    });
  }, [locale]);

  // Inicializar AdMob una sola vez al arrancar la app.
  // Pide permiso ATT en iOS y precarga el primer intersticial.
  useEffect(() => {
    initializeAds().catch(() => {
      // Silenciar errores: la app debe seguir funcionando sin ads
    });
  }, []);

  // Si la app se abre tocando una notificación, navega al evento
  useEffect(() => {
    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        const eventId = response?.notification.request.content.data?.eventId;
        if (typeof eventId === 'string') {
          setActiveTab('agenda');
          setPendingEventId(eventId);
        }
      })
      .catch(() => {});

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const eventId = response?.notification.request.content.data?.eventId;
      if (typeof eventId === 'string') {
        setActiveTab('agenda');
        setPendingEventId(eventId);
      }
    });

    return () => subscription.remove();
  }, []);

  // Animación de transición al cambiar de pestaña
  useEffect(() => {
    tabAnim.setValue(0);
    Animated.timing(tabAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabAnim]);

  const renderScreen = () => {
    switch (activeTab) {
      case 'today': return (
        <TodayScreen onNavigateToPrayers={() => setActiveTab('prayers')} />
      );
      case 'prayers': return <PrayersScreen />;
      case 'songs': return <SongsScreen />;
      case 'agenda': return (
        <AgendaScreen initialEventId={pendingEventId} />
      );
      case 'places': return <PlacesScreen />;
      case 'shop': return <ShopScreen />;
    }
  };

  // Bloque principal de la app (siempre se renderiza, durante el splash
  // queda detrás con opacidad 0 e invisible al usuario).
  const appBlock = (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: tabAnim,
            transform: [{
              translateX: tabAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            }],
          },
        ]}
        // key fuerza al View a remontarse en cada cambio de tab,
        // garantizando que la animación parta desde el inicio
        key={activeTab}
      >
        {renderScreen()}
      </Animated.View>
      <TabBar
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          if (tab !== 'agenda') setPendingEventId(null);
        }}
      />
    </SafeAreaView>
  );

  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar style="light" />
        {/* App debajo, fade-in al terminar el splash */}
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: appOpacity }]}>
          {appBlock}
        </Animated.View>
        {/* Splash encima, fade-out al terminar */}
        <Animated.View
          style={[StyleSheet.absoluteFill, { opacity: splashOpacity }]}
          pointerEvents="none"
        >
          <SplashScreen />
        </Animated.View>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      {appBlock}
    </>
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
