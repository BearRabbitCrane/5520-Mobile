import { StyleSheet, Text, TextInput, View, Button, Modal, Alert, Image } from "react-native";
import React, { useState } from "react";
import ImageManager from "./ImageManager";

export default function Input({ textInputFocus, onConfirm, onCancel, isModalVisible }) {
  const [text, setText] = useState("");
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true); // Confirm button disabled by default
  const [imageUri, setImageUri] = useState(null); // State to store the image URI

  function updateText(changedText) {
    setText(changedText);
    setIsConfirmDisabled(changedText.length < 3);  // Enable Confirm if input has at least 3 characters
  }

  // Callback to receive the image URI from ImageManager
  const handleImageTaken = (uri) => {
    setImageUri(uri); // Store the URI in the state
  };

  const handleConfirm = () => {
    onConfirm(text);
    setText("");  // Clear TextInput after confirming
    setImageUri(null); // Clear the image URI after confirming
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Confirmation",
      "Are you sure you want to cancel?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            onCancel();
            setText("");  // Clear TextInput after canceling
            setImageUri(null); // Clear the image URI after canceling
          },
        },
      ]
    );
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>

          {/* Render the ImageManager component and pass handleImageTaken as a prop */}
          <ImageManager onImageTaken={handleImageTaken} />

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              accessibilityLabel="Selected image preview"
            />
          )}

          {/* 
            Network image loaded from a URL. 
            The alt prop provides a description of the image for accessibility purposes.
          */}
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png" }}
            style={styles.image}
            alt="Target from Network"
          />
          {/* 
            Local image loaded from the project assets. 
            As mentioned above, the alt prop is a description of the image.
          */}
          <Image
            source={require("../assets/target.png")}
            style={styles.image}
            alt="Local Target"
          />

          <TextInput
            autoFocus={textInputFocus}
            placeholder="Type something"
            keyboardType="default"
            style={styles.input}
            value={text}
            onChangeText={updateText}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleCancel}
              title="Cancel"
              color="#007AFF"
            />
            <View style={styles.buttonSpacing} />
            <Button
              onPress={handleConfirm}
              title="Confirm"
              color="#007AFF"
              disabled={isConfirmDisabled}  // Disable Confirm by default
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  innerContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: "powderblue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: '100%',
    borderColor: 'purple',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
    borderRadius: 5, 
  },
  text: {
    fontSize: 16,
    color: "steelblue",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",  // Arrange buttons horizontally
    justifyContent: "space-between",
  },
  buttonSpacing: {
    width: 10,  // Add space between Cancel and Confirm buttons
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
