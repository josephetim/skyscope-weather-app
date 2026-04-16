import { ComponentProps } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type WeatherMeta = {
  label: string;
  icon: IconName;
};

export function getWeatherMeta(weatherCode: number, isDay: boolean): WeatherMeta {
  if (weatherCode === 0) {
    return {
      label: 'Clear sky',
      icon: isDay ? 'weather-sunny' : 'weather-night',
    };
  }

  if (weatherCode <= 3) {
    return {
      label: 'Partly cloudy',
      icon: isDay ? 'weather-partly-cloudy' : 'weather-night-partly-cloudy',
    };
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return {
      label: 'Foggy',
      icon: 'weather-fog',
    };
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return {
      label: 'Light drizzle',
      icon: 'weather-rainy',
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return {
      label: 'Rain showers',
      icon: 'weather-pouring',
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return {
      label: 'Snow',
      icon: 'weather-snowy-heavy',
    };
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return {
      label: 'Thunderstorm',
      icon: 'weather-lightning-rainy',
    };
  }

  return {
    label: 'Variable conditions',
    icon: 'weather-cloudy',
  };
}
