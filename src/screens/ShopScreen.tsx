// ============================================================
// ShopScreen.tsx — Tienda Amazon (estilo iOS premium)
// ============================================================

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { products, amazonSearches, buildAmazonUrl, buildAmazonSearchUrl } from '../data/products';
import { Product, ProductCategory } from '../models/types';
import { colors, typography, spacing, radius, shadows } from '../theme/theme';
import { useI18n } from '../i18n';

function groupByCategory(items: Product[]) {
  const groups: Record<string, Product[]> = {};
  items.forEach(p => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  return Object.entries(groups) as [ProductCategory, Product[]][];
}

function categoryIcon(category: ProductCategory): keyof typeof Ionicons.glyphMap {
  switch (category) {
    case ProductCategory.Libros: return 'book-outline';
    case ProductCategory.Souvenirs: return 'gift-outline';
    case ProductCategory.Ninos: return 'happy-outline';
    case ProductCategory.Religiosos: return 'flower-outline';
    default: return 'pricetag-outline';
  }
}

/**
 * Devuelve los productos featured intercalando categorías,
 * de forma que dos productos de la misma categoría no aparezcan
 * seguidos en el carrusel de destacados.
 */
function buildFeaturedRotation(items: Product[]): Product[] {
  // Agrupar featured por categoría preservando orden original
  const buckets: Record<string, Product[]> = {};
  items.forEach(p => {
    if (!p.featured) return;
    if (!buckets[p.category]) buckets[p.category] = [];
    buckets[p.category].push(p);
  });

  const categoryQueues = Object.values(buckets);
  const result: Product[] = [];
  let lastCategory: string | null = null;

  // Round-robin con bloqueo: en cada paso elige la cola más larga
  // cuya categoría sea distinta de la última añadida.
  while (categoryQueues.some(q => q.length > 0)) {
    // Ordenar las colas por longitud descendente
    const sorted = [...categoryQueues]
      .filter(q => q.length > 0)
      .sort((a, b) => b.length - a.length);

    // Buscar la primera cola cuya categoría sea distinta de lastCategory
    const next = sorted.find(q => q[0].category !== lastCategory) ?? sorted[0];
    const product = next.shift()!;
    result.push(product);
    lastCategory = product.category;
  }

  return result;
}

export default function ShopScreen() {
  const { t } = useI18n();
  const grouped = groupByCategory(products);
  const featured = products.filter(p => p.featured);

  const openProduct = (asin: string) => {
    const url = buildAmazonUrl(asin);
    if (url) Linking.openURL(url);
  };

  const openSearch = (query: string) => {
    const url = buildAmazonSearchUrl(query);
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{t('shop.headerSubtitle')}</Text>
          <Text style={styles.headerTitle}>{t('shop.headerTitle')}</Text>
        </View>

        {/* Destacados horizontales */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('shop.featuredSection')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {featured.map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.featuredCard}
                onPress={() => openProduct(product.amazonAsin)}
                activeOpacity={0.85}
              >
                <View style={styles.featuredHeader}>
                  <Ionicons name={categoryIcon(product.category)} size={14} color={colors.primary} />
                  <Text style={styles.featuredCategory} numberOfLines={1}>
                    {product.category}
                  </Text>
                </View>
                <Text style={styles.featuredName} numberOfLines={2}>{product.title}</Text>
                {product.author && (
                  <Text style={styles.featuredAuthor} numberOfLines={1}>{product.author}</Text>
                )}
                <Text style={styles.featuredPrice}>{product.price.toFixed(2)}€</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Por categoría */}
        {grouped.map(([category, items]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionLabel}>{category.toUpperCase()}</Text>
            <View style={styles.list}>
              {items.map((product, i) => (
                <TouchableOpacity
                  key={product.id}
                  style={[styles.row, i < items.length - 1 && styles.rowBorder]}
                  onPress={() => openProduct(product.amazonAsin)}
                  activeOpacity={0.5}
                >
                  <View style={styles.rowContent}>
                    <Text style={styles.rowTitle}>{product.title}</Text>
                    {product.author && (
                      <Text style={styles.rowMeta}>{product.author}</Text>
                    )}
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>{product.price.toFixed(2)}€</Text>
                      {product.rating && (
                        <Text style={styles.rating}>
                          ★ {product.rating} ({product.totalRatings || 0})
                        </Text>
                      )}
                    </View>
                  </View>
                  <Ionicons name="open-outline" size={16} color={colors.textTertiary} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Búsquedas */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('shop.exploreSection')}</Text>
          <View style={styles.list}>
            {amazonSearches.map((s, i) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.row, i < amazonSearches.length - 1 && styles.rowBorder]}
                onPress={() => openSearch(s.query)}
                activeOpacity={0.5}
              >
                <View style={styles.rowContent}>
                  <Text style={styles.rowTitle}>{s.label}</Text>
                </View>
                <Ionicons name="open-outline" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.disclaimer}>
          {t('shop.affiliateDisclaimer')}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxl },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
  },
  headerSubtitle: { ...typography.subhead, color: colors.textSecondary, marginBottom: 4 },
  headerTitle: { ...typography.display, color: colors.text },

  section: { marginTop: spacing.lg },
  sectionLabel: {
    ...typography.sectionHeader,
    color: colors.textSecondary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },

  horizontalList: { paddingHorizontal: spacing.base },
  featuredCard: {
    width: 170,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    ...shadows.card,
  },
  featuredImage: {
    height: 100,
    backgroundColor: colors.primaryMuted,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  featuredName: { ...typography.subhead, fontWeight: '600', color: colors.text, minHeight: 38 },
  featuredAuthor: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  featuredPrice: {
    ...typography.bodyEmphasized,
    color: colors.primary,
    marginTop: spacing.xs,
  },

  list: {
    backgroundColor: colors.backgroundElevated,
    marginHorizontal: spacing.base,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  rowContent: { flex: 1 },
  rowTitle: { ...typography.bodyEmphasized, color: colors.text },
  rowMeta: { ...typography.footnote, color: colors.textSecondary, marginTop: 2 },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  price: { ...typography.bodyEmphasized, color: colors.primary },
  rating: { ...typography.footnote, color: colors.textSecondary },

  disclaimer: {
    ...typography.footnote,
    color: colors.textTertiary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});
