import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Crypto = () => {

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch('/listings');
      const data = await res.json();
      console.log(data)
    }
    getListings();
  }, [])

  return (
    <View>
      <Text>Crypto</Text>
    </View>
  )
}

export default Crypto

const styles = StyleSheet.create({})