import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageManager = () => {
  const takeImageHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Allow user to edit the image
        quality: 0.5, // Adjust image quality
      });

      if (!result.canceled) {
        console.log(result.assets[0].uri); // Log the URI of the captured image
      } else {
        console.log('User canceled image selection');
      }
    } catch (err) {
      console.error('Error opening camera:', err);
      Alert.alert('Error', 'Could not open camera');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default ImageManager;
