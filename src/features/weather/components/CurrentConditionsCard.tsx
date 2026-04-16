import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CitySummary } from '@/src/features/cities/cities.types';
import { TemperatureUnit } from '@/src/features/settings/settings.store';
import { WeatherSource, WeatherForecast } from '@/src/features/weather/weather.types';
import { Chip } from '@/src/shared/components/Chip';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatCityLine, formatLastUpdated } from '@/src/shared/utils/formatters';
import { formatTemperature } from '@/src/shared/utils/units';
import { getWeatherMeta } from '@/src/shared/utils/weather';

type CurrentConditionsCardProps = {
  city: CitySummary;
  forecast: WeatherForecast;
  source: WeatherSource;
  unit: TemperatureUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function CurrentConditionsCard({
  city,
  forecast,
  source,
  unit,
  isFavorite,
  onToggleFavorite,
}: CurrentConditionsCardProps) {
  const { theme } = useAppTheme();
  const weatherMeta = getWeatherMeta(forecast.current.weatherCode, forecast.current.isDay);

  return (
    <GlassCard style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.location}>
          <Text style={[styles.cityName, { color: theme.palette.text }]}>{city.name}</Text>
          <Text style={[styles.cityLine, { color: theme.palette.textMuted }]}>{formatCityLine(city)}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onToggleFavorite}
          style={({ pressed }) => [
            styles.favoriteButton,
            {
              backgroundColor: theme.palette.surfaceMuted,
              opacity: pressed ? 0.78 : 1,
            },
          ]}>
          <MaterialCommunityIcons
            color={isFavorite ? theme.palette.warning : theme.palette.textMuted}
            name={isFavorite ? 'star' : 'star-outline'}
            size={22}
          />
        </Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.temperatureWrap}>
          <Text style={[styles.temperature, { color: theme.palette.text }]}>
            {formatTemperature(forecast.current.temperatureC, unit)}
          </Text>
          <Text style={[styles.summary, { color: theme.palette.textMuted }]}>{weatherMeta.label}</Text>
          <Text style={[styles.feelsLike, { color: theme.palette.textMuted }]}>
            Feels like {formatTemperature(forecast.current.apparentTemperatureC, unit)}
          </Text>
        </View>
        <View style={[styles.iconWrap, { backgroundColor: theme.palette.accentSoft }]}>
          <MaterialCommunityIcons color={theme.palette.accent} name={weatherMeta.icon} size={56} />
        </View>
      </View>

      <View style={styles.chips}>
        <Chip label={`Updated ${formatLastUpdated(forecast.fetchedAt)}`} tone="accent" />
        {source === 'cache' ? <Chip label="Offline snapshot" tone="warning" /> : null}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  location: {
    flex: 1,
    gap: 4,
  },
  cityName: {
    fontFamily: APP_FONTS.display,
    fontSize: 26,
  },
  cityLine: {
    fontFamily: APP_FONTS.body,
    fontSize: 15,
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  temperatureWrap: {
    flex: 1,
    gap: 6,
  },
  temperature: {
    fontFamily: APP_FONTS.display,
    fontSize: 56,
  },
  summary: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 18,
  },
  feelsLike: {
    fontFamily: APP_FONTS.body,
    fontSize: 14,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
