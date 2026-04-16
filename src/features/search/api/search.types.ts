export type GeocodingResultDto = {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
};

export type GeocodingResponseDto = {
  results?: GeocodingResultDto[];
};
