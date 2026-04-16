import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '@/src/shared/components/GlassCard';
import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';

type PreferenceOption<T extends string> = {
  label: string;
  value: T;
  description: string;
};

type PreferenceGroupProps<T extends string> = {
  title: string;
  description: string;
  value: T;
  options: PreferenceOption<T>[];
  onChange: (value: T) => void;
};

export function PreferenceGroup<T extends string>({
  title,
  description,
  value,
  options,
  onChange,
}: PreferenceGroupProps<T>) {
  const { theme } = useAppTheme();

  return (
    <GlassCard style={styles.card}>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.palette.text }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.palette.textMuted }]}>{description}</Text>
      </View>
      <View style={styles.options}>
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: selected ? theme.palette.accentSoft : theme.palette.surfaceStrong,
                  borderColor: selected ? theme.palette.accent : theme.palette.border,
                  opacity: pressed ? 0.84 : 1,
                },
              ]}>
              <Text style={[styles.optionTitle, { color: theme.palette.text }]}>{option.label}</Text>
              <Text style={[styles.optionDescription, { color: theme.palette.textMuted }]}>{option.description}</Text>
            </Pressable>
          );
        })}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },
  copy: {
    gap: 6,
  },
  title: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 19,
  },
  description: {
    fontFamily: APP_FONTS.body,
    fontSize: 14,
    lineHeight: 21,
  },
  options: {
    gap: 10,
  },
  option: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    gap: 4,
  },
  optionTitle: {
    fontFamily: APP_FONTS.bodyBold,
    fontSize: 15,
  },
  optionDescription: {
    fontFamily: APP_FONTS.body,
    fontSize: 13,
    lineHeight: 19,
  },
});
