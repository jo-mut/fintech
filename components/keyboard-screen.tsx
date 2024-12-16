import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

interface PageProps {
    component: any;
}

const AvoidKeyboadPage = ({ component }: any) => {
    return (
        <View className='flex-1'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback>
                    {component}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

export default AvoidKeyboadPage

const styles = StyleSheet.create({})