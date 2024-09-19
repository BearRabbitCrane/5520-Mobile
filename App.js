import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Header from "./components/Header";
import { useState } from "react";
import Input from "./components/Input";

export default function App() {
  const appName = "My app";
  const [inputData, setInputData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState("");

  // Function to handle the data received from Input.js
  const handleInputData = (data) => {
    setInputData(data);
    setIsModalVisible(false);  // Hide the modal after goal is added
  };

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />

      {/* Button to trigger modal visibility */}
      <Button title="Add a goal" onPress={showModal} />

      {/* Passing modal visibility and callback function to Input component */}
      <Input
        textInputFocus={true}
        onConfirm={handleInputData}
        isModalVisible={isModalVisible}
      />

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
