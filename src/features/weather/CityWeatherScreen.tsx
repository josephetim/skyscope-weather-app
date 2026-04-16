import { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useCitiesStore } from '@/src/features/cities/cities.store';
import { CitySummary } from '@/src/features/cities/cities.types';
import { useSettingsStore } from '@/src/features/settings/settings.store';
import { CurrentConditionsCard } from '@/src/features/weather/components/CurrentConditionsCard';
import { DailyForecastList } from '@/src/features/weather/components/DailyForecastList';
import { HourlyForecastList } from '@/src/features/weather/components/HourlyForecastList';
import { MetricsGrid } from '@/src/features/weather/components/MetricsGrid';
import { TemperatureTrendChart } from '@/src/features/weather/components/TemperatureTrendChart';
import { WeatherDetailSkeleton } from '@/src/features/weather/components/WeatherDetailSkeleton';
import { LAST_VIEWED_FORECAST_QUERY_KEY, useWeatherForecast } from '@/src/features/weather/weather.queries';
import { AppBackground } from '@/src/shared/components/AppBackground';
import { ErrorPanel } from '@/src/shared/components/ErrorPanel';
import { ScreenHeader } from '@/src/shared/components/ScreenHeader';
import { SectionHeader } from '@/src/shared/components/SectionHeader';

type CityRouteParams = {
  id?: string;
  name?: string;
  region?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  timezone?: string;
};

function toSingleValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function buildFallbackCity(params: CityRouteParams) {
  const id = toSingleValue(params.id);
  const name = toSingleValue(params.name);
  const country = toSingleValue(params.country);
  const latitude = Number(toSingleValue(params.latitude));
  const longitude = Number(toSingleValue(params.longitude));

  if (!id || !name || !country || Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return null;
  }

  return {
    id,
    name,
    region: toSingleValue(params.region),
    country,
    latitude,
    longitude,
    timezone: toSingleValue(params.timezone),
  } satisfies CitySummary;
}

export function CityWeatherScreen() {
  const params = useLocalSearchParams<CityRouteParams>();
  const queryClient = useQueryClient();
  const rememberCity = useCitiesStore((state) => state.rememberCity);
  const setLastViewedCity = useCitiesStore((state) => state.setLastViewedCity);
  const toggleFavorite = useCitiesStore((state) => state.toggleFavorite);
  const storedCity = useCitiesStore((state) => {
    const id = toSingleValue(params.id);
    return id ? state.cities[id] : undefined;
  });
  const fallbackCity = buildFallbackCity(params);
  const city = storedCity ?? fallbackCity ?? undefined;
  const isFavorite = useCitiesStore((state) => (city ? state.favorites.includes(city.id) : false));
  const unit = useSettingsStore((state) => state.unit);
  const forecastQuery = useWeatherForecast(city);

  useEffect(() => {
    if (fallbackCity && !storedCity) {
      rememberCity(fallbackCity);
    }
  }, [fallbackCity, rememberCity, storedCity]);

  useEffect(() => {
    if (city) {
      setLastViewedCity(city);
    }
  }, [city, setLastViewedCity]);

  useEffect(() => {
    if (city && forecastQuery.data?.forecast) {
      queryClient.setQueryData(LAST_VIEWED_FORECAST_QUERY_KEY, {
        city,
        forecast: forecastQuery.data.forecast,
      });
    }
  }, [city, forecastQuery.data, queryClient]);

  if (!city) {
    return (
      <AppBackground edges={['top']}>
        <View style={styles.errorWrap}>
          <ScreenHeader onBack={() => router.back()} subtitle="The selected city is missing from local state." title="City unavailable" />
          <ErrorPanel
            actionLabel="Search again"
            description="SkyScope could not rebuild this route. Search for the location again to refresh its coordinates."
            onAction={() => router.replace('/search')}
            title="Forecast route is incomplete"
          />
        </View>
      </AppBackground>
    );
  }

  const forecast = forecastQuery.data?.forecast;
  const source = forecastQuery.data?.source;

  return (
    <AppBackground edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl onRefresh={() => forecastQuery.refetch()} refreshing={forecastQuery.isRefetching} />}
        showsVerticalScrollIndicator={false}>
        <ScreenHeader eyebrow="Forecast" onBack={() => router.back()} subtitle="Current conditions, hourly changes, and a seven-day outlook." title={city.name} />

        {forecastQuery.isLoading && !forecast ? (
          <WeatherDetailSkeleton />
        ) : forecast ? (
          <>
            <Animated.View entering={FadeInDown.duration(450)}>
              <CurrentConditionsCard
                city={city}
                forecast={forecast}
                isFavorite={isFavorite}
                onToggleFavorite={() => toggleFavorite(city)}
                source={source ?? 'network'}
                unit={unit}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(60).duration(450)}>
              <MetricsGrid forecast={forecast} unit={unit} />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(120).duration(450)} style={styles.section}>
              <SectionHeader subtitle="Upcoming temperature contour for the next few hours." title="Trend" />
              <TemperatureTrendChart forecast={forecast} unit={unit} />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(180).duration(450)} style={styles.section}>
              <SectionHeader subtitle="Tap-and-scan hourly temperature and precipitation changes." title="Hourly" />
              <HourlyForecastList forecast={forecast} unit={unit} />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(220).duration(450)} style={styles.section}>
              <SectionHeader subtitle="Seven days of highs, lows, and weather codes." title="7-day forecast" />
              <DailyForecastList forecast={forecast} unit={unit} />
            </Animated.View>
          </>
        ) : (
          <ErrorPanel
            actionLabel="Try again"
            description="SkyScope could not fetch a forecast and no offline snapshot was available for this city."
            onAction={() => forecastQuery.refetch()}
            title="Weather data is unavailable"
          />
        )}
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 48,
    gap: 18,
  },
  section: {
    gap: 12,
  },
  errorWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 18,
  },
});
