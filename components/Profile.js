// Profile.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../Firebase/firebaseSetup'; // Import the auth instance

const Profile = () => {
  const user = auth.currentUser;

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
