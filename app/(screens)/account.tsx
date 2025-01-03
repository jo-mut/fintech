import { Image, SafeAreaView, StyleSheet, Text, TextInput, TextInputBase, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Icon from '@/components/IconView';

const Account = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [edit, setEdit] = useState(false);
    const { top } = useSafeAreaInsets();

    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
        });

        if(!result.canceled) {
            const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
            user?.setProfileImage({
                file: base64
            })
        }
    }

    const onSaveUser = async () => {
        try {
            await user?.update({ firstName: firstName!, lastName: lastName! })
            setEdit(false);
        } catch (error) {

        }
    }

    return (
        <BlurView
            intensity={80}
            tint='dark'
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} >
            <SafeAreaView className='flex-1'>
                <View className='flex-1 px-5 py-3'>
                    {!edit &&
                        <View className='items-center justify-center mt-20'>
                            <TouchableOpacity
                                onPress={() => onCaptureImage}>
                                <Image
                                    source={{ uri: user?.imageUrl}}
                                    resizeMode='contain'
                                    className='w-12 h-12' />
                            </TouchableOpacity>
                            <Text className='text-2xl text-white font-bold'>{lastName}</Text>
                        </View>}
                    {edit &&
                        <View className='items-center justify-center mt-20'>
                            <TouchableOpacity
                                onPress={onCaptureImage}>
                                {user?.imageUrl &&
                                    <Image
                                        source={{ uri: user?.imageUrl }}
                                        resizeMode='contain'
                                        className='w-30 h-20' />}
                            </TouchableOpacity>
                            <View className='flex-row items-center gap-5'>
                                <TextInput
                                    value={firstName || ''}
                                    onChangeText={setFirstName}
                                    placeholder='First Name'
                                    placeholderTextColor={'gray'}
                                    className='rounded-2xl bg-gray-400 p-3 text-sm text-white font-bold' />
                                <TextInput
                                    value={lastName || ''}
                                    onChangeText={setLastName}
                                    placeholder='Last Name'
                                    placeholderTextColor={'gray'}
                                    className='rounded-2xl bg-gray-400 p-3 text-sm text-white font-bold' />
                                <TouchableOpacity
                                    onPress={() => onSaveUser()}>
                                    <Image
                                        source={{ uri: user?.imageUrl }}
                                        resizeMode='contain'
                                        className='w-6 h-6' />
                                </TouchableOpacity>
                            </View>
                        </View>}
                </View>
            </SafeAreaView>
        </BlurView>
    )
}

export default Account

const styles = StyleSheet.create({})