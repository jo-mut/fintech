import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import IconView from '@/components/IconView';
import { Icons } from '@/constants/Icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            <IconView
              icon={Icons.home}
              color={focused ? 'bg-blue-500' : 'bg-black'}
            />
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, focused }) =>
            <IconView
              icon={Icons.investment}
              color={focused ? 'bg-blue-500' : 'bg-black'}
            />
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: 'Transfer',
          tabBarIcon: ({ color, focused }) =>
            <IconView
              icon={Icons.transfer}
              color={focused ? 'bg-blue-500' : 'bg-black'}
            />
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: 'Crypto',
          tabBarIcon: ({ color, focused }) =>
            <IconView
              icon={Icons.crypto}
              color={focused ? 'bg-blue-500' : 'bg-black'}
            />
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: 'Lifestyle',
          tabBarIcon: ({ color, focused }) =>
            <IconView
              icon={Icons.lifestyle}
              color={focused ? 'bg-blue-500' : 'bg-black'}
            />
        }}
      />
    </Tabs>
  );
}
