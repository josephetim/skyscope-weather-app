export type ForecastCurrentDto = {
  time?: string;
  temperature_2m?: number;
  apparent_temperature?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
  precipitation_probability?: number;
  weather_code?: number;
  is_day?: number;
};

export type ForecastHourlyDto = {
  time?: string[];
  temperature_2m?: number[];
  precipitation_probability?: number[];
  weather_code?: number[];
};

export type ForecastDailyDto = {
  time?: string[];
  temperature_2m_min?: number[];
  temperature_2m_max?: number[];
  precipitation_probability_max?: number[];
  weather_code?: number[];
  sunrise?: string[];
  sunset?: string[];
};

export type ForecastResponseDto = {
  timezone?: string;
  current?: ForecastCurrentDto;
  hourly?: ForecastHourlyDto;
  daily?: ForecastDailyDto;
};
