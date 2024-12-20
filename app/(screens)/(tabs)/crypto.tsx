import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Currency } from '@/app/interfaces/crypto';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

const Crypto = () => {
  const queryClient = useQueryClient();
  const currencies = useQuery({
    queryKey: ['currencies'],
    queryFn: () => fetch('listings').then(res => res.json()),
  })


  return (
    <ScrollView className='flex-1'>
      <View className='flex-1'>
        {currencies.data?.map((currency: Currency) => {
          <Text className='text-lg text-black'>{currency.name}</Text>
        })}
      </View>
    </ScrollView>
  )
}

export default Crypto

const styles = StyleSheet.create({})