import { StyleSheet, View } from 'react-native';

import { GlassCard } from '@/src/shared/components/GlassCard';
import { SkeletonBlock } from '@/src/shared/components/SkeletonBlock';

export function WeatherDetailSkeleton() {
  return (
    <View style={styles.container}>
      <GlassCard style={styles.hero}>
        <SkeletonBlock height={22} width="55%" />
        <SkeletonBlock height={16} width="38%" />
        <SkeletonBlock height={58} width="44%" />
        <SkeletonBlock height={18} width="34%" />
      </GlassCard>
      <View style={styles.grid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <GlassCard key={index} style={styles.metricCard}>
            <SkeletonBlock height={18} width={42} />
            <SkeletonBlock height={22} width="60%" />
            <SkeletonBlock height={14} width="50%" />
          </GlassCard>
        ))}
      </View>
      <GlassCard style={styles.chartCard}>
        <SkeletonBlock height={22} width="48%" />
        <SkeletonBlock height={180} width="100%" />
      </GlassCard>
      <View style={styles.dailyList}>
        {Array.from({ length: 4 }).map((_, index) => (
          <GlassCard key={index}>
            <SkeletonBlock height={18} width="72%" />
          </GlassCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  hero: {
    gap: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    gap: 10,
  },
  chartCard: {
    gap: 14,
  },
  dailyList: {
    gap: 12,
  },
});
