// ============================================================
// SplashScreen.tsx — PANTALLA DE BIENVENIDA
// ============================================================
// Animación de entrada elegante: logo con fade+scale, halo dorado
// pulsante de fondo, nombre y tagline entrando en cascada.
// Se muestra durante ~2s al abrir la app.
// ============================================================

import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme/theme';

const LOGO_SIZE = 220;

export default function SplashScreen() {
  // Refs de animación
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const nameTranslateY = useRef(new Animated.Value(12)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const haloScale = useRef(new Animated.Value(0.9)).current;
  const haloOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Halo aparece primero, suave
    Animated.timing(haloOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Halo respira en bucle (escalando entre 0.9 y 1.05)
    const haloLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(haloScale, {
          toValue: 1.05,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(haloScale, {
          toValue: 0.9,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    haloLoop.start();

    // Logo: fade-in + scale-up suave
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    // Nombre: aparece 350ms después con fade + translate
    Animated.parallel([
      Animated.timing(nameOpacity, {
        toValue: 1,
        duration: 600,
        delay: 350,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(nameTranslateY, {
        toValue: 0,
        duration: 600,
        delay: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Subtitle: 700ms más tarde, fade más lento
    Animated.timing(subtitleOpacity, {
      toValue: 1,
      duration: 700,
      delay: 700,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();

    return () => {
      haloLoop.stop();
    };
  }, [logoOpacity, logoScale, nameOpacity, nameTranslateY, subtitleOpacity, haloScale, haloOpacity]);

  return (
    <View style={styles.container}>
      {/* Halo dorado pulsante de fondo (muy sutil) */}
      <Animated.View
        style={[
          styles.halo,
          {
            opacity: haloOpacity,
            transform: [{ scale: haloScale }],
          },
        ]}
      />

      {/* Logo */}
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
      >
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Nombre */}
      <Animated.Text
        style={[
          styles.name,
          {
            opacity: nameOpacity,
            transform: [{ translateY: nameTranslateY }],
          },
        ]}
      >
        Leo Look Up
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
        MADRID · MMXXVI
      </Animated.Text>
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
  halo: {
    position: 'absolute',
    width: LOGO_SIZE * 2,
    height: LOGO_SIZE * 2,
    borderRadius: LOGO_SIZE,
    backgroundColor: colors.primary,
    opacity: 0.08,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE * 0.22,
    overflow: 'hidden',
  },
  name: {
    ...typography.display,
    fontFamily: 'Georgia',
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '600',
    letterSpacing: -0.5,
    marginTop: spacing.xl,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: '500',
    marginTop: spacing.sm,
  },
});
