// ============================================================
// App.tsx — PUNTO DE ENTRADA
// ============================================================
// Muestra splash 1.5s al arrancar, después la app normal.
// ============================================================

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import TodayScreen from './src/screens/TodayScreen';
import AgendaScreen from './src/screens/AgendaScreen';
import PrayersScreen from './src/screens/PrayersScreen';
import SongsScreen from './src/screens/SongsScreen';
import ShopScreen from './src/screens/ShopScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import SplashScreen from './src/screens/SplashScreen';
import TabBar, { TabId } from './src/components/TabBar';
import { schedulePapalEventNotifications } from './src/services/notifications';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const [showSplash, setShowSplash] = useState(true);

  // Splash screen durante 2000ms
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Pide permiso y programa notificaciones de los eventos del Papa.
  // Solo se ejecuta una vez por arranque. Si el usuario rechaza el
  // permiso, no pasa nada — el resto de la app sigue funcionando.
  useEffect(() => {
    schedulePapalEventNotifications().catch(() => {
      // Silenciamos errores: la app no debe romper si las
      // notificaciones no se pueden programar.
    });
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
      case 'agenda': return <AgendaScreen />;
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
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
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
