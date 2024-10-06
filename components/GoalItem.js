import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ text, id, onDelete }) => {
  const navigation = useNavigation();  // Get navigation object using useNavigation hook
  const goalObject = { text, id };  // Create the goal object to pass

  return (
    <View style={styles.textContainer}>
      <Text style={styles.inputText}>{text}</Text>

      {/* Container for the buttons */}
      <View style={styles.buttonContainer}>
        {/* Delete button */}
        <Button title="X" onPress={() => onDelete(id)} color="red" />
        {/* Navigate directly to GoalDetails */}
        <Button title="i" onPress={() => navigation.navigate('GoalDetails', { goal: goalObject })} color="blue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#aaa",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  inputText: {
    fontSize: 18,
    color: "steelblue",
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
});

export default GoalItem;
