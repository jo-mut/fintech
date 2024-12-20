import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '@/constants/Icons';
import { router } from 'expo-router';
import InputField from './text-input';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageNavProps {
    firstName?: string,
    lastName?: string,
    notificationsCount?: string,
    title?: string;
    back?: any;
    left?: any;
    right?: any
    center?: string;
}

const PageNav: React.FC<PageNavProps> = ({
    firstName, lastName, notificationsCount, title,
    back, left, right, center }) => {
    const { top } = useSafeAreaInsets();
    const avatar = () => {
        const initials = firstName!.charAt(0).toUpperCase() + lastName!.charAt(0).toUpperCase();
        return (
            <View className='w-10 h-10 rounded-full mr-4 items-center bg-gray-700 justify-center'>
                <Text className='text-lg text-white'>{initials}</Text>
            </View>
        )
    }

    const search = () => {
        return (
            <InputField
                containerStyle='p-2 rounded-3xl flex-1 bg-gray-400'
                label="Search"
                placeholder="Search" />
        )
    }

    const notifications = () => {
        return (
            <View>
                {/* {Show notification count badge} */}
            </View>
        )
    }

    const settings = () => {
        return (
            <View className='justify-center items-center w-10 h-10 
            bg-gray-300 rounded-full'>
                <Image
                    source={Icons.home}
                    resizeMode='contain'
                    className='w-6 h-6' />
            </View>
        )
    }

    return (
        <BlurView
            intensity={50}
            tint='extraLight'
            style={{paddingTop: top}}
            className='flex-1 px-5'>
            <View className='flex-row items-center'>
                <View className='flex-row flex-1'>
                    <TouchableOpacity onPress={() => router.back()}>
                        {back &&
                            <Image
                                source={Icons.arrowleft}
                                resizeMode='contain'
                                className='w-6 h-6' />}
                    </TouchableOpacity>
                    {left &&
                        <View className='flex-row'>
                            {avatar()}
                            {search()}
                        </View>}
                </View>
                {title && title}
                {right &&
                    <View className='ml-5 flex-row'>
                        <View>{notifications()}</View>
                        <View>{settings()}</View>
                    </View>
                }
            </View>
        </BlurView>
    )
}

export default PageNav

const styles = StyleSheet.create({})