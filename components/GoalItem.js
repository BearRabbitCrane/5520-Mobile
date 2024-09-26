import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GoalItem = ({ text, id, onDelete }) => {
    console.log(text);
  return (
    <View style={[styles.textContainer, { width: text.length * 10 + 40 }]}>
      <Text style={styles.inputText}>{text}</Text>
      {/* Delete button */}
      <Button title="X" onPress={() => onDelete(id)} color="red" /> 
         {/* Pass the goal id back to parent when pressed */}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#aaa",  // Apply background color to the View
    borderRadius: 10,  // Apply rounded corners to the View
    padding: 10,  // Add padding around the Text
    marginVertical: 10,  // Add some vertical margin for spacing
    alignItems: "center",  // Center the text horizontally inside the View
    alignSelf: "center",  // Center the goal containers
    flexDirection: "row",  // Arrange the text and button horizontally
    justifyContent: "space-between",  // Spread the text and button
  },
  inputText: {
    fontSize: 18,
    color: "steelblue",  // Text color
    textAlign: "center",  // Center the text within the container
  },
});

export default GoalItem;
