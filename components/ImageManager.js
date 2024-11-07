import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageManager = () => {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null); // State to store the URI of the captured image
  console.log(response);

  // Function to verify permission
  const verifyPermission = async () => {
    try {
        if (response.granted) {
          return true; // Permission already granted
        }
    
        const permissionResult = await requestPermission(); // Request permission if not granted
    
        return permissionResult.granted; // Return true if granted, false otherwise
      } catch (error) {
        console.error('Permission request failed:', error); // Log error if there's an issue with requesting permission
        return false; // Return false in case of error
      }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
        Alert.alert('Permission required', 'You need to grant camera access to take photos.');
      return;
    } 
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Allow user to edit the image
        quality: 0.5, // Adjust image quality
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri; // Get the URI of the captured image
        setImageUri(uri); // Store the URI in the state
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
    {/* Display the image preview if an image has been captured */}
    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default ImageManager;
