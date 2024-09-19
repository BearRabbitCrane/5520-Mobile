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
      <View style={styles.container}>
        <TextInput
          autoFocus={textInputFocus}
          placeholder="Type something"
          keyboardType="default"
          style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
          value={text}
          onChangeText={updateText}
          onBlur={() => {
            setBlur(true);
          }}
          onFocus={() => {
            setBlur(false);
          }}
        />

        <Button
          onPress={handleConfirm}
          title="Confirm"
          color="#841584"
        />

        {blur ? (
          text.length >= 3 ? (
            <Text>Thank you</Text>
          ) : (
            <Text>Please type more than 3 characters</Text>
          )
        ) : (
          text && <Text>{text.length}</Text>
        )}

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
