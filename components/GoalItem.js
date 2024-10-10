import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import PressableButton from './PressableButton';  // Import your custom button
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ text, id, onDelete, separators }) => {
  const navigation = useNavigation();  // Get navigation object using the hook

  // Function to confirm and delete the goal on long press
  const handleLongPress = () => {
    Alert.alert(
      'Delete Goal',
      `Are you sure you want to delete "${text}"?`,  // Show the goal text in the confirmation
      [
        {
          text: 'Cancel',
          style: 'cancel',  // Cancel button, closes the alert
        },
        {
          text: 'Delete',
          onPress: () => onDelete(id),  // Call the delete function if confirmed
          style: 'destructive',  // Make the delete button red (iOS)
        },
      ]
    );
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('GoalDetails', { goal: { text, id } })}
      onLongPress={handleLongPress}  // Trigger deletion confirmation on long press
      onPressIn={() => separators.highlight()}   // Call highlight on press in
      onPressOut={() => separators.unhighlight()}  // Call unhighlight on press out
      android_ripple={{ color: '#b0e0e6', borderless: false }}  // Ripple effect for Android
      style={({ pressed }) => {
        // Return an array of styles with specific press feedback for iOS
        return [
          styles.textContainer,
          pressed && Platform.OS === 'ios' && styles.pressedItem,  // Apply pressed state for iOS
        ];
      }}
    >
      <View style={styles.contentContainer}>
        {/* Render the goal text */}
        <Text style={styles.inputText}>{text}</Text>

        {/* Reuse the PressableButton with the trash icon */}
        <PressableButton
          title="Delete"
          onPress={() => onDelete(id)}
          isDelete={true}  // Ensure the trash icon is shown
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',  // Align item in the center
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    color: '#4B0082',
  },
  pressedItem: {
    opacity: 0.5,  // Change opacity for iOS when pressed
  },
});

export default GoalItem;
