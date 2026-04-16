import { mapGeocodingResponse } from '@/src/features/search/api/search.mappers';

describe('mapGeocodingResponse', () => {
  it('returns an empty array for invalid API payloads', () => {
    expect(mapGeocodingResponse({})).toEqual([]);
  });

  it('maps valid geocoding results into city summaries', () => {
    const cities = mapGeocodingResponse({
      results: [
        {
          id: 123,
          name: 'Lagos',
          country: 'Nigeria',
          country_code: 'NG',
          admin1: 'Lagos',
          latitude: 6.455,
          longitude: 3.3841,
          timezone: 'Africa/Lagos',
        },
      ],
    });

    expect(cities).toEqual([
      {
        id: '123',
        name: 'Lagos',
        region: 'Lagos',
        country: 'Nigeria',
        countryCode: 'NG',
        latitude: 6.455,
        longitude: 3.3841,
        timezone: 'Africa/Lagos',
      },
    ]);
  });
});
