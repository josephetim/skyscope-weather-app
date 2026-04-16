import { CitySummary } from '@/src/features/cities/cities.types';
import { ForecastResponseDto } from '@/src/features/weather/api/weather.types';
import { DailyForecastItem, HourlyForecastItem, WeatherForecast } from '@/src/features/weather/weather.types';

function getNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function getString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function getHourlyItems(dto: ForecastResponseDto, referenceTime: string) {
  const times = Array.isArray(dto.hourly?.time) ? dto.hourly.time : [];
  const items: HourlyForecastItem[] = times.map((time, index) => ({
    time,
    temperatureC: getNumber(dto.hourly?.temperature_2m?.[index]),
    precipitationProbability: getNumber(dto.hourly?.precipitation_probability?.[index]),
    weatherCode: getNumber(dto.hourly?.weather_code?.[index]),
  }));

  const startIndex = items.findIndex((item) => item.time >= referenceTime);
  const safeStartIndex = startIndex >= 0 ? startIndex : 0;

  return items.slice(safeStartIndex, safeStartIndex + 12);
}

function getDailyItems(dto: ForecastResponseDto) {
  const dates = Array.isArray(dto.daily?.time) ? dto.daily.time : [];
  const items: DailyForecastItem[] = dates.map((date, index) => ({
    date,
    temperatureMinC: getNumber(dto.daily?.temperature_2m_min?.[index]),
    temperatureMaxC: getNumber(dto.daily?.temperature_2m_max?.[index]),
    precipitationProbability: getNumber(dto.daily?.precipitation_probability_max?.[index]),
    weatherCode: getNumber(dto.daily?.weather_code?.[index]),
    sunrise: dto.daily?.sunrise?.[index],
    sunset: dto.daily?.sunset?.[index],
  }));

  return items.slice(0, 7);
}

export function mapForecastResponse(dto: ForecastResponseDto, city: CitySummary, fetchedAt: string): WeatherForecast {
  const hourly = getHourlyItems(dto, getString(dto.current?.time, fetchedAt));
  const daily = getDailyItems(dto);

  return {
    city,
    timezone: dto.timezone ?? city.timezone ?? 'auto',
    fetchedAt,
    current: {
      observedAt: getString(dto.current?.time, fetchedAt),
      temperatureC: getNumber(dto.current?.temperature_2m, hourly[0]?.temperatureC ?? 0),
      apparentTemperatureC: getNumber(dto.current?.apparent_temperature, hourly[0]?.temperatureC ?? 0),
      humidity: getNumber(dto.current?.relative_humidity_2m),
      windSpeedKph: getNumber(dto.current?.wind_speed_10m),
      precipitationProbability: getNumber(dto.current?.precipitation_probability, hourly[0]?.precipitationProbability ?? 0),
      weatherCode: getNumber(dto.current?.weather_code, hourly[0]?.weatherCode ?? 0),
      isDay: getNumber(dto.current?.is_day, 1) === 1,
    },
    hourly,
    daily,
  };
}
