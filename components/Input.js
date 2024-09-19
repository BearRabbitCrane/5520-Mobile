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
    onConfirm(text);  // Pass the data to App.js and hide the modal
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.modalContainer}>
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
            color="#841584"
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "powderblue",
  },
  input: {
    width: '80%',
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  text: {
    fontSize: 20,
    color: "steelblue",
    marginVertical: 10,
  },
  buttonContainer: {
    width: '30%',
    marginVertical: 10
  }
});
