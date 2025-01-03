import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import PageNav from '@/components/page-nav'

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
        }} />
      <Stack.Screen
        name="login-with-email"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
        }} />
      <Stack.Screen
        name="email-sign-up"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
        }} />
      <Stack.Screen
        name="phone-sign-up"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
        }} />
      <Stack.Screen
        name="verification"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <PageNav
              firstName='Auson'
              lastName='Souon'
              left={true}
              right={true} />
          ),
        }} />
    </Stack>
  )
}

