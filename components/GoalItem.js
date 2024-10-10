import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';  // Import the new PressableButton component

const GoalItem = ({ text, id, onDelete }) => {
  const navigation = useNavigation();  // Get navigation object using useNavigation hook
  const goalObject = { text, id };  // Create the goal object to pass

  return (
    <Pressable
      onPress={() => navigation.navigate('GoalDetails', { goal: goalObject })}
      android_ripple={{ color: '#b0e0e6', borderless: false }}  // Ripple effect for Android
      style={({ pressed }) => {
        return [
          styles.textContainer,
          pressed && styles.pressedItem,  // Apply pressed state style if pressed
        ];
      }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.inputText}>{text}</Text>

        {/* Reuse PressableButton for delete */}
        <PressableButton title="X" onPress={() => onDelete(id)} />
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
});

export default GoalItem;
