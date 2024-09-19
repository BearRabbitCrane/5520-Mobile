import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState } from "react";

export default function Input({ textInputFocus, onConfirm }) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);

  function updateText(changedText) {
    setText(changedText);
  }

  // Function to log the input value to the console
  const handleConfirm = () => {
    console.log("User input: ", text);
    onConfirm(text);
  };

  return (
    <View>
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
  );
}

const styles = StyleSheet.create({});