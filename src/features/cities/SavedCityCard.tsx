import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CitySummary } from '@/src/features/cities/cities.types';
import { Chip } from '@/src/shared/components/Chip';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatCityLine } from '@/src/shared/utils/formatters';

type SavedCityCardProps = {
  city: CitySummary;
  isLastViewed?: boolean;
  onPress: () => void;
  onRemoveFavorite: () => void;
};

export function SavedCityCard({ city, isLastViewed, onPress, onRemoveFavorite }: SavedCityCardProps) {
  const { theme } = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <GlassCard style={[styles.card, { opacity: pressed ? 0.9 : 1 }]}>
          <View style={styles.topRow}>
            <View style={styles.copy}>
              <Text style={[styles.name, { color: theme.palette.text }]}>{city.name}</Text>
              <Text style={[styles.location, { color: theme.palette.textMuted }]}>{formatCityLine(city)}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={(event) => {
                event.stopPropagation();
                onRemoveFavorite();
              }}
              style={({ pressed: removePressed }) => [
                styles.iconButton,
                {
                  backgroundColor: theme.palette.surfaceMuted,
                  opacity: removePressed ? 0.76 : 1,
                },
              ]}>
              <MaterialCommunityIcons color={theme.palette.warning} name="star" size={18} />
            </Pressable>
          </View>
          <View style={styles.chips}>
            <Chip label={`${city.latitude.toFixed(1)}°, ${city.longitude.toFixed(1)}°`} />
            {city.timezone ? <Chip label={city.timezone} /> : null}
            {isLastViewed ? <Chip label="Last viewed" tone="accent" /> : null}
          </View>
        </GlassCard>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 20,
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
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
