import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PressableButton from './PressableButton';  // Import your custom button

const GoalItem = ({ text, id, onDelete }) => {
  return (
    <View style={styles.textContainer}>
      {/* Render the goal text */}
      <Text style={styles.inputText}>{text}</Text>

      {/* Reuse the PressableButton with the trash icon */}
      <PressableButton
        title="Delete"  // Title should still be passed, but this can be empty
        onPress={() => onDelete(id)}
        isDelete={true}  // This ensures the trash icon is shown
      />
    </View>
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
    alignSelf: 'center',
  },
  inputText: {
    fontSize: 18,
    color: 'steelblue',
    marginRight: 10,  // Space between goal text and delete button
  },
});

export default GoalItem;
