import { useQuery } from '@tanstack/react-query';

import { CitySummary } from '@/src/features/cities/cities.types';
import { readLastViewedForecastSnapshot } from '@/src/features/weather/weather.storage';
import { weatherRepository } from '@/src/features/weather/weather.repository';

export const LAST_VIEWED_FORECAST_QUERY_KEY = ['last-viewed-forecast'];

export function useWeatherForecast(city?: CitySummary) {
  return useQuery({
    queryKey: ['weather-forecast', city?.id],
    queryFn: ({ signal }) => weatherRepository.getForecast(city as CitySummary, signal),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
}

export function useLastViewedForecast() {
  return useQuery({
    queryKey: LAST_VIEWED_FORECAST_QUERY_KEY,
    queryFn: readLastViewedForecastSnapshot,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
