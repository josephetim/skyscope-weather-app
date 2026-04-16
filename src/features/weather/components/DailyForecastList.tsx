import { StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TemperatureUnit } from '@/src/features/settings/settings.store';
import { WeatherForecast } from '@/src/features/weather/weather.types';
import { EmptyState } from '@/src/shared/components/EmptyState';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatFullWeekday } from '@/src/shared/utils/formatters';
import { formatTemperature } from '@/src/shared/utils/units';
import { getWeatherMeta } from '@/src/shared/utils/weather';

type DailyForecastListProps = {
  forecast: WeatherForecast;
  unit: TemperatureUnit;
};

export function DailyForecastList({ forecast, unit }: DailyForecastListProps) {
  const { theme } = useAppTheme();

  if (forecast.daily.length === 0) {
    return (
      <EmptyState
        compact
        description="The daily feed is incomplete, so SkyScope cannot build a 7-day outlook."
        icon="calendar-alert"
        title="No daily forecast"
      />
    );
  }

  return (
    <View style={styles.list}>
      {forecast.daily.map((entry) => {
        const weatherMeta = getWeatherMeta(entry.weatherCode, true);

        return (
          <GlassCard key={entry.date} style={styles.row}>
            <View style={styles.left}>
              <MaterialCommunityIcons color={theme.palette.accent} name={weatherMeta.icon} size={24} />
              <View style={styles.copy}>
                <Text style={[styles.day, { color: theme.palette.text }]}>{formatFullWeekday(entry.date)}</Text>
                <Text style={[styles.summary, { color: theme.palette.textMuted }]}>{weatherMeta.label}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={[styles.range, { color: theme.palette.text }]}>
                {formatTemperature(entry.temperatureMaxC, unit)} / {formatTemperature(entry.temperatureMinC, unit)}
              </Text>
              <Text style={[styles.precipitation, { color: theme.palette.textMuted }]}>
                {Math.round(entry.precipitationProbability)}% precip
              </Text>
            </View>
          </GlassCard>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  day: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 16,
  },
  summary: {
    fontFamily: APP_FONTS.body,
    fontSize: 13,
  },
  right: {
    alignItems: 'flex-end',
    gap: 3,
  },
  range: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 14,
  },
  precipitation: {
    fontFamily: APP_FONTS.body,
    fontSize: 12,
  },
});
