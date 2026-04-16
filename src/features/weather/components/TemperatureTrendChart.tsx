import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Path, Stop } from 'react-native-svg';

import { TemperatureUnit } from '@/src/features/settings/settings.store';
import { WeatherForecast } from '@/src/features/weather/weather.types';
import { EmptyState } from '@/src/shared/components/EmptyState';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatHour } from '@/src/shared/utils/formatters';
import { formatTemperature, getTemperatureForUnit } from '@/src/shared/utils/units';

type TemperatureTrendChartProps = {
  forecast: WeatherForecast;
  unit: TemperatureUnit;
};

export function TemperatureTrendChart({ forecast, unit }: TemperatureTrendChartProps) {
  const { width } = useWindowDimensions();
  const { theme } = useAppTheme();
  const chartHeight = 190;
  const chartWidth = Math.max(width - 72, 260);
  const padding = 20;
  const points = forecast.hourly.slice(0, 8);

  if (points.length < 2) {
    return (
      <EmptyState
        compact
        description="SkyScope needs at least two hourly points to draw a temperature trend."
        icon="chart-line-variant"
        title="Not enough chart data"
      />
    );
  }

  const temperatures = points.map((point) => getTemperatureForUnit(point.temperatureC, unit));
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);
  const range = Math.max(max - min, 1);
  const stepX = (chartWidth - padding * 2) / (points.length - 1);

  const coordinates = temperatures.map((temperature, index) => ({
    x: padding + stepX * index,
    y: chartHeight - padding - ((temperature - min) / range) * (chartHeight - padding * 2),
  }));

  const linePath = coordinates.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${coordinates.at(-1)?.x ?? 0} ${chartHeight - padding} L ${coordinates[0]?.x ?? 0} ${chartHeight - padding} Z`;

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.palette.text }]}>Temperature trend</Text>
        <Text style={[styles.subtitle, { color: theme.palette.textMuted }]}>
          High {formatTemperature(Math.max(...points.map((point) => point.temperatureC)), unit)}
        </Text>
      </View>

      <Svg height={chartHeight} style={styles.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%">
        <Defs>
          <SvgLinearGradient id="skyscopeFill" x1="0" x2="0" y1="0" y2="1">
            <Stop offset="0%" stopColor={theme.palette.accent} stopOpacity={0.32} />
            <Stop offset="100%" stopColor={theme.palette.accent} stopOpacity={0.02} />
          </SvgLinearGradient>
        </Defs>
        <Path d={areaPath} fill="url(#skyscopeFill)" />
        <Path d={linePath} fill="none" stroke={theme.palette.accent} strokeLinecap="round" strokeWidth={4} />
        {coordinates.map((point, index) => (
          <Circle
            cx={point.x}
            cy={point.y}
            fill={theme.palette.surfaceStrong}
            key={points[index]?.time}
            r={5}
            stroke={theme.palette.accent}
            strokeWidth={3}
          />
        ))}
      </Svg>

      <View style={styles.axis}>
        {points.map((point) => (
          <View key={point.time} style={styles.axisLabel}>
            <Text style={[styles.axisTime, { color: theme.palette.textMuted }]}>{formatHour(point.time)}</Text>
            <Text style={[styles.axisTemp, { color: theme.palette.text }]}>{formatTemperature(point.temperatureC, unit)}</Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },
  header: {
    gap: 4,
  },
  title: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 18,
  },
  subtitle: {
    fontFamily: APP_FONTS.body,
    fontSize: 13,
  },
  chart: {
    minHeight: 190,
  },
  axis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  axisLabel: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  axisTime: {
    fontFamily: APP_FONTS.body,
    fontSize: 11,
  },
  axisTemp: {
    fontFamily: APP_FONTS.bodyMedium,
    fontSize: 12,
  },
});
