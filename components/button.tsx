import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ButtonProps {
    style: string,
    label: string;
    onPress: any;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({ label, color = 'text-white', onPress, style }) => {
    return (
        <View className={`items-center justify-center 
            rounded-3xl ${style}`} >
            <TouchableOpacity onPress={onPress}>
                <Text className={`p-5 font-[600] ${color}`}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({})