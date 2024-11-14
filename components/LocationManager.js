import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationManager = () => {
  // Function to get the user's location
  const locateUserHandler = async () => {
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to locate your position.');
        return;
      }

      // Get the current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log('User location:', location);
      Alert.alert('Location Retrieved', `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
    } catch (err) {
      console.error('Error getting location:', err);
      Alert.alert('Error', 'Could not fetch location');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Locate User" onPress={locateUserHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default LocationManager;
