// ============================================================
// AboutModal.tsx — INFORMACIÓN DE LA APP
// ============================================================
// Modal accesible desde el icono ⓘ del header de "Hoy".
// Muestra versión, créditos, contacto, enlaces legales y
// botón para compartir la app con otros usuarios.
// ============================================================

import React from 'react';
import {
  View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Linking, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';
import { useI18n } from '../i18n';
import { shareText } from '../utils/share';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const APP_STORE_URL = 'https://apps.apple.com/es/app/leo-look-up/id6773494248';
const PRIVACY_URL = 'https://mparraga17.github.io/leo-apostolic/privacy-es.html';
const PRIVACY_URL_EN = 'https://mparraga17.github.io/leo-apostolic/privacy-en.html';
const TERMS_URL = 'https://mparraga17.github.io/leo-apostolic/terms-es.html';
const TERMS_URL_EN = 'https://mparraga17.github.io/leo-apostolic/terms-en.html';
const SUPPORT_URL = 'https://mparraga17.github.io/leo-apostolic/';
const CONTACT_EMAIL = 'pizcodeploy@gmail.com';

export default function AboutModal({ visible, onClose }: Props) {
  const { t, locale } = useI18n();

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  const openEmail = () => {
    const subject = encodeURIComponent('Leo Look Up — Feedback');
    Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=${subject}`);
  };

  const openLink = (url: string) => Linking.openURL(url);

  const onShareApp = () => {
    shareText({
      title: 'Leo Look Up',
      message: locale === 'en'
        ? 'A Catholic devotional companion app — prayers, hymns and the visit of Pope Leo XIV to Madrid.'
        : 'Un compañero espiritual católico — oraciones, cantos y la visita del Papa León XIV a Madrid.',
      url: APP_STORE_URL,
    });
  };

  const privacyUrl = locale === 'en' ? PRIVACY_URL_EN : PRIVACY_URL;
  const termsUrl = locale === 'en' ? TERMS_URL_EN : TERMS_URL;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: 32 }} />
          <Text style={styles.headerTitle}>{t('about.title')}</Text>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel={t('common.close')}
          >
            <Ionicons name="close-circle" size={28} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Logo + nombre */}
          <View style={styles.heroSection}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
              resizeMode="cover"
            />
            <Text style={styles.appName}>Leo Look Up</Text>
            <Text style={styles.tagline}>MADRID · MMXXVI</Text>
            <Text style={styles.version}>{t('about.version', { version: appVersion })}</Text>
          </View>

          {/* Acerca de */}
          <Text style={styles.sectionLabel}>{t('about.aboutSection')}</Text>
          <View style={styles.textCard}>
            <Text style={styles.bodyText}>
              {t('about.aboutText')}
            </Text>
          </View>

          {/* Acciones */}
          <Text style={styles.sectionLabel}>{t('about.actionsSection')}</Text>
          <View style={styles.list}>
            <ActionRow
              icon="share-outline"
              label={t('about.shareApp')}
              onPress={onShareApp}
            />
            <ActionRow
              icon="mail-outline"
              label={t('about.contact')}
              subtitle={CONTACT_EMAIL}
              onPress={openEmail}
              isLast
            />
          </View>

          {/* Legal */}
          <Text style={styles.sectionLabel}>{t('about.legalSection')}</Text>
          <View style={styles.list}>
            <ActionRow
              icon="document-text-outline"
              label={t('about.privacyPolicy')}
              onPress={() => openLink(privacyUrl)}
            />
            <ActionRow
              icon="document-text-outline"
              label={t('about.termsOfUse')}
              onPress={() => openLink(termsUrl)}
            />
            <ActionRow
              icon="information-circle-outline"
              label={t('about.support')}
              onPress={() => openLink(SUPPORT_URL)}
              isLast
            />
          </View>

          {/* Créditos */}
          <Text style={styles.sectionLabel}>{t('about.creditsSection')}</Text>
          <View style={styles.textCard}>
            <Text style={styles.bodyText}>
              {t('about.creditsText')}
            </Text>
          </View>

          <Text style={styles.footer}>
            © 2026 Pizco Deploy · Leo Look Up
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

function ActionRow({
  icon,
  label,
  subtitle,
  onPress,
  isLast,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.row, !isLast && styles.rowBorder]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Ionicons name={icon} size={20} color={colors.primary} style={styles.rowIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.base,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  headerTitle: {
    ...typography.bodyEmphasized,
    color: colors.text,
    fontWeight: '600',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 22,
    marginBottom: spacing.md,
  },
  appName: {
    ...typography.title2,
    fontFamily: 'Georgia',
    color: colors.text,
    fontWeight: '600',
  },
  tagline: {
    ...typography.caption,
    color: colors.primary,
    letterSpacing: 3,
    marginTop: 4,
    fontWeight: '600',
  },
  version: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },

  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    letterSpacing: 0.6,
  },

  textCard: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    padding: spacing.base,
    ...shadows.card,
  },
  bodyText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },

  list: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md + 2,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  rowIcon: { marginRight: spacing.md },
  rowLabel: {
    ...typography.body,
    color: colors.text,
  },
  rowSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  footer: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: spacing.xl,
    fontStyle: 'italic',
  },
});
