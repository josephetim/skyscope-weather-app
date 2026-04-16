import { CitySummary } from '@/src/features/cities/cities.types';
import { GeocodingResponseDto, GeocodingResultDto } from '@/src/features/search/api/search.types';

function createCityId(result: GeocodingResultDto) {
  const identity = result.id ?? `${result.name ?? 'city'}-${result.latitude ?? 0}-${result.longitude ?? 0}-${result.country_code ?? 'xx'}`;
  return String(identity)
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export function mapGeocodingResult(result: GeocodingResultDto): CitySummary | null {
  if (
    typeof result.name !== 'string' ||
    typeof result.country !== 'string' ||
    typeof result.latitude !== 'number' ||
    typeof result.longitude !== 'number'
  ) {
    return null;
  }

  return {
    id: createCityId(result),
    name: result.name,
    region: result.admin1,
    country: result.country,
    countryCode: result.country_code,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  };
}

export function mapGeocodingResponse(dto: GeocodingResponseDto): CitySummary[] {
  if (!Array.isArray(dto.results)) {
    return [];
  }

  return dto.results
    .map(mapGeocodingResult)
    .filter((city): city is CitySummary => city !== null);
}
