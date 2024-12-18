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
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';

const Page = () => {
  const [countryCode, setCountryCode] = useState<string>('+254');
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const { signUp } = useSignUp();

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

  const onSignUp = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      })
      router.push({
        pathname: '/(auth)/verification',
        params: { phoneNumber: phoneNumber }
      })
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert('Error', error.errors[0].message)
      }
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
            <View className='flex flex-row mt-10 gap-3'>
              <InputField
                containerStyle='bg-gray-300 w-[60]'
                placeholder='Country code'
                value={countryCode}
                onChangeText={countryCode}
                keyboardType='numeric' />
              <InputField
                containerStyle='flex-1 bg-gray-300'
                placeholder='Phone number'
                value={phoneNumber}
                onChangeText={phoneNumber}
                keyboardType='numeric' />
            </View>
            <View className='flex-row mt-5'>
              <Text className='mr-3'>Already have an account?</Text>
              <Link href={'/login'} className='font-bold'>Log In</Link>
            </View>
            <View className='flex-1 justify-end'>
              <Button
                style='bg-gray-800'
                label='Sign Up'
                color='text-white'
                onPress={() => (onSignUp())} />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({})