import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Currency } from '@/app/interfaces/crypto';
import ListItem from '@/components/list-item';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const Crypto = () => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/listings').then(res => res.json()),
  })

  const currencies = data?.data!.result

  const navigateToDetail = (name: string) => {
    return router.push({
      pathname: '/(screens)/crypto-detail',
      params: { name: name }
    })
  }

  return (
    <SafeAreaView className={`flex-1`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: top }}
        className={`flex-1`}>
        <View className='flex1 mx-5'>
          {currencies?.map((currency: Currency) => (
            <ListItem
              key={currency.id}
              onPress={() => navigateToDetail(currency.id)}
              avatar={currency.icon}
              type='currency'
              title={currency.name}
              subTitle={currency.symbol}
              id={currency.id}
              price={currency.price}
              priceChange={currency.avgChange} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Crypto

const styles = StyleSheet.create({})