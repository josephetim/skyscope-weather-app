import { StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TemperatureUnit } from '@/src/features/settings/settings.store';
import { WeatherForecast } from '@/src/features/weather/weather.types';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatTemperature, formatWindSpeed } from '@/src/shared/utils/units';

type MetricsGridProps = {
  forecast: WeatherForecast;
  unit: TemperatureUnit;
};

export function MetricsGrid({ forecast, unit }: MetricsGridProps) {
  const { theme } = useAppTheme();

  const metrics = [
    {
      label: 'Humidity',
      value: `${Math.round(forecast.current.humidity)}%`,
      icon: 'water-percent',
    },
    {
      label: 'Wind speed',
      value: formatWindSpeed(forecast.current.windSpeedKph, unit),
      icon: 'weather-windy',
    },
    {
      label: 'Precipitation',
      value: `${Math.round(forecast.current.precipitationProbability)}%`,
      icon: 'weather-pouring',
    },
    {
      label: 'Apparent temp',
      value: formatTemperature(forecast.current.apparentTemperatureC, unit),
      icon: 'thermometer',
    },
  ] as const;

  return (
    <View style={styles.grid}>
      {metrics.map((metric) => (
        <GlassCard key={metric.label} style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: theme.palette.surfaceMuted }]}>
            <MaterialCommunityIcons color={theme.palette.accent} name={metric.icon} size={22} />
          </View>
          <Text style={[styles.value, { color: theme.palette.text }]}>{metric.value}</Text>
          <Text style={[styles.label, { color: theme.palette.textMuted }]}>{metric.label}</Text>
        </GlassCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    gap: 12,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 20,
  },
  label: {
    fontFamily: APP_FONTS.body,
    fontSize: 13,
  },
});
