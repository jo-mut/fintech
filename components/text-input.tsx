import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

interface InputFieldProps {
    containerStyle?: string,
    label?: string;
    keyboardType?: string;
    secureTextEntry?: string
    inputStyle?: string
    [key: string]: any
}

const InputField: React.FC<InputFieldProps> =
    ({ label, inputStyle, containerStyle, ...props }: any) => {
        return (
            <View className={`${containerStyle} rounded-2xl p-4`}>
                <TextInput
                    className={`${inputStyle}`}
                    {...props} />
            </View>
        )
    }

export default InputField

const styles = StyleSheet.create({})