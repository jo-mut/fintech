import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Icons } from '@/constants/Icons'

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="help" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen 
            name="account" 
            options={{ 
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => router.back()}>
                        <Image
                            source={Icons.arrowleft}
                            tintColor={'white'}
                            resizeMode='contain'
                            className='w-6 h-6' />
                    </TouchableOpacity>
                ),
                headerShown: true, 
                animation: 'fade',
                title: '',
                headerTransparent: true,
                presentation: 'transparentModal' }} />
            <Stack.Screen
                name="crypto-detail"
                options={{
                    headerShown: true,
                    title: "Crypto",
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}>
                            <Image
                                source={Icons.arrowleft}
                                resizeMode='contain'
                                className='w-6 h-6' />
                        </TouchableOpacity>
                    )
                }} />
        </Stack>
    )
}

