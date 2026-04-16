import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Animated, { FadeInDown } from 'react-native-reanimated';

import { PreferenceGroup } from '@/src/features/settings/components/PreferenceGroup';
import { ThemeModePreference, useSettingsStore } from '@/src/features/settings/settings.store';
import { AppBackground } from '@/src/shared/components/AppBackground';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { ScreenHeader } from '@/src/shared/components/ScreenHeader';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';
import { formatTemperature } from '@/src/shared/utils/units';

export function SettingsScreen() {
  const unit = useSettingsStore((state) => state.unit);
  const themeMode = useSettingsStore((state) => state.themeMode);
  const setUnit = useSettingsStore((state) => state.setUnit);
  const setThemeMode = useSettingsStore((state) => state.setThemeMode);
  const { theme } = useAppTheme();

  return (
    <AppBackground edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(450)}>
          <ScreenHeader
            eyebrow="Preferences"
            subtitle="Adjust temperature units and the app appearance without changing the underlying cached weather data."
            title="Settings"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(60).duration(450)}>
          <PreferenceGroup
            description="Temperature stays internally normalized in Celsius so cached forecasts stay consistent when you switch units."
            onChange={setUnit}
            options={[
              { label: 'Celsius', value: 'celsius', description: 'Metric temperatures and km/h wind speeds.' },
              { label: 'Fahrenheit', value: 'fahrenheit', description: 'Imperial temperatures and mph wind speeds.' },
            ]}
            title="Units"
            value={unit}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(450)}>
          <PreferenceGroup<ThemeModePreference>
            description="Use the system theme, or lock SkyScope to a light or dark appearance."
            onChange={setThemeMode}
            options={[
              { label: 'System', value: 'system', description: 'Follow your device appearance.' },
              { label: 'Light', value: 'light', description: 'Bright cards and airy blue gradients.' },
              { label: 'Dark', value: 'dark', description: 'Night-friendly contrast and deeper shadows.' },
            ]}
            title="Theme"
            value={themeMode}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).duration(450)}>
          <GlassCard style={styles.previewCard}>
            <Text style={[styles.previewTitle, { color: theme.palette.text }]}>Preview</Text>
            <Text style={[styles.previewValue, { color: theme.palette.text }]}>{formatTemperature(24, unit)}</Text>
            <Text style={[styles.previewBody, { color: theme.palette.textMuted }]}>
              This preview updates immediately using your current unit preference and active theme palette.
            </Text>
          </GlassCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(220).duration(450)}>
          <View style={styles.note}>
            <Text style={[styles.noteLabel, { color: theme.palette.textMuted }]}>
              Weather data provided by Open-Meteo Geocoding and Forecast APIs.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 132,
    gap: 18,
  },
  previewCard: {
    gap: 8,
  },
  previewTitle: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 18,
  },
  previewValue: {
    fontFamily: APP_FONTS.display,
    fontSize: 46,
  },
  previewBody: {
    fontFamily: APP_FONTS.body,
    fontSize: 14,
    lineHeight: 21,
  },
  note: {
    paddingHorizontal: 4,
  },
  noteLabel: {
    fontFamily: APP_FONTS.body,
    fontSize: 12,
    lineHeight: 18,
  },
});
