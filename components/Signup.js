import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../Firebase/firebaseSetup'; // Import the Auth instance from your Firebase setup file
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if(email.length===0 || password.length===0 || confirmPassword.length===0){
        Alert.alert('No field shoukd be empty');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user);
      Alert.alert('Success', 'User registered successfully');
      // Navigate to login screen after successful registration
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already Registered? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center', // Centers content vertically
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 8,
    marginBottom: 16,
  },
  link: {
    color: 'blue',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default Signup;
