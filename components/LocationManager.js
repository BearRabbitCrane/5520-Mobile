import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationManager = () => {
  // Using the useForegroundPermissions hook
  const [response, requestPermission] = Location.useForegroundPermissions();

  // Function to verify permission
  const verifyPermission = async () => {
    // Check if permission is already granted
    if (response?.granted) {
      return true;
    }

    // Request permission if not granted
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  // Function to get the user's location
  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();

    // If permission is not granted, show an alert and return
    if (!hasPermission) {
      Alert.alert('Permission required', 'Location access is required to retrieve your position.');
      return;
    }

    try {
      // Get the current position if permission is granted
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
