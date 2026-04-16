import { CitySummary } from '@/src/features/cities/cities.types';
import { ForecastResponseDto } from '@/src/features/weather/api/weather.types';
import { fetchJson } from '@/src/shared/utils/http';

const FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';

export async function fetchForecast(city: CitySummary, signal?: AbortSignal) {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code,is_day',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
  });

  return fetchJson<ForecastResponseDto>(`${FORECAST_ENDPOINT}?${params.toString()}`, { signal });
}
