import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalDetails = ({ route }) => {
  const { goalId } = route.params;  // Get goalId from route params

  return (
    <View style={styles.container}>
      <Text style={styles.detailsText}>Goal ID: {goalId}</Text>
      {/* Here, you can fetch and display more details based on goalId */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GoalDetails;
