import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GoalItem = ({ text, id, onDelete, onNavigate }) => {
  return (
    <View style={styles.textContainer}>
      {/* Goal text */}
      <Text style={styles.inputText}>{text}</Text>

      {/* Button container for X and i buttons */}
      <View style={styles.buttonContainer}>
        <Button title="X" onPress={() => onDelete(id)} color="red" />
        <Button title="i" onPress={() => onNavigate(id)} color="blue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",  // Arrange text and buttons in a row
    alignItems: "center",  // Align items vertically center
    backgroundColor: "#aaa",  // Grey background
    borderRadius: 10,  // Rounded corners for the container
    padding: 10,  // Padding inside the container
    marginVertical: 10,  // Vertical margin for spacing
    alignSelf: "center",  // Make the container only as wide as its content
  },
  inputText: {
    fontSize: 18,
    color: "steelblue",  // Text color
    marginRight: 10,  // Add some space between the text and the buttons
  },
  buttonContainer: {
    flexDirection: "row",  // Arrange buttons horizontally
    backgroundColor: "#ccc",  // Background color for button container
    borderRadius: 5,  // Rounded corners for button container
    padding: 5,  // Padding around buttons
  },
});

export default GoalItem;
