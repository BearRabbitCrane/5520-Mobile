import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header(props) {
    console.log(props);
  return (
    <View>
      <Text>Welcome to {props.name}!</Text>
    </View>
  )
}

const styles = StyleSheet.create({})