import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const APP_FONTS = {
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_500Medium',
} as const;

export type AppPalette = {
  backgroundGradient: [string, string, string];
  surface: string;
  surfaceStrong: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  success: string;
  warning: string;
  danger: string;
  skeletonBase: string;
  skeletonHighlight: string;
  shadow: string;
};

export type AppTheme = {
  palette: AppPalette;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
};

const sharedSpacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
};

const sharedRadius = {
  sm: 14,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const lightPalette: AppPalette = {
  backgroundGradient: ['#EDF4FF', '#F8FBFF', '#F2F5FB'],
  surface: 'rgba(255, 255, 255, 0.76)',
  surfaceStrong: 'rgba(255, 255, 255, 0.94)',
  surfaceMuted: 'rgba(213, 225, 242, 0.45)',
  border: 'rgba(122, 147, 180, 0.18)',
  text: '#102033',
  textMuted: '#56708F',
  accent: '#2388FF',
  accentSoft: '#DCEBFF',
  success: '#1EAD7C',
  warning: '#F6A63A',
  danger: '#E45E6D',
  skeletonBase: 'rgba(210, 222, 238, 0.85)',
  skeletonHighlight: 'rgba(255, 255, 255, 0.85)',
  shadow: 'rgba(17, 39, 67, 0.12)',
};

export const darkPalette: AppPalette = {
  backgroundGradient: ['#07111E', '#0B1830', '#12243F'],
  surface: 'rgba(12, 23, 40, 0.7)',
  surfaceStrong: 'rgba(14, 27, 46, 0.92)',
  surfaceMuted: 'rgba(44, 67, 102, 0.38)',
  border: 'rgba(136, 174, 226, 0.16)',
  text: '#EAF3FF',
  textMuted: '#8EA7C6',
  accent: '#67A8FF',
  accentSoft: 'rgba(103, 168, 255, 0.16)',
  success: '#59D8A1',
  warning: '#FFB454',
  danger: '#FF7E8E',
  skeletonBase: 'rgba(35, 53, 80, 0.95)',
  skeletonHighlight: 'rgba(92, 129, 181, 0.42)',
  shadow: 'rgba(0, 0, 0, 0.24)',
};

export const appThemes: Record<'light' | 'dark', AppTheme> = {
  light: {
    palette: lightPalette,
    spacing: sharedSpacing,
    radius: sharedRadius,
  },
  dark: {
    palette: darkPalette,
    spacing: sharedSpacing,
    radius: sharedRadius,
  },
};

export const navigationThemes: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      card: lightPalette.surfaceStrong,
      border: lightPalette.border,
      primary: lightPalette.accent,
      text: lightPalette.text,
      notification: lightPalette.warning,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: 'transparent',
      card: darkPalette.surfaceStrong,
      border: darkPalette.border,
      primary: darkPalette.accent,
      text: darkPalette.text,
      notification: darkPalette.warning,
    },
  },
};
