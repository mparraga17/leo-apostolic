// ============================================================
// AdBanner.tsx — BANNER DE GOOGLE ADMOB
// ============================================================
// Banner adaptable que se renderiza al pie de las pantallas.
// Si falla la carga (sin red, etc.), simplemente no muestra
// nada para no romper el layout.
// ============================================================

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { adIds } from '../config/ads';
import { colors } from '../theme/theme';

export default function AdBanner() {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adIds.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdFailedToLoad={() => setHidden(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
    paddingTop: 4,
  },
});
