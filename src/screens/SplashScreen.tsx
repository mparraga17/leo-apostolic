// ============================================================
// SplashScreen.tsx — PANTALLA DE BIENVENIDA
// ============================================================
// Se muestra durante 1.5s al abrir la app, dando tiempo a que
// se carguen los datos y suavizando la transición.
// ============================================================

import React from 'react';
import { View, StyleSheet } from 'react-native';
import BrandLogo from '../components/BrandLogo';
import { colors } from '../theme/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <BrandLogo size={220} variant="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
