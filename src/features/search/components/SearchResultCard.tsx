import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CitySummary } from '@/src/features/cities/cities.types';
import { Chip } from '@/src/shared/components/Chip';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatCityLine } from '@/src/shared/utils/formatters';

type SearchResultCardProps = {
  city: CitySummary;
  isFavorite: boolean;
  onPress: () => void;
};

export function SearchResultCard({ city, isFavorite, onPress }: SearchResultCardProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <GlassCard style={[styles.card, { opacity: pressed ? 0.88 : 1 }]}>
          <View style={styles.row}>
            <View style={styles.copy}>
              <Text style={[styles.name, { color: theme.palette.text }]}>{city.name}</Text>
              <Text style={[styles.location, { color: theme.palette.textMuted }]}>{formatCityLine(city)}</Text>
            </View>
            <MaterialCommunityIcons color={theme.palette.textMuted} name="chevron-right" size={24} />
          </View>
          <View style={styles.chips}>
            {city.timezone ? <Chip label={city.timezone} /> : null}
            {isFavorite ? <Chip label="Saved" tone="accent" /> : null}
          </View>
        </GlassCard>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  copy: {
    flex: 1,
    gap: 5,
  },
  name: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 19,
  },
  location: {
    fontFamily: APP_FONTS.body,
    fontSize: 14,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
