import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '@/components/button'
import { Icons } from '@/constants/Icons'
import DropDown from '@/components/drop-down-menu'
import { useBalanceStore } from '@/store/balace-store'
import ListItem from '@/components/list-item'
import PageNav from '@/components/page-nav'

const Home = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore()

  console.log(transactions)

  const addMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000 * (Math.random() > 0.5 ? 1 : -1)),
      date: new Date(),
      title: "Add money"
    })
  }

  useEffect(() => {
    // clearTransactions();
    // addMoney()
  }, [])

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='flex-1 mx-5' >
        <PageNav
          left={true}
          right={true}
        />
        <View className='flex flex-row items-center justify-center mt-20 gap-1'>
          <Text className='text-4xl font-bold'>{balance()}</Text>
          <Text className='text-4xl font-bold'>$</Text>
        </View>
        <View className='items-center justify-center'>
          <Button
            style='bg-gray-300 mt-3'
            onPress={() => {
              addMoney()
            }}
            label='Account'
            color='black' />Ì
        </View>
        <View className='flex flex-row mt-20 justify-between gap-3 px-5'>
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
        <View className='flex-1 mt-5'>
          <Text className='text-2xl font-bold'>Transactions</Text>
          {transactions.map((transaction) => (
            <ListItem
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