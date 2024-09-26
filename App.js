import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from "react-native";
import Header from "./components/Header";
import { useState } from "react";
import Input from "./components/Input";

export default function App() {
  const appName = "My app";
  const [goals, setGoals] = useState([]);  // Array to store multiple goals
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Callback function when user adds a goal
  const handleInputData = (data) => {
    // Create a new goal object with text and random id
    const newGoal = {
      text: data,  // User input
      id: Math.random().toString(),  // Random number as id
    };

    // Add the new goal object to the goals array using the spread operator
    setGoals((currentGoals) => [
      ...currentGoals,
      newGoal,
    ]);

    setIsModalVisible(false);  // Close the modal after adding the goal
  };

  const handleCancel = () => {
    setIsModalVisible(false);  // Close the modal without adding a goal
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topSection}>
        <Header name={appName} />
        <Button title="Add a goal" onPress={showModal} />
      </View>

      {/* Display the list of goals */}
      <View style={styles.bottomSection}>
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}  // Use unique id as key
          renderItem={({ item }) => (
            <View style={[styles.textContainer, { width: item.text.length * 10 + 30 }]}>
              {/* Ensure that goal text is rendered inside a <Text> component */}
              <Text style={styles.inputText}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      <Input
        textInputFocus={true}
        onConfirm={handleInputData}
        onCancel={handleCancel}
        isModalVisible={isModalVisible}
      />
    </SafeAreaView>
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
    justifyContent: "center",
    width: "100%",  // Make sure FlatList takes full width
  },
  textContainer: {
    backgroundColor: "#aaa",  // Apply background color to the View
    borderRadius: 10,  // Apply rounded corners to the View
    padding: 10,  // Add padding around the Text
    marginVertical: 10,  // Add some vertical margin for spacing
    alignItems: "center",  // Center the text horizontally inside the View
    width: "90%",  // Give the container a width
    alignSelf: "center",  // Center the goal containers within the FlatList
  },
  inputText: {
    fontSize: 18,
    color: "steelblue",  // Text color
    textAlign: "center",  // Center the text within the container
  },
});
