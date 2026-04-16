import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CitySummary } from '@/src/features/cities/cities.types';

const STORAGE_KEY = 'skyscope:cities';

type CitiesStoreState = {
  favorites: string[];
  cities: Record<string, CitySummary>;
  lastViewedCityId?: string;
  hasHydrated: boolean;
  rememberCity: (city: CitySummary) => void;
  addFavorite: (city: CitySummary) => void;
  removeFavorite: (cityId: string) => void;
  toggleFavorite: (city: CitySummary) => void;
  setLastViewedCity: (city: CitySummary) => void;
  setHasHydrated: (value: boolean) => void;
};

type PersistedCitiesState = Pick<CitiesStoreState, 'favorites' | 'cities' | 'lastViewedCityId'>;

export function addFavoriteId(favorites: string[], cityId: string) {
  if (favorites.includes(cityId)) {
    return favorites;
  }

  return [...favorites, cityId];
}

export function removeFavoriteId(favorites: string[], cityId: string) {
  return favorites.filter((favoriteId) => favoriteId !== cityId);
}

export const useCitiesStore = create<CitiesStoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cities: {},
      lastViewedCityId: undefined,
      hasHydrated: false,
      rememberCity: (city) =>
        set((state) => ({
          cities: {
            ...state.cities,
            [city.id]: city,
          },
        })),
      addFavorite: (city) =>
        set((state) => ({
          cities: {
            ...state.cities,
            [city.id]: city,
          },
          favorites: addFavoriteId(state.favorites, city.id),
        })),
      removeFavorite: (cityId) =>
        set((state) => ({
          favorites: removeFavoriteId(state.favorites, cityId),
        })),
      toggleFavorite: (city) => {
        const { favorites } = get();

        if (favorites.includes(city.id)) {
          set((state) => ({
            favorites: removeFavoriteId(state.favorites, city.id),
          }));
          return;
        }

        set((state) => ({
          cities: {
            ...state.cities,
            [city.id]: city,
          },
          favorites: addFavoriteId(state.favorites, city.id),
        }));
      },
      setLastViewedCity: (city) =>
        set((state) => ({
          lastViewedCityId: city.id,
          cities: {
            ...state.cities,
            [city.id]: city,
          },
        })),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): PersistedCitiesState => ({
        favorites: state.favorites,
        cities: state.cities,
        lastViewedCityId: state.lastViewedCityId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
