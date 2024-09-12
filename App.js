import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';
import Input from './components/Input';

export default function App() {
  const appName = 'My App';
  
  return (
    <View style={styles.container}>
      <Header name = {appName}>
        <Text>child 1</Text>
        <Text>child 1</Text>
      </Header>
      <Input></Input>
      <Text>{TextInput.value}</Text>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
