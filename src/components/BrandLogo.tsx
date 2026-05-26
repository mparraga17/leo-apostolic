// ============================================================
// BrandLogo.tsx — LOGO DE LA APP
// ============================================================
// Versión simplificada del logo "Leo Apostolic":
// - León estilizado en dorado
// - Cruz papal arriba a la derecha
// - Nombre opcional debajo
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, typography, spacing } from '../theme/theme';

interface Props {
  size?: number;
  showName?: boolean;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ size = 200, showName = true, variant = 'dark' }: Props) {
  const goldColor = colors.primary;
  const textColor = variant === 'dark' ? '#FFFFFF' : colors.text;
  const subtextColor = variant === 'dark' ? colors.primary : colors.textSecondary;

  return (
    <View style={[styles.container, { width: size }]}>
      {/* Logo gráfico */}
      <View style={[styles.logoContainer, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox="0 0 200 200">
          {/* Cruz papal arriba a la derecha (cruz de tres traveseros estilizada como cruz simple) */}
          <Path
            d="M 155 25 L 155 75 M 145 35 L 165 35 M 142 50 L 168 50"
            stroke={goldColor}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* León estilizado — cabeza */}
          <Circle cx="105" cy="65" r="28" fill={goldColor} />
          <Circle cx="85" cy="55" r="14" fill={goldColor} />
          <Circle cx="125" cy="50" r="14" fill={goldColor} />

          {/* Cuerpo */}
          <Path
            d="M 75 90 Q 75 120 90 130 L 90 165 L 110 165 L 110 130 Q 130 120 130 90 L 130 95 Q 130 130 110 145 L 90 145 Q 80 130 75 90 Z"
            fill={goldColor}
          />

          {/* Pata trasera estilizada */}
          <Path
            d="M 75 130 Q 60 135 55 145 Q 60 155 75 155 Q 80 155 85 152 L 85 130 Z"
            fill={goldColor}
          />

          {/* Base/pedestal */}
          <Path
            d="M 80 165 L 120 165 L 120 175 L 80 175 Z"
            fill={goldColor}
          />
          <Path
            d="M 75 175 L 125 175 L 125 180 L 75 180 Z"
            fill={goldColor}
          />
        </Svg>
      </View>

      {/* Nombre (opcional) */}
      {showName && (
        <View style={styles.textContainer}>
          <Text style={[styles.name, { color: textColor }]}>Leo Apostolic</Text>
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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
