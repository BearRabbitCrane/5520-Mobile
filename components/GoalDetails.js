import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GoalDetails = ({ route, navigation }) => {
  // Extract the goal object passed via navigation
  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
      <Text style={styles.detailText}>ID: {goal.id}</Text>
      <Text style={styles.detailText}>Text: {goal.text}</Text>

      {/* Button to push another instance of GoalDetails on the stack */}
      <Button
        title="More Details"
        onPress={() => {
          // Navigate to a new instance of GoalDetails
          navigation.push('GoalDetails', { goal, isMoreDetails: true });
        }}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default GoalDetails;
