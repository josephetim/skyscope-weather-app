import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { SavedCityCard } from '@/src/features/cities/SavedCityCard';
import { useCitiesStore } from '@/src/features/cities/cities.store';
import { useSettingsStore } from '@/src/features/settings/settings.store';
import { useLastViewedForecast } from '@/src/features/weather/weather.queries';
import { AppBackground } from '@/src/shared/components/AppBackground';
import { EmptyState } from '@/src/shared/components/EmptyState';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { ScreenHeader } from '@/src/shared/components/ScreenHeader';
import { SearchField } from '@/src/shared/components/SearchField';
import { SectionHeader } from '@/src/shared/components/SectionHeader';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatCityLine, formatLastUpdated } from '@/src/shared/utils/formatters';
import { formatTemperature } from '@/src/shared/utils/units';
import { getWeatherMeta } from '@/src/shared/utils/weather';

function navigateToCity(params: {
  id: string;
  name: string;
  region?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string;
}) {
  router.push({
    pathname: '/city/[id]',
    params: {
      id: params.id,
      name: params.name,
      region: params.region ?? '',
      country: params.country,
      latitude: String(params.latitude),
      longitude: String(params.longitude),
      timezone: params.timezone ?? '',
    },
  });
}

export function DashboardScreen() {
  const favorites = useCitiesStore((state) => state.favorites);
  const cities = useCitiesStore((state) => state.cities);
  const lastViewedCityId = useCitiesStore((state) => state.lastViewedCityId);
  const removeFavorite = useCitiesStore((state) => state.removeFavorite);
  const unit = useSettingsStore((state) => state.unit);
  const { theme } = useAppTheme();
  const lastViewedQuery = useLastViewedForecast();

  const favoriteCities = favorites.map((favoriteId) => cities[favoriteId]).filter(Boolean);
  const lastViewedSnapshot = lastViewedQuery.data;
  const lastViewedWeatherMeta = lastViewedSnapshot
    ? getWeatherMeta(lastViewedSnapshot.forecast.current.weatherCode, lastViewedSnapshot.forecast.current.isDay)
    : null;

  return (
    <AppBackground edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(500)}>
          <ScreenHeader
            eyebrow="Forecasts"
            subtitle="Search fast, pin your go-to cities, and keep the latest weather close at hand."
            title="SkyScope"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(70).duration(500)}>
          <SearchField editable={false} onPress={() => router.push('/search')} placeholder="Search cities, coastlines, capitals..." />
        </Animated.View>

        {lastViewedSnapshot && lastViewedWeatherMeta ? (
          <Animated.View entering={FadeInDown.delay(120).duration(500)}>
            <GlassCard style={styles.heroCard}>
              <View style={styles.heroCopy}>
                <Text style={[styles.heroEyebrow, { color: theme.palette.accent }]}>Last viewed</Text>
                <Text style={[styles.heroCity, { color: theme.palette.text }]}>{lastViewedSnapshot.city.name}</Text>
                <Text style={[styles.heroLocation, { color: theme.palette.textMuted }]}>
                  {formatCityLine(lastViewedSnapshot.city)}
                </Text>
              </View>
              <View style={styles.heroBottom}>
                <View style={styles.heroStats}>
                  <Text style={[styles.heroTemp, { color: theme.palette.text }]}>
                    {formatTemperature(lastViewedSnapshot.forecast.current.temperatureC, unit)}
                  </Text>
                  <Text style={[styles.heroSummary, { color: theme.palette.textMuted }]}>{lastViewedWeatherMeta.label}</Text>
                  <Text style={[styles.heroUpdated, { color: theme.palette.textMuted }]}>
                    Updated {formatLastUpdated(lastViewedSnapshot.forecast.fetchedAt)}
                  </Text>
                </View>
                <View style={[styles.heroIconWrap, { backgroundColor: theme.palette.accentSoft }]}>
                  <MaterialCommunityIcons color={theme.palette.accent} name={lastViewedWeatherMeta.icon} size={42} />
                </View>
              </View>
              <Pressable
                onPress={() =>
                  navigateToCity({
                    id: lastViewedSnapshot.city.id,
                    name: lastViewedSnapshot.city.name,
                    region: lastViewedSnapshot.city.region,
                    country: lastViewedSnapshot.city.country,
                    latitude: lastViewedSnapshot.city.latitude,
                    longitude: lastViewedSnapshot.city.longitude,
                    timezone: lastViewedSnapshot.city.timezone,
                  })
                }>
                {({ pressed }) => (
                  <Text style={[styles.heroLink, { color: theme.palette.accent, opacity: pressed ? 0.72 : 1 }]}>
                    Open forecast
                  </Text>
                )}
              </Pressable>
            </GlassCard>
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(160).duration(500)} style={styles.section}>
          <SectionHeader subtitle={`${favoriteCities.length} saved city${favoriteCities.length === 1 ? '' : 'ies'}`} title="Saved cities" />
        </Animated.View>

        <View style={styles.list}>
          {favoriteCities.length === 0 ? (
            <Animated.View entering={FadeInDown.delay(200).duration(500)}>
              <EmptyState
                actionLabel="Search cities"
                compact
                description="Build your shortlist so SkyScope can open straight to the places you watch most."
                icon="star-outline"
                onAction={() => router.push('/search')}
                title="No saved cities yet"
              />
            </Animated.View>
          ) : (
            favoriteCities.map((city, index) => (
              <Animated.View entering={FadeInDown.delay(200 + index * 40).duration(450)} key={city.id}>
                <SavedCityCard
                  city={city}
                  isLastViewed={city.id === lastViewedCityId}
                  onPress={() =>
                    navigateToCity({
                      id: city.id,
                      name: city.name,
                      region: city.region,
                      country: city.country,
                      latitude: city.latitude,
                      longitude: city.longitude,
                      timezone: city.timezone,
                    })
                  }
                  onRemoveFavorite={() => removeFavorite(city.id)}
                />
              </Animated.View>
            ))
          )}
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 132,
    gap: 18,
  },
  heroCard: {
    gap: 18,
  },
  heroCopy: {
    gap: 6,
  },
  heroEyebrow: {
    fontFamily: APP_FONTS.bodyMedium,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroCity: {
    fontFamily: APP_FONTS.display,
    fontSize: 28,
  },
  heroLocation: {
    fontFamily: APP_FONTS.body,
    fontSize: 14,
  },
  heroBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  heroStats: {
    flex: 1,
    gap: 6,
  },
  heroTemp: {
    fontFamily: APP_FONTS.display,
    fontSize: 50,
  },
  heroSummary: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 18,
  },
  heroUpdated: {
    fontFamily: APP_FONTS.body,
    fontSize: 13,
  },
  heroIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    fontSize: 42,
  },
  heroLink: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 15,
  },
  section: {
    marginTop: 4,
  },
  list: {
    gap: 12,
  },
});
