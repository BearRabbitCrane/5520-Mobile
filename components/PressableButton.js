import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const PressableButton = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#b0e0e6', borderless: false }}  // Ripple effect for Android
      style={({ pressed }) => {
        return [
          styles.button,
          pressed && styles.pressedButton,  // Apply pressed state style if pressed
        ];
      }}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f44336',  // Red background
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  pressedButton: {
    opacity: 0.7,  // Change opacity when pressed
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PressableButton;
