import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '@/constants/Icons'
import { format } from "date-fns";
import { router } from 'expo-router';

interface ListItemProps {
    type?: string;
    avatar?: any;
    initials: string;
    amount?: number;
    id?: string;
    title?: string;
    subTitle?: string;
    priceChange?: number;
    price?: number;
    date?: Date;
    onPress: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
    type,
    subTitle,
    initials,
    avatar,
    amount,
    id,
    title,
    price,
    priceChange,
    date,
    onPress
}) => {
    const formattedDate = date ? format(new Date(date!), "yyyy-MM-dd HH:mm") : null;

    const handleOnPress = (avatar: any) => {
        router.push("/(screens)/account")
    }

    return (
        <TouchableOpacity
            onPress={() => onPress()}
            className='flex my-3'>
            <View key={id} className='flex flex-row items-center justify-center'>
                <View className='justify-center items-center bg-gray-300
             w-12 h-12 rounded-full mr-3'>
                    <TouchableOpacity
                        onPress={() => handleOnPress(avatar)}>
                        {avatar ?
                            <Image
                                className={avatar ? "w-10 h-10" : "w-6 h-6"}
                                resizeMode='contain'
                                source={avatar ? { uri: avatar } : Icons.add} />
                            :
                            <Text className='text-lg text-black font-bold'>{initials}</Text>}
                    </TouchableOpacity>
                </View>
                {type === "transaction" &&
                    <View className='flex-1 justify-center'>
                        <Text
                            className='text-lg'>
                            {title}
                        </Text>
                        <Text
                            className='text-xs'>
                            {formattedDate}
                        </Text>
                    </View>}
                {type === "currency" &&
                    <View className='flex-1'>
                        <View className='flex-row justify-between'>
                            <View className='justify-center'>
                                <Text className='text-lg'>{title}</Text>
                                <Text className='text-xs'>{subTitle}</Text>
                            </View>
                            <View className='items-end justify-center'>
                                <Text className='text-lg'>{price?.toFixed(2)}</Text>
                                <Text className='text-xs text-red-400'>{priceChange?.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>}
                <Text className='text-lg'>{amount}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({})