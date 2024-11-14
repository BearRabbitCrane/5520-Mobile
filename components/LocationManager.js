import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const LocationManager = () => {
  const navigation = useNavigation(); // Hook to get navigation prop
  const [location, setLocation] = useState(null); // State for storing latitude and longitude
  const [response, requestPermission] = Location.useForegroundPermissions();

  // Function to verify permission
  const verifyPermission = async () => {
    if (response?.granted) {
      return true; // Permission already granted
    }

    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  // Function to locate the user
  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      Alert.alert('Permission required', 'Location access is required to retrieve your position.');
      return;
    }

    try {
      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
    } catch (err) {
      console.error('Error getting location:', err);
      Alert.alert('Error', 'Could not fetch location');
    }
  };

  // Generate Google Maps Static API URL
  const mapImageUrl = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
    : null;
  
  return (
    <View style={styles.container}>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{ uri: mapImageUrl }}
          style={styles.mapImage}
        />
      )}
      {location && (
        <Button
          title="Show on Map"
          onPress={() => {
            navigation.navigate('Map', {
              latitude: location.latitude,
              longitude: location.longitude,
            });
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  mapImage: {
    width: 400,
    height: 200,
    marginTop: 20,
  },
});

export default LocationManager;
