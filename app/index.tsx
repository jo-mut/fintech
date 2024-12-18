import Button from '@/components/button';
import { useAuth } from '@clerk/clerk-expo';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av'
import { Link, Redirect, router } from 'expo-router';
import { Image, StyleSheet, Platform, Text, View, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';

export default function Page() {
    const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return <Redirect href={'/(screens)/(tabs)/home'} />
      }    

    return (
        <SafeAreaView
            className='flex-1 bg-black'>
            <View className='flex-1'>
                {assets &&
                    <Video
                        resizeMode={ResizeMode.COVER}
                        isMuted
                        isLooping
                        shouldPlay
                        source={{ uri: assets[0].uri }}
                        style={{ height: '100%', width: '100%' }} />}
                <View className='flex flex-row items-end justify-center 
                mb-10 gap-5 absolute bottom-0 left-0 right-0 px-20'>
                    <Button
                        style='flex-1 bg-gray-500'
                        label='Login'
                        color='text-white'
                        onPress={() => router.push('/(auth)/login')} />
                    <Button
                        style='flex-1 bg-white'
                        label='Sign Up'
                        color='text-black'
                        onPress={() => router.push('/(auth)/email-sign-up')} />
                </View>
            </View>
        </SafeAreaView>
    )
}

