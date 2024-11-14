import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import LocationManager from './LocationManager';

const Profile = ({ navigation, route }) => {
  const user = auth.currentUser;
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Update location if passed from Map component
  React.useEffect(() => {
    if (route.params?.selectedLocation) {
      setSelectedLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  // Sign-out function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Signed Out', 'You have been signed out.');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out.');
    }
  };

  // Set up the sign-out icon in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="log-out-outline"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
          onPress={handleSignOut}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>User ID: {user.uid}</Text>
        </>
      ) : (
        <Text style={styles.info}>No user is logged in</Text>
      )}
      <LocationManager />
      {selectedLocation && (
        <Text style={styles.info}>
          Selected Location: {selectedLocation.latitude}, {selectedLocation.longitude}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;
