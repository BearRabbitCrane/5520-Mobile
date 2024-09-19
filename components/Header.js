import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header(props) {
    console.log(props);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Welcome to {props.name}!</Text>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10, 
    alignItems: 'center',
  },
  textStyle: {
    color: "purple",
    fontSize: 25,
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
  }
});