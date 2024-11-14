import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PressableButton from './PressableButton'; // Reusable PressableButton component
import GoalUsers from './GoalUsers'; // Import GoalUsers component
import { updateWarningInDB } from '../Firebase/firestoreHelper'; // Import the Firestore update function
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../Firebase/firebaseSetup';

const GoalDetails = ({ route, navigation }) => {
  const { goal } = route.params;
  const [textColor, setTextColor] = useState("black"); // State to control text color
  const [imageUrl, setImageUrl] = useState(null); // State to hold the image URL

  // Fetch image URL if imageUri is available
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (goal.imageUri) {
        try {
          const imageRef = ref(storage, goal.imageUri);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url); // Set image URL in state
        } catch (error) {
          console.error("Failed to retrieve image URL:", error);
        }
      }
    };

    fetchImageUrl();
  }, [goal.imageUri]);

  // Function to change text color, update header title, and update Firestore
  const handleWarningPress = async () => {
    setTextColor("red"); // Change text color to red
    navigation.setOptions({ title: "Warning!" }); // Update header title

    try {
      await updateWarningInDB(goal.id, "goals");
      console.log('Warning field updated for goal:', goal.id);
    } catch (error) {
      console.error('Failed to update warning field:', error);
    }
  };

  // Define the button in the header using useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          onPress={handleWarningPress}
          isDelete={false}
          icon={<Ionicons name="alert-circle" size={24} color="white" />}
          backgroundColor="#4B0082"
        />
      ),
    });
  }, [navigation, handleWarningPress]);

  return (
    <View style={styles.container}>
      <Text style={[styles.detailText, { color: textColor }]}>ID: {goal.id}</Text>
      <Text style={[styles.detailText, { color: textColor }]}>Text: {goal.text}</Text>

      {/* Display image if imageUrl is available */}
      {imageUrl && (
        <Image 
          source={{ uri: imageUrl }}
          style={styles.image}
          alt="Goal Image"
        />
      )}

      {/* Pass goalId to GoalUsers component */}
      <GoalUsers goalId={goal.id} />

      {/* Button to push another instance of GoalDetails on the stack */}
      <PressableButton
        title="More Details"
        onPress={() => {
          navigation.push('GoalDetails', { goal, isMoreDetails: true });
        }}
        isDelete={false}
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
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
});

export default GoalDetails;
