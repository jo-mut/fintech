import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icons } from '@/constants/Icons'
import { format } from "date-fns";

interface ListItemProps {
    amount: number;
    id: string;
    title: string;
    date: Date
}

const ListItem: React.FC<ListItemProps> = ({ amount, id, title, date }) => {
    const formattedDate = format(new Date(date), "yyyy-MM-dd HH:mm")
    return (
        <View key={id} className='flex flex-row items-center justify-center p-3'>
            <View className='justify-center items-center bg-gray-300
             w-12 h-12 rounded-full mr-3'>
                <TouchableOpacity>
                    <Image
                        className='w-6 h-6'
                        resizeMode='contain'
                        source={Icons.add} />
                </TouchableOpacity>
            </View>
            <View className='flex-1 justify-center'>
                <Text className='text-lg'>{title}</Text>
                <Text className='text-xs'>{formattedDate}</Text>
            </View>
            <Text className='text-lg'>{amount}</Text>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({})