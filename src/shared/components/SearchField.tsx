import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@/src/shared/hooks/useAppTheme';
import { APP_FONTS } from '@/src/shared/theme/theme';

type SearchFieldProps = {
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder: string;
  editable?: boolean;
  onPress?: () => void;
  autoFocus?: boolean;
};

export function SearchField({
  value = '',
  onChangeText,
  placeholder,
  editable = true,
  onPress,
  autoFocus,
}: SearchFieldProps) {
  const { theme } = useAppTheme();

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.palette.surfaceStrong,
          borderColor: theme.palette.border,
        },
      ]}>
      <MaterialCommunityIcons color={theme.palette.textMuted} name="magnify" size={22} />
      {editable ? (
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.palette.textMuted}
          selectionColor={theme.palette.accent}
          style={[styles.input, { color: theme.palette.text }]}
          value={value}
        />
      ) : (
        <Text style={[styles.readonlyValue, { color: value ? theme.palette.text : theme.palette.textMuted }]}>
          {value || placeholder}
        </Text>
      )}
    </View>
  );

  if (!editable && onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    fontFamily: APP_FONTS.bodyMedium,
    fontSize: 16,
    paddingVertical: 0,
  },
  readonlyValue: {
    flex: 1,
    fontFamily: APP_FONTS.bodyMedium,
    fontSize: 16,
  },
});
