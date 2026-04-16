import { CitySummary } from '@/src/features/cities/cities.types';

export function formatCityLine(city: CitySummary) {
  return [city.region, city.country].filter(Boolean).join(', ');
}

export function formatLastUpdated(timestamp: string) {
  const date = new Date(timestamp);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatHour(timestamp: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
  }).format(new Date(timestamp));
}

export function formatWeekday(timestamp: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
  }).format(new Date(timestamp));
}

export function formatFullWeekday(timestamp: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(new Date(timestamp));
}
