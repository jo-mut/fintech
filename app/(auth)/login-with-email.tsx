import { SafeAreaView, StyleSheet, Image, ScrollView, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
import InputField from '@/components/text-input'
import { Icons } from '@/constants/Icons'
import Button from '@/components/button'
import PageNav from '@/components/page-nav'


const SignIn = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { signIn, setActive, isLoaded } = useSignIn()


    const info = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    router.push('/(screens)/help')
                }}>
                    <Image
                        source={Icons.info}
                        resizeMode='contain'
                        className='w-6 h-6' />
                </TouchableOpacity>
            </View>
        )
    }

    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) {
            return
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace("/");
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, form.email, form.password])

    return (
        <KeyboardAvoidingView
            className='flex-1'
            keyboardVerticalOffset={40}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}>
                <SafeAreaView className='flex-1'>
                    <PageNav
                        back={true}
                        right={info()} />
                    <View className='px-5 mt-5'>
                        <View className='flex'>
                            <Text className='text-black text-4xl font-bold'>Welcome back</Text>
                        </View>
                        <View className='flex'>
                            <Text className='text-black mt-5'>Enter your phone number we will
                                send you a confirmatin code there</Text>
                        </View>
                    </View>
                    <View className='flex-1 p-5'>
                        <InputField
                            containerStyle='rounded-3xl p-4 mt-5 bg-gray-300'
                            label="Email"
                            placeholder="Enter your email"
                            icon={''}
                            value={form.email}
                            onChangeText={(value: string) => {
                                setForm({
                                    ...form,
                                    email: value
                                })
                            }}
                        />
                        <InputField
                            containerStyle='rounded-3xl p-4 mt-5 bg-gray-300'
                            label="Password"
                            placeholder="Enter your password"
                            icon={''}
                            secureTextEntry={true}
                            value={form.password}
                            onChangeText={(value: string) => {
                                setForm({
                                    ...form,
                                    password: value
                                })
                            }} />

                        <View className='flex-1 justify-end'>
                            <Button
                                style='p-4 mt-6 bg-gray-700'
                                label='Sign In'
                                color='text-white'
                                onPress={() => (onSignInPress())} />


                            <Link
                                href="/email-sign-up"
                                className='text-lg text-center text-general-200 mt-10'>
                                <Text> Don't have an account?</Text>
                                <Text className='text-primary-500'>Sign Up</Text>
                            </Link>
                        </View>
                    </View>
                </SafeAreaView >
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView >
    )
}

export default SignIn

const styles = StyleSheet.create({})