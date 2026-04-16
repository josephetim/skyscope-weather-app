import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';

type ErrorPanelProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function ErrorPanel({ title, description, actionLabel, onAction }: ErrorPanelProps) {
  const { theme } = useAppTheme();

  return (
    <GlassCard style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: `${theme.palette.danger}16` }]}>
        <MaterialCommunityIcons color={theme.palette.danger} name="wifi-alert" size={24} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.palette.text }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.palette.textMuted }]}>{description}</Text>
      </View>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.palette.accent, opacity: pressed ? 0.84 : 1 },
          ]}>
          <Text style={styles.buttonLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    gap: 6,
  },
  title: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 18,
  },
  description: {
    fontFamily: APP_FONTS.body,
    fontSize: 14,
    lineHeight: 21,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 14,
  },
});
