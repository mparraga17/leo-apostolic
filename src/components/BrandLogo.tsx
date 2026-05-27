// ============================================================
// BrandLogo.tsx — LOGO DE LA APP
// ============================================================
// Renderiza el icono PNG profesional + nombre y tagline.
// La imagen ya tiene fondo navy propio del logo.
// ============================================================

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme/theme';

interface Props {
  size?: number;
  showName?: boolean;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ size = 200, showName = true, variant = 'dark' }: Props) {
  const textColor = variant === 'dark' ? '#FFFFFF' : colors.text;
  const subtextColor = variant === 'dark' ? colors.primary : colors.textSecondary;

  return (
    <View style={[styles.container, { width: size }]}>
      <Image
        source={require('../../assets/icon.png')}
        style={[
          styles.logo,
          {
            width: size,
            height: size,
            borderRadius: size * 0.22, // estilo iOS app icon
          },
        ]}
        resizeMode="cover"
      />

      {showName && (
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: textColor }]}>Leo Look Up</Text>
          <Text style={[styles.subtitle, { color: subtextColor }]}>
            MADRID · MMXXVI
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    overflow: 'hidden',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  name: {
    fontSize: 36,
    fontWeight: '600',
    fontFamily: 'Georgia',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 4,
    marginTop: spacing.sm,
    fontWeight: '500',
  },
});
