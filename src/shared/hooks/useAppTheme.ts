import { useColorScheme } from 'react-native';

import { useSettingsStore } from '@/src/features/settings/settings.store';
import { appThemes } from '@/src/shared/theme/theme';

export function useAppTheme() {
  const systemColorScheme = useColorScheme() ?? 'light';
  const themeMode = useSettingsStore((state) => state.themeMode);
  const colorScheme = themeMode === 'system' ? systemColorScheme : themeMode;

  return {
    colorScheme,
    theme: appThemes[colorScheme],
  };
}
