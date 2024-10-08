import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PressableButton from './PressableButton';  // Reusable PressableButton component

const GoalDetails = ({ route, navigation }) => {
  // Extract the goal object passed via navigation
  const { goal } = route.params;
  const [textColor, setTextColor] = useState("black");  // State to control text color

  // Function to change text color and update header title
  const handleWarningPress = () => {
    setTextColor("red");  // Change text color to red
    navigation.setOptions({ title: "Warning!" });  // Update header title
  };

  // Define the button in the header using useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          onPress={handleWarningPress}
          isDelete={false}  // This is not the delete button, use icon instead
          icon={<Ionicons name="alert-circle" size={24} color="white" />}  // Use an alert icon for the "Warn" button
          backgroundColor="#4B0082"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.detailText, { color: textColor }]}>ID: {goal.id}</Text>
      <Text style={[styles.detailText, { color: textColor }]}>Text: {goal.text}</Text>

      {/* Button to push another instance of GoalDetails on the stack */}
      <PressableButton
        title="More Details"
        onPress={() => {
          // Navigate to a new instance of GoalDetails
          navigation.push('GoalDetails', { goal, isMoreDetails: true });
        }}
        isDelete={false}  // This is a normal button
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default GoalDetails;
