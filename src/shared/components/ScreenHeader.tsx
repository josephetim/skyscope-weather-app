import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  onBack?: () => void;
  rightSlot?: ReactNode;
};

export function ScreenHeader({ title, subtitle, eyebrow, onBack, rightSlot }: ScreenHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              {
                backgroundColor: theme.palette.surface,
                borderColor: theme.palette.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}>
            <MaterialCommunityIcons color={theme.palette.text} name="chevron-left" size={22} />
          </Pressable>
        ) : (
          <View />
        )}
        {rightSlot}
      </View>
      <View style={styles.copy}>
        {eyebrow ? <Text style={[styles.eyebrow, { color: theme.palette.accent }]}>{eyebrow}</Text> : null}
        <Text style={[styles.title, { color: theme.palette.text }]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: theme.palette.textMuted }]}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    gap: 6,
  },
  eyebrow: {
    fontFamily: APP_FONTS.bodyMedium,
    fontSize: 13,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: APP_FONTS.display,
    fontSize: 32,
  },
  subtitle: {
    fontFamily: APP_FONTS.body,
    fontSize: 15,
    lineHeight: 22,
  },
});
