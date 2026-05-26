// ============================================================
// LanguageToggle.tsx — SELECTOR DE IDIOMA
// ============================================================
// Pequeño toggle ES/EN al estilo App Store.
// ============================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../theme/theme';
import { useI18n, Locale } from '../i18n';

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  const renderOption = (value: Locale, label: string) => {
    const isActive = locale === value;
    return (
      <TouchableOpacity
        onPress={() => setLocale(value)}
        style={[styles.option, isActive && styles.optionActive]}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Switch to ${label}`}
      >
        <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderOption('es', 'ES')}
      {renderOption('en', 'EN')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundElevated,
    borderRadius: 14,
    padding: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.separator,
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  optionActive: {
    backgroundColor: colors.primary,
  },
  optionText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  optionTextActive: {
    color: colors.textInverse,
  },
});
