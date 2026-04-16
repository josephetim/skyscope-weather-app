import { CitySummary } from '@/src/features/cities/cities.types';
import { fetchForecast } from '@/src/features/weather/api/weather.client';
import { mapForecastResponse } from '@/src/features/weather/api/weather.mappers';
import { ForecastResponseDto } from '@/src/features/weather/api/weather.types';
import { readForecastSnapshot, saveForecastSnapshot } from '@/src/features/weather/weather.storage';
import { ForecastSnapshot, WeatherForecastResult } from '@/src/features/weather/weather.types';

type WeatherRepositoryDependencies = {
  fetchForecastDto: (city: CitySummary, signal?: AbortSignal) => Promise<ForecastResponseDto>;
  mapForecast: (dto: ForecastResponseDto, city: CitySummary, fetchedAt: string) => ForecastSnapshot['forecast'];
  readSnapshot: (cityId: string) => Promise<ForecastSnapshot | null>;
  saveSnapshot: (snapshot: ForecastSnapshot) => Promise<void>;
  now?: () => string;
};

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError';
}

export function createWeatherRepository(dependencies: WeatherRepositoryDependencies) {
  return {
    async getForecast(city: CitySummary, signal?: AbortSignal): Promise<WeatherForecastResult> {
      try {
        const dto = await dependencies.fetchForecastDto(city, signal);
        const fetchedAt = dependencies.now?.() ?? new Date().toISOString();
        const forecast = dependencies.mapForecast(dto, city, fetchedAt);

        await dependencies.saveSnapshot({
          city,
          forecast,
        });

        return {
          forecast,
          source: 'network',
        };
      } catch (error) {
        if (isAbortError(error)) {
          throw error;
        }

        const cachedSnapshot = await dependencies.readSnapshot(city.id);

        if (cachedSnapshot) {
          return {
            forecast: cachedSnapshot.forecast,
            source: 'cache',
          };
        }

        throw error;
      }
    },
  };
}

export const weatherRepository = createWeatherRepository({
  fetchForecastDto: fetchForecast,
  mapForecast: mapForecastResponse,
  readSnapshot: readForecastSnapshot,
  saveSnapshot: saveForecastSnapshot,
});
