import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { router } from 'expo-router';

import { useCitiesStore } from '@/src/features/cities/cities.store';
import { SearchResultCard } from '@/src/features/search/components/SearchResultCard';
import { useCitySearch } from '@/src/features/search/search.queries';
import { AppBackground } from '@/src/shared/components/AppBackground';
import { EmptyState } from '@/src/shared/components/EmptyState';
import { ErrorPanel } from '@/src/shared/components/ErrorPanel';
import { ScreenHeader } from '@/src/shared/components/ScreenHeader';
import { SearchField } from '@/src/shared/components/SearchField';
import { SkeletonBlock } from '@/src/shared/components/SkeletonBlock';
import { useDebouncedValue } from '@/src/shared/hooks/useDebouncedValue';

function navigateToSearchResult(params: {
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

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const favorites = useCitiesStore((state) => state.favorites);
  const rememberCity = useCitiesStore((state) => state.rememberCity);
  const debouncedQuery = useDebouncedValue(query, 350);
  const searchQuery = useCitySearch(debouncedQuery);

  const trimmedQuery = query.trim();
  const showSearchPrompt = trimmedQuery.length === 0;
  const showLoading = searchQuery.isFetching && !searchQuery.data;
  const showError = searchQuery.isError;
  const showEmpty = trimmedQuery.length >= 2 && !showLoading && !showError && (searchQuery.data?.length ?? 0) === 0;

  return (
    <AppBackground edges={['top']}>
      <FlatList
        contentContainerStyle={styles.content}
        data={showSearchPrompt || showLoading || showError || showEmpty ? [] : searchQuery.data}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          showSearchPrompt ? (
            <EmptyState
              compact
              description="Start with at least two characters to fetch location suggestions from Open-Meteo."
              icon="map-search-outline"
              title="Search for a city"
            />
          ) : showLoading ? (
            <View style={styles.skeletons}>
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock borderRadius={28} height={108} key={index} />
              ))}
            </View>
          ) : showError ? (
            <ErrorPanel
              actionLabel="Retry"
              description="SkyScope could not fetch city suggestions. Check your connection and try again."
              onAction={() => searchQuery.refetch()}
              title="Search is temporarily unavailable"
            />
          ) : showEmpty ? (
            <EmptyState
              compact
              description="No matches came back for that search. Try a nearby city, region, or country name."
              icon="map-marker-off-outline"
              title="No results found"
            />
          ) : null
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader
              eyebrow="Search"
              onBack={() => router.back()}
              subtitle="Open-Meteo suggestions update after a short debounce so the search stays fast."
              title="Find a city"
            />
            <SearchField autoFocus onChangeText={setQuery} placeholder="Search by city or region..." value={query} />
          </View>
        }
        renderItem={({ item }) => (
          <SearchResultCard
            city={item}
            isFavorite={favorites.includes(item.id)}
            onPress={() => {
              rememberCity(item);
              navigateToSearchResult({
                id: item.id,
                name: item.name,
                region: item.region,
                country: item.country,
                latitude: item.latitude,
                longitude: item.longitude,
                timezone: item.timezone,
              });
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 48,
    gap: 14,
  },
  header: {
    gap: 18,
    marginBottom: 18,
  },
  skeletons: {
    gap: 12,
  },
});
