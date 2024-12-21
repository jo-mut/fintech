import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import IconView from '@/components/IconView';
import { Icons } from '@/constants/Icons';
import PageNav from '@/components/page-nav';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarBackground: () => (
          <BlurView
            intensity={50}
            tint='extraLight'
            className='flex-1 bg-[rgba(0,0,0,0.5)]'
          />
        ),
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            backgroundColor: 'transparent',
            position: 'absolute',
            borderTopWidth: 0,
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
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
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
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
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
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
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
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
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
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
