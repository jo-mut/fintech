import {
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View,
  SafeAreaView, StyleSheet, Text, TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import InputField from '@/components/text-input';
import { Link, router } from 'expo-router';
import Button from '@/components/button';
import AvoidKeyboadPage from '@/components/keyboard-screen';
import PageNav from '@/components/page-nav';
import { Icons } from '@/constants/Icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';


enum SignInType {
  PHONE,
  GOOGLE,
  APPLE,
  EMAIL
}

const Page = (type: SignInType) => {
  const [countryCode, setCountryCode] = useState<string>('+254');
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const { signIn } = useSignIn();


  const continueToConfirmation = () => {
    router.push('/(auth)/verification')
  }

  const handleSignIn = async () => {
    if (type == SignInType.PHONE) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
          return factor.strategy === "phone_code";
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        })

        router.push({
          pathname: "/(auth)/verification",
          params: { phone: fullPhoneNumber, signin: "true" }
        })

      } catch (error) {
        console.log('error', JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          Alert.alert('Error', error.errors[0].message)
        }
      }
    }
  }

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

  const handleLogin = () => {
    router.push('/(auth)/login-with-email')
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
              <Text className='text-black text-4xl font-bold'>Welcome back</Text>
            </View>
            <View className='flex'>
              <Text className='text-black mt-5'>Enter your phone number we will
                send you a confirmatin code there</Text>
            </View>
            <View className='flex flex-row mt-10 gap-3'>
              <InputField
                containerStyle='bg-gray-300 w-[60] rounded-3xl p-4 '
                placeholder='Country code'
                value={countryCode}
                onChangeText={(value: string) => {
                  setCountryCode(value)
                }}
                keyboardType='numeric' />
              <InputField
                containerStyle='flex-1 bg-gray-300 rounded-3xl p-4 '
                placeholder='Phone number'
                value={phoneNumber}
                onChangeText={(value: string) => {
                  setPhoneNumber(value)
                }}
                keyboardType='numeric' />
            </View>
            <View className='flex-row mt-5'>
              <Text className='mr-3'>Already have an account?</Text>
              <Link href={'/login'} className='font-bold'>Log In</Link>
            </View>
            <View className='flex-1 justify-end'>
              <View>
                <Button
                  style='bg-gray-700 p-4'
                  label='Continue'
                  color='text-white'
                  onPress={() => (continueToConfirmation())} />
                <View className='flex-row justify-between items-center px-3'>
                  <View className='h-[0.1] flex-1 bg-gray-700 my-5' />
                  <Text className='text-black font-bold mx-5'>or</Text>
                  <View className='h-[0.1] flex-1 bg-gray-700 my-5' />
                </View>
                <Button
                  style='bg-gray-300 p-4'
                  label='Continue with email'
                  color='text-black'
                  onPress={() => {
                    handleLogin()
                  }} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({})