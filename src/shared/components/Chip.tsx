import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';

type ChipProps = {
  label: string;
  tone?: 'neutral' | 'accent' | 'warning';
};

export function Chip({ label, tone = 'neutral' }: ChipProps) {
  const { theme } = useAppTheme();

  const backgroundColor =
    tone === 'accent' ? theme.palette.accentSoft : tone === 'warning' ? `${theme.palette.warning}22` : theme.palette.surfaceMuted;
  const textColor = tone === 'warning' ? theme.palette.warning : theme.palette.text;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: APP_FONTS.bodyMedium,
    fontSize: 12,
  },
});
