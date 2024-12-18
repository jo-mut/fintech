import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="login-with-email" options={{ headerShown: false }} />
      <Stack.Screen name="email-sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="phone-sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="verification" options={{ headerShown: false }} />
    </Stack>
  )
}

