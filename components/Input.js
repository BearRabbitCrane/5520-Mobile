import { StyleSheet, Text, TextInput, View, Button, Modal } from "react-native";
import React, { useState } from "react";

export default function Input({ textInputFocus, onConfirm, isModalVisible }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function updateText(changedText) {
    setText(changedText);
  }

  // Function to log the input value and call the parent callback
  const handleConfirm = () => {
    console.log("User input: ", text);
    onConfirm(text); 
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <TextInput
            autoFocus={textInputFocus}
            placeholder="Type something"
            keyboardType="default"
            style={styles.input}
            value={text}
            onChangeText={updateText}
            onBlur={() => {
              setBlur(true);
            }}
            onFocus={() => {
              setBlur(false);
            }}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleConfirm}
              title="Confirm"
              color="#007AFF" 
            />
          </View>

          {blur ? (
            text.length >= 3 ? (
              <Text style={styles.text}>Thank you</Text>
            ) : (
              <Text style={styles.text}>Please type more than 3 characters</Text>
            )
          ) : (
            text && <Text style={styles.text}>{text.length}</Text>
          )}
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
    width: '60%', 
    marginVertical: 10,
  },
});
