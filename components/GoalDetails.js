import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.detailsText}>Goal Details</Text>
      {/* You can display the goal details here */}
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
