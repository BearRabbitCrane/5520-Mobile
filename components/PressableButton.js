import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons for the trash icon

const PressableButton = ({ title, onPress, isDelete }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#b0e0e6', borderless: false }}  // Ripple effect for Android
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton,  // Apply pressed state style if pressed
      ]}
    >
      <View style={styles.buttonContent}>
        {isDelete && (
          <Ionicons name="trash" size={24} color="white" style={styles.icon} />
        )}
        {!isDelete && <Text style={styles.buttonText}>{title}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4169E1',  // Button background color (Royal Blue)
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  pressedButton: {
    backgroundColor: '#9932CC',  // Change background color when pressed (Dark Orchid)
    opacity: 0.7,  // Also change opacity when pressed
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,  // Add some spacing between icon and text if needed
  },
});

export default PressableButton;
