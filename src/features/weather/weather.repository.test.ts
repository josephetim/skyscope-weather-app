import { CitySummary } from '@/src/features/cities/cities.types';
import { createWeatherRepository } from '@/src/features/weather/weather.repository';
import { ForecastSnapshot } from '@/src/features/weather/weather.types';

const city: CitySummary = {
  id: 'lagos',
  name: 'Lagos',
  country: 'Nigeria',
  latitude: 6.455,
  longitude: 3.3841,
};

const cachedSnapshot: ForecastSnapshot = {
  city,
  forecast: {
    city,
    timezone: 'Africa/Lagos',
    fetchedAt: '2026-04-13T12:05:00.000Z',
    current: {
      observedAt: '2026-04-13T12:00',
      temperatureC: 29,
      apparentTemperatureC: 31,
      humidity: 76,
      windSpeedKph: 14,
      precipitationProbability: 30,
      weatherCode: 2,
      isDay: true,
    },
    hourly: [],
    daily: [],
  },
};

describe('weatherRepository', () => {
  it('falls back to a cached forecast when the network request fails', async () => {
    const repository = createWeatherRepository({
      fetchForecastDto: jest.fn().mockRejectedValue(new Error('Network offline')),
      mapForecast: jest.fn(),
      readSnapshot: jest.fn().mockResolvedValue(cachedSnapshot),
      saveSnapshot: jest.fn(),
    });

    await expect(repository.getForecast(city)).resolves.toEqual({
      forecast: cachedSnapshot.forecast,
      source: 'cache',
    });
  });

  it('saves a successful network forecast for future offline use', async () => {
    const saveSnapshot = jest.fn();
    const networkForecast = cachedSnapshot.forecast;
    const repository = createWeatherRepository({
      fetchForecastDto: jest.fn().mockResolvedValue({ timezone: 'Africa/Lagos' }),
      mapForecast: jest.fn().mockReturnValue(networkForecast),
      readSnapshot: jest.fn().mockResolvedValue(null),
      saveSnapshot,
      now: () => '2026-04-13T12:05:00.000Z',
    });

    await repository.getForecast(city);

    expect(saveSnapshot).toHaveBeenCalledWith({
      city,
      forecast: networkForecast,
    });
  });
});
