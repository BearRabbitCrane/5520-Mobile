import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import Header from "./components/Header";
import { useState } from "react";
import Input from "./components/Input";

export default function App() {
  const appName = "My app";
  const [inputData, setInputData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputData = (data) => {
    setInputData(data);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.topSection}>
        <Header name={appName} />
        <Button title="Add a goal" onPress={showModal} />
      </View>

      <View style={styles.bottomSection}>
        {inputData !== "" && <Text style={styles.inputText}>{inputData}</Text>}
      </View>

      <Input
        textInputFocus={true}
        onConfirm={handleInputData}
        isModalVisible={isModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  topSection: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomSection: {
    flex: 4,
    backgroundColor: "pink",
    alignContent: "center",
    alignItems: "center",
  },
  inputText: {
    marginTop: 15,
    fontSize: 18,
    color: "steelblue",
    backgroundColor: "#aaa",
    padding: 5,
    borderRadius: 5,
  },
});
