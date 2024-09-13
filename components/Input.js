import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Input({ autoFocus }) {
  const [text, setText] = useState("");
  const [isBlurred, setIsBlurred] = useState(false); 

  return (
    <View>
      <TextInput 
        placeholder='Type sth' 
        keyboardType='default' 
        style={styles.input}
        value={text}
        autoFocus={autoFocus} 
        onChangeText={function (changedText) {
          setText(changedText);
          setIsBlurred(false);
        }}
        onBlur={() => setIsBlurred(true)} 
      />

      {text.length > 0 && !isBlurred && (
        <Text>Character count: {text.length}</Text>
      )}

      {isBlurred && (
        <Text>
          {text.length >= 3 ? "Thank you" : "Please type more than 3 characters"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
    marginBottom: 10
  }
});