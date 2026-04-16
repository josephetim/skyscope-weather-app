import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppBackground } from '@/src/shared/components/AppBackground';
import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';

export default function NotFoundScreen() {
  const { theme } = useAppTheme();

  return (
    <AppBackground>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <GlassCard style={styles.card}>
          <Text style={[styles.title, { color: theme.palette.text }]}>This route is off the map.</Text>
          <Text style={[styles.description, { color: theme.palette.textMuted }]}>
            The page you opened does not exist in SkyScope&apos;s navigation tree.
          </Text>
          <Link asChild href="/">
            <Pressable style={[styles.button, { backgroundColor: theme.palette.accent }]}>
              <Text style={styles.buttonLabel}>Back to dashboard</Text>
            </Pressable>
          </Link>
        </GlassCard>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    gap: 16,
  },
  title: {
    fontFamily: APP_FONTS.display,
    fontSize: 30,
  },
  description: {
    fontFamily: APP_FONTS.body,
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 14,
  },
});
