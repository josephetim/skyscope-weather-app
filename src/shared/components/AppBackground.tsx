import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/src/shared/hooks/useAppTheme';

type AppBackgroundProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
}>;

export function AppBackground({ children, style, edges = ['top'] }: AppBackgroundProps) {
  const { theme } = useAppTheme();

  return (
    <LinearGradient colors={theme.palette.backgroundGradient} style={styles.gradient}>
      <SafeAreaView edges={edges} style={styles.safeArea}>
        <View style={[styles.content, style]}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
