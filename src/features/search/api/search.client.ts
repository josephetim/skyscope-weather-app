import { mapGeocodingResponse } from '@/src/features/search/api/search.mappers';
import { GeocodingResponseDto } from '@/src/features/search/api/search.types';
import { fetchJson } from '@/src/shared/utils/http';

const GEOCODING_ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search';

export async function searchCities(query: string, signal?: AbortSignal) {
  const params = new URLSearchParams({
    name: query,
    count: '10',
    language: 'en',
    format: 'json',
  });

  const dto = await fetchJson<GeocodingResponseDto>(`${GEOCODING_ENDPOINT}?${params.toString()}`, { signal });
  return mapGeocodingResponse(dto);
}
