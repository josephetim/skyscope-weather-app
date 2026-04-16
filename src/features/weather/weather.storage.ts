import AsyncStorage from '@react-native-async-storage/async-storage';

import { ForecastSnapshot } from '@/src/features/weather/weather.types';

const FORECAST_CACHE_PREFIX = 'skyscope:forecast-cache';
const LAST_VIEWED_KEY = 'skyscope:last-viewed-forecast';

function getCitySnapshotKey(cityId: string) {
  return `${FORECAST_CACHE_PREFIX}:${cityId}`;
}

export async function saveForecastSnapshot(snapshot: ForecastSnapshot) {
  const serializedSnapshot = JSON.stringify(snapshot);

  await Promise.all([
    AsyncStorage.setItem(getCitySnapshotKey(snapshot.city.id), serializedSnapshot),
    AsyncStorage.setItem(LAST_VIEWED_KEY, serializedSnapshot),
  ]);
}

export async function readForecastSnapshot(cityId: string) {
  const snapshot = await AsyncStorage.getItem(getCitySnapshotKey(cityId));

  if (!snapshot) {
    return null;
  }

  return JSON.parse(snapshot) as ForecastSnapshot;
}

export async function readLastViewedForecastSnapshot() {
  const snapshot = await AsyncStorage.getItem(LAST_VIEWED_KEY);

  if (!snapshot) {
    return null;
  }

  return JSON.parse(snapshot) as ForecastSnapshot;
}
