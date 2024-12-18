import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ButtonProps {
    icon?: any,
    type?: string,
    style?: string,
    label?: string;
    onPress: any;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({
    icon,
    type = "rounded-3xl",
    label,
    color = 'text-white',
    onPress,
    style }) => {

    const typeStyles = () => {
        if (type === "rounded") {
            return "rounded-full p-5"
        } else {
            return "rounded-3xl p-4"
        }
    }

    return (
        <View className={`items-center justify-center`} >
            <TouchableOpacity className='flex' onPress={onPress}>
                <View className={`${typeStyles()} ${style}`}>
                    {icon
                        ? <Image
                            className='w-6 h-6'
                            resizeMode='contain'
                            source={icon} />
                        : <Text
                            className={`font-[600] ${color}`}>
                            {label}
                        </Text>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({})