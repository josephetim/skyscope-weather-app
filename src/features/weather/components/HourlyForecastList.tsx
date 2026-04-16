import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TemperatureUnit } from '@/src/features/settings/settings.store';
import { WeatherForecast } from '@/src/features/weather/weather.types';
import { EmptyState } from '@/src/shared/components/EmptyState';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatHour } from '@/src/shared/utils/formatters';
import { formatTemperature } from '@/src/shared/utils/units';
import { getWeatherMeta } from '@/src/shared/utils/weather';

type HourlyForecastListProps = {
  forecast: WeatherForecast;
  unit: TemperatureUnit;
};

export function HourlyForecastList({ forecast, unit }: HourlyForecastListProps) {
  const { theme } = useAppTheme();

  if (forecast.hourly.length === 0) {
    return (
      <EmptyState
        compact
        description="Hourly data is missing for this location right now."
        icon="clock-outline"
        title="No hourly forecast"
      />
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.list}>
        {forecast.hourly.map((entry) => {
          const weatherMeta = getWeatherMeta(entry.weatherCode, forecast.current.isDay);

          return (
            <GlassCard key={entry.time} style={styles.card}>
              <Text style={[styles.time, { color: theme.palette.textMuted }]}>{formatHour(entry.time)}</Text>
              <MaterialCommunityIcons color={theme.palette.accent} name={weatherMeta.icon} size={26} />
              <Text style={[styles.temp, { color: theme.palette.text }]}>{formatTemperature(entry.temperatureC, unit)}</Text>
              <Text style={[styles.precipitation, { color: theme.palette.textMuted }]}>
                {Math.round(entry.precipitationProbability)}%
              </Text>
            </GlassCard>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    width: 100,
    alignItems: 'center',
    gap: 10,
  },
  time: {
    fontFamily: APP_FONTS.bodyMedium,
    fontSize: 13,
  },
  temp: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 18,
  },
  precipitation: {
    fontFamily: APP_FONTS.body,
    fontSize: 12,
  },
});
