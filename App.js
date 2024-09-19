import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import { useState } from "react";
import Input from "./components/Input";

export default function App() {
  const appName = "My app";
  const [inputData, setInputData] = useState("");

  // Function to handle the data received from Input.js
  const handleInputData = (data) => {
    setInputData(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input textInputFocus={true} onConfirm={handleInputData} />
      
      {inputData !== "" && <Text>{inputData}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
