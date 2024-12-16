import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '@/constants/Icons';
import { router } from 'expo-router';

interface PageNavProps {
    back?: any;
    left?: any;
    right?: any
    center?: string;
}

const PageNav: React.FC<PageNavProps> = ({ back, left, right, center }) => {
    return (
        <View className='flex-row p-5 justify-between'>
            <View className='flex-row'>
                <TouchableOpacity onPress={() => router.back()}>
                    {back &&
                        <Image
                            source={Icons.arrowleft}
                            resizeMode='contain'
                            className='w-6 h-6' />}
                </TouchableOpacity>
                {left}
            </View>
            {center}
            {right}
        </View>
    )
}

export default PageNav

const styles = StyleSheet.create({})