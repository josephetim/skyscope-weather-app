import { useEffect } from 'react';
import { DimensionValue, StyleSheet, View } from 'react-native';

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useAppTheme } from '@/src/shared/hooks/useAppTheme';

type SkeletonBlockProps = {
  width?: DimensionValue;
  height: number;
  borderRadius?: number;
};

export function SkeletonBlock({ width = '100%', height, borderRadius = 18 }: SkeletonBlockProps) {
  const { theme } = useAppTheme();
  const shimmer = useSharedValue(-1);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }), -1, false);
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(shimmer.value, [-1, 1], [-140, 140]),
      },
    ],
  }));

  return (
    <View
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.palette.skeletonBase,
        },
      ]}>
      <Animated.View
        style={[
          styles.highlight,
          {
            backgroundColor: theme.palette.skeletonHighlight,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  highlight: {
    width: '42%',
    height: '100%',
    opacity: 0.55,
  },
});
