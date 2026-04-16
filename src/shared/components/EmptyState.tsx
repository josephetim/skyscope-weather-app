import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';

type EmptyStateProps = {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
}: EmptyStateProps) {
  const { theme } = useAppTheme();

  return (
    <GlassCard style={[styles.card, compact && styles.compactCard]}>
      <View style={[styles.iconWrap, { backgroundColor: theme.palette.accentSoft }]}>
        <MaterialCommunityIcons color={theme.palette.accent} name={icon} size={24} />
      </View>
      <Text style={[styles.title, { color: theme.palette.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.palette.textMuted }]}>{description}</Text>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.palette.surfaceStrong,
              borderColor: theme.palette.border,
              opacity: pressed ? 0.82 : 1,
            },
          ]}>
          <Text style={[styles.buttonLabel, { color: theme.palette.text }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    gap: 12,
  },
  compactCard: {
    paddingVertical: 14,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    borderWidth: 1,
  },
  buttonLabel: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 14,
  },
});
