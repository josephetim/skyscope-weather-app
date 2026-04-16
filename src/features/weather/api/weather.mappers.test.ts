import { CitySummary } from '@/src/features/cities/cities.types';
import { mapForecastResponse } from '@/src/features/weather/api/weather.mappers';

const city: CitySummary = {
  id: 'lagos',
  name: 'Lagos',
  country: 'Nigeria',
  latitude: 6.455,
  longitude: 3.3841,
  timezone: 'Africa/Lagos',
};

describe('mapForecastResponse', () => {
  it('handles partial forecast arrays without throwing', () => {
    const forecast = mapForecastResponse(
      {
        timezone: 'Africa/Lagos',
        current: {
          time: '2026-04-13T12:00',
          temperature_2m: 29,
          apparent_temperature: 31,
          relative_humidity_2m: 76,
          wind_speed_10m: 14,
          weather_code: 2,
          is_day: 1,
        },
        hourly: {
          time: ['2026-04-13T12:00'],
          temperature_2m: [29],
        },
        daily: {},
      },
      city,
      '2026-04-13T12:05:00.000Z'
    );

    expect(forecast.current.temperatureC).toBe(29);
    expect(forecast.hourly).toHaveLength(1);
    expect(forecast.daily).toEqual([]);
    expect(forecast.timezone).toBe('Africa/Lagos');
  });
});
