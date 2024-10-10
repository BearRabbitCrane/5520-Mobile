import React from 'react';
import { Pressable, View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ text, id, onDelete }) => {
  const navigation = useNavigation();  // Get navigation object using useNavigation hook
  const goalObject = { text, id };  // Create the goal object to pass

  return (
    <Pressable
      onPress={() => navigation.navigate('GoalDetails', { goal: goalObject })}
      android_ripple={{ color: '#b0e0e6', borderless: false }}  // Ripple effect for Android
      style={({ pressed }) => {
        // Explicit return of an array with the styles
        return [
          styles.textContainer,
          pressed && styles.pressedItem,  // Apply pressed state style if pressed
        ];
      }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.inputText}>{text}</Text>

        {/* Container for the delete button */}
        <View style={styles.buttonContainer}>
          {/* Delete button */}
          <Button title="X" onPress={() => onDelete(id)} color="red" />
        </View>
      </View>
    </Pressable>
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
  pressedItem: {
    opacity: 0.5,  // Change opacity when pressed
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
