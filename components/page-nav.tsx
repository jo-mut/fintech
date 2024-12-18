import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '@/constants/Icons';
import { router } from 'expo-router';

interface PageNavProps {
    title?: string;
    back?: any;
    left?: any;
    right?: any
    center?: string;
}

const PageNav: React.FC<PageNavProps> = ({ title, back, left, right, center }) => {

    const avatar = () => {
        return (
            <View className='mr-4'>

            </View>
        )
    }

    const search = () => {
        return (
            <View className='flex-1'>

            </View>
        )
    }

    const notifications = () => {
        return (
            <View>

            </View>
        )
    }

    const settings = () => {
        return (
            <View>

            </View>
        )
    }

    return (
        <View className='flex-row p-5'>
            <View className='flex-row'>
                <TouchableOpacity onPress={() => router.back()}>
                    {back &&
                        <Image
                            source={Icons.arrowleft}
                            resizeMode='contain'
                            className='w-6 h-6' />}
                </TouchableOpacity>
                {left &&
                    <View className='flex-row'>
                        <View>{avatar()}</View>
                        <View>{search()}</View>
                    </View>}
            </View>
            {title && title}
            {right &&
                <View className='flex-row'>
                    <View>{notifications()}</View>
                    <View>{settings()}</View>
                </View>
            }
        </View>
    )
}

export default PageNav

const styles = StyleSheet.create({})