import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { searchCities } from '@/src/features/search/api/search.client';

export function useCitySearch(query: string) {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: ['city-search', trimmedQuery],
    queryFn: ({ signal }) => searchCities(trimmedQuery, signal),
    enabled: trimmedQuery.length >= 2,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
}
