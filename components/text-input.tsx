import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

interface InputFieldProps {
    icon?: string,
    containerStyle?: string,
    label?: string;
    keyboardType?: string;
    secureTextEntry?: boolean
    inputStyle?: string
    [key: string]: any
}

const InputField: React.FC<InputFieldProps> =
    ({ label, inputStyle, containerStyle, ...props }: any) => {
        return (
            <View className={`${containerStyle}`}>
                <TextInput
                    className={`${inputStyle}`}
                    {...props} />
            </View>
        )
    }

export default InputField

const styles = StyleSheet.create({})