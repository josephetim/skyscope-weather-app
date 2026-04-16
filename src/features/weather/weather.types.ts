import { CitySummary } from '@/src/features/cities/cities.types';

export type WeatherSource = 'network' | 'cache';

export type CurrentConditions = {
  observedAt: string;
  temperatureC: number;
  apparentTemperatureC: number;
  humidity: number;
  windSpeedKph: number;
  precipitationProbability: number;
  weatherCode: number;
  isDay: boolean;
};

export type HourlyForecastItem = {
  time: string;
  temperatureC: number;
  precipitationProbability: number;
  weatherCode: number;
};

export type DailyForecastItem = {
  date: string;
  temperatureMinC: number;
  temperatureMaxC: number;
  precipitationProbability: number;
  weatherCode: number;
  sunrise?: string;
  sunset?: string;
};

export type WeatherForecast = {
  city: CitySummary;
  timezone: string;
  fetchedAt: string;
  current: CurrentConditions;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
};

export type ForecastSnapshot = {
  city: CitySummary;
  forecast: WeatherForecast;
};

export type WeatherForecastResult = {
  forecast: WeatherForecast;
  source: WeatherSource;
};
