import { SafeAreaView, StyleSheet, Image, ScrollView, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'
import InputField from '@/components/text-input'
import { Keyboard } from 'react-native'
import PageNav from '@/components/page-nav'
import { Icons } from '@/constants/Icons'
import Button from '@/components/button'


const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { isLoaded, signUp, setActive } = useSignUp()
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = React.useState('')
    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: '',
    })
    const [code, setCode] = React.useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false);


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

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setVerification({ ...verification, state: 'pending' })
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    const onPressVerify = async () => {
        if (!isLoaded) {
            return
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code
            })

            if (completeSignUp.status === 'complete') {
                // await fetchAPI("/(api)/user", {
                //   method: "POST",
                //   body: JSON.stringify({
                //     name: form.name,
                //     email: form.email,
                //     clerkId: completeSignUp.createdUserId,
                //   }),
                // });
                await setActive({ session: completeSignUp.createdSessionId })
                setVerification({ ...verification, state: "success" })
            } else {
                setVerification({ ...verification, state: 'failed', error: 'Verification failed' })
                console.error(JSON.stringify(completeSignUp, null, 2))
            }
        } catch (err: any) {
            setVerification({ ...verification, state: 'failed', error: err.errors[0].longMessage })
            console.error(JSON.stringify(err, null, 2))
        }
    }

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
                    <View className='flex-1 px-5 mt-5'>
                        <View className='flex'>
                            <Text className='text-black text-4xl font-bold'>Let's get started!</Text>
                        </View>
                        <View className='flex'>
                            <Text className='text-black mt-5'>Enter your phone number we will
                                send you a confirmatin code there</Text>
                        </View>
                        <View className='flex-1'>
                            <InputField
                                containerStyle='mt-5 bg-gray-300'
                                label="Name"
                                placeholder="Enter your name"
                                value={form.name}
                                onChangeText={(value: string) => {
                                    setForm({
                                        ...form,
                                        name: value
                                    })
                                }}
                                keyboardType='numeric' />
                            <InputField
                                containerStyle='mt-5 bg-gray-300'
                                label="Email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChangeText={(value: string) => {
                                    setForm({
                                        ...form,
                                        email: value
                                    })
                                }}
                                keyboardType='numeric' />

                            <InputField
                                containerStyle='mt-5 bg-gray-300'
                                label="Password"
                                placeholder="Enter your password"
                                value={form.password}
                                secureTextEntry={true}
                                onChangeText={(value: string) => {
                                    setForm({
                                        ...form,
                                        password: value
                                    })
                                }} />

                            <View className='flex-1 justify-end'>
                                <Button
                                    style='bg-gray-800'
                                    label='Sign Up'
                                    color='text-white'
                                    onPress={() => (onSignUpPress())} />
                            </View>

                            <Link
                                href="/login"
                                className='text-lg text-center text-general-200 mt-10'>
                                <Text> Already have an account?</Text>
                                <Text className='text-primary-500'>Log In</Text>
                            </Link>

                            <ReactNativeModal
                                isVisible={verification.state === "pending"}
                                onModalHide={() => {
                                    if (verification.state === 'success') {
                                        setShowSuccessModal(true);
                                    }
                                }}>
                                <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
                                    <Text className='text-2xl font-JakartaExtraBold mb-2'></Text>
                                    <Text className='font-Jarkat mb-5'>
                                        We've sent a verification code to {form.email}
                                    </Text>
                                </View>
                                <InputField
                                    containerStyle='mt-5 bg-gray-300'
                                    label='Code'
                                    placeholder='12345'
                                    value={verification.code}
                                    keyboardType='numeric'
                                    onChangeText={(code: string) => {
                                        setVerification({ ...verification, code })
                                    }} />


                                {verification.error && (
                                    <Text className='text-red-500 text-sm mt-1'>
                                        {verification.error}
                                    </Text>
                                )}

                                <Button
                                    style='bg-gray-800'
                                    label='Verify email'
                                    color='text-white'
                                    onPress={() => (onPressVerify())} />
                            </ReactNativeModal>
                            <ReactNativeModal isVisible={showSuccessModal}>
                                <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
                                    {/* <Image source={''} className='w-[110px] h-[110px] mx-auto my-5' /> */}
                                    <Text className='text-3xl font-JakartaBold text-center'>Verified</Text>
                                    <Text className='text-base text-gray-400 font-Jakarta text-center mt-2'>
                                        You have successfully verified your account.
                                    </Text>
                                    <Button
                                        style='bg-gray-800'
                                        label='Browse home'
                                        color='text-white'
                                        onPress={() => {
                                            setShowSuccessModal(false);
                                            router.push("/(screens)/(tabs)/home")
                                        }} />
                                </View>
                            </ReactNativeModal>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default SignUp

const styles = StyleSheet.create({})