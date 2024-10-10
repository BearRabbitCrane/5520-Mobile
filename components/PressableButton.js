import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons for the trash and warning icons

const PressableButton = ({ title, onPress, isDelete, icon, backgroundColor }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#b0e0e6', borderless: false }}  // Ripple effect for Android
      style={({ pressed }) => {
        return [
          
          styles.button,
          pressed && styles.pressedButton,  // Apply pressed state style if pressed
          { backgroundColor: backgroundColor || '#4169E1' }, 
        ];
      }}
    >
      <View style={styles.buttonContent}>
        {icon ? (
          icon  // Display custom icon if passed
        ) : (
          isDelete ? (
            <Ionicons name="trash" size={24} color="white" style={styles.icon} />  // Trash icon for delete buttons
          ) : (
            <Text style={styles.buttonText}>{title}</Text>  // Text for non-delete buttons
          )
        )}
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
    opacity: 0.5,  // Also change opacity when pressed
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
});

export default PressableButton;
