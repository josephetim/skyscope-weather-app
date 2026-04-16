import { Tabs } from 'expo-router';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '@/src/shared/hooks/useAppTheme';

export default function TabLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 18,
          height: 72,
          borderRadius: 28,
          paddingBottom: 12,
          paddingTop: 10,
          backgroundColor: theme.palette.surfaceStrong,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: theme.palette.accent,
        tabBarInactiveTintColor: theme.palette.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Manrope_600SemiBold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons color={color} name="weather-partly-cloudy" size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons color={color} name="tune-variant" size={24} />,
        }}
      />
    </Tabs>
  );
}
