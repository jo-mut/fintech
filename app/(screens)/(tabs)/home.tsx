import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/components/button'
import { Icons } from '@/constants/Icons'
import DropDown from '@/components/drop-down-menu'
import { useBalanceStore } from '@/store/balace-store'
import ListItem from '@/components/list-item'
import PageNav from '@/components/page-nav'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Home = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore()
  const { top } = useSafeAreaInsets();
  const random = Math.random() > 0.5;
  console.log(transactions)

  const randomInitials = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const firstLetter = letters[Math.floor(Math.random() * letters.length)].toUpperCase();
    const secondLeter = letters[Math.floor(Math.random() * letters.length)].toUpperCase();

    return firstLetter + secondLeter;
  }

  const addMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000 * (random ? -1 : 1)),
      date: new Date(),
      initials: randomInitials(),
      title: (random ? "Sent" : "Received"),
      type: (random ? "sent" : "received"),
    })
  }

  useEffect(() => {
    // clearTransactions();
    // addMoney()
  }, [])

  return (
    <SafeAreaView
      className='flex-1'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: top }}
        className={`flex-1`} >
        <View className='bg-gray-300 rounded-3xl pb-20 m-[20]'>
          <View className='flex flex-row items-center justify-center mx-5 mt-20 gap-1'>
            <Text className='text-4xl font-bold'>{balance()}</Text>
            <Text className='text-4xl font-bold'>$</Text>
          </View>
          <View className='items-center justify-center mx-5'>
            <Button
              style='bg-gray-500 mt-3 py-3 px-8'
              onPress={() => {
                addMoney()
              }}
              label='Account'
              color='text-black' />Ì
          </View>
        </View>
        <View className='flex flex-row justify-between gap-3 px-5 mx-5'>
          <View className='items-center justify-center'>
            <Button
              type="rounded"
              icon={Icons.add}
              style='bg-gray-300 mt-3'
              onPress={null}
              color='black' />Ì
            <Text className='text-black mt-3'>Add Money</Text>
          </View>
          <View className='items-center justify-center'>
            <Button
              icon={Icons.exchange}
              type="rounded"
              style='bg-gray-300 mt-3'
              onPress={null}
              color='black' />Ì
            <Text className='text-black mt-3'>Exchange</Text>
          </View>
          <View className='items-center justify-center'>
            <Button
              icon={Icons.details}
              type="rounded"
              style='bg-gray-300 mt-3'
              onPress={null}
              color='black' />Ì
            <Text className='text-black mt-3'>Details</Text>
          </View>
          <View className='items-center justify-center'>
            <DropDown></DropDown>
          </View>
        </View>
        <View className='flex-1 mt-5 mx-5'>
          <Text className='text-2xl font-bold'>Transactions</Text>
          {transactions.map((transaction) => (
            <ListItem
              onPress={() => ({})}
              initials={transaction.initials}
              type='transaction'
              title={transaction.title}
              id={transaction.id}
              date={transaction.date}
              amount={transaction.amount} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})