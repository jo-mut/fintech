import {
    Alert,
    Image,
    Keyboard, KeyboardAvoidingView, Platform, SafeAreaView,
    StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import InputField from '@/components/text-input'
import { Link, router, useLocalSearchParams } from 'expo-router'
import PageNav from '@/components/page-nav'
import { Icons } from '@/constants/Icons'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>()
    const [code, setCode] = useState<string>('')
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();
    const CELL_COUNT = 6;


    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });


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

    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({
                code,
            })
            await setActive!({ session: signIn!.createdSessionId });

        } catch (error) {
            console.log('error', JSON.stringify(error, null, 2));
            if (isClerkAPIResponseError(error)) {
                Alert.alert('Error', error.errors[0].message)
            }
        }
    }

    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: "phone_code",
                code,
            })
            await setActive!({ session: signUp!.createdSessionId })
        } catch (error) {
            console.log('error', JSON.stringify(error, null, 2));
            if (isClerkAPIResponseError(error)) {
                Alert.alert('Error', error.errors[0].message)
            }
        }
    }

    const navigateToHome = () => {
        router.replace('/(screens)/(tabs)/home')
    }

    useEffect(() => {

        if (code.length === 6) {
            if (signin === 'true') {
                verifySignIn()
            } else {
                verifyCode()
            }
        }
    }, [code])

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
                            <Text className='text-black text-4xl font-bold'>6-digit Code</Text>
                        </View>
                        <View className='flex'>
                            <Text className='text-black mt-5'>{`Code sent to ${phone} unless you already have an account`}</Text>
                        </View>
                        <View className='flex flex-row gap-2 mt-5'>
                            <CodeField
                                ref={ref}
                                {...props}
                                value={code}
                                onChangeText={setCode}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                                testID="my-code-input"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Fragment key={index}>
                                        <View
                                            key={index}
                                            style={[styles.cellRoot, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                            <Text style={styles.cellText}> {symbol || (isFocused ? <Cursor /> : null)} </Text>
                                        </View>
                                        {index === 2 && <View key={`separator-${index}`} style={styles.separator}></View>}
                                    </Fragment>
                                )}
                            />
                        </View>
                        <View className='flex-row mt-5'>
                            <Text className='mr-3'>Already have an account?</Text>
                            <Link href={'/(auth)/login'} className='font-bold'>Log In</Link>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Page

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: 20,
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
    cellRoot: {
        width: 40,
        height: 50,
        lineHeight: 38,
        justifyContent: 'center',
        alignItems: "center",
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#00000030',
    },
    cellText: {
        color: "#000",
        fontSize: 36,
        textAlign: "center"
    },
    separator: {
        height: 2,
        width: 10,
        backgroundColor: "gray",
        alignSelf: "center"
    },
    focusCell: {
        borderColor: '#000',
    },
})