import { TemperatureUnit } from '@/src/features/settings/settings.store';

export function celsiusToFahrenheit(valueCelsius: number) {
  return (valueCelsius * 9) / 5 + 32;
}

export function kphToMph(valueKph: number) {
  return valueKph / 1.609;
}

export function getTemperatureForUnit(valueCelsius: number, unit: TemperatureUnit) {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(valueCelsius) : valueCelsius;
}

export function formatTemperature(valueCelsius: number, unit: TemperatureUnit) {
  const value = getTemperatureForUnit(valueCelsius, unit);
  const suffix = unit === 'fahrenheit' ? 'F' : 'C';

  return `${Math.round(value)}°${suffix}`;
}

export function formatWindSpeed(valueKph: number, unit: TemperatureUnit) {
  if (unit === 'fahrenheit') {
    return `${Math.round(kphToMph(valueKph))} mph`;
  }

  return `${Math.round(valueKph)} km/h`;
}
