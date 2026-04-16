import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const STORAGE_KEY = 'skyscope:settings';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type ThemeModePreference = 'system' | 'light' | 'dark';

type SettingsStoreState = {
  unit: TemperatureUnit;
  themeMode: ThemeModePreference;
  hasHydrated: boolean;
  setUnit: (unit: TemperatureUnit) => void;
  setThemeMode: (themeMode: ThemeModePreference) => void;
  setHasHydrated: (value: boolean) => void;
};

type PersistedSettingsState = Pick<SettingsStoreState, 'unit' | 'themeMode'>;

export const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set) => ({
      unit: 'celsius',
      themeMode: 'system',
      hasHydrated: false,
      setUnit: (unit) => set({ unit }),
      setThemeMode: (themeMode) => set({ themeMode }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): PersistedSettingsState => ({
        unit: state.unit,
        themeMode: state.themeMode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
