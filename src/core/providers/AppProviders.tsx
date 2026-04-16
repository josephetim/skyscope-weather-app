import { PropsWithChildren, useEffect } from 'react';
import { AppState, Platform } from 'react-native';

import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import { SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { ThemeProvider } from '@react-navigation/native';
import { focusManager, onlineManager, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useCitiesStore } from '@/src/features/cities/cities.store';
import { useSettingsStore } from '@/src/features/settings/settings.store';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { queryClient } from '@/src/shared/query/queryClient';
import { navigationThemes } from '@/src/shared/theme/theme';

export function AppProviders({ children }: PropsWithChildren) {
  const settingsHydrated = useSettingsStore((state) => state.hasHydrated);
  const citiesHydrated = useCitiesStore((state) => state.hasHydrated);
  const { colorScheme } = useAppTheme();
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    ...MaterialCommunityIcons.font,
  });

  useEffect(() => {
    if (fontError) {
      throw fontError;
    }
  }, [fontError]);

  useEffect(() => {
    const unsubscribe = AppState.addEventListener('change', (status) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    });

    return () => {
      unsubscribe.remove();
    };
  }, []);

  useEffect(() => {
    return onlineManager.setEventListener((setOnline) =>
      NetInfo.addEventListener((state) => {
        setOnline(Boolean(state.isConnected && (state.isInternetReachable ?? true)));
      })
    );
  }, []);

  useEffect(() => {
    if (fontsLoaded && settingsHydrated && citiesHydrated) {
      SplashScreen.hideAsync();
    }
  }, [citiesHydrated, fontsLoaded, settingsHydrated]);

  if (!fontsLoaded || !settingsHydrated || !citiesHydrated) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={navigationThemes[colorScheme]}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
