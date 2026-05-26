// ============================================================
// TabBar.tsx — BARRA DE NAVEGACIÓN INFERIOR ESTILO iOS
// ============================================================
// Inspirada en las tab bars de Mail, Notes, Music de Apple.
// Translúcida con blur, iconos SF Symbols-like, animación
// suave al cambiar de tab.
// ============================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';
import { useI18n } from '../i18n';

export type TabId = 'today' | 'prayers' | 'songs' | 'agenda' | 'places' | 'shop';

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

// Iconos de Ionicons — equivalentes muy cercanos a SF Symbols
const tabsConfig: {
  id: TabId;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: 'today',    labelKey: 'tabs.today',    icon: 'sunny-outline',         iconActive: 'sunny' },
  { id: 'agenda',   labelKey: 'tabs.agenda',   icon: 'calendar-outline',      iconActive: 'calendar' },
  { id: 'places',   labelKey: 'tabs.places',   icon: 'location-outline',      iconActive: 'location' },
  { id: 'prayers',  labelKey: 'tabs.prayers',  icon: 'book-outline',          iconActive: 'book' },
  { id: 'songs',    labelKey: 'tabs.songs',    icon: 'musical-notes-outline', iconActive: 'musical-notes' },
  { id: 'shop',     labelKey: 'tabs.shop',     icon: 'bag-outline',           iconActive: 'bag' },
];

export default function TabBar({ activeTab, onTabChange }: Props) {
  const { t } = useI18n();
  const Container: any = Platform.OS === 'ios' ? BlurView : View;
  const containerProps = Platform.OS === 'ios'
    ? { intensity: 90, tint: 'light' as const }
    : {};

  return (
    <Container {...containerProps} style={styles.container}>
      <View style={styles.row}>
        {tabsConfig.map(tab => {
          const isActive = activeTab === tab.id;
          const label = t(tab.labelKey);
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.6}
              accessibilityRole="tab"
              accessibilityLabel={label}
              accessibilityState={{ selected: isActive }}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                color={isActive ? colors.primary : colors.textTertiary}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255,255,255,0.95)',
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: 2,
  },
  label: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  labelActive: {
    color: colors.primary,
  },
});
